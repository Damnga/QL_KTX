import React, { createContext, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

const PhongContext = createContext();

export const usePhongContext = () => useContext(PhongContext);

export const PhongProvider = ({ children }) => {
  const [phongTheoToa, setPhongTheoToa] = useState([]); 
  const [selectedMaTN, setSelectedMaTN] = useState('');
  const [breadcrumb, setBreadcrumb] = useState(''); 
  const { i18n, t } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || 'vi');
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };
  return (
    <PhongContext.Provider value={{ 
      phongTheoToa, 
      setPhongTheoToa,
      selectedMaTN, 
      setSelectedMaTN,
      breadcrumb,       
      setBreadcrumb,
      t ,
      changeLanguage,
      language
      }}>
      {children}
    </PhongContext.Provider>
  );
};
