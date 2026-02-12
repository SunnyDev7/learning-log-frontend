import { Link } from "react-router-dom";

import { StreakDisplay } from "../components/dashboard/StreakDisplay.jsx";

const Index = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Track your learning progress
          </p>
        </div>
        <Link to="/log">Log Activity</Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StreakDisplay />
      </div>
    </div>
  );
};

export default Index;
