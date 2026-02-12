import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Toaster } from "./components/ui/toaster.jsx";
import { Toaster as Sonner } from "./components/ui/sonner.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ProtectedRoute } from "./components/auth/ProtectedRoute.jsx";
import RegisterPage from "./pages/Register";
import LogInPage from "./pages/Login.jsx";
import Index from "./pages/Index.jsx";

function App() {
  return (
    <div>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LogInPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
