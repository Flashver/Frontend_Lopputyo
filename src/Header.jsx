import { Link } from "react-router-dom";
import { useState } from "react";
import useDataStore from "./stores/useDataStore";
import Alert from "./Alert";
import headerBackground from "/src/images/headeroikea.jpg";


function Header() {
  const courses = useDataStore((state) => state.courses);
  const [showAlert, setShowAlert] = useState(false);

  const handleAddNoteClick = (e) => {
    if (courses.length === 0) {
      e.preventDefault();
      setShowAlert(true);
    }
  };

  return (
    <div
      className="bg-yellow-100 text-yellow-900 py-6 shadow-lg border-b-12 border-yellow-900 flex flex-col items-center w-full relative"
      style={{
        backgroundImage: `url(${headerBackground})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "180px",
        width: "100%",
      }}
    >
      <div className="bg-yellow-200 border-4 border-yellow-900 px-5 py-3 shadow-pixel">
        <h1 className="text-xl font-bold text-yellow-900 text-center font-['Press_Start_2P'] tracking-widest">
          COURSE NOTEAPP
        </h1>
      </div>
      <nav className="flex flex-wrap justify-center gap-2 mt-4 mr-15">
        <Link
          to="/"
          className="font-['Press_Start_2P'] text-[10px] bg-yellow-200 text-yellow-900 px-2 py-2 border-4 border-yellow-900 hover:bg-yellow-300 shadow-pixel"
        >
          Home
        </Link>
        <Link
          to="/courses"
          className="font-['Press_Start_2P'] text-[10px] bg-yellow-200 text-yellow-900 px-2 py-2 border-4 border-yellow-900 hover:bg-yellow-300 shadow-pixel"
        >
          Courses
        </Link>
        <Link
          to="/add-course"
          className="font-['Press_Start_2P'] text-[10px] bg-yellow-200 text-yellow-900 px-2 py-2 border-4 border-yellow-900 hover:bg-yellow-300 shadow-pixel"
        >
          Add Course
        </Link>
        <Link
          to="/add-note"
          onClick={handleAddNoteClick}
          className="font-['Press_Start_2P'] text-[10px] bg-yellow-200 text-yellow-900 px-2 py-2 border-4 border-yellow-900 hover:bg-yellow-300 shadow-pixel"
        >
          Add Note
        </Link>
        <Link
          to="/notes"
          className="font-['Press_Start_2P'] text-[10px] bg-yellow-200 text-yellow-900 px-2 py-2 border-4 border-yellow-900 hover:bg-yellow-300 shadow-pixel"
        >
          Notes List
        </Link>
      </nav>
      {showAlert && <Alert onClose={() => setShowAlert(false)} />}
    </div>
  );
}

export default Header;






