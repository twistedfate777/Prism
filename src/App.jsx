import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import DashboardLayout from './components/DashboardLayout'

import LandingPage from './pages/LandingPage'
import SignUpPage from './pages/SignUpPage'
import NewUserHome from './pages/NewUserHome'
import DashboardPage from './pages/DashboardPage'
import ContentIntakePage from './pages/ContentIntakePage'
import ContextSelectionPage from './pages/ContextSelectionPage'
import PreCheckConfirmPage from './pages/PreCheckConfirmPage'
import ResultsPage from './pages/ResultsPage'
import BeforeYouSharePage from './pages/BeforeYouSharePage'
import ProfilePage from './pages/ProfilePage'
import FeedSimulatorPage from './pages/FeedSimulatorPage'
import CheckDetailPage from './pages/CheckDetailPage'
import PlatformPage from './pages/PlatformPage'
import PrinciplesPage from './pages/PrinciplesPage'
import TrustPage from './pages/TrustPage'
import { useScan } from './context/useScan'

function ProfileRoute() {
  const { user } = useScan()
  return user ? <DashboardLayout><ProfilePage /></DashboardLayout> : <Navigate to="/signup" replace />
}

function DetailRoute() {
  const { user } = useScan()
  return user ? <DashboardLayout><CheckDetailPage /></DashboardLayout> : <Navigate to="/signup" replace />
}

export default function App() {
  return (
    <Routes>
      {/* Public pages with standard Navbar + Footer layout */}
      <Route path="/" element={<Layout><LandingPage /></Layout>} />
      <Route path="/home" element={<Layout><NewUserHome /></Layout>} />
      <Route path="/check" element={<Layout><ContentIntakePage /></Layout>} />
      <Route path="/platform" element={<Layout><PlatformPage /></Layout>} />
      <Route path="/principles" element={<Layout><PrinciplesPage /></Layout>} />
      <Route path="/trust" element={<Layout><TrustPage /></Layout>} />

      {/* Standalone pages (own layout) */}
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/check/context" element={<ContextSelectionPage />} />
      <Route path="/check/confirm" element={<PreCheckConfirmPage />} />
      <Route path="/check/results/:context" element={<ResultsPage />} />
      <Route path="/check/results/before-share" element={<BeforeYouSharePage />} />

      {/* Dashboard pages with SideNav layout */}
      <Route path="/dashboard" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
      <Route path="/profile" element={<ProfileRoute />} />
      <Route path="/profile/detail" element={<DetailRoute />} />
      <Route path="/practice" element={<DashboardLayout><FeedSimulatorPage /></DashboardLayout>} />
    </Routes>
  )
}
