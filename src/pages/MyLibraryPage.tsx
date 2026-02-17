import { useEffect, useState } from "react";
import Header from "../components/Header";
import Dashboard from "../components/Dashboard";
import Filters, { type FilterFormValues } from "../components/Filters";
import LibraryRecommended from "../components/LibraryRecommended";
import { useNavigate } from "react-router";
import { useAuthStore } from "../libs/store/authStore";
import MyLibrary from "../components/MyLibrary";

export default function MyLibraryPage() {
  const [bookToCreate, setBookToCreate] = useState<FilterFormValues | null>(
    null
  );

  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();

  const handleSubmit = (values: FilterFormValues) => {
    setBookToCreate(values);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/register");
    }
  });
  return (
    <main>
      <Header user={user} />
      <Dashboard>
        <Filters isNumberOfPages={true} onSubmitFilters={handleSubmit} />
        <LibraryRecommended />
      </Dashboard>
      <MyLibrary bookToCreate={bookToCreate} />
    </main>
  );
}
