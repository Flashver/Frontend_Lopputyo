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
    id: Math.floor(Math.random() * 10000),
    text: "Tänään opit matikkaa",
    course: {
      id: coursesOrig.find((c) => c.name === "Matikka").id,
      name: "Matikka",
    },
    timestamp: Date.now(),
  },
  {
    id: Math.floor(Math.random() * 10000),
    text: "Kvanttimekaniikan alkeet",
    course: {
      id: coursesOrig.find((c) => c.name === "Fysiikka").id,
      name: "Fysiikka",
    },
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
      const mergedCourses = [
        ...new Map(
          [...coursesOrig, ...fetchedCourses].map((c) => [c.name, c])
        ).values(),
      ];
      setCourses(mergedCourses);
      mutate(coursesUrl, mergedCourses, false);

      const notesData = await fetcher(notesUrl);
      const mergedNotes = [...notesOrig, ...notesData]
        .map((note) => {
          const course = mergedCourses.find(
            (c) => c.id === note.course?.id
          );

          return {
            ...note,
            course: {
              id: course.id,
              name: course.name,
            },
          };
        });
      setNotes(mergedNotes);
      mutate(notesUrl, mergedNotes, false);
    },
  });
};

export default useDataStore;

