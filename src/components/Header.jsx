import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="flex w-full  justify-between items-center px-4 py-2 max-w-[900px] mx-auto">
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Logo
      </h1>
      <button
        className="bg-blue-600 text-white py-1 px-4 rounded"
        onClick={() => console.log("Tanlanganlar Drawer")}
      >
        Tanlanganlar
      </button>
    </header>
  );
};

export default Header;
