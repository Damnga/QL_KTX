import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { login, resetPassword } from '../route/TaiKhoan'; 
import { getAllSinhVien } from "../route/SinhVien";
import { useToast } from 'react-native-toast-notifications';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [isForgot, setIsForgot] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const toast = useToast();
const handleLogin = async () => {
  try {
    setLoading(true);
    const res = await login(email, password);
    if (res.MaPQ === 4) {
        navigation.replace('Main');
    } else {
      toast.show('Đăng nhập thất bại, bạn không có quyền truy cập', { type: 'danger' });
    }
  } catch (err) {
    console.log(err); 
    toast.show(err.message || 'Đăng nhập thất bại', { type: 'danger' });
  } finally {
    setLoading(false);
  }
};
  const handleResetPassword = async () => {
    try {
      setLoading(true);
      const res = await resetPassword(forgotEmail);
      toast.show(res.message || 'Đã gửi mật khẩu mới vào email!' , { type: 'success' });

      setIsForgot(false);
      setForgotEmail('');
    } catch (err) {
      toast.show(err.message || 'Lỗi khi đổi mật khẩu', { type: 'danger' });

    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.jpg')} style={styles.logo} />
      {loading ? (
        <ActivityIndicator size="large" color="#0b1e52" />
      ) : (
        <View style={styles.formContainer}>
          {isForgot ? (
            <>
              <Text style={styles.title}>Quên Mật Khẩu</Text>
              <TextInput
                style={styles.input}
                placeholder="Nhập email đã đăng ký"
                value={forgotEmail}
                onChangeText={setForgotEmail}
              />
              <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                <Text style={styles.buttonText}>Gửi yêu cầu</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsForgot(false)} style={styles.backBtn}>
                <Text style={styles.backText}>Quay lại đăng nhập</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.title}>Đăng Nhập</Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setIsForgot(true)}>
                <Text style={styles.link}>Quên mật khẩu?</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Đăng nhập</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4', alignItems: 'center', padding: 20, justifyContent: 'center' },
  logo: { width: 150, height: 150, marginBottom: 20, resizeMode: 'contain' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#0b1e52', marginBottom: 20, textAlign: 'center' },
  input: { width: '100%', padding: 12, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 12, backgroundColor: '#fff' },
  button: { width: '100%', padding: 14, backgroundColor: '#0b1e52', borderRadius: 8, marginTop: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  link: { color: '#007bff', marginBottom: 12, textAlign: 'right' },
  formContainer: { width: '100%', alignItems: 'center' },
  backBtn: { marginTop: 10 },
  backText: { color: '#0b1e52', fontSize: 16 },
});
