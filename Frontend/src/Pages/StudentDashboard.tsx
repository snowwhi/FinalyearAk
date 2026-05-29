import { useRef, useState, useMemo, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from 'react-router-dom';
import '@aejkatappaja/phantom-ui';
import {
  Sidebar,
  TopBar,
  StatsSection,
  ChartsSection,
  CGPAPredictor,
  CourseSearch,
  SemesterAccordion,
  OfficialTranscript
} from '../StudentDashBoard/dashboard';
import { SectionTitle } from '../StudentDashBoard/Shared/SectionTitle';
import { GRADE_COLORS } from '../Utils/GradeHelpers';

const API_URL = 'http://localhost:3000/api';

const StudentDashboard = () => {
  // ========== ALL STATE HOOKS FIRST ==========
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedSem, setExpandedSem] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [predGPA, setPredGPA] = useState(3.0);
  const [predCredits, setPredCredits] = useState(18);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [studentData, setStudentData] = useState<any>(null);

  // ========== REFS AND NAVIGATE ==========
  const navigate = useNavigate();
  const transcriptRef = useRef<HTMLDivElement>(null);

  // ========== FETCH FUNCTION ==========
  const fetchStudentData = async (token: string) => {
    setLoading(true);
    try {
      console.log('📡 Fetching transcript for student...');
      const response = await fetch(`${API_URL}/student/transcript`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('📡 Transcript response status:', response.status);
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/');
          return;
        }
        throw new Error('Failed to fetch student data');
      }

      const result = await response.json();
      console.log('📊 API Response:', result);

      if (result.success) {
        const normalizedData = {
          personal: result.data.personal,
          summary: result.data.summary,
          semesters: result.data.semesters.map((sem: any) => ({
            id: sem.id,
            gpa: sem.gpa,
            totalCr: sem.totalCr,
            courses: sem.courses.map((course: any) => ({
              code: course.code,
              title: course.title,
              cr: course.cr,
              marks: course.marks,
              gp: course.gp,
              grade: course.grade
            }))
          }))
        };
        setStudentData(normalizedData);
      }
    } catch (err: any) {
      console.error('Error fetching student data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ========== useEffect HOOKS ==========
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
      navigate('/');
      return;
    }

    fetchStudentData(token);
  }, [navigate]);

  // ========== useMemo HOOKS (with safe fallbacks) ==========
  const safeSemesters = studentData?.semesters || [];
  const safeSummary = studentData?.summary || { cgpa: '0', percentage: '0', marksObt: 0, marksTotal: 0 };
  const safePersonal = studentData?.personal || { name: '', rollNo: '', program: '', university: '', session: '', docNo: '' };

  const gradeDist = useMemo(() => {
    const counts: Record<string, number> = {};
    safeSemesters.forEach((sem: any) =>
      sem.courses?.forEach((c: any) => {
        const g = (c.grade ?? 'F')[0].toUpperCase();
        counts[g] = (counts[g] ?? 0) + 1;
      })
    );
    return Object.entries(counts)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([label, count]) => ({ label, count, color: GRADE_COLORS[label] ?? '#64748b' }));
  }, [safeSemesters]);

  const totalCredits = useMemo(
    () => safeSemesters.reduce((s: number, sem: any) => s + (Number(sem.totalCr) || 0), 0),
    [safeSemesters]
  );

  const predictedCGPA = useMemo(() => {
    const currentQP = parseFloat(safeSummary.cgpa) * totalCredits;
    const newQP = currentQP + predGPA * predCredits;
    const result = newQP / (totalCredits + predCredits);
    return isNaN(result) ? safeSummary.cgpa : result.toFixed(2);
  }, [predGPA, predCredits, safeSummary.cgpa, totalCredits]);

  const cgpaDelta = (parseFloat(predictedCGPA) - parseFloat(safeSummary.cgpa)).toFixed(2);
  const cgpaUp = parseFloat(predictedCGPA) >= parseFloat(safeSummary.cgpa);

  const filteredSems = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return safeSemesters;
    return safeSemesters
      .map((sem: any) => ({
        ...sem,
        courses: sem.courses?.filter((c: any) =>
          c.title?.toLowerCase().includes(q) || c.code?.toLowerCase().includes(q)
        ) ?? [],
      }))
      .filter((sem: any) => sem.courses.length > 0);
  }, [search, safeSemesters]);

  // ========== PRINT HANDLER ==========
  const handlePrint = useReactToPrint({
    contentRef: transcriptRef,
    documentTitle: `${safePersonal.name || 'Student'}_Transcript`,
    onAfterPrint: () => {
      console.log('✅ Transcript printed successfully');
    },
    onPrintError: (error) => {
      console.error('❌ Print failed:', error);
    },
  });

  // ========== CONDITIONAL RETURNS (AFTER ALL HOOKS) ==========
  if (loading) {
    return (
      <div className="min-h-screen flex bg-white">

        {/* Skeleton Sidebar */}
        <div className="w-64 h-screen bg-slate-100 animate-pulse shrink-0" />

        <main className="flex-1 h-screen overflow-hidden">

          {/* Skeleton TopBar */}
          <div className="h-16 bg-white border-b border-slate-200 px-8 flex items-center gap-4">
            <div className="w-40 h-4 bg-slate-200 rounded animate-pulse" />
            <div className="ml-auto flex gap-3">
              <div className="w-24 h-8 bg-slate-200 rounded-lg animate-pulse" />
              <div className="w-8 h-8 bg-slate-200 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Skeleton Stats Row */}
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-slate-100 rounded-xl animate-pulse" />
              ))}
            </div>

            {/* Skeleton Charts */}
            <div className="grid grid-cols-2 gap-4">
              <div className="h-52 bg-slate-100 rounded-xl animate-pulse" />
              <div className="h-52 bg-slate-100 rounded-xl animate-pulse" />
            </div>

            {/* Skeleton Rows (semester accordion) */}
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-14 bg-slate-100 rounded-xl animate-pulse" />
            ))}
          </div>

        </main>
      </div>
    );
  }

  if (error || !studentData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-error-warning-line text-3xl text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Unable to Load Data</h2>
          <p className="text-slate-500 mb-4">{error || 'Something went wrong'}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ========== RENDER MAIN DASHBOARD ==========
  return (
    <div className="min-h-screen flex bg-white">
      <div className="no-print">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      <main className="flex-1 h-screen overflow-y-auto">
        <div className="no-print">
          <TopBar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            studentName={safePersonal.name}
            rollNo={safePersonal.rollNo}
            session={safePersonal.session}
            program={safePersonal.program}
            university={safePersonal.university}
            onPrint={handlePrint}
          />
        </div>

        <div className="no-print p-5 md:p-8 max-w-5xl mx-auto space-y-10">
          <StatsSection summary={safeSummary} semesters={safeSemesters} />
          <ChartsSection semesters={safeSemesters} gradeDist={gradeDist} />

          <CGPAPredictor
            predGPA={predGPA}
            setPredGPA={setPredGPA}
            predCredits={predCredits}
            setPredCredits={setPredCredits}
            predictedCGPA={predictedCGPA}
            cgpaUp={cgpaUp}
            cgpaDelta={cgpaDelta}
            currentCGPA={safeSummary.cgpa}
            totalCredits={totalCredits}
          />

          <section id="courses-section">
            <SectionTitle>Course Details</SectionTitle>
            <CourseSearch search={search} setSearch={setSearch} />
            <div className="space-y-3">
              {filteredSems.map((sem: any, idx: number) => (
                <SemesterAccordion
                  key={sem.id}
                  semester={sem}
                  index={idx}
                  expandedSem={expandedSem}
                  setExpandedSem={setExpandedSem}
                />
              ))}
              {filteredSems.length === 0 && (
                <div className="text-center py-16 text-slate-500">
                  <i className="ri-search-line text-4xl mb-3 block opacity-30" />
                  <p className="text-sm font-sans">No courses match "<strong>{search}</strong>"</p>
                </div>
              )}
            </div>
          </section>

          <section id="transcript-section" className="hidden md:block">
            <div className="mb-4">
              <SectionTitle>Official Transcript</SectionTitle>
              <p className="text-xs -mt-2 text-slate-500 font-sans">
                Print-ready · Click the print button above
              </p>
            </div>
            <OfficialTranscript personal={safePersonal} summary={safeSummary} semesters={safeSemesters} />
          </section>

          <div className="block md:hidden text-center py-8 bg-amber-50 rounded-xl border border-amber-200">
            <i className="ri-printer-line text-3xl text-amber-500 mb-2 block" />
            <p className="text-sm font-medium text-slate-700">Transcript Ready to Print</p>
            <p className="text-xs text-slate-500 mt-1">
              Click the <strong className="text-amber-600">Print Transcript</strong> button above to generate your official document
            </p>
          </div>

          <p className="text-center text-[12px] uppercase  pb-4 text-slate-800">
            Thal University Bhakkar · Result Management System
          </p>
        </div>
      </main>

      <div style={{ display: 'none' }}>
        <div ref={transcriptRef}>
          <OfficialTranscript personal={safePersonal} summary={safeSummary} semesters={safeSemesters} />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;