import React from "react";
import { useFetchData } from "../stores/useDataStore";
import studentImage from "../images/student.webp";

const Home = () => {
  useFetchData();

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-[1200px] bg-yellow-200 border-8 border-yellow-900 p-8 shadow-pixel">
        <div className="flex flex-row items-center gap-10">
          <img
            src={studentImage}
            alt=""
            className="max-w-[450px] shadow-pixel border-8 border-yellow-900 bg-yellow-100 p-4"
          />

          <div className="flex flex-col shadow-pixel p-8 border-8 border-yellow-900 bg-yellow-100 -mt-4">
            <h1 className="text-2xl font-['Press_Start_2P'] text-yellow-900 mb-7">
              Welcome!!
            </h1>

            <h2 className="text-lg font-['Press_Start_2P'] text-yellow-900 mb-4">
              This is an application just for you, dear student.
            </h2>

            <p className="text-sm font-['Press_Start_2P'] text-yellow-900 mt-5">
              You can use this during your courses to write notes, helping you
              remember the things you have learned in class.
            </p>

            <p className="text-sm font-['Press_Start_2P'] text-yellow-900 mt-5">
              From the nav at the top, you can choose to add courses or notes, and
              you can also view the courses and notes you have already added.
            </p>

            <p className="text-sm font-['Press_Start_2P'] text-yellow-900 mt-5">
              Have fun and learn!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

