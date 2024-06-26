import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ThreadPage from './pages/ThreadPage';
import ThreadDetail from './components/ThreadDetail';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateThreadPage from './pages/CreateThreadPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/threads" element={<ThreadPage />} />
        <Route path="/threads/:id" element={<ThreadDetail />} />
        <Route path="/create-thread" element={<CreateThreadPage />} />
      </Routes>
    </div>
  );
}

export default App;
