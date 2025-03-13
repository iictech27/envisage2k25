import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import CountdownPage from "./pages/CountdownPage";
import SpeakersPage from "./pages/SpeakersPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <div className="App bg-primary text-white font-futuristic">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="countdown" element={<CountdownPage />} />
            <Route path="speakers" element={<SpeakersPage />} />
          </Route>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
