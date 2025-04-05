import useDataStore from "../stores/useDataStore";
import { useState } from "react";
import NoteImage from "../images/addnote.webp";

function NoteInput() {
  const courses = useDataStore((state) => state.courses);
  const [noteText, setNoteText] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [notes, setNotes] = useState([]);
  const [locked, setLocked] = useState(false);
  const addNote = useDataStore((state) => state.addNote);

  const handleAdd = () => {
    if (!noteText.trim() || !selectedCourse) return;
    addNote({ noteText, courseid: +selectedCourse });
    setNotes([...notes, { text: noteText, course: selectedCourse }]);
    setNoteText("");
    setLocked(true);
  };

  const handleEndSession = () => {
    setSelectedCourse("");
    setNoteText("");
    setNotes([]);
    setLocked(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mx-auto w-full max-w-[1200px] bg-yellow-200 text-black shadow-lg border-8 border-yellow-900 p-8 flex flex-row items-center justify-center gap-[40px] min-h-[500px]">
        <div
          className="relative p-6 border-8 border-yellow-900 bg-yellow-100 flex items-center justify-center bg-clip-padding shadow-[5px_5px_0px_#5A3211,_-5px_-5px_0px_#A67B5B,_inset_0px_0px_8px_rgba(0,0,0,0.6)] [image-rendering:pixelated]"
        >
          <div
            className="absolute inset-0 -m-2 border-8 border-yellow-900 [background:linear-gradient(45deg,_#8B5A2B,_#A67B5B,_#8B5A2B)] [z-index:-1] shadow-[5px_5px_0px_#5A3211,_-5px_-5px_0px_#A67B5B,_inset_0px_0px_10px_rgba(0,0,0,0.6)]"
          ></div>

          <img
            src={NoteImage}
            alt="student wrinting a note"
            className="max-w-[400px] border-4 border-yellow-900 shadow-lg"
          />
        </div>

        <div
          className="relative flex flex-col items-start w-[750px] p-8 border-8 border-yellow-900 bg-yellow-100 justify-between mt-[-15px] bg-clip-padding shadow-[5px_5px_0px_#5A3211,_-5px_-5px_0px_#A67B5B,_inset_0px_0px_8px_rgba(0,0,0,0.6)] [image-rendering:pixelated]"
        >
          <div
            className="absolute inset-0 -m-2 border-8 border-yellow-900 [background:linear-gradient(45deg,_#8B5A2B,_#A67B5B,_#8B5A2B)] [z-index:-1] shadow-[5px_5px_0px_#5A3211,_-5px_-5px_0px_#A67B5B,_inset_0px_0px_10px_rgba(0,0,0,0.6)]"
          ></div>

          <h2 className="text-lg font-semibold mb-4 font-pixel text-yellow-900">
            Add new note
          </h2>

          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            disabled={locked}
            className="w-full p-4 border-4 border-yellow-900 font-pixel text-sm bg-yellow-100 text-yellow-900 hover:bg-yellow-300 transition-all disabled:opacity-50"
          >
            <option value="">-- Choose course --</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>

          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Write a note..."
            disabled={!selectedCourse}
            className="w-full p-4 border-4 border-yellow-900 font-pixel text-sm bg-yellow-100 text-yellow-900 hover:bg-yellow-300 transition-all h-[200px] disabled:opacity-50 resize-none break-words"
          ></textarea>

          <div className="flex gap-6 mt-4">
            <button
              onClick={handleAdd}
              disabled={!noteText.trim() || !selectedCourse}
              className="px-6 py-3 bg-blue-500 text-white border-4 border-yellow-900 font-pixel text-sm hover:bg-blue-600 transition-all disabled:bg-gray-400"
            >
              Add note
            </button>

            <button
              onClick={handleEndSession}
              disabled={!locked}
              className="px-14 py-3 bg-red-500 text-white border-4 border-yellow-900 font-pixel text-sm hover:bg-red-600 transition-all disabled:bg-gray-400"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {notes.length > 0 && (
        <div
          className="mt-8 bg-yellow-100 border-8 border-yellow-900 p-6 w-full max-w-[1200px] flex flex-col relative bg-clip-padding shadow-[5px_5px_0px_#5A3211,_-5px_-5px_0px_#A67B5B,_inset_0px_0px_8px_rgba(0,0,0,0.6)] [image-rendering:pixelated]"
        >
          <div
            className="absolute inset-0 -m-2 border-8 border-yellow-900 [background:linear-gradient(45deg,_#8B5A2B,_#A67B5B,_#8B5A2B)] [z-index:-1] shadow-[5px_5px_0px_#5A3211,_-5px_-5px_0px_#A67B5B,_inset_0px_0px_10px_rgba(0,0,0,0.6)]"
          ></div>

          <h3 className="text-lg font-bold text-yellow-900 text-left font-pixel">
            Added Notes
          </h3>
          <ul className="mt-4 w-full space-y-4">
            {notes.map((note, index) => (
              <li
                key={index}
                className="p-3 bg-yellow-200 border-4 border-yellow-900 font-pixel break-words"
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




















