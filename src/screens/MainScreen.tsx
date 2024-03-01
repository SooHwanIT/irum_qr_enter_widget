import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';
import { getMemberInfo } from '../utils/getMemberInfo';
import { login } from "../utils/Login.tsx";

const MainScreen = ({ navigation, route }) => {
  const routeToken = route.params?.token || null;
  const [token, setToken] = useState<string | null>(routeToken);
  const [memberCode, setMemberCode] = useState(null);

  const checkAuthStatus = async () => {
    if (!token) {
      const storedStudentId = await AsyncStorage.getItem('studentId');
      const storedPassword = await AsyncStorage.getItem('password');
      if (storedStudentId && storedPassword) {
        try {
          const newToken = await login(storedStudentId, storedPassword);
          setToken(newToken);
          const info = await getMemberInfo(newToken);
          setMemberCode(info);
        } catch (error) {
          console.error('자동 로그인 실패:', error);
          navigation.navigate('Login');
        }
      } else {
        navigation.navigate('Login');
      }
    } else {
      const info = await getMemberInfo(token);
      setMemberCode(info);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('studentId');
      await AsyncStorage.removeItem('password');
      navigation.navigate('Login');
    } catch (error) {
      console.error('로그아웃 오류:', error);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, [route]);

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={styles.qrContainer}>
          {memberCode && <QRCode value={memberCode} size={250} />}
        </View>
        <TouchableOpacity style={styles.logoutText} onPress={logout}>
          <Text style={styles.logoutButtonText}>로그아웃</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.refreshButton} onPress={checkAuthStatus}>
          <Text style={styles.buttonText}>새로고침</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#0D47A1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderRadius: 10,
    padding: 20,
    marginBottom: 90,
    marginTop: 150,
    width: '90%',
    height: '85%',
  },
  qrContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,  // 패딩 수정

    marginTop:40,
  },
  refreshButton: {
    backgroundColor: '#BBDEFB',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop:40,
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
  logoutText: {

    marginTop:60,
    // position: 'absolute',
    // bottom: 20,
  },
  buttonText: {
    color: '#0D47A1',
    fontSize: 18,
    textAlign: 'center',
  },
  logoutButtonText: {
    color: '#757575',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
});
export default MainScreen;
