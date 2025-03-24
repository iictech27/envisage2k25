import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import ProfilePage from "./pages/ProfilePage";
import ThemeDemo from "./components/ThemeDemo";

function App() {
  return (
    <div className="App bg-primary text-white font-futuristic">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}/>
            <Route index element={<HomePage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="countdown" element={<CountdownPage />} />
            <Route path="speakers" element={<SpeakersPage />} />
            <Route path="team" element={<TeamPage />} />
            <Route path="partner" element={<PartnerPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="theme-demo" element={<ThemeDemo />} />
            <Route path="/profile-page" element={<ProfilePage/>}/>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
