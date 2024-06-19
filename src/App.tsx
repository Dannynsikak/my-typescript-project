import React from "react";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom"; // Assuming you've already installed Browser-Route
import DataTable from "./components/DataTable"; // Assuming DataTable path
import ViewRow from "./components/ViewRow"; // Assuming ViewRow path

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DataTable />} />
        <Route path="/view-row/:id" element={<ViewRow />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
