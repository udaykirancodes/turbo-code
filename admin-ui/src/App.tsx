import AdminLayout from "./components/layout";
import AdminProblemListPage from "./pages/problems";

const App = () => {
  return (
    <>
      <AdminLayout>
        <AdminProblemListPage />
      </AdminLayout>
    </>
  );
};

export default App;
