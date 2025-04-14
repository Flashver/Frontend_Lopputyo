import React from "react";
import { useFetchData } from "../stores/useDataStore";
import studentImage from "../images/student.webp";

const Home = () => {
  useFetchData();

  return (
    <div className="flex flex-col items-center font-['Press_Start_2P'] text-yellow-900">
      <div className="flex flex-row items-center gap-10 p-8 max-w-[1200px] bg-yellow-200 border-8 border-yellow-900 shadow-pixel">
        <img
          src={studentImage}
          alt=""
          className="max-w-[450px] p-4 bg-yellow-100 border-8 border-yellow-900 shadow-pixel"
        />

        <div className="flex flex-col p-8 bg-yellow-100 border-8 border-yellow-900 shadow-pixel -mt-4">
          <h1 className="mb-7 text-2xl">Welcome!!</h1>
          <h2 className="mb-4 text-lg">This is an application just for you, dear student.</h2>
          <p className="mt-5 text-sm">
            You can use this during your courses to write notes, helping you remember the things you have learned in class.
          </p>
          <p className="mt-5 text-sm">
            From the nav at the top, you can choose to add courses or notes, and you can also view the courses and notes you have already added.
          </p>
          <p className="mt-5 text-sm">Have fun and learn!</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
