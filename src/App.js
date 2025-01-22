import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Movie from "./components/Movie";

function App() {
  return (
    <Routes>
      {/* Define a rota para a Home */}
      <Route path="/" element={<Home />} />
      {/* Define a rota para o Movie */}
      <Route path="/movie/:id" element={<Movie />} />
    </Routes>
  );
}

export default App;