import React from "react";

import { Route, Routes } from "react-router-dom";
import AdminLayout from "./components/layout";
import AddProblemForm from "./pages/add-problem";
import AdminProblemListPage from "./pages/problems";
const App = () => {
  return (
    <>
      <React.Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            <Route path="add-problem" element={<AddProblemForm />} />
            <Route path="" index element={<AdminProblemListPage />} />
          </Route>
        </Routes>
      </React.Suspense>
    </>
  );
};

export default App;
