
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';
import NavBar from './components/NavBar';
import NewStatement from './components/NewStatement';
import StatementDetails from './components/StatementDetails';
import UserProfile from './components/UserProfile';



function App() {
  return (
    <div className="App">
          <NavBar />
          <Dashboard />

          <Routes>
          <Route path='/' element={<LandingPage />} />
              <Route path='/userprofile' element={<UserProfile />} />
              <Route path='/statements/newStatement' element={<NewStatement />} />
              <Route path='/statements/:id/details' element={<StatementDetails />} />


          </Routes>
    </div>
  );
}

export default App;