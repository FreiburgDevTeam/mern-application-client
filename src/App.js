import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import EditStatement from './components/EditStatement';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import NewStatement from './components/NewStatement';
import SignupPage from './components/SignupPage';
import StatementDetails from './components/StatementDetails';
import UserProfile from './components/UserProfile';
import { AuthContext } from './context/auth.context';

function App() {

  const { isLoggedIn, user } = useContext(AuthContext); 

  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/' element={isLoggedIn ? <Dashboard /> : <LandingPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/userprofile' element={<UserProfile  user={user}/>} />
        <Route path='/statements/create' element={<NewStatement />} />
        <Route path='/statements/:id/edit' element={<EditStatement />} />
        <Route path='/statements/:id/details' element={<StatementDetails />} />
      </Routes>
    </div>
  );
}

export default App;