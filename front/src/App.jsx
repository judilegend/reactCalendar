import React from "react";
import Header from "./components/Header";
import { Hero } from "./components/Hero";
function App() {
  return (
    <div className="w-full h-screen flex flex-col relative">
      <Header />
      <Hero />
    </div>
  );
}

export default App;
