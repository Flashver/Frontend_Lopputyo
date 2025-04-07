import useDataStore from "../stores/useDataStore";
import { useState } from "react";

function NoteList() {
  const notes = useDataStore((state) => state.notes);
  const courses = useDataStore((state) => state.courses);
  const deleteNote = useDataStore((state) => state.deleteNote);
  const [selectedCourse, setSelectedCourse] = useState("all");

  const filteredNotes =
    selectedCourse === "all"
      ? notes
      : notes.filter(
          (note) => note.courseid.toString() === selectedCourse
        );

  return (
    <div className="mx-auto w-full max-w-[1200px] bg-yellow-200 text-black shadow-lg border-8 border-yellow-900 p-6">
      <div className="bg-yellow-100 border-8 border-yellow-900 p-2 mx-auto inline-block bg-clip-padding shadow-pixel [image-rendering:pixelated]">
        <h3 className="text-lg font-bold text-yellow-900 text-center font-['Press_Start_2P'] tracking-wide">
          Notes
        </h3>
      </div>

      <div className="flex flex-col items-start mt-4 w-full">
        <select
          onChange={(e) => setSelectedCourse(e.target.value)}
          value={selectedCourse}
          className="w-auto max-w-xs p-2 border-8 border-yellow-900 font-['Press_Start_2P'] text-sm bg-yellow-100 text-yellow-900 hover:bg-yellow-300 transition-all my-4 shadow-lg"
        >
          <option value="all">All Courses</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>

        {filteredNotes.length === 0 ? (
          <p className="text-yellow-900 italic font-['Press_Start_2P']">No notes!</p>
        ) : (
          <div className="flex flex-col gap-6 items-center w-full mt-4">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className="relative p-4 border-8 border-yellow-900 rounded-lg bg-yellow-100 w-full break-words shadow-pixel"
              >
                <button
                  onClick={() => deleteNote(note.id)}
                  className="absolute top-1 right-2 w-6 h-6 bg-red-500 text-white border-4 border-yellow-900 rounded-md hover:bg-red-600 flex items-center justify-center text-sm font-['Press_Start_2P'] shadow-pixel"
                >
                  x
                </button>
                <p className="text-xs font-bold font-['Press_Start_2P'] text-yellow-900">
                  {new Date(note.timestamp).toLocaleString("fi-FI")} <br /> {note.courseName} (ID: {note.courseid})
                </p>
                <p className="mt-2 font-['Press_Start_2P'] text-yellow-900 break-words">
                  {note.noteText}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default NoteList;

















