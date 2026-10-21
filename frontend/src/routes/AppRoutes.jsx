import { Routes, Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";

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

// Admin pages
import Login from "../pages/admin/Login";
import Dashboard from "../pages/admin/Dashboard";
import ManageToppers from "../pages/admin/ManageToppers";
import ManageResults from "../pages/admin/ManageResults";
import ManageCourses from "../pages/admin/ManageCourses";
import ManageFaculty from "../pages/admin/ManageFaculty";
import ManageGallery from "../pages/admin/ManageGallery";
import ManageAnnouncements from "../pages/admin/ManageAnnouncements";
import ManageEnquiries from "../pages/admin/ManageEnquiries";
import ManageContact from "../pages/admin/ManageContact";

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

      {/* Admin login — not protected */}
      <Route path="/admin/login" element={<Login />} />

      {/* Admin dashboard — protected */}
      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/toppers" element={<ManageToppers />} />
        <Route path="/admin/results" element={<ManageResults />} />
        <Route path="/admin/courses" element={<ManageCourses />} />
        <Route path="/admin/faculty" element={<ManageFaculty />} />
        <Route path="/admin/gallery" element={<ManageGallery />} />
        <Route path="/admin/announcements" element={<ManageAnnouncements />} />
        <Route path="/admin/enquiries" element={<ManageEnquiries />} />
        <Route path="/admin/contact" element={<ManageContact />} />
      </Route>
    </Routes>
  );
}
