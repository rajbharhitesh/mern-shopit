import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import useUserRoutes from './components/routes/userRoutes';
import useAdminRoutes from './components/routes/adminRoutes';
import './App.css';

const App = () => {
  const userRoutes = useUserRoutes();
  const adminRoutes = useAdminRoutes();

  return (
    <Router>
      <div className="App">
        <Toaster position="bottom-center" />
        <Header />

        <div className="container">
          <Routes>
            {userRoutes}
            {adminRoutes}
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
