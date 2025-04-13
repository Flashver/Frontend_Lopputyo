import useDataStore from "../stores/useDataStore";
import { useState } from "react";
import NoteImage from "../images/addnote.webp";

function NoteInput() {
  const courses = useDataStore((state) => state.courses);
  const [text, setText] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [notes, setNotes] = useState([]);
  const [locked, setLocked] = useState(false);
  const addNote = useDataStore((state) => state.addNote);

  const handleAdd = () => {
    if (!text.trim() || !selectedCourse) return;
    addNote({ text, course: +selectedCourse });
    setNotes([...notes, { text, course: selectedCourse }]);
    setText("");
    setLocked(true);
  };

  const handleEndSession = () => {
    setSelectedCourse("");
    setText("");
    setNotes([]);
    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center font-pixel text-yellow-900">
      <div className="flex flex-row items-center justify-center gap-10 min-h-[500px] w-full max-w-[1200px] p-8 bg-yellow-200 border-8 border-yellow-900 shadow-lg">
        
        <div className="relative p-6 border-8 border-yellow-900 bg-yellow-100 shadow-pixel">
          <img
            src={NoteImage}
            alt=""
            className="max-w-[400px] border-4 border-yellow-900 shadow-lg"
          />
        </div>

        <div className="relative flex flex-col items-start justify-between w-[750px] p-8 border-8 border-yellow-900 bg-yellow-100 shadow-pixel -mt-3">
          <h2 className="text-lg font-semibold mb-4">Add new note</h2>

          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            disabled={locked}
            className="w-full p-4 border-4 border-yellow-900 text-sm bg-yellow-100 hover:bg-yellow-300 transition disabled:opacity-50"
          >
            <option value="">-- Choose course --</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a note..."
            disabled={!selectedCourse}
            className="w-full h-[200px] p-4 border-4 border-yellow-900 text-sm bg-yellow-100 hover:bg-yellow-300 disabled:opacity-50"
          ></textarea>

          <div className="flex gap-6 mt-4">
            <button
              onClick={handleAdd}
              disabled={!text.trim() || !selectedCourse}
              className="px-6 py-3 bg-blue-500 text-white border-4 border-yellow-900 text-sm hover:bg-blue-600 disabled:bg-gray-400"
            >
              Add note
            </button>

            <button
              onClick={handleEndSession}
              disabled={!locked}
              className="px-14 py-3 bg-red-500 text-white border-4 border-yellow-900 text-sm hover:bg-red-600 disabled:bg-gray-400"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {notes.length > 0 && (
        <div className="mt-8 p-6 w-full max-w-[1200px] bg-yellow-100 border-8 border-yellow-900 shadow-pixel flex flex-col">
          <div className="-m-2 border-8 border-yellow-900 -z-10 shadow-pixel"></div>

          <h3 className="text-lg font-bold">Added Notes</h3>
          <ul className="mt-4 space-y-4">
            {notes.map((note, index) => (
              <li
                key={index}
                className="p-3 bg-yellow-200 border-4 border-yellow-900 break-words"
              >
                {note.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default NoteInput;




















