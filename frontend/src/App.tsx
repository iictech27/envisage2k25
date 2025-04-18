import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import CountdownPage from "./pages/CountdownPage";
import SpeakersPage from "./pages/SpeakersPage";
import RegisterPage from "./pages/RegisterPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import TeamPage from "./pages/TeamPage";
import PartnerPage from "./pages/PartnerPage";
import GalleryPage from "./pages/GalleryPage";
import ThemeDemo from "./components/ThemeDemo";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import CreateNewPasswordPage from "./pages/CreateNewPasswordPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AboutPage from "./pages/AboutPage";
import Preloader from "./components/Preloader";
import { useState, useEffect } from "react";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import { ProblemStatement } from "./pages/ProblemStatement/ProblemStatement";
import ProblemDetailsPage from "./pages/ProblemStatement/ProblemDetailsPage";
import ScrollToTop from "./components/ScrollToTop";

// Wrapper component to handle route changes
function AppContent() {
  const [key, setKey] = useState(0);
  const location = useLocation();

  // Reset preloader on location change (navigation)
  useEffect(() => {
    // Increment key to force preloader to re-render
    setKey((prev) => prev + 1);
  }, [location.pathname]);

  return (
    <>
      <Preloader key={key} />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="countdown" element={<CountdownPage />} />
          <Route path="speakers" element={<SpeakersPage />} />
          <Route path="team" element={<TeamPage />} />
          <Route path="partner" element={<PartnerPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="theme-demo" element={<ThemeDemo />} />
        </Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/create-new-password"
          element={<CreateNewPasswordPage />}
        />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route
          path="/iictmsl-envisage2k25-hack-ur-way-problem-statement"
          element={<ProblemStatement />}
        />
        <Route
          path="/iictmsl-envisage2k25-hack-ur-way-problem-details/:problemCode"
          element={<ProblemDetailsPage />}
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <div className="App bg-primary text-white font-futuristic">
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </div>
  );
}

export default App;
