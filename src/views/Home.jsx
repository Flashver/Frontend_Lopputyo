import React from "react";
import { useFetchData } from "../stores/useDataStore";
import studentImage from "../images/student.webp";

const Home = () => {
  useFetchData();

  return (
    <div className="flex flex-col items-center">
      <div className="mx-auto w-full max-w-[1200px] bg-yellow-200 text-black shadow-lg 
                      border-8 border-yellow-900 p-8 flex flex-row items-center justify-center 
                      gap-10 min-h-[500px]">
        
        <div className="relative p-6 border-8 border-yellow-900 bg-yellow-100 flex items-center justify-center shadow-pixel">
          <img
            src={studentImage}
            alt="Student writing"
            className="max-w-[400px] border-4 border-yellow-900 shadow-lg"
          />
        </div>

        <div className="relative flex flex-col items-start w-[750px] p-8 border-8 border-yellow-900 bg-yellow-100 shadow-pixel -mt-7">
          
          <h1 className="text-2xl font-bold font-['Press_Start_2P'] text-yellow-900 tracking-wide mb-7">
            Welcome!!
          </h1>

          <h2 className="text-lg font-semibold mb-4 font-['Press_Start_2P'] text-yellow-900">
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
  );
};

export default Home;








