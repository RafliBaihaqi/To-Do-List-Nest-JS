import React from "react";
import { Link } from "react-router-dom";

const LandingHero = () => {
  return (
    <div className="h-screen w-full flex flex-col md:flex-row items-center justify-center bg-salute-dark p-4 m-0">
      <div className="w-full max-w-4xl text-center p-6 md:text-left md:flex-1">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
          Welcome to Your Ultimate To-Do List
        </h1>
        <p className="text-white text-lg md:text-xl mb-6 drop-shadow-lg">
          Organize your tasks efficiently and boost your productivity. Created by Rafli Baihaqi as part of the Odin Project's Assignment, this tool is designed to help you stay on top of your game.
        </p>
        <Link className="bg-black text-white rounded-md px-6 py-3 hover:bg-slate-300 transition duration-300 ease-in-out shadow-lg" to="/sign-in">
          Get Started
        </Link>
      </div>
      <div className="w-full md:w-1/2 flex justify-center mt-6 md:mt-0">
        <img
          src="/img/Info4.jpg"
          alt="Productivity illustration"
          className="w-full max-w-md rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default LandingHero;
