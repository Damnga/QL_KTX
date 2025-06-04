import React, { createContext, useContext, useState } from 'react';

const PhongContext = createContext();

export const usePhongContext = () => useContext(PhongContext);

export const PhongProvider = ({ children }) => {
  const [phongTheoToa, setPhongTheoToa] = useState([]); 
  const [selectedMaTN, setSelectedMaTN] = useState('');
  const [breadcrumb, setBreadcrumb] = useState(''); 
  return (
    <PhongContext.Provider value={{ 
      phongTheoToa, 
      setPhongTheoToa,
      selectedMaTN, 
      setSelectedMaTN,
      breadcrumb,       
      setBreadcrumb,
      }}>
      {children}
    </PhongContext.Provider>
  );
};
