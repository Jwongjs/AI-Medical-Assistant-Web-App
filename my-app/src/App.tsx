import React from 'react';
import { Routes, Route } from 'react-router-dom';
import  Homepage  from 'views/homepage';
import DiagnosisFunction from 'views/diagnosis';
import  LoginPage  from 'views/loginpage';
import RegisterPage from 'views/registerpage';
import ProfilePage from 'views/profilepage';
import ConfirmationPending from 'views/confirmationpage';
import ChatbotPage from 'views/chatbot';

function App(): React.JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/diagnosis" element={<DiagnosisFunction />} />
      <Route path="/chatbot" element={<ChatbotPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/confirmation-pending" element={<ConfirmationPending />} />
    </Routes>
  );
}

export default App;