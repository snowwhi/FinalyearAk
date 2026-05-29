import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import '@aejkatappaja/phantom-ui';

// ✅ Lazy load all pages
const Layout         = lazy(() => import('./Layout/Layout'));
const Home           = lazy(() => import('./Pages/Home'));
const About          = lazy(() => import('./Pages/About'));
const NewsEventsPage = lazy(() => import('./Pages/NewsEventsPage'));
const Academics      = lazy(() => import('./Pages/Academics'));
const Faculty        = lazy(() => import('./Pages/Faculty'));
const Contact        = lazy(() => import('./Pages/Contact'));
const AuthPortal     = lazy(() => import('./Pages/AuthPortal'));
const StudentDashboard = lazy(() => import('./Pages/StudentDashboard'));
const NotFound       = lazy(() => import('./Pages/NotFound'));
const NewsDetailPage = lazy(() => import('./Pages/NewsDetailPage'));
const AdminDashboard = lazy(() => import('./Pages/AdminDashboard'));
const Organization   = lazy(() => import('./Pages/Organization'));
const ProgramDetail  = lazy(() => import('./Pages/ProgramDetail'));
const AcademicCalendar = lazy(() => import('./Pages/AcademicCalendar'));

// ✅ Global page skeleton fallback
const PageSkeleton = () => (
  <div style={{ minHeight: "100vh", width: "100%" }}>
    <phantom-ui loading="true" style={{ display: "block", width: "100%", minHeight: "100vh" }} />
  </div>
);

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<PageSkeleton />}>   {/* 👈 wraps ALL routes */}
          <Routes>

            {/* Public Website Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="news-events" element={<NewsEventsPage />} />
              <Route path="news/:id" element={<NewsDetailPage />} />
              <Route path="about" element={<About />} />
              <Route path="organization" element={<Organization />} />
              <Route path="academics" element={<Academics />} />
              <Route path="academics/:programId" element={<ProgramDetail />} />
              <Route path="academics/calendar" element={<AcademicCalendar />} />
              <Route path="faculty" element={<Faculty />} />
              <Route path="contact" element={<Contact />} />
            </Route>

            {/* Auth Route */}
            <Route path="login" element={<AuthPortal />} />

            {/* Student Portal */}
            <Route path="student">
              <Route path="login" element={<AuthPortal />} />
              <Route path="dashboard" element={<StudentDashboard />} />
            </Route>

            {/* Admin Portal */}
            <Route path="admin">
              <Route path="login" element={<AuthPortal />} />
              <Route path="dashboard" element={<AdminDashboard />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<NotFound />} />

          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;