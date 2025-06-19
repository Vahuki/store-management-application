import { useEffect, useState } from 'react';
import { getProducts } from '../../services/productService';
import { Link } from 'react-router-dom';
import { deleteProduct } from '../../services/productService';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (err) {
                console.error('Lỗi khi tải sản phẩm:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Bạn có chắc muốn xoá sản phẩm này?');
        if (!confirmDelete) return;

        try {
            await deleteProduct(id);
            setProducts((prev) => prev.filter((p) => p.id !== id));
        } catch (err) {
            console.error('Lỗi khi xoá sản phẩm:', err);
            alert('Xoá thất bại!');
        }
    };


    if (loading) return <p>Đang tải dữ liệu...</p>;

    return (
        <div style={styles.container}>
            {products.map((product) => (
                <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div key={product.id} style={styles.card}>
                        <img src={`${process.env.PUBLIC_URL}/${product.img}`} alt={product.name} style={styles.image} />
                        <h3>{product.name}</h3>
                        <p>Nhóm: {product.group}</p>
                        <p>Giá: {product.price.toLocaleString()} VND</p>
                        <p>Còn lại: {product.sl}</p>
                        <div style={{ marginTop: 10 }}>
                            <button onClick={() => handleDelete(product.id)} style={styles.deleteBtn}>
                                🗑️ Xoá
                            </button>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

const styles = {
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px',
        padding: '20px',
    },
    card: {
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '15px',
        textAlign: 'center',
        boxShadow: '0 0 5px rgba(0,0,0,0.1)',
    },
    image: {
        width: '100%',
        height: '150px',
        objectFit: 'cover',
        borderRadius: '8px',
    },
};

export default ProductList;
