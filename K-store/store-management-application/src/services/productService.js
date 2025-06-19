import axios from 'axios';

const API_URL = 'https://6854306a5470323abe950c57.mockapi.io/products';

// Lấy danh sách sản phẩm
export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    return [];
  }
};

// Thêm sản phẩm
export const addProduct = async (product) => {
  try {
    const response = await axios.post(API_URL, product);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm sản phẩm:", error);
    return null;
  }
};

// Sửa sản phẩm theo ID
export const updateProduct = async (id, updatedProduct) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedProduct);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi cập nhật sản phẩm ID ${id}:`, error);
    return null;
  }
};

// Xoá sản phẩm theo ID
export const deleteProduct = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error(`Lỗi khi xoá sản phẩm ID ${id}:`, error);
    return false;
  }
};

// Lấy chi tiết sản phẩm theo ID
export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi lấy sản phẩm ID ${id}:`, error);
    return null;
  }
};
