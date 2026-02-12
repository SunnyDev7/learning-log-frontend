import { Toaster } from "./components/ui/toaster.jsx";
import { Toaster as Sonner } from "./components/ui/sonner.jsx";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext.jsx";
import RegisterPage from "./pages/Register";

function App() {
  return (
    <div>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <RegisterPage />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
