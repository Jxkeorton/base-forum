import { jwtDecode } from 'jwt-decode';

export const setTokenTimestamp = (data) => {  
  try {
    const refreshToken = data?.refresh_token || data?.refresh;
    if (!refreshToken) {
      console.error('No refresh token found in response');
      return;
    }
    
    const decodedToken = jwtDecode(refreshToken);
    
    const refreshTokenTimestamp = decodedToken.exp;
    localStorage.setItem('refreshTokenTimestamp', refreshTokenTimestamp);
  } catch (error) {
    console.error('Error setting token timestamp:', error);
  }
};

export const shouldRefreshToken = () => {
  const timestamp = localStorage.getItem('refreshTokenTimestamp');
  return !!timestamp;
};

export const removeTokenTimestamp = () => {
  localStorage.removeItem('refreshTokenTimestamp');
};