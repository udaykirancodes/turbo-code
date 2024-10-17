import React from "react";

import { Route, Routes } from "react-router-dom";
import AdminLayout from "./components/layout";
import AddProblemForm from "./pages/add-problem";
const App = () => {
  return (
    <>
      <React.Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            <Route path="add-problem" element={<AddProblemForm />} />
          </Route>
        </Routes>
      </React.Suspense>
    </>
  );
};

export default App;
