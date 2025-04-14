import useDataStore from "../stores/useDataStore";

function CourseList() {
  const courses = useDataStore((state) => state.courses);

  return (
    <div className="mx-auto max-w-[1200px] p-6 bg-yellow-200 border-8 border-yellow-900 font-['Press_Start_2P'] text-yellow-900">
      <div className="inline-block p-2 bg-yellow-100 border-8 border-yellow-900 shadow-pixel">
        <h3 className="text-lg font-bold">All Courses</h3>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        {courses.map((course) => (
          <div key={course.id} className="p-4 bg-yellow-100 border-8 border-yellow-900 shadow-pixel">
            <p className="text-sm">{course.name} (ID: {course.id})</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseList;
