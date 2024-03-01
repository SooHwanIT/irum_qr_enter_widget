import axios, { AxiosResponse } from 'axios';

export const getMemberInfo = async (token: string): Promise<any> => {
  try {
    const membershipInfo: AxiosResponse = await axios.get(
      'https://lib.inu.ac.kr/pyxis-api/1/api/my-membership-card',
      { headers: { 'Pyxis-Auth-Token': token } },
    );

    if (membershipInfo.data?.success) {
      return membershipInfo.data?.data?.membershipCard;
    } else {
      throw new Error('로그인 필요.');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
