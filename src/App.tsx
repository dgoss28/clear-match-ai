import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Candidates } from './pages/Candidates';
import { Templates } from './pages/Templates';
import { Settings } from './pages/Settings';
import { Auth } from './pages/Auth';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="candidates" element={<Candidates />} />
          <Route path="templates" element={<Templates />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;