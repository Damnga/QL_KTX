import React from 'react'
import "./Campus.css";
const Campus = () => {
  return (
    <div className="campus">
      <div className="campus_container">
        <div className="campus_left">
          <h2>Campus</h2>
          <div className="address">
            <span className="icon">📍</span>
            <div>
              <strong>NỘI KHU KÝ TÚC XÁ:</strong><p>Khu đô thị Pháp Vân-Tứ Hiệp, phường Hoàng Liệt, quận Hoàng Mai, thành phố Hà Nội.</p>
            </div>
          </div>
        </div>
        <div className="campus_right">
          <iframe
            title="Campus Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1862.9093981492604!2d105.84771992914128!3d20.959790836849805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135adb4bddb962b%3A0xf3748f21109c3d04!2zS2h1IG5ow6Ag4bufIHNpbmggdmnDqm4gUGjDoXAgVsOibiAtIFThu6kgSGnhu4dw!5e0!3m2!1svi!2s!4v1744302781576!5m2!1svi!2s"
            width="100%"
            height="400"
            allowFullScreen="true"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default Campus
