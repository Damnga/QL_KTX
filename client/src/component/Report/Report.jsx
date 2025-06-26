import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePDF from './ReportPDF';
import './Report.css';
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from 'react';
export default function InvoicePage({ data }) {
  const filteredData = data.filter((hd) => hd.TrangThai === "Chưa Thanh Toán");
 useEffect(() => {
    const newQrImages = {};
    filteredData.forEach((inv) => {
      const qr = (
        <QRCodeCanvas value={inv.id.toString()} size={80} level="H" includeMargin />
      );
      const container = document.createElement("div");
      document.body.appendChild(container);
      import("react-dom").then((ReactDOM) => {
        ReactDOM.render(qr, container, () => {
          const qrCanvas = container.querySelector("canvas");
          if (qrCanvas) {
            const dataUrl = qrCanvas.toDataURL();
            newQrImages[inv.id] = dataUrl;
          }
          document.body.removeChild(container);
        });
      });
    });
  }, [data]);
  return (
    <div className="invoice-container">
      <div className="invoice-preview">
        {filteredData.map((inv) => (
          <div key={inv.id} className="invoice-card">
                  <div className="invoice-header-split">
                    <div className="left-info">
                      <p><strong>BAN QUẢN LÝ KHU NHÀ Ở SINH VIÊN PHÁP VÂN</strong></p>
                      <p><strong>PHÒNG QUẢN LÝ SINH VIÊN</strong></p>
                      <h2>THÔNG BÁO THU TIỀN ĐIỆN NƯỚC</h2>
                      <p>Chỉ số chốt từ ngày <strong>{new Date(inv.TgianBatDau).toLocaleDateString('vi-VN')}</strong> đến <strong>{new Date(inv.TgianKetThuc).toLocaleDateString('vi-VN')}</strong></p>
                    </div>
                    <div className="right-qr">
                      <p><strong>Sinh viên chuyển tiền điện nước</strong></p>
                      <p>vui lòng quét mã QR:</p>
                      <QRCodeCanvas value={inv.id.toString()} size={100} />
                      <p>ND: Tên + Số phòng + Tòa</p>
                    </div>
                  </div>
                  <div className="invoice-meta">
                    <p><strong>Số phòng:</strong> {inv.TenPhong}_</p>
                    <p><strong>Tòa nhà:</strong> {inv.TenTN}</p>
                  </div>
                  <table className="invoice-table">
                              <thead>
                                <tr>
                                  <th>Khoản</th>
                                  <th>Chỉ số đầu</th>
                                  <th>Chỉ số sau</th>
                                  <th>Đơn giá</th>
                                  <th>Số tiền (đ)</th>
                                </tr>
                              </thead>
                              <tbody>
                                {inv.chiTiet?.map((item, idx) => {
                                  const soDau = Number(item.SoDau) || 0;
                                  const soSau = Number(item.SoSau) || 0;
                                  const donGia = Number(item.DonGia) || 0;
                                  const soTien = (soSau - soDau) * donGia;

                                  return (
                                    <tr key={idx}>
                                      <td>{item.TenKhoanThu}</td>
                                      <td>{soDau}</td>
                                      <td>{soSau}</td>
                                      <td>{donGia.toLocaleString()}</td>
                                      <td>{soTien.toLocaleString()}</td>
                                    </tr>
                                  );
                                })}
                                <tr className="total-row">
                                  <td><strong>Tổng cộng</strong></td>
                                  <td colSpan={4}><strong>{inv.TongTien.toLocaleString()}</strong></td>
                                </tr>
                              </tbody>
                  </table>
                  <div className="invoice-total">
                    <p><strong>Tổng cộng tiền điện nước {inv.GhiChu}: {inv.TongTien.toLocaleString()} VND</strong></p>
                  </div>
                </div>
              ))}
            </div>
      <div className="footer-actions">
        <PDFDownloadLink  document={<InvoicePDF data={filteredData} />}  fileName="HoaDon.pdf"  className="export-btn">
          {({ blob, url, loading, error }) => (loading ? "Đang tạo PDF..." : "Tải PDF")}
        </PDFDownloadLink>
      </div>
    </div>
  );
}
