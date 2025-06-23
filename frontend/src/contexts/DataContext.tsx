import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface Base {
  id: string;
  name: string;
  code: string;
}

interface AssetType {
  id: string;
  name: string;
}

interface DataContextType {
  bases: Base[];
  assetTypes: AssetType[];
  loading: boolean;
  error: string | null;
  refreshBases: () => Promise<void>;
  refreshAssetTypes: () => Promise<void>;
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBases = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/bases`);
      setBases(response.data.data);
    } catch (err) {
      console.error('Failed to fetch bases:', err);
      setError('Failed to fetch bases');
    }
  };

  const fetchAssetTypes = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/asset-types`);
      setAssetTypes(response.data.data);
    } catch (err) {
      console.error('Failed to fetch asset types:', err);
      setError('Failed to fetch asset types');
    }
  };

  const refreshBases = async () => {
    await fetchBases();
  };

  const refreshAssetTypes = async () => {
    await fetchAssetTypes();
  };

  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchBases(), fetchAssetTypes()]);
      } catch (err) {
        console.error('Failed to initialize data:', err);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  const value: DataContextType = {
    bases,
    assetTypes,
    loading,
    error,
    refreshBases,
    refreshAssetTypes,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}; 