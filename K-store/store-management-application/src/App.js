// import { Routes, Route } from 'react-router-dom';
// import ProductList from './pages/Products/ProductList';
// import ProductDetail from './pages/Products/ProductDetail';
// import Dashboard from './pages/Dashboard/Dashboard';
// import Layout from './components/Layout';
// import Login from './pages/Login/Login';

// function App() {
//   return (
//     // <Routes>
//     //   <Route path='/' element={<Dashboard/>}/>
//     //   <Route path="/products" element={<ProductList />} />
//     //   <Route path="/products/:id" element={<ProductDetail />} />
//     //   <Route path="*" element={<h1>Page Not Found</h1>} />
//     // </Routes>
//     <Routes>
//       <Route path="/" element={<Layout />}>
//         <Route path='/login' element={<Login />} />
//         <Route path='/dashboard' element={<Dashboard />} />
//         <Route path="/products" element={<ProductList />} />
//         <Route path="/products/:id" element={<ProductDetail />} />
//         <Route path="*" element={<h1>Page Not Found</h1>} />
//         {/* Các route khác */}
//       </Route>
//     </Routes>
//   );
// }

// export default App;
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import ProductList from './pages/Products/ProductList';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login/Login';
import ProductDetail from './pages/Products/ProductDetail';
import AddProduct from './pages/Products/AddProduct';

function App() {
  return (
    <Routes>
      {/* Trang mặc định là Login */}
      <Route path="/login" element={<Login />} />

      {/* Bảo vệ các route bên trong Layout */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="products/add" element={<AddProduct />} />
        </Route>
      </Route>

      {/* Nếu nhập sai đường dẫn, chuyển về Login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
