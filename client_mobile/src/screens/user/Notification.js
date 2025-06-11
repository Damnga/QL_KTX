import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { jwtDecode } from 'jwt-decode';
import { getAllThongBaoData } from '../../route/ThongBao';
import { getByIdTenPhong } from '../../route/Phong';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Noti = () => {
  const [ThongBaoListData, setThongBaoListData] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [loading, setLoading] = useState(true);
  const [tenPhong, setTenphong] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token =  await AsyncStorage.getItem('token');
        const decoded = jwtDecode(token);
        const userId = decoded.MaSV;

        const phongRes = await getByIdTenPhong(userId);
        const tenPhongValue = Array.isArray(phongRes)
          ? phongRes[0]?.TenPhong
          : phongRes?.TenPhong;
        setTenphong(tenPhongValue || '');
        const datalist = await getAllThongBaoData(token);
        setThongBaoListData(datalist);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1877f2" />
      </View>
    );
  }

  const danhSachTheoPhong = ThongBaoListData.filter(tb => tb.TenPhong === tenPhong);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {danhSachTheoPhong.length === 0 ? (
        <Text style={styles.noNotiText}>Không có thông báo</Text>
      ) : (
        danhSachTheoPhong.map((item) => {
          const isExpanded = expanded[item.id];
          return (
            <View key={item.id} style={styles.notiContent}>
              <View style={styles.notiHeader}>
                <Text style={styles.notiUser}>{item.Username}</Text>
                <Text style={styles.notiTime}>{new Date(item.Tgian).toLocaleDateString('vi-VN')}</Text>
              </View>
              <Text
                numberOfLines={isExpanded ? undefined : 3}
                style={styles.notiText}
              >
                {item.NoiDung}
              </Text>
              <TouchableOpacity
                onPress={() => toggleExpand(item.id)}
                style={styles.notiButton}
              >
                <Text style={styles.notiButtonText}>{isExpanded ? 'Ẩn bớt' : 'Xem thêm'}</Text>
              </TouchableOpacity>
            </View>
          );
        })
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f0f2f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noNotiText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#555',
    fontSize: 16,
  },
  notiContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
  },
  notiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  notiUser: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
  },
  notiTime: {
    fontSize: 12,
    color: '#888',
  },
  notiText: {
    color: '#333',
    fontSize: 15,
    marginBottom: 10,
  },
  notiButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#1877f2',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  notiButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default Noti;
