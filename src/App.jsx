import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Goals from "./pages/goals";
import Analytics from "./pages/analytics";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <>
            <Navbar />
            <Dashboard />
          </>
        }
      />

      <Route
        path="/goals"
        element={
          <>
            <Navbar />
            <Goals />
          </>
        }
      />

      <Route
        path="/analytics"
        element={
          <>
            <Navbar />
            <Analytics />
          </>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

