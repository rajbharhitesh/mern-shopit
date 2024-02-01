import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <div className="App">
      <Header />

      <div className="container">
        <HomePage />
      </div>

      <Footer />
    </div>
  );
};

export default App;
