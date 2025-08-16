import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Login from './components/Auth/LoginForm';
import Signup from './components/Auth/SignupForm';
import HomeLayout from './HomeLayout';
import Admin from './components/Home/Admin/Admin';
import Chatbot from './components/Home/Chatbot/Chatbot';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<HomeLayout><Admin /></HomeLayout>} />
        <Route path="/home/chatbot" element={<HomeLayout><Chatbot /></HomeLayout>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
