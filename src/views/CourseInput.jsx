import { useState } from "react";
import useDataStore from "../stores/useDataStore";
import CourseImage from "/src/images/courseslist.png";

function CourseInput() {
  const [courseName, setCourseName] = useState("");
  const [addedCourses, setAddedCourses] = useState([]);
  const addCourse = useDataStore((state) => state.addCourse);

  const handleAdd = () => {
    if (!courseName.trim()) return;
    const newCourseId = Math.floor(Math.random() * 1000);
    addCourse({ id: newCourseId, name: courseName });
    setAddedCourses([...addedCourses, { id: newCourseId, name: courseName }]);
    setCourseName("");
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mx-auto w-full max-w-[1200px] bg-yellow-200 text-black shadow-lg border-8 border-yellow-900 p-8 flex flex-row items-center justify-center gap-10 min-h-[500px]">
        <div className="relative p-6 border-8 border-yellow-900 bg-yellow-100 flex items-center justify-center shadow-pixel">
          <img 
            src={CourseImage}  
            alt="student adding a course"
            className="max-w-[400px] border-4 border-yellow-900 shadow-lg"
          />
        </div>

        <div className="flex flex-col items-start w-[600px] p-8 border-8 border-yellow-900 bg-yellow-100 shadow-pixel -mt-50">
          <h2 className="text-lg font-semibold mb-4 font-['Press_Start_2P'] text-yellow-900">
            Add new course
          </h2>

          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="w-full p-4 border-4 border-yellow-900 font-['Press_Start_2P'] text-sm bg-yellow-100 
              text-yellow-900 hover:bg-yellow-300 transition-all my-4 shadow-lg"
            placeholder="Course name"
          />

          <button
            onClick={handleAdd}
            disabled={!courseName.trim()}
            className="w-full px-6 py-3 bg-blue-500 text-white border-4 border-yellow-900 font-['Press_Start_2P'] 
              text-sm hover:bg-blue-600 transition-all disabled:bg-gray-400 shadow-lg"
          >
            Add
          </button>
        </div>
      </div>

      {addedCourses.length > 0 && (
        <div className="mt-8 bg-yellow-100 border-8 border-yellow-900 p-6 w-full max-w-[1200px] flex flex-col shadow-pixel">
          <h3 className="text-lg font-bold text-yellow-900 font-['Press_Start_2P']">
            Added courses
          </h3>
          <ul className="mt-4 w-full space-y-4">
            {addedCourses.map((course) => (
              <li
                key={course.id}
                className="p-3 bg-yellow-200 border-4 border-yellow-900 font-['Press_Start_2P'] break-words shadow-pixel"
              >
                Course: '{course.name}' added by (ID: {course.id})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CourseInput;



