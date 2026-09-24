import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { EduOrbitPage } from './pages/EduOrbitPage';
import { TripticoPage } from './pages/TripticoPage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/eduorbit" element={<EduOrbitPage />} />
      <Route path="/eduorbit-360" element={<EduOrbitPage />} />
      <Route path="/en-1-minuto" element={<TripticoPage />} />
    </Routes>
  );
}

export default App;
