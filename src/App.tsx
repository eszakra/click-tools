import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Hub from './pages/Hub';
import ImageDownscaler from './pages/ImageDownscaler';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#121212] text-white">
        <Routes>
          <Route path="/" element={<Hub />} />
          <Route path="/downscaler" element={<ImageDownscaler />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;