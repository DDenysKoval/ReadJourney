import { useEffect } from "react";
import { useAuthStore } from "../libs/store/authStore";
import { useNavigate } from "react-router";
import Header from "../components/Header";
import Dashboard from "../components/Dashboard";
import Filters from "../components/Filters";
import Workout from "../components/Workout";

export default function RecommendedPage() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/register");
    }
  }, [isAuthenticated, navigate]);
  return (
    <main>
      <Header user={user} />
      <Dashboard>
        <Filters />
        <Workout />
      </Dashboard>
    </main>
  );
}
