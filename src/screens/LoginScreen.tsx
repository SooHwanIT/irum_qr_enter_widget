import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { login } from '../utils/Login.tsx';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [studentId, setStudentId] = useState<string>('20230154');
  const [password, setPassword] = useState<string>('ghks3691***');
  const navigation = useNavigation();

  useEffect(() => {
    // AsyncStorage에서 아이디와 패스워드 가져오기
    const fetchStoredCredentials = async () => {
      const storedStudentId = await AsyncStorage.getItem('studentId');
      const storedPassword = await AsyncStorage.getItem('password');
      if (storedStudentId && storedPassword) {
        // 아이디와 패스워드가 있으면 자동으로 로그인 시도
        handleLogin(storedStudentId, storedPassword);
      }
    };
    fetchStoredCredentials();
  }, []); // componentDidMount와 같은 역할을 수행

  const handleLogin = async (studentId: string, password: string) => {
    try {
      const token = await login(studentId, password);
      // 로그인에 성공한 경우 토큰을 AsyncStorage에 저장
      await AsyncStorage.setItem('studentId', studentId);
      await AsyncStorage.setItem('password', password);
      // 메인 화면으로 이동
      navigation.navigate('Main', { token });
    } catch (error) {
      console.error(error);
      // 로그인 실패 시 에러 처리
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인 페이지</Text>
      <TextInput
        style={styles.input}
        onChangeText={setStudentId}
        value={studentId}
        placeholder="아이디"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="비밀번호"
        secureTextEntry
      />
      <Button title="로그인" onPress={() => handleLogin(studentId, password)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
  },
  input: {
    width: '100%',
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
  },
});

export default LoginScreen;
