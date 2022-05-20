
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';
import NavBar from './components/NavBar';




function App() {
  return (
    <div className="App">
          <NavBar />
         
          <Dashboard />


          <Routes>

              {/* <Route path='/' element={<LandingPage />} /> */}
          


          </Routes>
    </div>
  );
}

export default App;