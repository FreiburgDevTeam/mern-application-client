import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import EditStatement from './components/EditStatement';
import IsPrivate from './components/IsPrivat';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import NewStatement from './components/NewStatement';
import SignupPage from './components/SignupPage';
import StatementList from './components/StatementList';
import UserProfile from './components/UserProfile';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/' element={<LandingPage />} />
        <Route path='/dashboard' element={<IsPrivate><Dashboard /></IsPrivate>} />
        <Route path='/statements' element={<IsPrivate><StatementList /></IsPrivate>} />
        <Route path='/userprofile' element={<IsPrivate><UserProfile /></IsPrivate>} />
        <Route path='/statements/create' element={<IsPrivate><NewStatement /></IsPrivate>} />
        <Route path='/statements/:statementId/edit' element={<IsPrivate><EditStatement /></IsPrivate>} />
      </Routes>
    </div>
  );
}

export default App;
