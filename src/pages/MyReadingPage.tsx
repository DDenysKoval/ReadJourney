import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuthStore } from "../libs/store/authStore";
import { refreshUser } from "../services/userServices";
import Header from "../components/Header";
import Dashboard from "../components/Dashboard";
import StartReading, {
  type StartReadingFormValues,
} from "../components/StartReading";
import Progress from "../components/Progress";
import MyReading from "../components/MyReading";

export default function MyReadingPage() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();
  const book = location.state?.book;

  const handleSubmit = (values: StartReadingFormValues) => {};
  useEffect(() => {
    console.log(user, isAuthenticated);

    refreshUser();
    if (!user) {
      navigate("/register");
    }
  }, [user]);
  return (
    <main>
      <Header user={user} />
      <Dashboard>
        <StartReading onSubmitFilters={handleSubmit} />
        <Progress />
      </Dashboard>
      <MyReading book={book} />
    </main>
  );
}
