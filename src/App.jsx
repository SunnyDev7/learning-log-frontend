import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "next-themes";

import { Toaster } from "./components/ui/toaster.jsx";
import { Toaster as Sonner } from "./components/ui/sonner.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { PomodoroProvider } from "./context/PomodoroContext.jsx";
import { TooltipProvider } from "./components/ui/tooltip.jsx";
import { ProtectedRoute } from "./components/auth/ProtectedRoute.jsx";
import { AppLayout } from "./components/layout/AppLayout.jsx";
import RegisterPage from "./pages/Register";
import LogInPage from "./pages/Login.jsx";
import ForgotPasswordPage from "./pages/ForgotPassword.jsx";
import ResetPasswordPage from "./pages/ResetPassword.jsx";
import Index from "./pages/Index.jsx";
import LogPage from "./pages/Log.jsx";
import PomodoroPage from "./pages/Pomodoro.jsx";
import HistoryPage from "./pages/History.jsx";
import SettingsPage from "./pages/Settings.jsx";
import NotFound from "./pages/NotFound.jsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <AuthProvider>
          <PomodoroProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<LogInPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
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
                <Route
                  path="/pomodoro"
                  element={
                    <ProtectedRoute>
                      <AppLayout>
                        <PomodoroPage />
                      </AppLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/history"
                  element={
                    <ProtectedRoute>
                      <AppLayout>
                        <HistoryPage />
                      </AppLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <AppLayout>
                        <SettingsPage />
                      </AppLayout>
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
          </PomodoroProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
