import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext.tsx';

interface Base {
  id: string;
  name: string;
  code: string;
}

interface AssetType {
  id: string;
  name: string;
}

interface Asset {
  id: string;
  name: string;
  base_id: string;
  quantity: number;
  available_quantity: number;
  assigned_quantity: number;
  status: string;
  created_at: string;
}

interface DataContextType {
  bases: Base[];
  assetTypes: AssetType[];
  assets: Asset[];
  loading: boolean;
  error: string | null;
  refreshBases: () => Promise<void>;
  refreshAssetTypes: () => Promise<void>;
  refreshAssets: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [bases, setBases] = useState<Base[]>([]);
  const [assetTypes, setAssetTypes] = useState<AssetType[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, loading: authLoading } = useAuth();

  const fetchBases = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/bases`);
      setBases(response.data.data);
      setError(null);
    } catch (err: any) {
      console.error('Failed to fetch bases:', err);
      if (err.response?.status === 401) {
        setError('Authentication required. Please log in.');
      } else {
        setError('Failed to fetch bases');
      }
    }
  };

  const fetchAssetTypes = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/asset-types`);
      setAssetTypes(response.data.data);
      setError(null);
    } catch (err: any) {
      console.error('Failed to fetch asset types:', err);
      if (err.response?.status === 401) {
        setError('Authentication required. Please log in.');
      } else {
        setError('Failed to fetch asset types');
      }
    }
  };

  const fetchAssets = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/assets?limit=1000`);
      setAssets(response.data.data);
      setError(null);
    } catch (err: any) {
      console.error('Failed to fetch assets:', err);
      if (err.response?.status === 401) {
        setError('Authentication required. Please log in.');
      } else {
        setError('Failed to fetch assets');
      }
    }
  };

  const refreshBases = async () => {
    await fetchBases();
  };

  const refreshAssetTypes = async () => {
    await fetchAssetTypes();
  };

  const refreshAssets = async () => {
    await fetchAssets();
  };

  useEffect(() => {
    const initializeData = async () => {
      if (authLoading) return;
      if (user) {
        setLoading(true);
        try {
          await Promise.all([fetchBases(), fetchAssetTypes(), fetchAssets()]);
        } catch (err) {
          console.error('Failed to initialize data:', err);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        setBases([]);
        setAssetTypes([]);
        setAssets([]);
      }
    };
    initializeData();
  }, [user, authLoading]);

  const value: DataContextType = {
    bases,
    assetTypes,
    assets,
    loading,
    error,
    refreshBases,
    refreshAssetTypes,
    refreshAssets,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}; 