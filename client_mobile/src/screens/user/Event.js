import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { getAllSuKien } from '../../route/SuKien';
import { createDangKySuKien, removeDangKySuKien, getAllDangKySuKien } from '../../route/DangKySuKien';
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from 'react-native-toast-notifications';

const EventScreen = () => {
  const [events, setEvents] = useState([]);
  const [registeredList, setRegisteredList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const init = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token && typeof token === 'string') {
          const decoded = jwtDecode(token);
          if (decoded?.id) {
            setUserId(decoded.id);
          } else {
            toast.show('Token không hợp lệ!', { type: 'danger' });
          }
        } else {
          toast.show('Không tìm thấy token người dùng!', { type: 'danger' });
        }
      } catch (error) {
        toast.show('Lỗi giải mã token!', { type: 'danger' });
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchEvents();
    }
  }, [userId]);

  const fetchEvents = async () => {
    try {
      const data = await getAllSuKien();
      const regList = await getAllDangKySuKien();
      setEvents(data);
      setRegisteredList(regList);
    } catch (error) {
      toast.show('Không thể tải dữ liệu sự kiện!', { type: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  const handleDangKySuKien = async (eventId, trangThai) => {
    try {
      if (trangThai?.trim().toLowerCase() === 'đã diễn ra') {
        toast.show('Sự kiện đã kết thúc, không thể đăng ký!', { type: 'danger' });
        return;
      }

      const isRegistered = registeredList.find(dk => dk.MaSK === eventId && dk.MaSV === userId);

      if (isRegistered) {
        await removeDangKySuKien(isRegistered.id);
        toast.show('Đã hủy đăng ký sự kiện', { type: 'success' });
      } else {
        await createDangKySuKien({
          MaSV: userId,
          MaSK: eventId,
          Tgian: new Date().toISOString(),
        });
        toast.show('Đăng ký sự kiện thành công', { type: 'success' });
      }

      await fetchEvents();
    } catch (err) {
      toast.show('Có lỗi xảy ra khi xử lý đăng ký!', { type: 'danger' });
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#1877f2" style={{ marginTop: 50 }} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {events.map(event => {
        const isRegistered = registeredList.find(dk => dk.MaSK === event.id && dk.MaSV === userId);
        return (
          <View key={event.id} style={styles.card}>
            <Image
              source={{ uri: `http://172.20.10.3:3000/uploads/${event.anh}` }}
              style={styles.image}
            />
            <View style={styles.cardContent}>
              <View style={styles.meta}>
                <Text style={styles.username}>{event.Username}</Text>
                <Text style={styles.time}>
                  🕙 {new Date(event.TgianBatDau).toLocaleDateString('vi-VN')} - {new Date(event.TgianKetThuc).toLocaleDateString('vi-VN')}
                </Text>
              </View>

              <Text style={styles.title}>{event.TenSK}</Text>
              <Text>👥 {event.SoNguoiThamGia}</Text>
              <Text style={styles.description}>{event.NoiDung}</Text>

              <TouchableOpacity
                disabled={event.TrangThai?.trim().toLowerCase() === 'đã diễn ra'}
                style={[
                  styles.button,
                  isRegistered && styles.btnCancel,
                  event.TrangThai?.trim().toLowerCase() === 'đã diễn ra' && styles.btnDisabled,
                ]}
                onPress={() => handleDangKySuKien(event.id, event.TrangThai)}
              >
                <Text style={styles.buttonText}>
                  {event.TrangThai?.trim().toLowerCase() === 'đã diễn ra'
                    ? 'Đã kết thúc'
                    : isRegistered
                    ? 'Hủy đăng ký'
                    : 'Đăng ký sự kiện'}
                </Text>
              </TouchableOpacity>

              <View style={[styles.status, getStatusStyle(event.TrangThai)]}>
                <Text style={styles.statusText}>{event.TrangThai}</Text>
              </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

const getStatusStyle = (trangThai) => {
  const normalized = trangThai?.trim().toLowerCase();
  switch (normalized) {
    case 'sắp diễn ra':
      return { backgroundColor: '#d4edda' };
    case 'đang diễn ra':
      return { backgroundColor: '#fff3cd' };
    case 'đã diễn ra':
      return { backgroundColor: '#f8d7da' };
    default:
      return { backgroundColor: '#e2e3e5' };
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f0f2f5',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
  },
  cardContent: {
    padding: 16,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  username: {
    fontWeight: 'bold',
    color: '#333',
  },
  time: {
    color: '#666',
    fontSize: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  description: {
    marginTop: 4,
    color: '#444',
  },
  button: {
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: '#1877f2',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  btnCancel: {
    backgroundColor: '#dc3545',
  },
  btnDisabled: {
    backgroundColor: '#ccc',
  },
  status: {
    padding: 10,
    borderRadius: 6,
    marginTop: 12,
    alignItems: 'center',
  },
  statusText: {
    color: '#333',
    fontWeight: '600',
  },
});

export default EventScreen;
