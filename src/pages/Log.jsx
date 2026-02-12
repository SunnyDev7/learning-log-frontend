import { useNavigate } from "react-router-dom";

import { LogForm } from "../components/log/LogForm.jsx";

export default function LogPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto py-8">
      <LogForm onActivityLogged={() => navigate("/")} />
    </div>
  );
}
