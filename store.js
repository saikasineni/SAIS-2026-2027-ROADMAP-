/* ----------------------------------------------------
   SAI'S 2026 & 2027 ROADMAP - State & LocalStorage Store
   ---------------------------------------------------- */

const STORAGE_KEY = "sais_roadmap_data_v1";

class AppStore {
  constructor() {
    this.data = this.loadFromStorage();
  }

  loadFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (err) {
      console.error("Error reading LocalStorage", err);
    }
    // Default to seed data
    return JSON.parse(JSON.stringify(window.SEED_DATA));
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (err) {
      console.error("Error saving to LocalStorage", err);
    }
  }

  resetToDemoData() {
    this.data = JSON.parse(JSON.stringify(window.SEED_DATA));
    this.save();
  }

  clearAllData() {
    this.data = {
      gateEntries: [],
      analyticsEntries: [],
      researchEntries: [],
      journalEntries: [],
      weeklyReviews: [],
      monthlyReviews: [],
      habits: {},
      roadmap: JSON.parse(JSON.stringify(window.SEED_DATA.roadmap)),
      settings: JSON.parse(JSON.stringify(window.SEED_DATA.settings))
    };
    this.save();
  }

  // --- GATE CRUD ---
  addGateEntry(entry) {
    entry.id = "gate-" + Date.now();
    this.data.gateEntries.unshift(entry);
    this.save();
    return entry;
  }

  deleteGateEntry(id) {
    this.data.gateEntries = this.data.gateEntries.filter(e => e.id !== id);
    this.save();
  }

  // --- ANALYTICS CRUD ---
  addAnalyticsEntry(entry) {
    entry.id = "da-" + Date.now();
    this.data.analyticsEntries.unshift(entry);
    this.save();
    return entry;
  }

  deleteAnalyticsEntry(id) {
    this.data.analyticsEntries = this.data.analyticsEntries.filter(e => e.id !== id);
    this.save();
  }

  // --- RESEARCH CRUD ---
  addResearchEntry(entry) {
    entry.id = "res-" + Date.now();
    this.data.researchEntries.unshift(entry);
    this.save();
    return entry;
  }

  deleteResearchEntry(id) {
    this.data.researchEntries = this.data.researchEntries.filter(e => e.id !== id);
    this.save();
  }

  // --- JOURNAL CRUD ---
  addJournalEntry(entry) {
    entry.id = "jour-" + Date.now();
    // Replace if entry for same date exists
    this.data.journalEntries = this.data.journalEntries.filter(j => j.date !== entry.date);
    this.data.journalEntries.unshift(entry);
    this.save();
    return entry;
  }

  // --- REVIEWS ---
  addWeeklyReview(review) {
    review.id = "week-" + Date.now();
    this.data.weeklyReviews.unshift(review);
    this.save();
  }

  addMonthlyReview(review) {
    review.id = "month-" + Date.now();
    this.data.monthlyReviews.unshift(review);
    this.save();
  }

  // --- HABITS ---
  toggleHabit(dateStr, habitKey) {
    if (!this.data.habits[dateStr]) {
      this.data.habits[dateStr] = {};
    }
    this.data.habits[dateStr][habitKey] = !this.data.habits[dateStr][habitKey];
    this.save();
  }

  // --- ROADMAP ---
  toggleRoadmapTask(milestoneId, taskIndex) {
    const milestone = this.data.roadmap.find(m => m.id === milestoneId);
    if (milestone && milestone.tasks[taskIndex]) {
      milestone.tasks[taskIndex].completed = !milestone.tasks[taskIndex].completed;
      // recalculate percentage
      const completedCount = milestone.tasks.filter(t => t.completed).length;
      milestone.completionPercent = Math.round((completedCount / milestone.tasks.length) * 100);
      this.save();
    }
  }

  // --- COMPUTED STATS ---
  calculateCurrentStreak() {
    const allDates = new Set([
      ...this.data.gateEntries.map(e => e.date),
      ...this.data.analyticsEntries.map(e => e.date),
      ...this.data.researchEntries.map(e => e.date)
    ]);
    
    if (allDates.size === 0) return 0;
    
    // Sort dates descending
    const sorted = Array.from(allDates).sort().reverse();
    let streak = 0;
    let todayStr = new Date().toISOString().split("T")[0];
    
    // Check if user has entry today or yesterday
    let checkDate = new Date();
    for (let i = 0; i < 365; i++) {
      let dStr = checkDate.toISOString().split("T")[0];
      if (allDates.has(dStr)) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        // If today hasn't been logged yet, check if yesterday was logged before breaking
        if (i === 0) {
          checkDate.setDate(checkDate.getDate() - 1);
          continue;
        }
        break;
      }
    }
    return Math.max(streak, sorted.length > 0 ? 1 : 0); // Friendly fallback for demo
  }

  getTotalStudyHours(filterSection = null) {
    let gate = this.data.gateEntries.reduce((acc, curr) => acc + (parseFloat(curr.studyHours) || 0), 0);
    let da = this.data.analyticsEntries.reduce((acc, curr) => acc + (parseFloat(curr.studyHours) || 0), 0);
    let res = this.data.researchEntries.reduce((acc, curr) => acc + ((parseFloat(curr.timeSpentMinutes) || 0) / 60), 0);

    if (filterSection === "gate") return gate;
    if (filterSection === "analytics") return da;
    if (filterSection === "research") return res;
    return gate + da + res;
  }

  getRoadmapOverallCompletion() {
    if (!this.data.roadmap || this.data.roadmap.length === 0) return 0;
    const sum = this.data.roadmap.reduce((acc, m) => acc + (m.completionPercent || 0), 0);
    return Math.round(sum / this.data.roadmap.length);
  }

  // --- EXPORT & IMPORT ---
  exportJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `sais_roadmap_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  exportCSV() {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Category,Date,Subject/Module/Topic,Hours/Duration,Notes\n";

    this.data.gateEntries.forEach(e => {
      csvContent += `"GATE","${e.date}","${e.subject} - ${e.topic}","${e.studyHours} hrs","${(e.notes || '').replace(/"/g, '""')}"\n`;
    });
    this.data.analyticsEntries.forEach(e => {
      csvContent += `"Analytics","${e.date}","${e.module} - ${e.topic}","${e.studyHours} hrs","${(e.notes || '').replace(/"/g, '""')}"\n`;
    });
    this.data.researchEntries.forEach(e => {
      csvContent += `"Research","${e.date}","${e.category} - ${e.topic}","${e.timeSpentMinutes} mins","${(e.notes || '').replace(/"/g, '""')}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sais_roadmap_summary_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  importJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && typeof parsed === 'object') {
        this.data = parsed;
        this.save();
        return true;
      }
    } catch (e) {
      console.error("Invalid JSON import", e);
    }
    return false;
  }
}

window.store = new AppStore();
