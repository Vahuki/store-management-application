import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, updateProduct } from '../../services/productService';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error('Lỗi khi tải chi tiết sản phẩm:', err);
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id, navigate]);

  const handleIncrease = async () => {
    const newProduct = { ...product, sl: product.sl + 1 };
    await updateProduct(product.id, newProduct);
    setProduct(newProduct);
  };

  const handleDecrease = async () => {
    if (product.sl <= 0) return;
    const newProduct = { ...product, sl: product.sl - 1 };
    await updateProduct(product.id, newProduct);
    setProduct(newProduct);
  };

  if (loading) return <p>Đang tải sản phẩm...</p>;
  if (!product) return <p>Không tìm thấy sản phẩm.</p>;

  return (
    <div style={styles.container}>
      <img src={`${process.env.PUBLIC_URL}/${product.img}`} alt={product.name} style={styles.image} />
      <div style={styles.info}>
        <h2>{product.name}</h2>
        <p><strong>Nhóm:</strong> {product.group}</p>
        <p><strong>Giá:</strong> {product.price.toLocaleString()} VND</p>
        <p>
          <strong>Số lượng:</strong> {product.sl}
          <button onClick={handleIncrease} style={styles.adjustBtn}>+</button>
          <button onClick={handleDecrease} style={styles.adjustBtn}>−</button>
        </p>
        <button style={styles.backBtn} onClick={() => navigate(-1)}>Quay lại</button>
      </div>
      
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    gap: '30px',
    padding: '20px',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  image: {
    width: '300px',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '10px',
  },
  info: {
    flex: 1,
    fontSize: '16px',
  },
  adjustBtn: {
    marginLeft: '10px',
    padding: '2px 10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#f1f1f1',
    cursor: 'pointer',
  },
  backBtn: {
    marginTop: '20px',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default ProductDetail;
