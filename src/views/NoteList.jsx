import useDataStore from "../stores/useDataStore";
import { useState } from "react";

function NoteList() {
  const notes = useDataStore((state) => state.notes);
  const courses = useDataStore((state) => state.courses);
  const deleteNote = useDataStore((state) => state.deleteNote);
  const [selectedCourse, setSelectedCourse] = useState("all");

  const filteredNotes =
    selectedCourse === "all"
      ? notes.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      : notes
          .filter((note) => note.course.id.toString() === selectedCourse)
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <div className="mx-auto max-w-[1200px] p-6 bg-yellow-200 border-8 border-yellow-900 font-['Press_Start_2P'] text-yellow-900">
      <div className="inline-block p-2 bg-yellow-100 border-8 border-yellow-900 shadow-pixel">
        <h3 className="text-lg font-bold text-center">Notes</h3>
      </div>

      <div className="flex flex-col items-start w-full mt-4">
        <select
          onChange={(e) => setSelectedCourse(e.target.value)}
          value={selectedCourse}
          className="my-4 p-2 text-sm bg-yellow-100 border-8 border-yellow-900 hover:bg-yellow-300 shadow-lg"
        >
          <option value="all">All Courses</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>

        {filteredNotes.length === 0 ? (
          <p className="italic">No notes!</p>
        ) : (
          <div className="flex flex-col w-full gap-6 mt-4">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className="relative w-full p-4 break-words bg-yellow-100 border-8 border-yellow-900 rounded-lg shadow-pixel"
              >
                <button
                  onClick={() => deleteNote(note.id)}
                  className="absolute top-1 right-2 flex items-center justify-center w-6 h-6 text-sm text-white bg-red-500 border-4 border-yellow-900 rounded-md hover:bg-red-600 shadow-pixel"
                >
                  x
                </button>
                <p className="text-xs font-bold">
                  {new Date(note.timestamp).toLocaleString("fi-FI")} <br />
                  {note.course.name} (ID: {note.course.id})
                </p>
                <p className="mt-2 break-words">{note.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default NoteList;
