import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />

        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
