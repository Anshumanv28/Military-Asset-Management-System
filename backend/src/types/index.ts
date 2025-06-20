import { Request } from 'express';

// User-related types
export interface User {
  id: string;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  base_id?: string;
  created_at: Date;
  updated_at: Date;
}

export type UserRole = 'admin' | 'base_commander' | 'logistics_officer';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: UserRole;
    base_id?: string;
  };
  token: string;
  refreshToken: string;
}

// Base-related types
export interface Base {
  id: string;
  name: string;
  location: string;
  commander_id?: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateBaseRequest {
  name: string;
  location: string;
  commander_id?: string;
}

// Asset-related types
export interface AssetType {
  id: string;
  name: string;
  description?: string;
  category: string;
  unit_of_measure: string;
  created_at: Date;
  updated_at: Date;
}

export interface Asset {
  id: string;
  name: string;
  serial_number: string;
  asset_type_id: string;
  base_id: string;
  status: AssetStatus;
  purchase_date?: Date;
  purchase_cost?: number;
  current_value?: number;
  condition: AssetCondition;
  location_details?: string;
  notes?: string;
  created_at: Date;
  updated_at: Date;
}

export type AssetStatus = 'available' | 'assigned' | 'maintenance' | 'retired' | 'lost';
export type AssetCondition = 'excellent' | 'good' | 'fair' | 'poor' | 'unusable';

// Purchase-related types
export interface Purchase {
  id: string;
  purchase_number: string;
  asset_type_id: string;
  base_id: string;
  quantity: number;
  unit_cost: number;
  total_cost: number;
  supplier: string;
  purchase_date: Date;
  delivery_date?: Date;
  status: PurchaseStatus;
  approved_by?: string;
  notes?: string;
  created_by: string;
  created_at: Date;
  updated_at: Date;
}

export type PurchaseStatus = 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';

export interface CreatePurchaseRequest {
  asset_type_id: string;
  base_id: string;
  quantity: number;
  unit_cost: number;
  supplier: string;
  purchase_date: Date;
  delivery_date?: Date;
  notes?: string;
}

// Transfer-related types
export interface Transfer {
  id: string;
  from_base_id: string;
  to_base_id: string;
  asset_ids: string[];
  requested_by: string;
  request_date: Date;
  status: TransferStatus;
  approval_date?: Date;
  approved_by?: string;
  rejection_reason?: string;
  rejected_by?: string;
  notes?: string;
  created_at: Date;
  updated_at: Date;
}

export type TransferStatus = 'pending' | 'approved' | 'rejected' | 'completed';

export interface CreateTransferRequest {
  from_base_id: string;
  to_base_id: string;
  asset_ids: string[];
  request_date: Date;
  notes?: string;
}

export interface TransferItem {
  id: string;
  transfer_id: string;
  asset_id?: string;
  asset_type_id: string;
  quantity: number;
  created_at: Date;
}

// Assignment-related types
export interface Assignment {
  id: string;
  asset_id: string;
  assigned_to: string;
  assigned_by: string;
  base_id: string;
  assignment_date: Date;
  return_date?: Date;
  status: AssignmentStatus;
  notes?: string;
  created_at: Date;
  updated_at: Date;
}

export type AssignmentStatus = 'active' | 'returned' | 'expired';

export interface CreateAssignmentRequest {
  asset_id: string;
  assigned_to: string;
  base_id: string;
  assignment_date: Date;
  notes?: string;
}

// Expenditure-related types
export interface Expenditure {
  id: string;
  expenditure_number: string;
  asset_id: string;
  base_id: string;
  quantity: number;
  unit_cost: number;
  total_cost: number;
  expenditure_date: Date;
  reason: string;
  approved_by?: string;
  notes?: string;
  created_by: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateExpenditureRequest {
  asset_id: string;
  base_id: string;
  quantity: number;
  unit_cost: number;
  expenditure_date: Date;
  reason: string;
  notes?: string;
}

// Dashboard-related types
export interface DashboardMetrics {
  totalAssets: number;
  totalBases: number;
  totalUsers: number;
  totalPurchases: number;
  totalTransfers: number;
  totalAssignments: number;
  totalExpenditures: number;
}

export interface AssetMovement {
  id: string;
  type: 'purchase' | 'transfer' | 'assignment' | 'expenditure';
  asset_name: string;
  asset_type: string;
  base_name: string;
  quantity: number;
  date: Date;
  status: string;
}

export interface AssetBalance {
  asset_type_id: string;
  asset_type_name: string;
  base_id: string;
  base_name: string;
  opening_balance: number;
  purchases: number;
  transfers_in: number;
  transfers_out: number;
  assignments: number;
  returns: number;
  expenditures: number;
  closing_balance: number;
}

// Audit-related types
export interface AuditLog {
  id: string;
  user_id: string;
  action: string;
  table_name: string;
  record_id: string;
  old_values?: any;
  new_values?: any;
  ip_address?: string;
  user_agent?: string;
  created_at: Date;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Filter types
export interface DateRange {
  start_date: string;
  end_date: string;
}

export interface AssetFilters {
  base_id?: string;
  asset_type_id?: string;
  status?: AssetStatus;
  date_range?: DateRange;
}

export interface PurchaseFilters {
  base_id?: string;
  asset_type_id?: string;
  date_range?: DateRange;
}

export interface TransferFilters {
  from_base_id?: string;
  to_base_id?: string;
  asset_type_id?: string;
  status?: TransferStatus;
  date_range?: DateRange;
}

// JWT Payload
export interface JWTPayload {
  user_id: string;
  email: string;
  role: string;
  base_id?: string;
  iat?: number;
  exp?: number;
}

// Request with user context
export interface AuthenticatedRequest extends Request {
  user?: JWTPayload;
} 