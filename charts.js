/* ----------------------------------------------------
   SAI'S 2026 & 2027 ROADMAP - Chart & Heatmap Utilities
   ---------------------------------------------------- */

window.AppCharts = {
  instances: {},

  destroyChart(id) {
    if (this.instances[id]) {
      this.instances[id].destroy();
      delete this.instances[id];
    }
  },

  // 1. Study Distribution Pie/Doughnut Chart
  renderCategoryPieChart(canvasId, store) {
    this.destroyChart(canvasId);
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const gateHrs = store.getTotalStudyHours("gate");
    const daHrs = store.getTotalStudyHours("analytics");
    const resHrs = store.getTotalStudyHours("research");

    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const textColor = isDark ? "#f8fafc" : "#0f172a";

    this.instances[canvasId] = new Chart(canvas, {
      type: "doughnut",
      data: {
        labels: ["GATE 2027", "Data Analytics", "Research & Career"],
        datasets: [{
          data: [gateHrs, daHrs, resHrs],
          backgroundColor: ["#2563eb", "#10b981", "#8b5cf6"],
          borderWidth: 2,
          borderColor: isDark ? "#151d2a" : "#ffffff"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: { color: textColor, font: { family: 'Inter', size: 12 } }
          },
          tooltip: {
            callbacks: {
              label: (context) => ` ${context.label}: ${context.raw.toFixed(1)} Hours`
            }
          }
        }
      }
    });
  },

  // 2. Weekly Study Hours Bar Chart
  renderWeeklyTrendChart(canvasId, store) {
    this.destroyChart(canvasId);
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const textColor = isDark ? "#94a3b8" : "#64748b";
    const gridColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";

    // Mock 6 weeks trend
    const labels = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"];
    const gateData = [20, 24, 28, 30, 25, 22];
    const daData = [12, 14, 15, 18, 16, 15];
    const resData = [5, 6, 8, 7, 6, 5];

    this.instances[canvasId] = new Chart(canvas, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          { label: "GATE (hrs)", data: gateData, backgroundColor: "#2563eb", borderRadius: 4 },
          { label: "Analytics (hrs)", data: daData, backgroundColor: "#10b981", borderRadius: 4 },
          { label: "Research (hrs)", data: resData, backgroundColor: "#8b5cf6", borderRadius: 4 }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { stacked: true, ticks: { color: textColor }, grid: { display: false } },
          y: { stacked: true, ticks: { color: textColor }, grid: { color: gridColor } }
        },
        plugins: {
          legend: { position: "top", labels: { color: textColor, font: { family: 'Inter', size: 12 } } }
        }
      }
    });
  },

  // 3. GATE Subject Progress Bar Chart
  renderGateSubjectChart(canvasId, store) {
    this.destroyChart(canvasId);
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const textColor = isDark ? "#94a3b8" : "#64748b";
    const gridColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";

    const subjects = {};
    store.data.gateEntries.forEach(e => {
      subjects[e.subject] = (subjects[e.subject] || 0) + (parseFloat(e.studyHours) || 0);
    });

    const labels = Object.keys(subjects).length ? Object.keys(subjects) : ["Operating Systems", "DBMS", "DSA", "Discrete Math"];
    const dataVals = Object.keys(subjects).length ? Object.values(subjects) : [15, 12, 18, 10];

    this.instances[canvasId] = new Chart(canvas, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          label: "Hours Spent",
          data: dataVals,
          backgroundColor: "#3b82f6",
          borderRadius: 6
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { ticks: { color: textColor }, grid: { color: gridColor } },
          y: { ticks: { color: textColor }, grid: { display: false } }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  },

  // 4. Render GitHub-Style Calendar Heatmap
  renderActivityHeatmap(containerId, store) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";

    // Build map of date -> total hours
    const dateMap = {};
    const addHrs = (date, hrs) => {
      dateMap[date] = (dateMap[date] || 0) + hrs;
    };

    store.data.gateEntries.forEach(e => addHrs(e.date, parseFloat(e.studyHours) || 0));
    store.data.analyticsEntries.forEach(e => addHrs(e.date, parseFloat(e.studyHours) || 0));
    store.data.researchEntries.forEach(e => addHrs(e.date, (parseFloat(e.timeSpentMinutes) || 0) / 60));

    // Generate grid for 180 days (Aug 6, 2026 -> Feb 5, 2027)
    const startDate = new Date("2026-08-06");
    const grid = document.createElement("div");
    grid.className = "heatmap-grid";

    for (let i = 0; i < 182; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      const dStr = d.toISOString().split("T")[0];
      const hours = dateMap[dStr] || 0;

      let level = 0;
      if (hours > 0 && hours <= 2) level = 1;
      else if (hours > 2 && hours <= 4) level = 2;
      else if (hours > 4 && hours <= 6) level = 3;
      else if (hours > 6) level = 4;

      const cell = document.createElement("div");
      cell.className = "heatmap-cell";
      cell.setAttribute("data-level", level);
      cell.setAttribute("title", `${dStr}: ${hours.toFixed(1)} hrs study`);
      grid.appendChild(cell);
    }

    container.appendChild(grid);
  }
};
