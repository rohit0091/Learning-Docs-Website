/**
 * Technical Learning & Daily Work Documentation Application Logic
 * Prushal Technology Pvt. Ltd. & Personal Development Journal
 */

// State Management
const state = {
    currentYear: 2026,
    currentMonth: 7, // 0-indexed: 7 is August
    activeView: "calendar-view",
    activeTopicId: "django-architecture",
    activeCategoryFilter: "all",
    theme: localStorage.getItem("prushal_docs_theme") || "light"
};

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initNavigation();
    initCalendarControls();
    renderCalendar(state.currentYear, state.currentMonth);
    renderKnowledgeSidebar();
    renderTopicArticle(state.activeTopicId);
    renderErrorsList();
    renderProjectsList();
    renderTestingChecklist();
    renderStatistics();
    initSearch();
    initKeyboardShortcuts();
});

// =============================================================================
// Theme Handling
// =============================================================================
function initTheme() {
    document.documentElement.setAttribute("data-theme", state.theme);
    updateThemeIcon();

    const toggleBtn = document.getElementById("themeToggleBtn");
    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            state.theme = state.theme === "light" ? "dark" : "light";
            document.documentElement.setAttribute("data-theme", state.theme);
            localStorage.setItem("prushal_docs_theme", state.theme);
            updateThemeIcon();
        });
    }
}

function updateThemeIcon() {
    const toggleBtn = document.getElementById("themeToggleBtn");
    if (toggleBtn) {
        toggleBtn.innerHTML = state.theme === "dark" ? "☀️" : "🌙";
        toggleBtn.setAttribute("title", `Switch to ${state.theme === 'dark' ? 'Light' : 'Dark'} Mode`);
    }
}

// =============================================================================
// View Navigation
// =============================================================================
function initNavigation() {
    const navButtons = document.querySelectorAll(".nav-item-btn");
    navButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetView = btn.getAttribute("data-view");
            if (targetView) {
                switchView(targetView);
            }
        });
    });
}

