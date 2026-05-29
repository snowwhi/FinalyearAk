import akSeal from '../../assets/Seal.png';
interface OfficialTranscriptProps {
  personal: any;
  summary: any;
  semesters: any[];
}

export const OfficialTranscript = ({ personal, summary, semesters }: OfficialTranscriptProps) => {
  const today = new Date().toLocaleDateString('en-PK', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });

  const getGradeBadge = (grade: string) => {
    const styles = {
      A: 'bg-green-100 text-green-800',
      B: 'bg-yellow-50 text-yellow-800',
      C: 'bg-orange-50 text-orange-800',
      default: 'bg-red-50 text-red-800',
    };
    return styles[grade as keyof typeof styles] || styles.default;
  };

  return (
    <div className="font-serif max-w-full mx-auto p-3 bg-white text-black text-[10px] leading-tight print:p-2">
      {/* Header */}
      <div className="text-center mb-2">
        <h1 className="text-lg font-bold tracking-wide m-0">{personal.university}</h1>
        <h2 className="text-xs font-bold my-0.5">{personal.program}</h2>
        <p className="text-[9px] my-0.5">Session: {personal.session}</p>
        <div className="border border-black inline-block px-5 py-1 mt-1.5 bg-gray-50">
          <p className="text-[10px] font-bold tracking-wide m-0">PROVISIONAL TRANSCRIPT</p>
          <p className="text-[8px] text-gray-600 mt-0.5">Subject to Final Verification</p>
        </div>
      </div>

      {/* Student Info */}
      <div className="flex justify-between border-t border-b border-black py-1.5 mb-2 text-[9.5px]">
        <span><strong>Name:</strong> {personal.name}</span>
        <span><strong>Roll No:</strong> {personal.rollNo}</span>
        <span><strong>Document No:</strong> {personal.docNo}</span>
      </div>

      {/* Semesters - 2 column grid */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        {semesters.map((sem: any) => (
          <div key={sem.id} className="border border-gray-300 rounded overflow-hidden break-inside-avoid">
            <div className="flex justify-between bg-gray-100 px-2 py-1 border-b border-gray-300 text-[9px] font-bold">
              <span>{sem.id}</span>
              <span className="text-green-800">GPA: {parseFloat(sem.gpa).toFixed(2)} / 4.00</span>
            </div>

            <table className="w-full text-[8px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-300">
                  <th className="text-left p-1 w-14">Code</th>
                  <th className="text-left p-1">Course Title</th>
                  <th className="text-center p-1 w-7">Cr</th>
                  <th className="text-center p-1 w-8">Marks</th>
                  <th className="text-center p-1 w-8">GP</th>
                  <th className="text-center p-1 w-7">Gr</th>
                </tr>
              </thead>
              <tbody>
                {sem.courses?.map((course: any, idx: number) => (
                  <tr key={idx} className="border-b border-gray-100">
                    <td className="p-1 font-mono">{course.code}</td>
                    <td className="p-1 truncate max-w-[100px]" title={course.title}>
                      {course.title.length > 25 ? course.title.substring(0, 22) + '...' : course.title}
                    </td>
                    <td className="p-1 text-center">{course.cr}</td>
                    <td className="p-1 text-center">{course.marks}</td>
                    <td className="p-1 text-center">{course.gp}</td>
                    <td className="p-1 text-center">
                      <span className={`${getGradeBadge(course.grade)} px-1.5 py-0.5 rounded text-[7px] font-bold`}>
                        {course.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-gray-300 bg-gray-50">
                  <td colSpan={2} className="p-1 text-[7.5px] font-bold">
                    Total: {sem.totalCr} Credits
                  </td>
                  <td colSpan={4} className="p-1 text-right text-[7.5px]">
                    &nbsp;
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        ))}
      </div>

      {/* Academic Summary + Signatures */}
      <div className="flex justify-between items-end mt-2 pt-2 border-t border-black">
        {/* Summary Box */}
        <div className="border border-black w-60 bg-amber-50/30">
          <div className="bg-black text-white text-center py-0.5 text-[8px] font-bold tracking-wide">
            ACADEMIC SUMMARY
          </div>
          <div className="p-1.5 space-y-0.5">
            <div className="flex justify-between text-[8.5px]">
              <span>CGPA (out of 4.00):</span>
              <strong>{summary.cgpa}</strong>
            </div>
            <div className="flex justify-between text-[8.5px]">
              <span>Total Marks:</span>
              <strong>{summary.marksTotal}</strong>
            </div>
            <div className="flex justify-between text-[8.5px]">
              <span>Marks Obtained:</span>
              <strong>{summary.marksObt}</strong>
            </div>
            <div className="flex justify-between text-[8.5px]">
              <span>Percentage:</span>
              <strong>{summary.percentage}%</strong>
            </div>
          </div>
        </div>

        {/* Signatures */}
        <div className="text-center">
          <div className="mb-2">
            <div className="w-44 border-t border-black mt-3 pt-0.5" />
            <p className="text-[8px] font-bold mt-0.5">Controller of Examinations</p>
            <p className="text-[7px] text-gray-600">{personal.university}</p>
          </div>
          <div>
            <div className="w-44 border-t border-black mt-2 pt-0.5" />
            <p className="text-[8px] font-bold mt-0.5">Registrar</p>
            <p className="text-[7px] text-gray-600">{personal.university}</p>
          </div>
        </div>

        {/* Seal */}
      {/* Seal - AK Corporation Premium */}
{/* AK Corporation Seal */}
<div className="text-right">
  <div className="text-center">
    <img 
      src={akSeal} 
      alt="AK Corporation Official Seal"
      className="w-16 h-16 object-contain mx-auto"
    />
    <p className="text-[6px] text-gray-500 font-semibold mt-1">Authorized Seal</p>
  </div>
</div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-2 pt-1 border-t border-gray-300 text-[7px]">
        <div className="text-gray-500">
          <p className="m-0">Note: Provisional transcript - subject to final evaluation.</p>
          <p className="m-0">Errors and omissions excepted.</p>
        </div>
        <div className="text-right font-mono text-gray-400">
          Generated: {today}
        </div>
      </div>
    </div>
  );
};