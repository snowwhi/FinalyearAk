import e1 from '../assets/e1.png';
import e2 from '../assets/e2.jpg';
import e3 from '../assets/e3.jpg';
import e4 from '../assets/e4.jpg';
import e5 from '../assets/e5.jpg';

export interface NewsItem {
  id: number;
  label: string;
  image: string;
  day: string;
  month: string;
  desc: string;
  fullStory: string;
}

export const newsItems: NewsItem[] = [
  { 
    id: 1, 
    label: "SCHOLARSHIPS", 
    image: e1,
    day: "20",
    month: "April, 2026",
    desc: "Thal University announces new merit-based scholarship programs for the 2026 academic year, aimed at supporting exceptional talent in Computer Science and Engineering.",
    fullStory: `The administration of Thal University Bhakkar is proud to announce the launch of the 'Thal Excellence Initiative.' This scholarship program is specifically designed to alleviate the financial burden on top-performing students in the STEM fields, ensuring that brilliance is never sidelined by economic constraints.

For the Fall 2026 intake, the university has allocated 50 fully-funded slots for students maintaining a CGPA of 3.8 or higher. These awards cover full tuition fees, laboratory charges, and provide a monthly stipend for research materials. This is part of TUB's broader vision to become a regional hub for technical innovation and academic rigor.

Applications will open next month through the Student Affairs portal. Candidates will undergo a rigorous selection process, including a technical evaluation and an interview with the departmental board. This initiative underscores our commitment to fostering a competitive academic environment and ensuring that financial constraints do not hinder the progress of our brightest minds.

By investing in our students today, TUB is securing the technological future of Pakistan. We encourage all eligible students to prepare their portfolios and academic transcripts for the upcoming call for applications.`
  },
  { 
    id: 2, 
    label: "SPORTS", 
    image: e2,
    day: "18",
    month: "April, 2026",
    desc: "The Annual Inter-Departmental Sports Gala kicks off this week. Join us for a celebration of athleticism, teamwork, and university spirit on the main grounds.",
    fullStory: `The much-anticipated Annual Sports Gala 2026 has officially begun, turning the TUB main campus into a vibrant arena of competition and camaraderie. The opening ceremony, held earlier today, featured a colorful march past by teams representing all major departments, led by the university band and the departmental captains.

Over the next seven days, students from Computer Science, BBA, and Social Sciences will compete in a wide array of sports including cricket, football, badminton, and table tennis. The gala is not just about physical prowess; it is a vital part of the university experience that teaches students the value of teamwork, discipline, and resilience under pressure.

The Vice Chancellor, during his keynote address, emphasized that a healthy mind resides in a healthy body. He praised the Sports Committee for their organizational efforts and encouraged students to maintain the spirit of 'fair play' throughout the competitions. The evening sessions are expected to draw large crowds of students and faculty members alike.

Final matches will be held this coming Sunday, followed by a grand prize distribution ceremony. Medals, trophies, and the 'Best Athlete of the Year' award will be presented to the winners. This gala remains the highlight of our campus life, promoting healthy competition and departmental pride.`
  },
  { 
    id: 3, 
    label: "CAREER DEVELOPMENT", 
    image: e3,
    day: "15",
    month: "April, 2026",
    desc: "Bridge the gap between academia and industry. Our upcoming seminar features top tech leaders discussing the future of AI and full-stack development.",
    fullStory: `In collaboration with leading software houses in Lahore and Islamabad, the TUB Career Development Center is hosting a seminar titled 'Tech Horizons 2026.' As the industry evolves toward intelligent systems, this event is a golden opportunity for final-semester students to align their skills with current market demands.

The seminar will feature a panel of senior developers and project managers who will provide deep dives into the recruitment process for MERN stack roles. Key topics include technical interview strategies, the importance of a logic-driven GitHub portfolio, and the rising role of AI-driven tools in the modern developer's workflow.

A special session will be dedicated to Retrieval-Augmented Generation (RAG) and its practical application in enterprise software. For our Computer Science seniors, this is a chance to see how the theoretical concepts taught in class are applied to solve real-world problems. Attendance is mandatory as it forms part of the final-year professional orientation.

The event will conclude with a dedicated networking session where students can interact directly with industry recruiters. This direct link between the classroom and the industry is part of our mission to ensure that TUB graduates are not just degree holders, but industry-ready professionals.`
  },
  { 
    id: 4, 
    label: "CAMPUS LIFE", 
    image: e4,
    day: "12",
    month: "April, 2026",
    desc: "Discover the vibrant culture at TUB. From literary societies to tech clubs, explore how our students are making an impact outside the classroom.",
    fullStory: `Life at Thal University extends far beyond the lecture halls and laboratories. Our diverse range of student-led organizations, including the Thal Debating and Literary Society, continue to provide a platform for students to sharpen their leadership, communication, and creative skills.

Last week's 'Poetry Slam' and the 'Hack-a-Thal' coding competition saw record participation from both junior and senior batches. These events are crucial for building the 'all-rounder' personality that modern employers seek—balancing technical brilliance with emotional intelligence and public speaking confidence.

The university administration continues to support these societies by providing the necessary resources and mentorship. We believe that student engagement in extracurricular activities is the backbone of a vibrant campus culture, fostering a sense of community that lasts long after graduation.

Stay tuned for the upcoming Cultural Week celebrations, which will showcase the rich heritage of the Thal region through music, food, and art. We encourage every student to join at least one society and make their mark on the university's history.`
  },
  { 
    id: 5, 
    label: "INTERNSHIPS", 
    image: e5,
    day: "10",
    month: "April, 2026",
    desc: "Global internship opportunities are now open. Apply today to gain hands-on experience with our partner organizations in the software and manufacturing sectors.",
    fullStory: `The Internship Placement Cell is excited to announce a new wave of opportunities with international tech firms and local industrial leaders. We currently have over 30 open slots specifically curated for students specializing in Web Development, Quality Assurance, and Data Management.

These positions are designed to give students a taste of professional life, allowing them to work on live projects under the guidance of experienced mentors. Understanding professional workflows like Agile, Scrum, and version control (Git) in a corporate environment is an experience that cannot be replicated in a classroom setting.

Interested candidates must submit their updated CVs, GitHub portfolios, and a brief cover letter to the placement office by the end of this week. Preference will be given to students who have demonstrated a 'first-principles' approach to their projects and maintain a consistent academic record.

Securing an internship is often the first step toward a permanent job offer. Many of our partner organizations use these programs as a talent pipeline, meaning a successful summer internship could turn into a full-time role after your final semester. Don't miss this chance to jumpstart your career.`
  }
];