import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import ProductPage from './pages/product/ProductPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProfilePage from './pages/user/ProfilePage';
import UpdateProfilePage from './pages/user/UpdateProfilePage';
import UploadAvatarPage from './pages/user/UploadAvatarPage';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Toaster position="bottom-center" />
        <Header />

        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/me/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/me/update_profile"
              element={
                <ProtectedRoute>
                  <UpdateProfilePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/me/upload_avatar"
              element={
                <ProtectedRoute>
                  <UploadAvatarPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