function switchView(viewId) {
    state.activeView = viewId;

    // Update Sidebar Active Button
    document.querySelectorAll(".nav-item-btn").forEach(btn => {
        if (btn.getAttribute("data-view") === viewId) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    // Toggle Section Views
    document.querySelectorAll(".section-view").forEach(view => {
        if (view.id === viewId) {
            view.classList.add("active");
        } else {
            view.classList.remove("active");
        }
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
}

// =============================================================================
// Robust Markdown & Technical Architecture Parser
// =============================================================================
function renderMarkdown(md) {
    if (!md) return "";

    // 1. Extract Fenced Code Blocks first to protect formatting
    const codeBlocks = [];
    let processed = md.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, (match, lang, code) => {
        const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`;
        const cleanLang = lang.trim() || "text";
        codeBlocks.push(`
            <div class="code-block-container">
                <div class="code-header">
                    <span class="code-lang-label">${cleanLang}</span>
                    <button class="btn-copy-code" onclick="copyCode(this)">Copy Code</button>
                </div>
                <pre class="code-content"><code>${escapeHTML(code.trim())}</code></pre>
            </div>
        `);
        return placeholder;
    });

    // 2. Parse Markdown Tables
    const tableRegex = /((?:\|[^\n]+\|\n?)+)/g;
    processed = processed.replace(tableRegex, (match) => {
        const lines = match.trim().split("\n").map(l => l.trim()).filter(l => l.length > 0);
        if (lines.length < 2) return match;

        // Check if second line is divider (e.g. |---|---|)
        const isDivider = /^\|[\s-:]+\|/.test(lines[1]);
        if (!isDivider) return match;

        const headers = lines[0].split("|").filter((c, i, arr) => i > 0 && i < arr.length - 1).map(c => c.trim());
        const rowLines = lines.slice(2);

        let tableHTML = `<div class="table-responsive"><table class="doc-table"><thead><tr>`;
        headers.forEach(h => {
            tableHTML += `<th>${formatInlineMarkdown(h)}</th>`;
        });
        tableHTML += `</tr></thead><tbody>`;

        rowLines.forEach(row => {
            const cells = row.split("|").filter((c, i, arr) => i > 0 && i < arr.length - 1).map(c => c.trim());
            tableHTML += `<tr>`;
            cells.forEach(cell => {
                tableHTML += `<td>${formatInlineMarkdown(cell)}</td>`;
            });
            tableHTML += `</tr>`;
        });

        tableHTML += `</tbody></table></div>`;
        return tableHTML;
    });

    // 3. Process Block Elements (Headings, Lists, Callouts, Paragraphs)
    const blocks = processed.split(/\n{2,}/);
    const renderedBlocks = blocks.map(block => {
        const trimmed = block.trim();
        if (!trimmed) return "";

        // Return preserved Code Blocks
        if (trimmed.startsWith("__CODE_BLOCK_") && trimmed.endsWith("__")) {
            const index = parseInt(trimmed.replace("__CODE_BLOCK_", "").replace("__", ""));
            return codeBlocks[index] || "";
        }

        // Return preserved Tables
        if (trimmed.startsWith("<div class=\"table-responsive\">")) {
            return trimmed;
        }

        // Subheadings
        if (trimmed.startsWith("#### ")) {
            return `<h4 class="article-section-h4">${formatInlineMarkdown(trimmed.substring(5))}</h4>`;
        }
        if (trimmed.startsWith("### ")) {
            return `<h3 class="article-section-h3">${formatInlineMarkdown(trimmed.substring(4))}</h3>`;
        }
        if (trimmed.startsWith("## ")) {
            return `<h2 class="article-section-h2">${formatInlineMarkdown(trimmed.substring(3))}</h2>`;
        }

        // Callouts (> [!IMPORTANT] / > [!NOTE])
        if (trimmed.startsWith("> ")) {
            let calloutType = "info";
            let calloutTitle = "Note";
            let content = trimmed.substring(2);

            if (content.startsWith("[!IMPORTANT]")) {
                calloutType = "warning";
                calloutTitle = "Important";
                content = content.replace("[!IMPORTANT]", "").trim();
            } else if (content.startsWith("[!WARNING]")) {
                calloutType = "danger";
                calloutTitle = "Warning";
                content = content.replace("[!WARNING]", "").trim();
            } else if (content.startsWith("[!NOTE]")) {
                calloutType = "info";
                calloutTitle = "Note";
                content = content.replace("[!NOTE]", "").trim();
            } else if (content.startsWith("[!TIP]")) {
                calloutType = "success";
                calloutTitle = "Tip";
                content = content.replace("[!TIP]", "").trim();
            }

            return `
                <div class="callout-box ${calloutType}">
                    <div class="callout-icon">${calloutType === 'warning' ? '⚠️' : (calloutType === 'danger' ? '⛔' : '💡')}</div>
                    <div class="callout-content">
                        <h5>${calloutTitle}</h5>
                        <p>${formatInlineMarkdown(content)}</p>
                    </div>
                </div>
            `;
        }

        // Bullet Lists (- or *)
        const lines = trimmed.split("\n");
        const isBulletList = lines.every(l => l.trim().startsWith("- ") || l.trim().startsWith("* ") || l.trim() === "");
        if (isBulletList && lines.length > 0) {
            let listHTML = `<ul class="doc-bullet-list">`;
            lines.forEach(l => {
                const itemText = l.trim().replace(/^[-*]\s+/, "");
                if (itemText) {
                    listHTML += `<li>${formatInlineMarkdown(itemText)}</li>`;
                }
            });
            listHTML += `</ul>`;
            return listHTML;
        }

        // Numbered Lists (1. 2. 3.)
        const isNumberedList = lines.every(l => /^\d+\.\s+/.test(l.trim()) || l.trim() === "");
        if (isNumberedList && lines.length > 0) {
            let listHTML = `<ol class="doc-numbered-list">`;
            lines.forEach(l => {
                const itemText = l.trim().replace(/^\d+\.\s+/, "");
                if (itemText) {
                    listHTML += `<li>${formatInlineMarkdown(itemText)}</li>`;
                }
            });
            listHTML += `</ol>`;
            return listHTML;
        }

        // Standard Paragraph
        return `<p class="doc-paragraph">${formatInlineMarkdown(trimmed)}</p>`;
    });

    return renderedBlocks.join("\n");
}

function formatInlineMarkdown(text) {
    if (!text) return "";
    return text
        // Bold: **text**
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        // Italic: *text*
        .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, "<em>$1</em>")
        // Inline code: `code`
        .replace(/`([^`]+)`/g, "<code>$1</code>")
        // Links: [text](url)
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
}

function escapeHTML(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// =============================================================================
// Calendar Generation (Gregorian Grid starting August 10, 2026)
// =============================================================================
const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function initCalendarControls() {
    const prevBtn = document.getElementById("calPrevBtn");
    const nextBtn = document.getElementById("calNextBtn");
    const todayBtn = document.getElementById("calTodayBtn");
    const monthSelect = document.getElementById("monthSelect");
    const yearSelect = document.getElementById("yearSelect");

    if (monthSelect) {
        monthSelect.innerHTML = MONTH_NAMES.map((m, i) => `<option value="${i}">${m}</option>`).join("");
        monthSelect.value = state.currentMonth;
        monthSelect.addEventListener("change", (e) => {
            state.currentMonth = parseInt(e.target.value);
            renderCalendar(state.currentYear, state.currentMonth);
        });
    }

    if (yearSelect) {
        const years = [2025, 2026, 2027];
        yearSelect.innerHTML = years.map(y => `<option value="${y}">${y}</option>`).join("");
        yearSelect.value = state.currentYear;
        yearSelect.addEventListener("change", (e) => {
            state.currentYear = parseInt(e.target.value);
            renderCalendar(state.currentYear, state.currentMonth);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            state.currentMonth--;
            if (state.currentMonth < 0) {
                state.currentMonth = 11;
                state.currentYear--;
            }
            syncDropdowns();
            renderCalendar(state.currentYear, state.currentMonth);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            state.currentMonth++;
            if (state.currentMonth > 11) {
                state.currentMonth = 0;
                state.currentYear++;
            }
            syncDropdowns();
            renderCalendar(state.currentYear, state.currentMonth);
        });
    }

    if (todayBtn) {
        todayBtn.addEventListener("click", () => {
            state.currentYear = 2026;
            state.currentMonth = 7; // August
            syncDropdowns();
            renderCalendar(state.currentYear, state.currentMonth);
        });
    }
}

function syncDropdowns() {
    const monthSelect = document.getElementById("monthSelect");
    const yearSelect = document.getElementById("yearSelect");
    if (monthSelect) monthSelect.value = state.currentMonth;
    if (yearSelect) yearSelect.value = state.currentYear;
}

function renderCalendar(year, month) {
    const titleEl = document.getElementById("monthYearTitle");
    const gridEl = document.getElementById("calendarGrid");
    if (!gridEl) return;

    if (titleEl) {
        titleEl.textContent = `${MONTH_NAMES[month]} ${year}`;
    }

    gridEl.innerHTML = "";

    const firstDayIndex = new Date(year, month, 1).getDay();
    const startOffset = (firstDayIndex === 0 ? 6 : firstDayIndex - 1);
    const totalDays = new Date(year, month + 1, 0).getDate();

    // Empty leading padding cells
    for (let i = 0; i < startOffset; i++) {
        const emptyCell = document.createElement("div");
        emptyCell.className = "cal-day-cell empty-day";
        gridEl.appendChild(emptyCell);
    }

    // Render Month Days
    for (let day = 1; day <= totalDays; day++) {
        const dayString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        const journalEntry = DOCS_DATA.journal.find(j => j.date === dayString);

        const dayCell = document.createElement("div");
        dayCell.className = "cal-day-cell";

        const isToday = (dayString === "2026-08-11");
        if (isToday) dayCell.classList.add("today");

        const isStartDate = (dayString === "2026-08-10");

        let cellHTML = `<div class="cal-day-number">${day}</div>`;

        if (journalEntry) {
            dayCell.classList.add("has-work");
            if (isStartDate) dayCell.classList.add("start-date");

            cellHTML += `
                <div class="day-badge-stack">
                    ${isStartDate ? `<div class="day-pill pill-start">★ Start Date</div>` : ''}
                    <div class="day-pill pill-task">● ${journalEntry.tasks.length} Tasks</div>
                    <div class="day-pill pill-completed">✓ ${journalEntry.topicsLearned.length} Topics</div>
                </div>

                <!-- Desktop Hover Preview -->
                <div class="hover-preview-card">
                    <div class="preview-header">
                        <span class="preview-date">${journalEntry.dayOfWeek}, ${MONTH_NAMES[month]} ${day}</span>
                        <span class="preview-badge">✓ ${journalEntry.category}</span>
                    </div>
                    <div style="font-weight: 700; font-size: 0.76rem; color: var(--text-main); margin-bottom: 0.35rem;">
                        ${journalEntry.title}
                    </div>
                    <ul class="preview-task-list">
                        ${journalEntry.tasks.slice(0, 4).map(t => `<li class="preview-task-item">✓ ${t.title}</li>`).join("")}
                        ${journalEntry.tasks.length > 4 ? `<li class="preview-task-item">+ ${journalEntry.tasks.length - 4} more tasks...</li>` : ''}
                    </ul>
                    <div class="preview-footer">Click to open full daily report &rarr;</div>
                </div>
            `;

            dayCell.addEventListener("click", () => {
                openDailyReportModal(journalEntry);
            });
        } else {
            dayCell.addEventListener("click", () => {
                showEmptyDayNotice(dayString);
            });
        }

        dayCell.innerHTML = cellHTML;
        gridEl.appendChild(dayCell);
    }
}

function showEmptyDayNotice(dateStr) {
    alert(`No documentation recorded for ${dateStr}. Project development began on 10 August 2026.`);
}

// =============================================================================
// Daily Report Modal (Layer 2)
// =============================================================================
function openDailyReportModal(entry) {
    const modalOverlay = document.getElementById("dailyReportModal");
    if (!modalOverlay) return;

    document.getElementById("modalDateBadge").innerHTML = `${entry.dayOfWeek} &bull; ${entry.date} &bull; <span style="color: var(--success);">${entry.category}</span>`;
    document.getElementById("modalTitle").textContent = entry.title;
    document.getElementById("modalSummaryText").textContent = entry.summary;

    // Render Tasks
    const tasksList = document.getElementById("modalTasksList");
    tasksList.innerHTML = entry.tasks.map(t => `
        <li class="task-item">
            <span class="task-check-icon">&#10003;</span>
            <span>${t.title}</span>
        </li>
    `).join("");

    // Render Tech Badges
    const techGroup = document.getElementById("modalTechGroup");
    techGroup.innerHTML = entry.technologies.map(t => `
        <span class="tech-badge">${t}</span>
    `).join("");

    // Render Clickable Topic Cards
    const topicCardsGrid = document.getElementById("modalTopicCardsGrid");
    topicCardsGrid.innerHTML = entry.topicsLearned.map(topicId => {
        const topic = DOCS_DATA.topics[topicId];
        if (!topic) return "";
        return `
            <div class="topic-jump-card" onclick="jumpToTopic('${topic.id}')">
                <div class="topic-jump-title">${topic.title}</div>
                <div class="topic-jump-link">Read Deep Documentation &rarr;</div>
            </div>
        `;
    }).join("");

    // Render Problems & Solutions
    const problemsContainer = document.getElementById("modalProblemsContainer");
    if (entry.problems && entry.problems.length > 0) {
        problemsContainer.innerHTML = entry.problems.map(p => `
            <div class="problem-card">
                <div class="problem-header">&#9888; ${p.error}</div>
                <div class="problem-cause"><strong>Cause:</strong> ${p.cause}</div>
                <div class="solution-box">&#10004; <strong>Solution:</strong> ${p.solution}</div>
            </div>
        `).join("");
    } else {
        problemsContainer.innerHTML = `<p style="color: var(--text-muted); font-size: 0.9rem;">No major errors encountered during this phase.</p>`;
    }

    // Render What I Learned
    const learnedList = document.getElementById("modalLearnedList");
    learnedList.innerHTML = entry.whatILearned.map(item => `
        <li style="margin-bottom: 0.5rem; font-size: 0.9rem; color: var(--text-main);">${item}</li>
    `).join("");

    // Render Why This Matters
    const whyMattersEl = document.getElementById("modalWhyMattersText");
    whyMattersEl.textContent = entry.whyItMatters;

    // Render Timeline
    const timelineEl = document.getElementById("modalTimelineContainer");
    timelineEl.innerHTML = entry.timeline.map(t => `
        <div class="timeline-item">
            <span class="timeline-time">${t.time}</span>
            <span class="timeline-text">${t.event}</span>
        </div>
    `).join("");

    modalOverlay.classList.add("active");
}

function closeDailyReportModal() {
    const modalOverlay = document.getElementById("dailyReportModal");
    if (modalOverlay) {
        modalOverlay.classList.remove("active");
    }
}

// =============================================================================
// Deep Knowledge Base (Layer 3)
// =============================================================================
function renderKnowledgeSidebar() {
    const sidebarList = document.getElementById("topicNavList");
    if (!sidebarList) return;

    // Group topics by category
    const categories = {};
    Object.values(DOCS_DATA.topics).forEach(t => {
        if (!categories[t.category]) categories[t.category] = [];
        categories[t.category].push(t);
    });

    let html = "";
    Object.keys(categories).forEach(cat => {
        html += `
            <li class="nav-group-title" style="margin-top: 0.85rem; color: var(--primary); font-size: 0.72rem;">
                ${cat}
            </li>
        `;
        categories[cat].forEach(topic => {
            html += `
                <li>
                    <button class="topic-nav-btn ${topic.id === state.activeTopicId ? 'active' : ''}" data-topic-id="${topic.id}" onclick="selectTopic('${topic.id}')">
                        <span>${topic.title}</span>
                        <span style="font-size: 0.7rem; color: var(--text-light);">&rsaquo;</span>
                    </button>
                </li>
            `;
        });
    });

    sidebarList.innerHTML = html;
}

function selectTopic(topicId) {
    state.activeTopicId = topicId;
    renderKnowledgeSidebar();
    renderTopicArticle(topicId);
}

function jumpToTopic(topicId) {
    closeDailyReportModal();
    switchView("knowledge-view");
    selectTopic(topicId);
}

function renderTopicArticle(topicId) {
    const articleContainer = document.getElementById("topicArticleContent");
    if (!articleContainer) return;

    const topic = DOCS_DATA.topics[topicId];
    if (!topic) {
        articleContainer.innerHTML = `<p>Topic not found.</p>`;
        return;
    }

    let html = `
        <div class="article-header">
            <div class="article-category">${topic.category} &bull; ${topic.difficulty}</div>
            <h1 class="article-title">${topic.title}</h1>
            <div class="article-meta">
                <span>Tags: ${topic.tags.map(t => `<code>#${t}</code>`).join(" ")}</span>
            </div>
        </div>

        <div class="article-summary-lead">
            ${topic.summary}
        </div>
    `;

    topic.sections.forEach(sec => {
        html += `
            <div class="article-section">
                <h2 class="article-section-h2">${sec.heading}</h2>
                <div class="article-body-content">
                    ${renderMarkdown(sec.content)}
                </div>
            </div>
        `;
    });

    if (topic.codeExample) {
        html += `
            <div class="article-section">
                <h2 class="article-section-h2">Code Implementation: ${topic.codeExample.title}</h2>
                <div class="code-block-container">
                    <div class="code-header">
                        <span class="code-lang-label">${topic.codeExample.language}</span>
                        <button class="btn-copy-code" onclick="copyCode(this)">Copy Code</button>
                    </div>
                    <pre class="code-content"><code>${escapeHTML(topic.codeExample.code)}</code></pre>
                </div>
            </div>
        `;
    }

    articleContainer.innerHTML = html;
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function copyCode(btn) {
    const pre = btn.closest(".code-block-container").querySelector("pre code");
    if (!pre) return;

    navigator.clipboard.writeText(pre.textContent).then(() => {
        btn.textContent = "Copied!";
        btn.classList.add("copied");
        setTimeout(() => {
            btn.textContent = "Copy Code";
            btn.classList.remove("copied");
        }, 2000);
    });
}

// =============================================================================
// Errors & Post-Mortems View
// =============================================================================
function renderErrorsList() {
    const container = document.getElementById("errorsListContainer");
    if (!container) return;

    container.innerHTML = DOCS_DATA.errors.map(err => `
        <div class="error-postmortem-card">
            <div class="error-badge-tag">${err.category}</div>
            <h3 class="error-card-title">${err.title}</h3>
            <div class="error-raw-box">${escapeHTML(err.errorString)}</div>
            <div class="error-detail-block">
                <div class="detail-col">
                    <h6>Root Cause</h6>
                    <p>${err.cause}</p>
                </div>
                <div class="detail-col">
                    <h6>Verified Solution</h6>
                    <p style="color: var(--success); font-weight: 500;">${err.solution}</p>
                </div>
            </div>
            <div style="font-size: 0.8rem; color: var(--text-light); border-top: 1px dashed var(--border); padding-top: 0.5rem;">
                <strong>Prevention:</strong> ${err.prevention}
            </div>
        </div>
    `).join("");
}

// =============================================================================
// Projects Showcase View
// =============================================================================
function renderProjectsList() {
    const container = document.getElementById("projectsListContainer");
    if (!container) return;

    container.innerHTML = DOCS_DATA.projects.map(project => `
        <div class="project-hero-card">
            <div class="project-tag-status">✓ ${project.status} &bull; ${project.category}</div>
            <h2 class="project-hero-title">${project.name}</h2>
            <p class="project-hero-desc">${project.description}</p>
            <div class="tech-badge-group" style="margin-bottom: 1.5rem;">
                ${project.technologies.map(t => `<span class="tech-badge">${t}</span>`).join("")}
            </div>
            
            <div class="features-matrix-grid">
                <div class="matrix-col">
                    <div class="matrix-title implemented">
                        <span>&#10004;</span> Currently Implemented & Researched
                    </div>
                    <ul class="matrix-list">
                        ${project.implementedFeatures.map(f => `<li><span style="color: var(--success);">&#10003;</span> ${f}</li>`).join("")}
                    </ul>
                </div>

                <div class="matrix-col">
                    <div class="matrix-title future">
                        <span>&#9881;</span> Planned Future Improvements
                    </div>
                    <ul class="matrix-list">
                        ${project.futureRoadmap.map(f => `<li><span style="color: var(--warning);">&#9675;</span> ${f}</li>`).join("")}
                    </ul>
                </div>
            </div>
        </div>
    `).join("");
}

// =============================================================================
// Testing Checklist View
// =============================================================================
function renderTestingChecklist() {
    const tableBody = document.getElementById("testingTableBody");
    if (!tableBody) return;

    tableBody.innerHTML = DOCS_DATA.testingChecklist.map(t => `
        <tr>
            <td><strong>#${t.id}</strong></td>
            <td><strong>${t.label}</strong></td>
            <td><code>${t.command || t.endpoint || t.trigger || t.query || t.client || t.condition}</code></td>
            <td>${t.expected}</td>
            <td><span class="day-pill pill-completed">&#10003; ${t.status}</span></td>
        </tr>
    `).join("");
}

// =============================================================================
// Statistics Dashboard View
// =============================================================================
function renderStatistics() {
    const totalDaysEl = document.getElementById("statTotalDays");
    const totalTasksEl = document.getElementById("statTotalTasks");
    const totalTopicsEl = document.getElementById("statTotalTopics");
    const totalProjectsEl = document.getElementById("statTotalProjects");
    const totalTechEl = document.getElementById("statTotalTech");

    if (totalDaysEl) totalDaysEl.textContent = DOCS_DATA.journal.length;
    
    const totalTasks = DOCS_DATA.journal.reduce((acc, j) => acc + j.tasks.length, 0);
    if (totalTasksEl) totalTasksEl.textContent = totalTasks;

    if (totalTopicsEl) totalTopicsEl.textContent = Object.keys(DOCS_DATA.topics).length;
    if (totalProjectsEl) totalProjectsEl.textContent = DOCS_DATA.projects.length;

    const allTech = new Set();
    DOCS_DATA.journal.forEach(j => j.technologies.forEach(t => allTech.add(t)));
    if (totalTechEl) totalTechEl.textContent = allTech.size;
}

// =============================================================================
// Global Search Modal
// =============================================================================
function initSearch() {
    const searchTrigger = document.getElementById("searchTriggerBtn");
    const searchModal = document.getElementById("searchModal");
    const searchInput = document.getElementById("globalSearchInput");
    const searchResults = document.getElementById("searchResultsList");

    if (searchTrigger && searchModal) {
        searchTrigger.addEventListener("click", () => {
            searchModal.classList.add("active");
            if (searchInput) searchInput.focus();
        });

        searchModal.addEventListener("click", (e) => {
            if (e.target === searchModal) {
                searchModal.classList.remove("active");
            }
        });
    }

    if (searchInput && searchResults) {
        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.trim().toLowerCase();
            if (!query) {
                searchResults.innerHTML = `<p style="padding: 1rem; color: var(--text-muted); font-size: 0.85rem;">Type keywords like 'AWS', 'Azure', 'GCP', 'Kubernetes', 'SMTP', 'Serializer'...</p>`;
                return;
            }

            const results = [];

            // Search Topics
            Object.values(DOCS_DATA.topics).forEach(topic => {
                if (topic.title.toLowerCase().includes(query) || topic.summary.toLowerCase().includes(query) || topic.tags.some(t => t.toLowerCase().includes(query))) {
                    results.push({
                        type: `Knowledge (${topic.category})`,
                        title: topic.title,
                        snippet: topic.summary,
                        action: () => {
                            searchModal.classList.remove("active");
                            jumpToTopic(topic.id);
                        }
                    });
                }
            });

            // Search Journal Days
            DOCS_DATA.journal.forEach(j => {
                if (j.title.toLowerCase().includes(query) || j.summary.toLowerCase().includes(query) || j.date.includes(query) || j.category.toLowerCase().includes(query)) {
                    results.push({
                        type: `Daily Log (${j.date})`,
                        title: j.title,
                        snippet: j.summary,
                        action: () => {
                            searchModal.classList.remove("active");
                            switchView("calendar-view");
                            openDailyReportModal(j);
                        }
                    });
                }
            });

            // Search Errors
            DOCS_DATA.errors.forEach(err => {
                if (err.title.toLowerCase().includes(query) || err.errorString.toLowerCase().includes(query)) {
                    results.push({
                        type: "Error Post-Mortem",
                        title: err.title,
                        snippet: err.cause,
                        action: () => {
                            searchModal.classList.remove("active");
                            switchView("errors-view");
                        }
                    });
                }
            });

            if (results.length === 0) {
                searchResults.innerHTML = `<p style="padding: 1rem; color: var(--text-muted); font-size: 0.85rem;">No results found for "${query}".</p>`;
            } else {
                searchResults.innerHTML = results.map((r, idx) => `
                    <div class="search-result-item" data-res-idx="${idx}">
                        <div class="search-result-type">${r.type}</div>
                        <div class="search-result-title">${r.title}</div>
                        <div class="search-result-snippet">${r.snippet}</div>
                    </div>
                `).join("");

                searchResults.querySelectorAll(".search-result-item").forEach((el, idx) => {
                    el.addEventListener("click", () => results[idx].action());
                });
            }
        });
    }
}

function initKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
            e.preventDefault();
            const searchModal = document.getElementById("searchModal");
            const searchInput = document.getElementById("globalSearchInput");
            if (searchModal) {
                searchModal.classList.add("active");
                if (searchInput) searchInput.focus();
            }
        }
        if (e.key === "Escape") {
            const searchModal = document.getElementById("searchModal");
            const dailyModal = document.getElementById("dailyReportModal");
            if (searchModal) searchModal.classList.remove("active");
            if (dailyModal) dailyModal.classList.remove("active");
        }
    });
}
