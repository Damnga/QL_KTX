import "./Footer.css";
import { usePhongContext } from '../../context/PhongContext';

const Footer = () => {
  const {t} = usePhongContext();
  return (
    <footer className="footer-container">
      <div className="footer_top_container">
    <div className="footer-top">
      <div className="footer-col">
        <h3>{t('contact')}</h3>
        <p><strong>📍{t('address')}:</strong> Khu nhà ở sinh viên,phường Hoàng Liệt ,quận Hoàng Mai, thành phố Hà Nội.</p>
        <p>☎️1900.1900</p>
        <p>✉️ ktxphapvan@gmail.com</p>
      </div>

      <div className="footer-col">
        <h3>{t('INTRODUCE')}</h3>
        <p>{t('About the dormitory management center')}</p>
      </div>
      <div className="footer-col">
        <h3>{t('Union organization')}</h3>
        <p>{t('union')}</p>
        <p>{t('branch')}</p>
      </div>
      <div className="footer-col">
        <h3>{t('Unit of affiliated')}</h3>
        <p>{t('Building Management A1')}</p>
        <p>{t('Building Management A2')}</p>
        <p>{t('Building Management A3')}</p>
        <p>{t('Building Management A4')}</p>
        <p>{t('Building Management A5')}</p>
        <p>{t('Building Management A6')}</p>
      </div>
    </div>
    </div>
    <div className="footer_bottom_container">
    <div className="footer-bottom">
      <div className="footer-bottom-left">
        <p>{t('Copyright © 2025 of the dormitory management center')}.</p>
        <p>{t('Design and construction by')} <span className="highlight">Nga Nè</span>.</p>
      </div>
      <div className="footer-bottom-right">
        <p>{t('Follow us on')}:</p>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
          <a href="https://plus.google.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-google-plus-g"></i></a>
        </div>
      </div>
    </div>
    </div>
    <div className="scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      <i className="fas fa-chevron-up"></i>
      </div>
  </footer>
  )
}
export default Footer
