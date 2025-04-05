import { Routes, Route, Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import CourseInput from "./views/CourseInput";
import CourseList from "./views/CourseList";
import NoteInput from "./views/NoteInput";
import NoteList from "./views/NoteList";
import Home from "./views/Home";
import "./styles/app.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="courses" element={<CourseList />} />
        <Route path="add-course" element={<CourseInput />} />
        <Route path="add-note" element={<NoteInput />} />
        <Route path="notes" element={<NoteList />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="main flex-1 p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;



