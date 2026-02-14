import { useEffect } from "react";
import Header from "../components/Header";
import Dashboard from "../components/Dashboard";
import Filters from "../components/Filters";
import LibraryRecommended from "../components/LibraryRecommended";
import { useNavigate } from "react-router";
import { useAuthStore } from "../libs/store/authStore";
import MyLibrary from "../components/MyLibrary";

export default function MyLibraryPage() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/register");
    }
  });
  return (
    <main>
      <Header user={user} />
      <Dashboard>
        <Filters isNumberOfPages={true} />
        <LibraryRecommended />
      </Dashboard>
      <MyLibrary />
    </main>
  );
}
