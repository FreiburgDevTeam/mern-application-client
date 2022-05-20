
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import NavBar from './components/NavBar';
import NewStatement from './components/NewStatement';
import SignupPage from './components/SignupPage';
import StatementDetails from './components/StatementDetails';
import UserProfile from './components/UserProfile';

function App() {

  // const { isLoggedIn } = useContext(AuthContext);


  return (
    <div className="App">

      {/* {isLoggedIn && <NavBar />} */}
         <NavBar />
      <Routes>
          {/* {!isLoggedIn && */}
          <>
          <Route path="/signup" element={ <SignupPage /> } />
          <Route path="/login" element={ <LoginPage /> } />
          </>
          {/* } */}
          

          <Route path='/' element={<LandingPage />} />
          <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/userprofile' element={<UserProfile />} />
              <Route path='/statements/newStatement' element={<NewStatement />} />
              <Route path='/statements/:id/details' element={<StatementDetails />} />


          </Routes>
    </div>
  );
}

export default App;