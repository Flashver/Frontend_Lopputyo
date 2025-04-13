import { useState } from "react";
import useDataStore from "../stores/useDataStore";
import CourseImage from "/src/images/courseslist.png";

function CourseInput() {
  const [courseName, setCourseName] = useState("");
  const [addedCourses, setAddedCourses] = useState([]);
  const addCourse = useDataStore((state) => state.addCourse);

  const handleAdd = () => {
    if (!courseName.trim()) return;
    const id = Math.floor(Math.random() * 1000);
    const course = { id, name: courseName };
    addCourse(course);
    setAddedCourses([...addedCourses, course]);
    setCourseName("");
  };

  return (
    <div className="flex flex-col items-center font-['Press_Start_2P']">
      <div className="max-w-[1200px] flex flex-row p-8 bg-yellow-200 border-8 border-yellow-900">
        <div className="flex flex-row items-start gap-10">
          <div className="p-6 bg-yellow-100 border-8 border-yellow-900 shadow-pixel">
            <img
              src={CourseImage}
              alt=""
              className="max-w-[400px]"
            />
          </div>

          <div className="flex flex-col w-[600px] p-8 bg-yellow-100 border-8 border-yellow-900 text-yellow-900 shadow-pixel">
            <h2 className="text-lg font-semibold mb-4">Add new course</h2>

            <input
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="Course name"
              className="w-full p-4 my-4 bg-yellow-100 border-4 border-yellow-900 text-sm hover:bg-yellow-300"
            />

            <button
              onClick={handleAdd}
              disabled={!courseName.trim()}
              className="py-3 bg-blue-500 text-white border-4 border-yellow-900 text-sm hover:bg-blue-600 disabled:bg-gray-400"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {addedCourses.length > 0 && (
        <div className="mt-8 w-full max-w-[1200px] p-6 bg-yellow-100 border-8 border-yellow-900">
          <h3 className="text-lg font-bold text-yellow-900">Added courses</h3>
          <ul className="mt-4 space-y-4">
            {addedCourses.map(({ id, name }) => (
              <li key={id} className="p-3 bg-yellow-200 border-4 border-yellow-900 text-yellow-900 break-words">
                Course: '{name}' added by (ID: {id})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CourseInput;





