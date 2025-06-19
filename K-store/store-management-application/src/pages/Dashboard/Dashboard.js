import React, { useEffect, useState } from 'react';
import { getProducts } from '../../services/productService';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Tổng số sản phẩm
  const totalProducts = products.length;

  // Tổng số lượng tồn kho (tổng sl)
  const totalQuantity = products.reduce((sum, p) => sum + p.sl, 0);

  // Tổng giá trị tồn kho = sum(sl * price)
  const totalValue = products.reduce((sum, p) => sum + p.sl * p.price, 0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p>Đang tải dữ liệu Dashboard...</p>;
  if (loading) return <p>Đang tải dữ liệu Dashboard...</p>;

  return (
    <div style={styles.container}>
      <h1>Dashboard</h1>
      <div style={styles.widgets}>
        <div style={styles.widgetCard}>
          <h3>Tổng số sản phẩm</h3>
          <p>{totalProducts}</p>
        </div>
        <div style={styles.widgetCard}>
          <h3>Tổng số lượng tồn kho</h3>
          <p>{totalQuantity}</p>
        </div>
        <div style={styles.widgetCard}>
          <h3>Tổng giá trị tồn kho</h3>
          <p>{totalValue.toLocaleString()} VND</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: 20,
  },
  widgets: {
    display: 'flex',
    gap: 20,
    marginTop: 20,
  },
  widgetCard: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    boxShadow: '0 0 5px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
};

export default Dashboard;
