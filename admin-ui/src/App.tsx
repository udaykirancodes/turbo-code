import AdminLayout from "./components/layout";
import AddProblemForm from "./pages/AddProblem";

const App = () => {
  return (
    <>
      <AdminLayout>
        <AddProblemForm />
      </AdminLayout>
    </>
  );
};

export default App;
