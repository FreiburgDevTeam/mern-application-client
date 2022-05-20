
import { Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import NavBar from './components/NavBar';




function App() {
  return (
    <div className="App">
          <NavBar />
         
          <LandingPage />


          <Routes>

              {/* <Route path='/' element={<LandingPage />} /> */}
          


          </Routes>
    </div>
  );
}

export default App;
