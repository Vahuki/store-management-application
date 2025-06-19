import axios from 'axios';

const USER_API_URL = 'http://localhost:3001/user';

// Lấy danh sách user
export const getUsers = async () => {
  try {
    const res = await axios.get(USER_API_URL);
    return res.data;
  } catch (error) {
    console.error('Lỗi khi lấy user:', error);
    return [];
  }
};
