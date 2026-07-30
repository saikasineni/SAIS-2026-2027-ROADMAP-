/* ----------------------------------------------------
   SAI'S 2026 & 2027 ROADMAP - Seed & Sample Data
   ---------------------------------------------------- */

window.SEED_DATA = {
  gateEntries: [
    {
      id: "gate-1",
      date: "2026-08-06",
      subject: "Operating Systems",
      topic: "CPU Scheduling Algorithms (FCFS, SJF, RR)",
      revisionDone: true,
      pyqsSolved: 25,
      questionsSolved: 40,
      studyHours: 3.5,
      confidence: 5,
      difficulty: "Medium",
      notes: "Mastered Round Robin and SJF average waiting time formulas. Solved 2024 & 2025 PYQs.",
      status: "Completed"
    },
    {
      id: "gate-2",
      date: "2026-08-07",
      subject: "Operating Systems",
      topic: "Process Synchronization & Semaphores",
      revisionDone: false,
      pyqsSolved: 18,
      questionsSolved: 30,
      studyHours: 4.0,
      confidence: 4,
      difficulty: "Hard",
      notes: "Need more practice on Readers-Writers and Producer-Consumer boundary conditions.",
      status: "Needs Revision"
    },
    {
      id: "gate-3",
      date: "2026-08-08",
      subject: "DBMS",
      topic: "ER Diagrams & Relational Model",
      revisionDone: true,
      pyqsSolved: 30,
      questionsSolved: 45,
      studyHours: 3.0,
      confidence: 5,
      difficulty: "Easy",
      notes: "Converted complex ER models into minimum relational tables.",
      status: "Completed"
    },
    {
      id: "gate-4",
      date: "2026-08-09",
      subject: "DBMS",
      topic: "Normalization (1NF, 2NF, 3NF, BCNF)",
      revisionDone: true,
      pyqsSolved: 35,
      questionsSolved: 50,
      studyHours: 4.5,
      confidence: 4,
      difficulty: "Medium",
      notes: "Practiced functional dependency closure & finding candidate keys.",
      status: "Completed"
    },
    {
      id: "gate-5",
      date: "2026-08-10",
      subject: "Data Structures & Algorithms",
      topic: "Binary Trees & BST Traversals",
      revisionDone: true,
      pyqsSolved: 28,
      questionsSolved: 35,
      studyHours: 4.0,
      confidence: 5,
      difficulty: "Medium",
      notes: "Inorder, Preorder, Postorder construction and AVL rotations.",
      status: "Completed"
    },
    {
      id: "gate-6",
      date: "2026-08-11",
      subject: "Data Structures & Algorithms",
      topic: "Graph Algorithms (Dijkstra, Bellman-Ford)",
      revisionDone: false,
      pyqsSolved: 20,
      questionsSolved: 25,
      studyHours: 3.5,
      confidence: 3,
      difficulty: "Hard",
      notes: "Review negative weight cycles edge case in Bellman-Ford.",
      status: "Needs Revision"
    }
  ],

  analyticsEntries: [
    {
      id: "da-1",
      date: "2026-08-06",
      module: "SQL",
      topic: "Advanced Joins & CTEs (Common Table Expressions)",
      platform: "Coursera / DataCamp",
      videoCompleted: true,
      practiceCompleted: true,
      miniProject: "E-Commerce Customer Retention Query Suite",
      studyHours: 2.5,
      confidence: 5,
      notes: "Built complex window functions ROW_NUMBER(), DENSE_RANK() for user segmentation."
    },
    {
      id: "da-2",
      date: "2026-08-07",
      module: "Python for Data Analysis",
      topic: "Pandas Data Aggregation & GroupBy Techniques",
      platform: "YouTube / Kaggle",
      videoCompleted: true,
      practiceCompleted: true,
      miniProject: "Sales Data Wrangling Script",
      studyHours: 3.0,
      confidence: 4,
      notes: "Handled missing values using forward fill and calculated moving averages."
    },
    {
      id: "da-3",
      date: "2026-08-08",
      module: "Power BI",
      topic: "DAX Measures, Calculated Columns & Star Schema",
      platform: "Microsoft Learn",
      videoCompleted: true,
      practiceCompleted: true,
      miniProject: "Financial KPI Executive Dashboard",
      studyHours: 2.5,
      confidence: 5,
      notes: "Created Time Intelligence DAX measures (YTD, SAMEPERIODLASTYEAR)."
    },
    {
      id: "da-4",
      date: "2026-08-09",
      module: "Excel Analytics",
      topic: "Advanced Pivot Tables & Power Query Transformations",
      platform: "Udemy",
      videoCompleted: true,
      practiceCompleted: true,
      miniProject: "Automated Weekly Sales Report",
      studyHours: 2.0,
      confidence: 5,
      notes: "Unpivoted columns and set up dynamic data refreshing."
    }
  ],

  researchEntries: [
    {
      id: "res-1",
      date: "2026-08-06",
      category: "Presentation Skills",
      topic: "Executive Storytelling & Data Visualization Best Practices",
      source: "Harvard Business Review / YouTube",
      timeSpentMinutes: 45,
      keyLearnings: "Use one primary takeaway per slide. Limit color palette to highlight key insights.",
      actionItems: "Apply color accenting on Power BI Executive Dashboard tomorrow.",
      usefulLinks: "https://hbr.org/visual-storytelling",
      notes: "Crucial for Data Analytics internship interviews."
    },
    {
      id: "res-2",
      date: "2026-08-07",
      category: "AI Tools",
      topic: "Leveraging LLMs for Automated Data Cleaning Scripts",
      source: "Tech Article / GitHub",
      timeSpentMinutes: 50,
      keyLearnings: "Writing structured prompt templates for generating clean pandas transformations.",
      actionItems: "Create a personal Python prompt helper repository.",
      usefulLinks: "https://github.com",
      notes: "Saved 40% time on data preprocessing."
    },
    {
      id: "res-3",
      date: "2026-08-08",
      category: "Interview Preparation",
      topic: "Top 20 SQL Query Scenarios for Data Analyst Roles",
      source: "LeetCode / StrataScratch",
      timeSpentMinutes: 60,
      keyLearnings: "Mastered self-joins for consecutive login streak calculation.",
      actionItems: "Solve 5 LeetCode SQL Medium problems every weekend.",
      usefulLinks: "https://stratascratch.com",
      notes: "High frequency question pattern."
    }
  ],

  journalEntries: [
    {
      id: "jour-1",
      date: "2026-08-06",
      wins: "Completed 3.5 hrs GATE OS study & built E-Commerce SQL project.",
      challenges: "Felt slightly fatigued in the afternoon.",
      learned: "SJF scheduling minimizes average wait time. Executive storytelling principles.",
      tomorrowGoal: "Complete Process Synchronization & Pandas Data Aggregation.",
      mood: "🚀",
      productivityScore: 9
    },
    {
      id: "jour-2",
      date: "2026-08-07",
      wins: "Maintained 5 AM wake up streak and completed 7 hours of total study.",
      challenges: "Hard questions in Process Synchronization required re-reading notes.",
      learned: "Semaphores prevent race conditions. Pandas groupby transform.",
      tomorrowGoal: "DBMS ER Diagrams and Power BI DAX Measures.",
      mood: "😄",
      productivityScore: 9
    }
  ],

  weeklyReviews: [
    {
      id: "week-1",
      weekEndingDate: "2026-08-09",
      whatWentWell: "Consistently hit 6+ hours of study every day. GATE OS and SQL modules finished smoothly.",
      whatNeedsImprovement: "Need to increase PYQ speed for GATE.",
      hoursStudied: 42.5,
      projectsCompleted: 2,
      bestAchievement: "Built Power BI Financial KPI Dashboard and solved 100+ GATE PYQs.",
      nextWeekGoals: "Complete Normalization in DBMS & Python Pandas mastery.",
      weeklyScore: 9
    }
  ],

  monthlyReviews: [
    {
      id: "month-1",
      monthName: "August 2026",
      totalStudyHours: 168.0,
      gateHours: 98.0,
      analyticsHours: 50.0,
      researchHours: 20.0,
      projectsBuilt: 4,
      booksRead: 2,
      streakDays: 25,
      attendancePercent: 96,
      overallProductivityScore: 9.2,
      summaryNotes: "Outstanding start to the 6-month roadmap!"
    }
  ],

  habits: {
    "2026-08-06": { wake5am: true, gateStudy: true, englishReading: true, college: true, analytics: true, research: true, sleep1030pm: true },
    "2026-08-07": { wake5am: true, gateStudy: true, englishReading: true, college: true, analytics: true, research: true, sleep1030pm: true },
    "2026-08-08": { wake5am: true, gateStudy: true, englishReading: true, college: true, analytics: true, research: false, sleep1030pm: true },
    "2026-08-09": { wake5am: true, gateStudy: true, englishReading: true, college: false, analytics: true, research: true, sleep1030pm: true },
    "2026-08-10": { wake5am: true, gateStudy: true, englishReading: true, college: true, analytics: true, research: true, sleep1030pm: true },
    "2026-08-11": { wake5am: true, gateStudy: true, englishReading: true, college: true, analytics: true, research: true, sleep1030pm: true }
  },

  roadmap: [
    {
      id: "m1",
      month: "Month 1 (Aug 6 - Sep 5, 2026)",
      title: "Foundation & Core Fundamentals",
      description: "Establish study discipline, complete OS & DBMS basics for GATE, master SQL & Excel for Analytics.",
      completionPercent: 85,
      tasks: [
        { text: "Operating Systems Core Concepts & PYQs", completed: true },
        { text: "DBMS ER Diagrams & Normalization", completed: true },
        { text: "Advanced SQL Queries & Window Functions", completed: true },
        { text: "Power BI DAX & Star Schema Modeling", completed: false }
      ]
    },
    {
      id: "m2",
      month: "Month 2 (Sep 6 - Oct 5, 2026)",
      title: "Core Skills & Deep Dive",
      description: "Data Structures & Algorithms, Computer Networks, Python Data Science stack (Numpy, Pandas).",
      completionPercent: 40,
      tasks: [
        { text: "Trees, Graphs & Dynamic Programming for GATE", completed: true },
        { text: "Computer Networks Layer Architectures", completed: false },
        { text: "Python Exploratory Data Analysis Projects", completed: false }
      ]
    },
    {
      id: "m3",
      month: "Month 3 (Oct 6 - Nov 5, 2026)",
      title: "Projects & Advanced Applications",
      description: "Build 2 End-to-End Data Analytics Portfolio Projects, Digital Logic & Theory of Computation.",
      completionPercent: 20,
      tasks: [
        { text: "Digital Logic & TOC Revision", completed: false },
        { text: "End-to-End E-Commerce Analytics Project", completed: false },
        { text: "Resume & Portfolio Website Creation", completed: false }
      ]
    },
    {
      id: "m4",
      month: "Month 4 (Nov 6 - Dec 5, 2026)",
      title: "Advanced Topics & Subject Test Series",
      description: "Compiler Design, COA, Mock Test Series 1, Advanced Machine Learning & BI Tools.",
      completionPercent: 0,
      tasks: [
        { text: "GATE Subject Wise Test Series", completed: false },
        { text: "Compiler Design & COA", completed: false },
        { text: "Business Intelligence Case Studies", completed: false }
      ]
    },
    {
      id: "m5",
      month: "Month 5 (Dec 6, 2026 - Jan 5, 2027)",
      title: "Internship Preparation & Full Mocks",
      description: "Data Analyst Internship Applications, GATE Full Length Mock Exams 1-10.",
      completionPercent: 0,
      tasks: [
        { text: "10 Full-Length GATE Mock Exams", completed: false },
        { text: "Internship Applications & HR Interview Prep", completed: false }
      ]
    },
    {
      id: "m6",
      month: "Month 6 (Jan 6 - Feb 5, 2027)",
      title: "Final Revision & GATE 2027 Exam",
      description: "Formula revision, mistake log analysis, confidence building & GATE 2027 Execution.",
      completionPercent: 0,
      tasks: [
        { text: "Short Notes & Formula Booklet Revision", completed: false },
        { text: "Final GATE 2027 Exam Execution", completed: false }
      ]
    }
  ],

  settings: {
    userName: "Sai Mukesh",
    theme: "light",
    motto: "Small daily improvements lead to remarkable results."
  }
};
