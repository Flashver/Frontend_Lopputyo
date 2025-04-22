import { useState } from "react";
import useDataStore from "../stores/useDataStore";
import CourseImage from "/src/images/courseslist.png";

function CourseInput() {
  const [courseName, setCourseName] = useState("");
  const [addedCourses, setAddedCourses] = useState([]);
  const addCourse = useDataStore((state) => state.addCourse);

  const handleAdd = () => {
    if (!courseName.trim()) return;
    const id = [...useDataStore.getState().courses, ...addedCourses].reduce((max, c) => (c.id > max ? c.id : max),0) + 1;
    const timestamp = Date.now();
    const course = { id, name: courseName, timestamp };
    addCourse(course);
    setAddedCourses([...addedCourses, course]);
    setCourseName("");
  };

  return (
    <div className="flex flex-col items-center font-['Press_Start_2P'] text-yellow-900">
      <div className="flex flex-row items-start gap-10 p-8 max-w-[1200px] bg-yellow-200 border-8 border-yellow-900">
        <div className="p-6 bg-yellow-100 border-8 border-yellow-900 shadow-pixel">
          <img src={CourseImage} alt="" className="max-w-[400px]" />
        </div>

        <div className="flex flex-col w-[600px] p-8 bg-yellow-100 border-8 border-yellow-900 shadow-pixel">
          <h2 className="mb-4 text-lg font-semibold">Add new course</h2>
          <input
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="Course name"
            className="w-full p-4 my-4 text-sm bg-yellow-100 border-4 border-yellow-900 hover:bg-yellow-300"
          />
          <button
            onClick={handleAdd}
            disabled={!courseName.trim()}
            className="py-3 text-sm text-white bg-blue-500 border-4 border-yellow-900 hover:bg-blue-600 disabled:bg-gray-400"
          >
            Add
          </button>
        </div>
      </div>

      {addedCourses.length > 0 && (
        <div className="w-full max-w-[1185px] p-6 mt-8 bg-yellow-100 border-8 border-yellow-900">
          <h3 className="text-lg font-bold">Added courses</h3>
          <ul className="mt-4 space-y-4">
            {addedCourses
              .sort((a, b) => b.timestamp - a.timestamp)
              .map(({ id, name }) => (
                <li
                  key={id}
                  className="p-3 break-words bg-yellow-200 border-4 border-yellow-900"
                >
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
