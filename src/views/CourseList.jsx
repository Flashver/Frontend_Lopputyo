import useDataStore from "../stores/useDataStore";

function CourseList() {
  const courses = useDataStore((state) => state.courses);

  return (
    <div className="mx-auto w-full max-w-[1200px] bg-yellow-200 text-black shadow-lg border-8 border-yellow-900 p-6">
      <div className="bg-yellow-100 border-8 border-yellow-900 p-2 mx-auto inline-block shadow-pixel">
        <h3 className="text-lg font-bold text-yellow-900 text-center font-['Press_Start_2P'] tracking-wide">
          All Courses
        </h3>
      </div>

      {courses.length === 0 ? (
        <p className="text-center font-['Press_Start_2P'] text-sm italic mt-4 text-yellow-900">
          No Courses
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 mt-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="relative p-4 border-8 border-yellow-900 bg-yellow-100 text-yellow-900 
                        font-['Press_Start_2P'] shadow-pixel"
            >
              <p className="text-sm text-yellow-900">
                {course.name} (ID: {course.id})
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CourseList;




