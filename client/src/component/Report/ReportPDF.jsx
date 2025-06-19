// InvoicePDF.jsx
import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 12, fontFamily: 'Helvetica' },
  section: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottom: '1px solid #ccc',
  },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logo: { width: 50, height: 50 },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  table: { marginTop: 10 },
  row: {
    flexDirection: 'row',
    borderBottom: '1px solid #eee',
    paddingVertical: 4,
  },
  cell1: { width: '70%' },
  cell2: { width: '30%', textAlign: 'right' },
  total: { marginTop: 5, fontWeight: 'bold' },
  qr: { marginTop: 10, width: 60, height: 60 },
});

const InvoicePDF = ({ data, qrImages }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {data.map((inv, index) => (
        <View key={index} style={styles.section}>
          <View style={styles.header}>
            <Image style={styles.logo} src="/images/logo.jpg" />
            <Text style={styles.title}>HÓA ĐƠN THANH TOÁN</Text>
          </View>
          <Text>Tòa nhà: {inv.TenTN}</Text>
          <Text>Phòng: {inv.TenPhong}</Text>
          <Text>Mã hóa đơn: {inv.id}</Text>

          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.cell1}>Khoản</Text>
              <Text style={styles.cell2}>Số tiền (đ)</Text>
            </View>
            {inv.chiTiet?.map((item, idx) => (
              <View key={idx} style={styles.row}>
                <Text style={styles.cell1}>{item.TenKhoanThu}</Text>
                <Text style={styles.cell2}>
                  {item.DonGia.toLocaleString()}
                </Text>
              </View>
            ))}
            <Text style={styles.total}>
              Tổng cộng: {inv.TongTien.toLocaleString()} đ
            </Text>
          </View>

          {qrImages?.[inv.id] && (
            <Image style={styles.qr} src={qrImages[inv.id]} />
          )}
        </View>
      ))}
    </Page>
  </Document>
);

export default InvoicePDF;
