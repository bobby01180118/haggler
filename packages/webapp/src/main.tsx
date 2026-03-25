import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App'
import Landing from './pages/Landing'
import Trade from './pages/Trade'
import Settings from './pages/Settings'
import History from './pages/History'
import Developers from './pages/Developers'
import Dashboard from './pages/Dashboard'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<Landing />} />
          <Route path="demo" element={<Trade />} />
          <Route path="developers" element={<Developers />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="app" element={<Navigate to="/demo" replace />} />
          <Route path="trade" element={<Navigate to="/demo" replace />} />
          <Route path="settings" element={<Settings />} />
          <Route path="history" element={<History />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
