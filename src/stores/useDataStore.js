import { create } from "zustand";
import useSWRImmutable from "swr/immutable";
import { mutate } from "swr";

const coursesUrl = "https://luentomuistiinpano-api.netlify.app/.netlify/functions/courses";
const notesUrl = "https://luentomuistiinpano-api.netlify.app/.netlify/functions/notes";

const fetcher = (url) => fetch(url).then((res) => res.json());

const useDataStore = create((set) => ({
  courses: [],
  notes: [],

  setCourses: (courses) => set({ courses }),
  setNotes: (notes) => set({ notes }),

  addCourse: (course) =>
    set((state) => ({
      courses: [...state.courses, { id: course.id, name: course.name }],
    })),

  addNote: (note) =>
    set((state) => {
      const course = state.courses.find((c) => c.id === note.course);
      return course
        ? {
            notes: [
              ...state.notes,
              {
                id: Math.floor(Math.random() * 10000),
                text: note.text,
                course: {
                  id: course.id,
                  name: course.name,
                },
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
    onSuccess: async (fetchedCourses) => {
      setCourses(fetchedCourses);
      mutate(coursesUrl, fetchedCourses, false);

      const notesData = await fetcher(notesUrl);
      const mergedNotes = notesData.map((note) => {
        const course = fetchedCourses.find((c) => c.id === note.course?.id);
        return {
          ...note,
          course: course
            ? {
                id: course.id,
                name: course.name,
              }
            : null,
        };
      });
      setNotes(mergedNotes);
      mutate(notesUrl, mergedNotes, false);
    },
  });
};

export default useDataStore;
