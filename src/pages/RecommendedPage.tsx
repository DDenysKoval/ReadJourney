import { useEffect, useState } from "react";
import { useAuthStore } from "../libs/store/authStore";
import { useNavigate } from "react-router";
import Header from "../components/Header";
import Dashboard from "../components/Dashboard";
import Filters, { type FilterFormValues } from "../components/Filters";
import Workout from "../components/Workout";
import Recommended from "../components/Recommended";
import { getMe, refreshUser } from "../services/userServices";

export default function RecommendedPage() {
  const [filters, setFilters] = useState<FilterFormValues>({
    title: "",
    author: "",
    totalPages: "",
  });
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();

  const handleSubmit = (values: FilterFormValues) => {
    setFilters(values);
  };

  useEffect(() => {
    console.log(user, isAuthenticated);
    const refresh = async () => {
      await getMe();
      await refreshUser();
    };
    refresh();
    if (!user) {
      navigate("/register");
    }
  }, [user]);
  return (
    <main>
      <Header user={user} />
      <Dashboard>
        <Filters isNumberOfPages={false} onSubmitFilters={handleSubmit} />
        <Workout />
      </Dashboard>
      <Recommended filters={filters} />
    </main>
  );
}
