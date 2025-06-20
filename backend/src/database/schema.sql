-- Military Asset Management System Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Bases table for military installations
CREATE TABLE bases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(10) UNIQUE NOT NULL,
    location VARCHAR(500) NOT NULL,
    commander_id UUID, -- Foreign key added later to break circular dependency
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users table for authentication and role management
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'base_commander', 'logistics_officer')),
    base_id UUID REFERENCES bases(id) ON DELETE SET NULL, -- Foreign key to bases
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Now that both users and bases tables exist, add the foreign key constraint to bases
ALTER TABLE bases ADD CONSTRAINT fk_bases_commander_id FOREIGN KEY (commander_id) REFERENCES users(id) ON DELETE SET NULL;

-- Personnel table for managing military personnel
CREATE TABLE personnel (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    rank VARCHAR(50) NOT NULL,
    base_id UUID NOT NULL REFERENCES bases(id),
    email VARCHAR(255),
    phone VARCHAR(50),
    department VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Asset types table for categorizing equipment
CREATE TABLE asset_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('vehicle', 'weapon', 'ammunition', 'equipment')),
    description TEXT,
    unit_of_measure VARCHAR(20) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Assets table for individual asset instances
CREATE TABLE assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    asset_type_id UUID NOT NULL REFERENCES asset_types(id),
    serial_number VARCHAR(100) UNIQUE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    current_base_id UUID REFERENCES bases(id),
    status VARCHAR(20) NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'assigned', 'maintenance', 'retired')),
    purchase_date DATE,
    purchase_cost DECIMAL(12,2),
    current_value DECIMAL(12,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Purchases table for asset procurement
CREATE TABLE purchases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    asset_type_id UUID NOT NULL REFERENCES asset_types(id),
    base_id UUID NOT NULL REFERENCES bases(id),
    quantity INTEGER NOT NULL,
    unit_cost DECIMAL(12,2) NOT NULL,
    total_cost DECIMAL(12,2) NOT NULL,
    supplier VARCHAR(255),
    purchase_date DATE NOT NULL,
    delivery_date DATE,
    purchase_order_number VARCHAR(100),
    notes TEXT,
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transfers table for inter-base movements
CREATE TABLE transfers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transfer_number VARCHAR(50) UNIQUE NOT NULL,
    from_base_id UUID NOT NULL REFERENCES bases(id),
    to_base_id UUID NOT NULL REFERENCES bases(id),
    asset_type_id UUID NOT NULL REFERENCES asset_types(id),
    quantity INTEGER NOT NULL,
    transfer_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'in_transit', 'completed', 'cancelled')),
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMP,
    notes TEXT,
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transfer items table for detailed transfer tracking
CREATE TABLE transfer_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transfer_id UUID NOT NULL REFERENCES transfers(id) ON DELETE CASCADE,
    asset_id UUID REFERENCES assets(id),
    asset_type_id UUID NOT NULL REFERENCES asset_types(id),
    quantity INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Assignments table for personnel asset assignments
CREATE TABLE assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    asset_id UUID NOT NULL REFERENCES assets(id),
    personnel_id UUID NOT NULL REFERENCES personnel(id),
    assigned_by UUID NOT NULL REFERENCES users(id),
    base_id UUID NOT NULL REFERENCES bases(id),
    assignment_date DATE NOT NULL,
    return_date DATE,
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'returned', 'lost', 'damaged')),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Expenditures table for asset consumption tracking
CREATE TABLE expenditures (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    asset_type_id UUID NOT NULL REFERENCES asset_types(id),
    base_id UUID NOT NULL REFERENCES bases(id),
    quantity INTEGER NOT NULL,
    expenditure_date DATE NOT NULL,
    reason VARCHAR(255) NOT NULL,
    authorized_by UUID REFERENCES users(id),
    notes TEXT,
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit logs table for transaction history
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

-- Indexes for performance optimization
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_base_id ON users(base_id);

CREATE INDEX idx_personnel_name ON personnel(name);
CREATE INDEX idx_personnel_rank ON personnel(rank);
CREATE INDEX idx_personnel_base_id ON personnel(base_id);
CREATE INDEX idx_personnel_is_active ON personnel(is_active);

CREATE INDEX idx_bases_code ON bases(code);
CREATE INDEX idx_bases_commander_id ON bases(commander_id);

CREATE INDEX idx_assets_asset_type_id ON assets(asset_type_id);
CREATE INDEX idx_assets_current_base_id ON assets(current_base_id);
CREATE INDEX idx_assets_status ON assets(status);
CREATE INDEX idx_assets_serial_number ON assets(serial_number);

CREATE INDEX idx_purchases_base_id ON purchases(base_id);
CREATE INDEX idx_purchases_asset_type_id ON purchases(asset_type_id);
CREATE INDEX idx_purchases_purchase_date ON purchases(purchase_date);
CREATE INDEX idx_purchases_created_by ON purchases(created_by);

CREATE INDEX idx_transfers_from_base_id ON transfers(from_base_id);
CREATE INDEX idx_transfers_to_base_id ON transfers(to_base_id);
CREATE INDEX idx_transfers_asset_type_id ON transfers(asset_type_id);
CREATE INDEX idx_transfers_status ON transfers(status);
CREATE INDEX idx_transfers_transfer_date ON transfers(transfer_date);
CREATE INDEX idx_transfers_created_by ON transfers(created_by);

CREATE INDEX idx_transfer_items_transfer_id ON transfer_items(transfer_id);
CREATE INDEX idx_transfer_items_asset_id ON transfer_items(asset_id);

CREATE INDEX idx_assignments_asset_id ON assignments(asset_id);
CREATE INDEX idx_assignments_personnel_id ON assignments(personnel_id);
CREATE INDEX idx_assignments_base_id ON assignments(base_id);
CREATE INDEX idx_assignments_assigned_by ON assignments(assigned_by);
CREATE INDEX idx_assignments_status ON assignments(status);

CREATE INDEX idx_expenditures_base_id ON expenditures(base_id);
CREATE INDEX idx_expenditures_asset_type_id ON expenditures(asset_type_id);
CREATE INDEX idx_expenditures_expenditure_date ON expenditures(expenditure_date);
CREATE INDEX idx_expenditures_created_by ON expenditures(created_by);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_table_name ON audit_logs(table_name);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- Triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_personnel_updated_at BEFORE UPDATE ON personnel FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bases_updated_at BEFORE UPDATE ON bases FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_asset_types_updated_at BEFORE UPDATE ON asset_types FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_assets_updated_at BEFORE UPDATE ON assets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_purchases_updated_at BEFORE UPDATE ON purchases FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_transfers_updated_at BEFORE UPDATE ON transfers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_assignments_updated_at BEFORE UPDATE ON assignments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_expenditures_updated_at BEFORE UPDATE ON expenditures FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 