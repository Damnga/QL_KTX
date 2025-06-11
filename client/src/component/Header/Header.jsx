import React,{useState,useEffect} from 'react'
import "./Header.css";
import {Search} from "lucide-react";
import "../../i18n/i18n";
import { usePhongContext } from '../../context/PhongContext';
const Header = () => {
  const {t, changeLanguage} = usePhongContext();
  const [showLanguage, setShowLanguage] = useState(false);
  const toggleLanguage = () => setShowLanguage(!showLanguage);
  const texts = t('search', { returnObjects: true });
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [char, setChar] = useState(0);

  useEffect(() => {
    const typing = setInterval(() => {
      setText(texts[index].slice(0, char + 1));
      setChar((c) => {
        if (c + 1 === texts[index].length) {
          clearInterval(typing);
          setTimeout(() => {
            setChar(0);
            setIndex((i) => (i + 1) % texts.length);
            setText('');
          }, 1500);
        }
        return c + 1;
      });
    }, 100);
    return () => clearInterval(typing);
  }, [index, char, texts]);

  const handleChangeLanguage = (lang) => {
    changeLanguage(lang);
    setShowLanguage(false);
  };

  return (
    <div className="header_container">
      <div className="header">
        <div className="header_left">
          <div className="language_wrapper">
            <span className="language" onClick={toggleLanguage}>{t('language')}</span>
            {showLanguage && (
              <div className="language_container">
                <p onClick={() => handleChangeLanguage('vi')}>
                  🇻🇳 <img src="https://flagcdn.com/16x12/vn.png" width="16" height="12" alt="Vietnam" />
                </p>
                <p onClick={() => handleChangeLanguage('en')}>
                  🇺🇸 <img src="https://flagcdn.com/16x12/us.png" width="16" height="12" alt="US" />
                </p>
              </div>
            )}
          </div>
          <span className="hotline">{t('hotline')}: <span className="hotline_number">1900.1900</span></span>
        </div>
        <div className="header_center">
          <a href="#support">{t('support')}</a>
          <a href="#jobs">{t('jobs')}</a>
          <a href="#virtual-tour">{t('tour')}</a>
        </div>
        <div className="header_right">
          <input type="text" placeholder={text} className="search_bar" />
          <button className="search_button"><Search className="search_button_icon" /></button>
        </div>
      </div>
    </div>
  );
};

export default Header
