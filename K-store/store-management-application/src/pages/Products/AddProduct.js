import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../../services/productService';

const AddProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    group: '',
    price: '',
    sl: '',
    img: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra dữ liệu
    if (!product.name || !product.group || !product.price || !product.img) {
      setError('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    try {
      const newProduct = {
        ...product,
        price: parseInt(product.price),
        sl: parseInt(product.sl),
      };

      await addProduct(newProduct);
      navigate('/products');
    } catch (err) {
      console.error('Lỗi khi thêm sản phẩm:', err);
      setError('Thêm thất bại. Vui lòng thử lại!');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Thêm sản phẩm mới</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Tên sản phẩm"
          value={product.name}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="group"
          placeholder="Nhóm (ao, quan, giay, phukien)"
          value={product.group}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="number"
          name="price"
          placeholder="Giá"
          value={product.price}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="number"
          name="sl"
          placeholder="Số lượng"
          value={product.sl}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="img"
          placeholder="Đường dẫn ảnh (img/xxx.jpg)"
          value={product.img}
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Thêm sản phẩm</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '40px auto',
    backgroundColor: '#fff',
    padding: '25px',
    borderRadius: '10px',
    boxShadow: '0 0 8px rgba(0,0,0,0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '15px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#28a745',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
};

export default AddProduct;
