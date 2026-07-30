/* ----------------------------------------------------
   SAI'S 2026 & 2027 ROADMAP - Dynamic Tab Views Renderer
   ---------------------------------------------------- */

window.AppViews = {
  // 1. Dashboard View
  renderDashboard(store) {
    const todayStr = new Date().toISOString().split("T")[0];
    const totalHours = store.getTotalStudyHours();
    const streak = store.calculateCurrentStreak();
    const roadmapPercent = store.getRoadmapOverallCompletion();

    // Calculate Today's study hours
    const todayGate = store.data.gateEntries.filter(e => e.date === todayStr).reduce((a, c) => a + (parseFloat(c.studyHours) || 0), 0);
    const todayDa = store.data.analyticsEntries.filter(e => e.date === todayStr).reduce((a, c) => a + (parseFloat(c.studyHours) || 0), 0);
    const todayRes = store.data.researchEntries.filter(e => e.date === todayStr).reduce((a, c) => a + ((parseFloat(c.timeSpentMinutes) || 0)/60), 0);
    const todayTotalHours = (todayGate + todayDa + todayRes).toFixed(1);

    const gateCompletedCount = store.data.gateEntries.filter(e => e.status === "Completed").length;
    const gatePendingCount = store.data.gateEntries.filter(e => e.status === "Needs Revision").length;

    return `
      <!-- Top Stat Cards -->
      <div class="grid-4">
        <div class="card stat-card">
          <div>
            <div class="stat-title">Today's Study</div>
            <div class="stat-value">${todayTotalHours} <span style="font-size:1rem; font-weight:normal;">hrs</span></div>
            <div class="stat-subtext">${todayStr}</div>
          </div>
          <div class="stat-icon stat-blue">⏱️</div>
        </div>

        <div class="card stat-card">
          <div>
            <div class="stat-title">Current Streak</div>
            <div class="stat-value" style="color:var(--accent-green);">${streak} <span style="font-size:1rem; font-weight:normal;">Days 🔥</span></div>
            <div class="stat-subtext">Consistency Record</div>
          </div>
          <div class="stat-icon stat-green">🔥</div>
        </div>

        <div class="card stat-card">
          <div>
            <div class="stat-title">Total Progress</div>
            <div class="stat-value">${totalHours.toFixed(1)} <span style="font-size:1rem; font-weight:normal;">hrs</span></div>
            <div class="stat-subtext">Cumulated Hours</div>
          </div>
          <div class="stat-icon stat-amber">⚡</div>
        </div>

        <div class="card stat-card">
          <div>
            <div class="stat-title">Roadmap Completion</div>
            <div class="stat-value">${roadmapPercent}%</div>
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" style="width: ${roadmapPercent}%"></div>
            </div>
          </div>
          <div class="stat-icon stat-purple">🎯</div>
        </div>
      </div>

      <!-- Overview Charts Grid -->
      <div class="grid-2">
        <div class="card">
          <div class="section-header">
            <h3 class="section-title">📊 Category Study Distribution</h3>
          </div>
          <div style="height: 260px; position: relative;">
            <canvas id="dashboardPieChart"></canvas>
          </div>
        </div>

        <div class="card">
          <div class="section-header">
            <h3 class="section-title">📈 Weekly Study Trend</h3>
          </div>
          <div style="height: 260px; position: relative;">
            <canvas id="dashboardWeeklyChart"></canvas>
          </div>
        </div>
      </div>

      <!-- Activity Heatmap & Today Quick Habit Check -->
      <div class="grid-2">
        <div class="card">
          <div class="section-header">
            <h3 class="section-title">🟩 6-Month Study Consistency Heatmap</h3>
            <span class="badge badge-green">Aug 2026 - Feb 2027</span>
          </div>
          <div id="dashboardHeatmap" class="heatmap-container"></div>
        </div>

        <div class="card">
          <div class="section-header">
            <h3 class="section-title">✅ Today's Quick Habits</h3>
            <button class="btn btn-outline" onclick="window.app.navigateToTab('habits')">View Full Habit Tracker</button>
          </div>
          ${this.renderQuickHabitList(store, todayStr)}
        </div>
      </div>
    `;
  },

  renderQuickHabitList(store, dateStr) {
    const todayHabits = store.data.habits[dateStr] || {};
    const habitKeys = [
      { key: "wake5am", label: "Wake up at 5 AM" },
      { key: "gateStudy", label: "GATE Study Session" },
      { key: "englishReading", label: "English Reading" },
      { key: "analytics", label: "Analytics Course" },
      { key: "research", label: "Research & Career" },
      { key: "sleep1030pm", label: "Sleep Before 10:30 PM" }
    ];

    return `
      <div style="display:flex; flex-direction:column; gap:0.65rem;">
        ${habitKeys.map(h => `
          <label style="display:flex; align-items:center; gap:0.75rem; font-size:0.9rem; cursor:pointer;">
            <input type="checkbox" class="habit-checkbox" 
                   ${todayHabits[h.key] ? "checked" : ""} 
                   onchange="window.store.toggleHabit('${dateStr}', '${h.key}'); window.app.refreshCurrentView();">
            <span style="${todayHabits[h.key] ? 'text-decoration:line-through; color:var(--text-muted);' : ''}">${h.label}</span>
          </label>
        `).join('')}
      </div>
    `;
  },

  // 2. GATE 2027 View
  renderGATE(store) {
    const totalGateHours = store.getTotalStudyHours("gate");
    const topicsCount = store.data.gateEntries.length;
    const pyqsCount = store.data.gateEntries.reduce((acc, curr) => acc + (parseInt(curr.pyqsSolved) || 0), 0);
    const revisionCount = store.data.gateEntries.filter(e => e.revisionDone).length;

    return `
      <div class="section-header">
        <div>
          <h2 style="font-size:1.5rem; font-weight:700;">🎓 GATE 2027 Preparation</h2>
          <p style="color:var(--text-muted); font-size:0.875rem;">Track subjects, topics, PYQs, revisions, and study hours.</p>
        </div>
        <button class="btn btn-primary" onclick="window.app.openAddGateModal()">+ Log GATE Study</button>
      </div>

      <!-- GATE KPI Grid -->
      <div class="grid-4">
        <div class="card stat-card">
          <div>
            <div class="stat-title">Total Study Hours</div>
            <div class="stat-value">${totalGateHours.toFixed(1)} hrs</div>
          </div>
          <div class="stat-icon stat-blue">📚</div>
        </div>

        <div class="card stat-card">
          <div>
            <div class="stat-title">Topics Logged</div>
            <div class="stat-value">${topicsCount}</div>
          </div>
          <div class="stat-icon stat-green">📑</div>
        </div>

        <div class="card stat-card">
          <div>
            <div class="stat-title">PYQs Solved</div>
            <div class="stat-value">${pyqsCount}</div>
          </div>
          <div class="stat-icon stat-amber">📝</div>
        </div>

        <div class="card stat-card">
          <div>
            <div class="stat-title">Revisions Done</div>
            <div class="stat-value">${revisionCount}</div>
          </div>
          <div class="stat-icon stat-purple">🔄</div>
        </div>
      </div>

      <!-- Subject Progress Chart -->
      <div class="card" style="margin-bottom:1.5rem;">
        <h3 class="section-title" style="margin-bottom:1rem;">Subject Breakdown (Hours Spent)</h3>
        <div style="height: 240px; position: relative;">
          <canvas id="gateSubjectChart"></canvas>
        </div>
      </div>

      <!-- GATE Data Table -->
      <div class="card">
        <h3 class="section-title" style="margin-bottom:1rem;">GATE Learning Log</h3>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Subject</th>
                <th>Topic Learned</th>
                <th>Hours</th>
                <th>PYQs</th>
                <th>Revision</th>
                <th>Confidence</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${store.data.gateEntries.map(e => `
                <tr>
                  <td>${e.date}</td>
                  <td><strong>${e.subject}</strong></td>
                  <td>${e.topic}</td>
                  <td>${e.studyHours}h</td>
                  <td>${e.pyqsSolved}</td>
                  <td>${e.revisionDone ? '<span class="badge badge-green">Yes</span>' : '<span class="badge badge-amber">No</span>'}</td>
                  <td><span class="star-rating">${'★'.repeat(e.confidence)}${'☆'.repeat(5 - e.confidence)}</span></td>
                  <td>
                    ${e.status === 'Completed' ? '<span class="badge badge-green">Completed</span>' : 
                      e.status === 'Needs Revision' ? '<span class="badge badge-amber">Needs Revision</span>' : 
                      '<span class="badge badge-rose">Skipped</span>'}
                  </td>
                  <td>
                    <button class="btn btn-outline" style="padding:0.2rem 0.5rem; font-size:0.75rem;" onclick="window.store.deleteGateEntry('${e.id}'); window.app.refreshCurrentView();">Delete</button>
                  </td>
                </tr>
              `).join('')}
              ${store.data.gateEntries.length === 0 ? '<tr><td colspan="9" style="text-align:center; padding:2rem; color:var(--text-muted);">No GATE entries yet. Click "+ Log GATE Study" to start!</td></tr>' : ''}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 3. Data Analytics View
  renderAnalytics(store) {
    const totalAnalyticsHours = store.getTotalStudyHours("analytics");
    const modulesCount = new Set(store.data.analyticsEntries.map(e => e.module)).size;
    const projectsCount = store.data.analyticsEntries.filter(e => e.miniProject && e.miniProject.trim() !== "").length;

    return `
      <div class="section-header">
        <div>
          <h2 style="font-size:1.5rem; font-weight:700;">📈 Data Analytics Learning</h2>
          <p style="color:var(--text-muted); font-size:0.875rem;">Track SQL, Python, Power BI, Excel, statistics, and mini projects.</p>
        </div>
        <button class="btn btn-primary" onclick="window.app.openAddAnalyticsModal()">+ Log Analytics Session</button>
      </div>

      <!-- KPI Grid -->
      <div class="grid-3">
        <div class="card stat-card">
          <div>
            <div class="stat-title">Analytics Hours</div>
            <div class="stat-value">${totalAnalyticsHours.toFixed(1)} hrs</div>
          </div>
          <div class="stat-icon stat-green">💻</div>
        </div>

        <div class="card stat-card">
          <div>
            <div class="stat-title">Modules Practiced</div>
            <div class="stat-value">${modulesCount}</div>
          </div>
          <div class="stat-icon stat-blue">🧩</div>
        </div>

        <div class="card stat-card">
          <div>
            <div class="stat-title">Mini Projects Built</div>
            <div class="stat-value">${projectsCount}</div>
          </div>
          <div class="stat-icon stat-purple">🚀</div>
        </div>
      </div>

      <!-- Data Table -->
      <div class="card">
        <h3 class="section-title" style="margin-bottom:1rem;">Analytics Learning Log</h3>
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Module</th>
                <th>Topic</th>
                <th>Platform</th>
                <th>Mini Project</th>
                <th>Hours</th>
                <th>Confidence</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${store.data.analyticsEntries.map(e => `
                <tr>
                  <td>${e.date}</td>
                  <td><span class="badge badge-blue">${e.module}</span></td>
                  <td><strong>${e.topic}</strong></td>
                  <td>${e.platform || '-'}</td>
                  <td>${e.miniProject ? `<span class="badge badge-purple">📁 ${e.miniProject}</span>` : '-'}</td>
                  <td>${e.studyHours}h</td>
                  <td><span class="star-rating">${'★'.repeat(e.confidence)}${'☆'.repeat(5 - e.confidence)}</span></td>
                  <td>
                    <button class="btn btn-outline" style="padding:0.2rem 0.5rem; font-size:0.75rem;" onclick="window.store.deleteAnalyticsEntry('${e.id}'); window.app.refreshCurrentView();">Delete</button>
                  </td>
                </tr>
              `).join('')}
              ${store.data.analyticsEntries.length === 0 ? '<tr><td colspan="8" style="text-align:center; padding:2rem; color:var(--text-muted);">No Analytics entries yet. Click "+ Log Analytics Session" to start!</td></tr>' : ''}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 4. Research View
  renderResearch(store) {
    const totalResearchHours = store.getTotalStudyHours("research");
    const topicsCount = store.data.researchEntries.length;

    return `
      <div class="section-header">
        <div>
          <h2 style="font-size:1.5rem; font-weight:700;">🔬 Research & Career Growth</h2>
          <p style="color:var(--text-muted); font-size:0.875rem;">Track Data Science trends, Presentation skills, AI tools, and Book insights.</p>
        </div>
        <button class="btn btn-primary" onclick="window.app.openAddResearchModal()">+ Log Research Entry</button>
      </div>

      <div class="grid-2" style="margin-bottom:1.5rem;">
        <div class="card stat-card">
          <div>
            <div class="stat-title">Total Research Time</div>
            <div class="stat-value">${totalResearchHours.toFixed(1)} hrs</div>
          </div>
          <div class="stat-icon stat-purple">💡</div>
        </div>

        <div class="card stat-card">
          <div>
            <div class="stat-title">Topics Logged</div>
            <div class="stat-value">${topicsCount}</div>
          </div>
          <div class="stat-icon stat-amber">📖</div>
        </div>
      </div>

      <!-- Research Cards View -->
      <div class="grid-2">
        ${store.data.researchEntries.map(e => `
          <div class="card">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.5rem;">
              <span class="badge badge-purple">${e.category}</span>
              <span style="font-size:0.8rem; color:var(--text-muted);">${e.date} • ${e.timeSpentMinutes} mins</span>
            </div>
            <h4 style="font-size:1.1rem; font-weight:700; margin-bottom:0.5rem;">${e.topic}</h4>
            <p style="font-size:0.875rem; color:var(--text-main); margin-bottom:0.5rem;"><strong>Key Learnings:</strong> ${e.keyLearnings}</p>
            ${e.actionItems ? `<p style="font-size:0.85rem; color:var(--accent-green); margin-bottom:0.5rem;"><strong>Action Item:</strong> ${e.actionItems}</p>` : ''}
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.75rem; border-top:1px solid var(--border-color); padding-top:0.5rem;">
              <span style="font-size:0.75rem; color:var(--text-muted);">Source: ${e.source || 'Personal Notes'}</span>
              <button class="btn btn-outline" style="padding:0.2rem 0.5rem; font-size:0.75rem;" onclick="window.store.deleteResearchEntry('${e.id}'); window.app.refreshCurrentView();">Delete</button>
            </div>
          </div>
        `).join('')}
        ${store.data.researchEntries.length === 0 ? '<div class="card" style="grid-column:1/-1; text-align:center; padding:2rem; color:var(--text-muted);">No Research entries logged yet.</div>' : ''}
      </div>
    `;
  },

  // 5. Daily Journal View
  renderJournal(store) {
    return `
      <div class="section-header">
        <div>
          <h2 style="font-size:1.5rem; font-weight:700;">✍️ Daily Journal & Reflection</h2>
          <p style="color:var(--text-muted); font-size:0.875rem;">Record your daily wins, challenges, insights, and productivity score.</p>
        </div>
      </div>

      <div class="grid-2">
        <!-- New Entry Form -->
        <div class="card">
          <h3 class="section-title" style="margin-bottom:1rem;">Log Today's Reflection</h3>
          <form onsubmit="window.app.handleJournalSubmit(event)">
            <div class="form-grid">
              <div class="form-group">
                <label>Date</label>
                <input type="date" id="jourDate" class="form-control" value="${new Date().toISOString().split('T')[0]}" required>
              </div>

              <div class="form-group">
                <label>Mood</label>
                <select id="jourMood" class="form-control">
                  <option value="🚀">🚀 Highly Motivated</option>
                  <option value="😄">😄 Happy & Focused</option>
                  <option value="🙂">🙂 Steady Progress</option>
                  <option value="😐">😐 Neutral</option>
                  <option value="😓">😓 Tired / Challenged</option>
                </select>
              </div>

              <div class="form-group">
                <label>Productivity Score (1 - 10)</label>
                <input type="number" id="jourScore" class="form-control" min="1" max="10" value="9" required>
              </div>

              <div class="form-group full-width">
                <label>Today's Wins</label>
                <textarea id="jourWins" class="form-control" rows="2" placeholder="What went well today?"></textarea>
              </div>

              <div class="form-group full-width">
                <label>Today's Challenges</label>
                <textarea id="jourChallenges" class="form-control" rows="2" placeholder="What blocked or slowed you down?"></textarea>
              </div>

              <div class="form-group full-width">
                <label>What I Learned</label>
                <textarea id="jourLearned" class="form-control" rows="2" placeholder="Key technical or personal insights"></textarea>
              </div>

              <div class="form-group full-width">
                <label>Tomorrow's Top Goal</label>
                <input type="text" id="jourTomorrow" class="form-control" placeholder="Primary objective for tomorrow">
              </div>
            </div>
            <button type="submit" class="btn btn-primary" style="margin-top:1rem; width:100%;">Save Daily Journal</button>
          </form>
        </div>

        <!-- Journal History Timeline -->
        <div class="card">
          <h3 class="section-title" style="margin-bottom:1rem;">Past Reflections</h3>
          <div style="display:flex; flex-direction:column; gap:1rem; max-height: 600px; overflow-y:auto;">
            ${store.data.journalEntries.map(j => `
              <div style="border-left: 3px solid var(--primary); padding-left: 1rem; position:relative;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <strong style="font-size:0.95rem;">${j.date} ${j.mood}</strong>
                  <span class="badge badge-blue">Score: ${j.productivityScore}/10</span>
                </div>
                <p style="font-size:0.85rem; margin-top:0.35rem;"><strong>Wins:</strong> ${j.wins}</p>
                <p style="font-size:0.85rem; color:var(--text-muted);"><strong>Learned:</strong> ${j.learned}</p>
                <p style="font-size:0.85rem; color:var(--accent-green); margin-top:0.25rem;"><strong>Next:</strong> ${j.tomorrowGoal}</p>
              </div>
            `).join('')}
            ${store.data.journalEntries.length === 0 ? '<p style="color:var(--text-muted);">No journal entries recorded yet.</p>' : ''}
          </div>
        </div>
      </div>
    `;
  },

  // 6. Weekly & Monthly Reviews View
  renderReviews(store) {
    return `
      <div class="section-header">
        <div>
          <h2 style="font-size:1.5rem; font-weight:700;">📅 Reviews (Weekly & Monthly)</h2>
          <p style="color:var(--text-muted); font-size:0.875rem;">Sunday reflections and monthly milestone check-ins.</p>
        </div>
      </div>

      <div class="grid-2">
        <!-- Weekly Reviews -->
        <div class="card">
          <h3 class="section-title" style="margin-bottom:1rem;">Weekly Sunday Reviews</h3>
          <div style="display:flex; flex-direction:column; gap:1rem;">
            ${store.data.weeklyReviews.map(w => `
              <div style="background-color:var(--bg-main); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1rem;">
                <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
                  <strong>Week Ending ${w.weekEndingDate}</strong>
                  <span class="badge badge-green">Score: ${w.weeklyScore}/10</span>
                </div>
                <p style="font-size:0.85rem;"><strong>Hours Studied:</strong> ${w.hoursStudied} hrs | <strong>Projects:</strong> ${w.projectsCompleted}</p>
                <p style="font-size:0.85rem; margin-top:0.25rem;"><strong>What Went Well:</strong> ${w.whatWentWell}</p>
                <p style="font-size:0.85rem; color:var(--accent-amber); margin-top:0.25rem;"><strong>Best Achievement:</strong> ${w.bestAchievement}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Monthly Progress -->
        <div class="card">
          <h3 class="section-title" style="margin-bottom:1rem;">Monthly Milestones</h3>
          <div style="display:flex; flex-direction:column; gap:1rem;">
            ${store.data.monthlyReviews.map(m => `
              <div style="background-color:var(--bg-main); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1rem;">
                <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
                  <strong>${m.monthName}</strong>
                  <span class="badge badge-purple">Prod. Score: ${m.overallProductivityScore}</span>
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem; font-size:0.85rem;">
                  <div>GATE Hours: <strong>${m.gateHours}h</strong></div>
                  <div>Analytics Hours: <strong>${m.analyticsHours}h</strong></div>
                  <div>Research Hours: <strong>${m.researchHours}h</strong></div>
                  <div>Streak: <strong>${m.streakDays} days</strong></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  // 7. 6-Month Roadmap View
  renderRoadmap(store) {
    return `
      <div class="section-header">
        <div>
          <h2 style="font-size:1.5rem; font-weight:700;">🗺️ 6-Month Master Roadmap</h2>
          <p style="color:var(--text-muted); font-size:0.875rem;">August 6, 2026 → February 5, 2027 Milestone Tracker.</p>
        </div>
      </div>

      <div class="roadmap-timeline">
        ${store.data.roadmap.map(m => `
          <div class="milestone-card ${m.completionPercent === 100 ? 'completed' : ''}">
            <div class="milestone-header">
              <div>
                <span class="badge badge-blue">${m.month}</span>
                <h3 style="font-size:1.15rem; font-weight:700; margin-top:0.25rem;">${m.title}</h3>
                <p style="font-size:0.875rem; color:var(--text-muted);">${m.description}</p>
              </div>
              <div style="text-align:right;">
                <span style="font-size:1.25rem; font-weight:700; color:var(--primary);">${m.completionPercent}%</span>
              </div>
            </div>
            <div class="progress-bar-bg" style="margin-bottom:1rem;">
              <div class="progress-bar-fill" style="width: ${m.completionPercent}%"></div>
            </div>
            <div style="display:flex; flex-direction:column; gap:0.5rem;">
              ${m.tasks.map((t, idx) => `
                <label style="display:flex; align-items:center; gap:0.6rem; font-size:0.9rem; cursor:pointer;">
                  <input type="checkbox" class="habit-checkbox" ${t.completed ? 'checked' : ''} 
                         onchange="window.store.toggleRoadmapTask('${m.id}', ${idx}); window.app.refreshCurrentView();">
                  <span style="${t.completed ? 'text-decoration:line-through; color:var(--text-muted);' : ''}">${t.text}</span>
                </label>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  // 8. Habit Tracker View
  renderHabits(store) {
    const dates = Object.keys(store.data.habits).sort().reverse();
    const habitKeys = [
      { key: "wake5am", label: "Wake 5 AM" },
      { key: "gateStudy", label: "GATE Study" },
      { key: "englishReading", label: "English Reading" },
      { key: "college", label: "College" },
      { key: "analytics", label: "Analytics" },
      { key: "research", label: "Research" },
      { key: "sleep1030pm", label: "Sleep < 10:30 PM" }
    ];

    return `
      <div class="section-header">
        <div>
          <h2 style="font-size:1.5rem; font-weight:700;">✅ Habit Tracker</h2>
          <p style="color:var(--text-muted); font-size:0.875rem;">Build daily consistency across all core habits.</p>
        </div>
      </div>

      <div class="card">
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Date</th>
                ${habitKeys.map(h => `<th style="text-align:center;">${h.label}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${dates.map(dStr => `
                <tr>
                  <td><strong>${dStr}</strong></td>
                  ${habitKeys.map(h => `
                    <td style="text-align:center;">
                      <input type="checkbox" class="habit-checkbox" 
                             ${store.data.habits[dStr][h.key] ? 'checked' : ''} 
                             onchange="window.store.toggleHabit('${dStr}', '${h.key}'); window.app.refreshCurrentView();">
                    </td>
                  `).join('')}
                </tr>
              `).join('')}
              ${dates.length === 0 ? '<tr><td colspan="8" style="text-align:center;">No habit records logged yet. Check habits on Dashboard!</td></tr>' : ''}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // 9. Unified Search View
  renderSearch(store) {
    return `
      <div class="section-header">
        <div>
          <h2 style="font-size:1.5rem; font-weight:700;">🔍 Unified Search</h2>
          <p style="color:var(--text-muted); font-size:0.875rem;">Search across all GATE entries, Analytics topics, Research, and Journal records.</p>
        </div>
      </div>

      <div class="card" style="margin-bottom:1.5rem;">
        <input type="text" id="searchInput" class="form-control" placeholder="Search by topic, subject, keyword, module..." 
               style="font-size:1.1rem; padding:0.85rem 1.1rem;" onkeyup="window.app.handleSearchQuery(this.value)">
      </div>

      <div id="searchResultsContainer" class="grid-2">
        <p style="color:var(--text-muted); grid-column:1/-1;">Type a query above to search entries...</p>
      </div>
    `;
  },

  // 10. Settings & Data Storage View
  renderSettings(store) {
    return `
      <div class="section-header">
        <div>
          <h2 style="font-size:1.5rem; font-weight:700;">⚙️ Settings & Data Management</h2>
          <p style="color:var(--text-muted); font-size:0.875rem;">Backup, export, restore, or reset your local tracker data.</p>
        </div>
      </div>

      <div class="grid-2">
        <div class="card">
          <h3 class="section-title" style="margin-bottom:1rem;">📥 Backup & Export</h3>
          <p style="font-size:0.875rem; color:var(--text-muted); margin-bottom:1rem;">Export all your study logs and reflections for offline safekeeping.</p>
          <div style="display:flex; gap:1rem; flex-wrap:wrap;">
            <button class="btn btn-primary" onclick="window.store.exportJSON()">Export JSON Backup</button>
            <button class="btn btn-outline" onclick="window.store.exportCSV()">Export CSV Summary</button>
            <button class="btn btn-outline" onclick="window.print()">🖨️ Print Summary</button>
          </div>
        </div>

        <div class="card">
          <h3 class="section-title" style="margin-bottom:1rem;">📤 Import & Restore</h3>
          <p style="font-size:0.875rem; color:var(--text-muted); margin-bottom:1rem;">Restore from a previously downloaded JSON backup file.</p>
          <input type="file" id="importJsonInput" accept=".json" class="form-control" style="margin-bottom:1rem;" onchange="window.app.handleFileImport(event)">
        </div>

        <div class="card" style="grid-column:1/-1;">
          <h3 class="section-title" style="margin-bottom:1rem; color:var(--accent-amber);">⚡ Reset & Demo Data</h3>
          <p style="font-size:0.875rem; color:var(--text-muted); margin-bottom:1rem;">Quickly populate demo data for testing or clear all local storage.</p>
          <div style="display:flex; gap:1rem;">
            <button class="btn btn-outline" onclick="window.store.resetToDemoData(); window.app.showToast('Demo data loaded successfully!'); window.app.refreshCurrentView();">Load Demo Data</button>
            <button class="btn btn-outline" style="border-color:var(--accent-rose); color:var(--accent-rose);" onclick="if(confirm('Are you sure you want to clear all data?')){ window.store.clearAllData(); window.app.refreshCurrentView(); }">Clear All Data</button>
          </div>
        </div>
      </div>
    `;
  }
};
