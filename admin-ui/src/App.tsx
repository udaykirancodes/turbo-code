import AdminLayout from "./components/layout";
import AddProblemForm from "./pages/add-problem";

const App = () => {
  return (
    <>
      <AdminLayout>
        {/* <AdminProblemListPage /> */}
        <AddProblemForm />
      </AdminLayout>
    </>
  );
};

export default App;
