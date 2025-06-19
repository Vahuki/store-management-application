import axios from 'axios';

const USER_API_URL = "https://6854306a5470323abe950c57.mockapi.io/user";

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
