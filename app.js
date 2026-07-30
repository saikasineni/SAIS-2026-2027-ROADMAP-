/* ----------------------------------------------------
   SAI'S 2026 & 2027 ROADMAP - Main Application Logic
   ---------------------------------------------------- */

class App {
  constructor() {
    this.currentTab = "dashboard";
    this.initTheme();
    this.initEventListeners();
  }

  initTheme() {
    const savedTheme = window.store.data.settings.theme || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }

  toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    window.store.data.settings.theme = next;
    window.store.save();
    this.showToast(`Switched to ${next} theme`);
    this.refreshCurrentView();
  }

  initEventListeners() {
    // Hash change routing
    window.addEventListener("hashchange", () => this.handleRoute());
    window.addEventListener("DOMContentLoaded", () => {
      this.handleRoute();
      this.initLucideIcons();
    });
  }

  initLucideIcons() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  handleRoute() {
    const hash = window.location.hash.replace("#", "") || "dashboard";
    this.navigateToTab(hash, false);
  }

  navigateToTab(tabId, updateHash = true) {
    this.currentTab = tabId;
    if (updateHash) {
      window.location.hash = tabId;
    }

    // Update active state in nav items
    document.querySelectorAll(".nav-item").forEach(item => {
      if (item.getAttribute("data-tab") === tabId) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    // Update page title
    const titles = {
      dashboard: "Dashboard",
      gate: "GATE 2027",
      analytics: "Data Analytics",
      research: "Research & Career",
      journal: "Daily Journal",
      reviews: "Reviews",
      roadmap: "Roadmap Tracker",
      habits: "Habit Tracker",
      search: "Search",
      settings: "Settings"
    };
    const titleElem = document.getElementById("pageTitle");
    if (titleElem) titleElem.textContent = titles[tabId] || "Dashboard";

    this.renderCurrentView();
  }

  renderCurrentView() {
    const container = document.getElementById("viewContainer");
    if (!container) return;

    switch (this.currentTab) {
      case "dashboard":
        container.innerHTML = window.AppViews.renderDashboard(window.store);
        setTimeout(() => {
          window.AppCharts.renderCategoryPieChart("dashboardPieChart", window.store);
          window.AppCharts.renderWeeklyTrendChart("dashboardWeeklyChart", window.store);
          window.AppCharts.renderActivityHeatmap("dashboardHeatmap", window.store);
        }, 50);
        break;

      case "gate":
        container.innerHTML = window.AppViews.renderGATE(window.store);
        setTimeout(() => {
          window.AppCharts.renderGateSubjectChart("gateSubjectChart", window.store);
        }, 50);
        break;

      case "analytics":
        container.innerHTML = window.AppViews.renderAnalytics(window.store);
        break;

      case "research":
        container.innerHTML = window.AppViews.renderResearch(window.store);
        break;

      case "journal":
        container.innerHTML = window.AppViews.renderJournal(window.store);
        break;

      case "reviews":
        container.innerHTML = window.AppViews.renderReviews(window.store);
        break;

      case "roadmap":
        container.innerHTML = window.AppViews.renderRoadmap(window.store);
        break;

      case "habits":
        container.innerHTML = window.AppViews.renderHabits(window.store);
        break;

      case "search":
        container.innerHTML = window.AppViews.renderSearch(window.store);
        break;

      case "settings":
        container.innerHTML = window.AppViews.renderSettings(window.store);
        break;

      default:
        container.innerHTML = window.AppViews.renderDashboard(window.store);
        break;
    }

    this.initLucideIcons();
  }

  refreshCurrentView() {
    this.renderCurrentView();
  }

  // --- MODALS & QUICK ADD ---
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add("active");
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove("active");
  }

  openQuickAddModal() {
    this.openModal("quickAddModal");
  }

  openAddGateModal() {
    this.openModal("gateModal");
  }

  openAddAnalyticsModal() {
    this.openModal("analyticsModal");
  }

  openAddResearchModal() {
    this.openModal("researchModal");
  }

  // --- FORM HANDLERS ---
  handleGateSubmit(e) {
    e.preventDefault();
    const entry = {
      date: document.getElementById("gateDate").value,
      subject: document.getElementById("gateSubject").value,
      topic: document.getElementById("gateTopic").value,
      revisionDone: document.getElementById("gateRevision").checked,
      pyqsSolved: parseInt(document.getElementById("gatePyqs").value) || 0,
      questionsSolved: parseInt(document.getElementById("gateQuestions").value) || 0,
      studyHours: parseFloat(document.getElementById("gateHours").value) || 0,
      confidence: parseInt(document.getElementById("gateConfidence").value) || 3,
      difficulty: document.getElementById("gateDifficulty").value,
      notes: document.getElementById("gateNotes").value,
      status: document.getElementById("gateStatus").value
    };

    window.store.addGateEntry(entry);
    this.closeModal("gateModal");
    this.closeModal("quickAddModal");
    this.showToast("GATE study entry logged!");
    this.refreshCurrentView();
  }

  handleAnalyticsSubmit(e) {
    e.preventDefault();
    const entry = {
      date: document.getElementById("daDate").value,
      module: document.getElementById("daModule").value,
      topic: document.getElementById("daTopic").value,
      platform: document.getElementById("daPlatform").value,
      videoCompleted: document.getElementById("daVideo").checked,
      practiceCompleted: document.getElementById("daPractice").checked,
      miniProject: document.getElementById("daProject").value,
      studyHours: parseFloat(document.getElementById("daHours").value) || 0,
      confidence: parseInt(document.getElementById("daConfidence").value) || 3,
      notes: document.getElementById("daNotes").value
    };

    window.store.addAnalyticsEntry(entry);
    this.closeModal("analyticsModal");
    this.closeModal("quickAddModal");
    this.showToast("Data Analytics entry logged!");
    this.refreshCurrentView();
  }

  handleResearchSubmit(e) {
    e.preventDefault();
    const entry = {
      date: document.getElementById("resDate").value,
      category: document.getElementById("resCategory").value,
      topic: document.getElementById("resTopic").value,
      source: document.getElementById("resSource").value,
      timeSpentMinutes: parseInt(document.getElementById("resTime").value) || 30,
      keyLearnings: document.getElementById("resLearnings").value,
      actionItems: document.getElementById("resActions").value,
      usefulLinks: document.getElementById("resLinks").value,
      notes: document.getElementById("resNotes").value
    };

    window.store.addResearchEntry(entry);
    this.closeModal("researchModal");
    this.closeModal("quickAddModal");
    this.showToast("Research entry logged!");
    this.refreshCurrentView();
  }

  handleJournalSubmit(e) {
    e.preventDefault();
    const entry = {
      date: document.getElementById("jourDate").value,
      mood: document.getElementById("jourMood").value,
      productivityScore: parseInt(document.getElementById("jourScore").value) || 5,
      wins: document.getElementById("jourWins").value,
      challenges: document.getElementById("jourChallenges").value,
      learned: document.getElementById("jourLearned").value,
      tomorrowGoal: document.getElementById("jourTomorrow").value
    };

    window.store.addJournalEntry(entry);
    this.showToast("Daily Journal saved!");
    this.refreshCurrentView();
  }

  // --- UNIFIED SEARCH ---
  handleSearchQuery(query) {
    const container = document.getElementById("searchResultsContainer");
    if (!container) return;

    if (!query || query.trim() === "") {
      container.innerHTML = `<p style="color:var(--text-muted); grid-column:1/-1;">Type a query above to search entries...</p>`;
      return;
    }

    const q = query.toLowerCase();
    let results = [];

    // Search GATE
    window.store.data.gateEntries.forEach(e => {
      if (e.subject.toLowerCase().includes(q) || e.topic.toLowerCase().includes(q) || (e.notes && e.notes.toLowerCase().includes(q))) {
        results.push({ type: "GATE", title: `${e.subject}: ${e.topic}`, subtitle: `Date: ${e.date} | Hours: ${e.studyHours}h`, notes: e.notes });
      }
    });

    // Search Analytics
    window.store.data.analyticsEntries.forEach(e => {
      if (e.module.toLowerCase().includes(q) || e.topic.toLowerCase().includes(q) || (e.notes && e.notes.toLowerCase().includes(q))) {
        results.push({ type: "Analytics", title: `${e.module}: ${e.topic}`, subtitle: `Date: ${e.date} | Hours: ${e.studyHours}h`, notes: e.notes });
      }
    });

    // Search Research
    window.store.data.researchEntries.forEach(e => {
      if (e.category.toLowerCase().includes(q) || e.topic.toLowerCase().includes(q) || (e.keyLearnings && e.keyLearnings.toLowerCase().includes(q))) {
        results.push({ type: "Research", title: `${e.category}: ${e.topic}`, subtitle: `Date: ${e.date} | Duration: ${e.timeSpentMinutes} mins`, notes: e.keyLearnings });
      }
    });

    if (results.length === 0) {
      container.innerHTML = `<p style="color:var(--text-muted); grid-column:1/-1;">No matching records found for "${query}".</p>`;
      return;
    }

    container.innerHTML = results.map(r => `
      <div class="card">
        <span class="badge ${r.type === 'GATE' ? 'badge-blue' : r.type === 'Analytics' ? 'badge-green' : 'badge-purple'}">${r.type}</span>
        <h4 style="font-size:1rem; font-weight:700; margin-top:0.5rem;">${r.title}</h4>
        <p style="font-size:0.8rem; color:var(--text-muted);">${r.subtitle}</p>
        ${r.notes ? `<p style="font-size:0.85rem; margin-top:0.5rem;">${r.notes}</p>` : ''}
      </div>
    `).join('');
  }

  // --- IMPORT ---
  handleFileImport(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const success = window.store.importJSON(evt.target.result);
      if (success) {
        this.showToast("Backup restored successfully!");
        this.refreshCurrentView();
      } else {
        alert("Failed to import JSON file. Please ensure it is a valid backup.");
      }
    };
    reader.readAsText(file);
  }

  // --- TOAST SYSTEM ---
  showToast(message) {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<span>✨</span><span>${message}</span>`;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

window.app = new App();
