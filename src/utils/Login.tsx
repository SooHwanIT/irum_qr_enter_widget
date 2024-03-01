import axios, { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginResponse {
  success: boolean;
  data?: {
    accessToken: string;
  };
}

export const login = async (
  studentId: string,
  password: string,
): Promise<string> => {
  try {
    const loginResult: AxiosResponse<LoginResponse> = await axios.post(
      'https://lib.inu.ac.kr/pyxis-api/api/login',
      {
        isFamilyLogin: false,
        isMobile: true,
        loginId: studentId,
        password: password,
      },
    );
    if (loginResult.data.success && loginResult.data.data?.accessToken) {
      // 로그인에 성공하면 아이디와 패스워드를 AsyncStorage에 저장
      await AsyncStorage.setItem('studentId', studentId);
      await AsyncStorage.setItem('password', password);
      // 토큰 정보를 반환
      return loginResult.data.data.accessToken;
    } else {
      throw new Error('로그인 실패');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
