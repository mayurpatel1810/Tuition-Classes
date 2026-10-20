import { Routes, Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";

// Public pages
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Courses from "../pages/public/Courses";
import Faculty from "../pages/public/Faculty";
import Toppers from "../pages/public/Toppers";
import Results from "../pages/public/Results";
import Gallery from "../pages/public/Gallery";
import Announcements from "../pages/public/Announcements";
import Contact from "../pages/public/Contact";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public site */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/toppers" element={<Toppers />} />
        <Route path="/results" element={<Results />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}
