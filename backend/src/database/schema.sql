CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE bases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(10) UNIQUE NOT NULL,
    location VARCHAR(500) NOT NULL,
    commander_id UUID,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'base_commander', 'logistics_officer')),
    base_id UUID REFERENCES bases(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE bases ADD CONSTRAINT fk_bases_commander_id FOREIGN KEY (commander_id) REFERENCES users(id) ON DELETE SET NULL;

CREATE TABLE personnel (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    rank VARCHAR(50) NOT NULL,
    base_id UUID NOT NULL REFERENCES bases(id),
    email VARCHAR(255),
    phone VARCHAR(50),
    department VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(first_name, last_name, email)
);

CREATE TABLE assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    base_id UUID NOT NULL REFERENCES bases(id),
    quantity INTEGER NOT NULL DEFAULT 0,
    available_quantity INTEGER NOT NULL DEFAULT 0,
    assigned_quantity INTEGER NOT NULL DEFAULT 0,
    status VARCHAR(20) NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'low_stock', 'out_of_stock')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(name, base_id)
);

CREATE TABLE purchases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    asset_id UUID NOT NULL REFERENCES assets(id),
    base_id UUID NOT NULL REFERENCES bases(id),
    quantity INTEGER NOT NULL,
    supplier VARCHAR(255),
    purchase_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'cancelled')),
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMP,
    notes TEXT,
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transfers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transfer_number VARCHAR(50) UNIQUE NOT NULL,
    from_base_id UUID NOT NULL REFERENCES bases(id),
    to_base_id UUID NOT NULL REFERENCES bases(id),
    asset_name VARCHAR(100) NOT NULL,
    quantity INTEGER NOT NULL,
    transfer_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'in_transit', 'completed', 'cancelled')),
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMP,
    notes TEXT,
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    asset_name VARCHAR(100) NOT NULL,
    assigned_to UUID NOT NULL REFERENCES personnel(id),
    assigned_by UUID NOT NULL REFERENCES users(id),
    base_id UUID NOT NULL REFERENCES bases(id),
    quantity INTEGER NOT NULL DEFAULT 1,
    expended_quantity INTEGER NOT NULL DEFAULT 0,
    assignment_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'partially_expended', 'expended', 'lost', 'damaged')),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE expenditures (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    asset_name VARCHAR(100) NOT NULL,
    base_id UUID NOT NULL REFERENCES bases(id),
    personnel_id UUID REFERENCES personnel(id),
    quantity INTEGER NOT NULL,
    expenditure_date DATE NOT NULL,
    reason VARCHAR(255) NOT NULL,
    authorized_by UUID REFERENCES users(id),
    notes TEXT,
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(50) NOT NULL,
    table_name VARCHAR(50) NOT NULL,
    record_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_username_email ON users(username, email);
CREATE INDEX idx_users_role_base ON users(role, base_id);
CREATE INDEX idx_personnel_name_base ON personnel(first_name, last_name, base_id);
CREATE INDEX idx_personnel_active ON personnel(is_active);
CREATE INDEX idx_bases_code_commander ON bases(code, commander_id);
CREATE INDEX idx_assets_name_base_status ON assets(name, base_id, status);
CREATE INDEX idx_purchases_base_name_date ON purchases(base_id, asset_id);
CREATE INDEX idx_purchases_created_status ON purchases(created_by, status);
CREATE INDEX idx_transfers_bases_name_date ON transfers(from_base_id, to_base_id, asset_name, transfer_date);
CREATE INDEX idx_transfers_status_created ON transfers(status, created_by);
CREATE INDEX idx_assignments_name_person_base ON assignments(asset_name, assigned_to, base_id);
CREATE INDEX idx_assignments_status_created ON assignments(status, assigned_by);
CREATE INDEX idx_expenditures_base_name_date ON expenditures(base_id, asset_name, expenditure_date);
CREATE INDEX idx_audit_user_action_table ON audit_logs(user_id, action, table_name);
CREATE INDEX idx_audit_created ON audit_logs(created_at); 