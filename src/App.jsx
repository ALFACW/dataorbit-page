import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { EduOrbitPage } from './pages/EduOrbitPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/eduorbit" element={<EduOrbitPage />} />
      <Route path="/eduorbit-360" element={<EduOrbitPage />} />
    </Routes>
  );
}

export default App;
