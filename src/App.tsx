import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ComponentDemo from './pages/ComponentDemo';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ComponentDemo />} />
      </Routes>
    </div>
  );
}

export default App;
