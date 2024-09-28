import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cadastro from './pages/cadastro/Cadastro';
import Login from './pages/login/Login';
import Main from './pages/main/Main';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/cadastrar" element={<Cadastro />} />
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
