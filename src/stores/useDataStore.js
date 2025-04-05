import { create } from "zustand";
import useSWRImmutable from "swr/immutable";
import { mutate } from "swr";

const coursesUrl = "https://luentomuistiinpano-api.netlify.app/.netlify/functions/courses";
const notesUrl = "https://luentomuistiinpano-api.netlify.app/.netlify/functions/notes";

const fetcher = (url) => fetch(url).then((res) => res.json());

const coursesOrig = [
  {
    id: Math.floor(Math.random() * 1000),
    name: "Matikka",
  },
  {
    id: Math.floor(Math.random() * 1000),
    name: "Fysiikka",
  },
];

const notesOrig = [
  {
    noteText: "Tänään opit matikkaa",
    courseid: coursesOrig.find((c) => c.name === "Matikka").id,
    courseName: "Matikka",
    timestamp: Date.now(),
  },
  {
    noteText: "Tänään opit fysiikkaa",
    courseid: coursesOrig.find((c) => c.name === "Fysiikka").id,
    courseName: "Fysiikka",
    timestamp: Date.now(),
  },
];

const useDataStore = create((set) => ({
  courses: coursesOrig,
  notes: notesOrig,

  setCourses: (courses) => set({ courses }),
  setNotes: (notes) => set({ notes }),

  addCourse: (course) =>
    set((state) => ({
      courses: [...state.courses, { id: course.id, name: course.name }],
    })),

  addNote: (note) =>
    set((state) => {
      const course = state.courses.find((c) => c.id === note.courseid);
      return course
        ? {
            notes: [
              ...state.notes,
              {
                id: Math.floor(Math.random() * 10000),
                noteText: note.noteText,
                courseid: course.id,
                courseName: course.name,
                timestamp: Date.now(),
              },
            ],
          }
        : state;
    }),

  deleteNote: (id) =>
    set((state) => ({ notes: state.notes.filter((n) => n.id !== id) })),
}));

export const useFetchData = () => {
  const { setCourses, setNotes } = useDataStore();

  useSWRImmutable(coursesUrl, fetcher, {
    onSuccess: (fetchedCourses) => {
      const mergedCourses = [
        ...new Map(
          [...coursesOrig, ...fetchedCourses].map((c) => [c.name, c])
        ).values(),
      ];
      setCourses(mergedCourses);
      mutate(coursesUrl, mergedCourses, false);

      mutate(
        notesUrl,
        async () => {
          const notesData = await fetcher(notesUrl);
          const mergedNotes = [...notesOrig, ...notesData]
            .map((note) => {
              const course = mergedCourses.find(
                (c) => c.id === note.courseid || c.id === note.course?.id
              );
              return course
                ? {
                    ...note,
                    noteText: note.text ?? note.noteText,
                    courseid: course.id,
                    courseName: course.name,
                  }
                : null;
            })
            .filter((note) => note !== null);
          setNotes(mergedNotes);
          return mergedNotes;
        },
        false
      );
    },
  });

  return {};
};

export default useDataStore;

