import { BrowserRouter } from "react-router-dom";

import RegisterPage from "./pages/Register";

function App() {
  return (
    <div>
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    </div>
  );
}

export default App;
