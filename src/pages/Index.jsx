import { Link } from "react-router-dom";

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
    </div>
  );
};

export default Index;
