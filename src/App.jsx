import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "next-themes";

import { Toaster } from "./components/ui/toaster.jsx";
import { Toaster as Sonner } from "./components/ui/sonner.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ProtectedRoute } from "./components/auth/ProtectedRoute.jsx";
import { AppLayout } from "./components/layout/AppLayout.jsx";
import RegisterPage from "./pages/Register";
import LogInPage from "./pages/Login.jsx";
import Index from "./pages/Index.jsx";
import LogPage from "./pages/Log.jsx";

function App() {
  return (
    <div>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
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
                    <AppLayout>
                      <Index />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/log"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <LogPage />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
