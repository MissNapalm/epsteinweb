const width = window.innerWidth;
const height = window.innerHeight;

const colorMap = {
    center: "#000000",
    convicted: "#991b1b",
    suspicious: "#c2410c",
    unclear: "#4b5563",
    possibly: "#87CEEB"
};

const categoryColors = {
    "all": "#aaa",
    "politicians": "#1d4ed8",
    "billionaires": "#7c3aed",
    "royals": "#b45309",
    "entertainment": "#be185d",
    "academics": "#0d9488",
    "finance": "#16a34a",
    "convicted": "#991b1b",
    "intelligence": "#6d28d9",
    "most suspicious": "#ff0000",
    "possibly involved": "#87CEEB",
    "birthday book": "#f59e0b"
};

const categoryMap = {
    epstein: ["all", "predators", "most suspicious"],
    maxwell_g: ["all", "convicted", "predators", "most suspicious"],
    brunel: ["all", "convicted", "predators", "most suspicious"],
    nader: ["all", "convicted", "politicians", "intelligence", "predators"],
    trump: ["all", "politicians", "most suspicious"],
    clinton: ["all", "politicians", "most suspicious"],
    andrew: ["all", "royals", "predators", "most suspicious"],
    musk: ["all", "billionaires"],
    gates: ["all", "billionaires"],
    wexner: ["all", "billionaires", "intelligence", "most suspicious"],
    staley: ["all", "finance", "most suspicious"],
    dubin: ["all", "finance", "billionaires", "birthday book"],
    mitchell: ["all", "politicians"],
    sultan_brunei: ["all", "royals", "billionaires"],
    dershowitz: ["all", "academics", "intelligence", "most suspicious"],
    black: ["all", "finance", "billionaires", "most suspicious"],
    joi_ito: ["all", "academics"],
    summers: ["all", "academics", "politicians"],
    hoffman: ["all", "billionaires"],
    krauss: ["all", "academics"],
    copperfield: ["all", "entertainment", "birthday book"],
    dimon: ["all", "finance"],
    blair: ["all", "politicians"],
    mort_z: ["all", "billionaires", "birthday book"],
    pritzker: ["all", "billionaires", "birthday book"],
    burkle: ["all", "billionaires", "politicians"],
    lutnick: ["all", "finance", "politicians", "most suspicious"],
    branson: ["all", "billionaires"],
    tisch: ["all", "billionaires", "entertainment"],
    wasserman: ["all", "entertainment"],
    barak: ["all", "politicians", "intelligence", "predators", "most suspicious"],
    thiel: ["all", "billionaires", "intelligence"],
    mandelson: ["all", "politicians", "intelligence", "most suspicious"],
    barrack: ["all", "politicians", "intelligence"],
    casablancas: ["all", "entertainment", "predators"],
    woody: ["all", "entertainment", "predators"],
    spacey: ["all", "entertainment", "predators"],
    tucker: ["all", "entertainment"],
    richardson: ["all", "politicians"],
    sultan_ahmed: ["all", "finance"],
    hawking: ["all", "academics"],
    naomi: ["all", "entertainment", "birthday book"],
    minsky: ["all", "academics", "predators"],
    pinker: ["all", "academics"],
    chomsky: ["all", "academics"],
    deepak: ["all", "entertainment", "academics"],
    nicholas_neg: ["all", "academics"],
    lajcak: ["all", "politicians"],
    ferguson: ["all", "royals"],
    brin: ["all", "billionaires"],
    bannon: ["all", "politicians", "intelligence"],
    zuckerberg: ["all", "billionaires"],
    mette_marit: ["all", "royals"],
    robert_maxwell: ["all", "intelligence", "most suspicious"],
    acosta: ["all", "politicians", "intelligence", "most suspicious"],
    ben_menashe: ["all", "intelligence"],
    barr_w: ["all", "politicians", "intelligence", "most suspicious"],
    barr_d: ["all", "intelligence"],
    hoffenberg: ["all", "finance", "intelligence"],
    khashoggi: ["all", "intelligence", "finance"],
    dougan: ["all", "intelligence"],
    thalberg: ["all", "politicians"],
    // ── BIRTHDAY BOOK / INNER CIRCLE ──
    kellen: ["all", "predators", "birthday book"],
    marcinkova: ["all", "predators", "birthday book"],
    groff: ["all", "birthday book"],
    eva_dubin: ["all", "birthday book"],
    briatore: ["all", "entertainment", "billionaires", "birthday book"],
    ari_emanuel: ["all", "entertainment", "birthday book"],
    kravis: ["all", "finance", "billionaires", "birthday book"],
    stroll: ["all", "billionaires", "birthday book"],
    fiennes: ["all", "entertainment", "birthday book"],
    blanchett: ["all", "entertainment", "birthday book"],
    alec_baldwin: ["all", "entertainment", "birthday book"],
    christy_turlington: ["all", "entertainment", "birthday book"],
    david_koch: ["all", "billionaires", "birthday book"],
    itzhak_perlman: ["all", "entertainment", "birthday book"],
    // POSSIBLY INVOLVED — NOT in "all"
    putin: ["possibly involved", "intelligence"],
    king_charles: ["possibly involved", "royals"],
    mbs: ["possibly involved", "intelligence"],
    kissinger: ["possibly involved", "politicians", "intelligence"],
    brennan: ["possibly involved", "intelligence"],
    murdoch: ["possibly involved", "billionaires"],
    petraeus: ["possibly involved", "intelligence"],
    comey: ["possibly involved", "intelligence"],
    starr: ["possibly involved"],
    boies: ["possibly involved"],
    ellison: ["possibly involved", "billionaires"],
    netanyahu: ["possibly involved", "politicians", "intelligence"],
};

// ─── THEME ───
let currentTheme = localStorage.getItem("epstein-theme") || "dark";

function applyTheme() {
    if (currentTheme === "light") {
        document.body.classList.add("light-mode");
    } else {
        document.body.classList.remove("light-mode");
    }
    const isDark = currentTheme === "dark";
    if (typeof link !== "undefined") {
        link.attr("stroke", isDark ? "#333" : "#ccc");
        node.selectAll("circle").attr("stroke", isDark ? "#1a1a2e" : "#fff");
        node.selectAll("text")
            .attr("fill", isDark ? "#ccc" : "#333")
            .attr("stroke", isDark ? "#0a0a0f" : "#f5f5f5");
    }
    const btn = document.getElementById("themeToggle");
    if (btn) {
        btn.textContent = isDark ? "☀️" : "🌙";
        btn.title = isDark ? "Switch to light mode" : "Switch to dark mode";
    }
    localStorage.setItem("epstein-theme", currentTheme);
}

function toggleTheme() {
    currentTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme();
}

function createThemeToggle() {
    const btn = document.createElement("button");
    btn.id = "themeToggle";
    btn.style.cssText = `position:fixed;top:14px;right:20px;z-index:10000;width:40px;height:40px;border-radius:50%;border:1px solid #444;background:rgba(30,30,40,0.8);color:#fff;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(10px);box-shadow:0 2px 8px rgba(0,0,0,0.3);`;
    btn.addEventListener("click", toggleTheme);
    document.body.appendChild(btn);
}

// ─── FILTER STATE ───
let activeCategories = new Set(["all"]);

function getVisibleNodes() {
    const visible = new Set();
    const likelyActive = activeCategories.has("possibly involved");
    graphData.nodes.forEach(n => {
        const cats = categoryMap[n.id] || ["all"];
        const isLikely = cats.includes("possibly involved");
        // Likely involved nodes ONLY show when that toggle is on
        if (isLikely && !likelyActive) return;
        // For likely nodes, if the toggle is on, show them
        if (isLikely && likelyActive) { visible.add(n.id); return; }
        // Normal filtering for everything else
        for (const ac of activeCategories) {
            if (ac === "possibly involved") continue; // skip — handled above
            if (cats.includes(ac)) {
                visible.add(n.id);
                break;
            }
        }
    });
    visible.add("epstein");
    return visible;
}

function getNodeColor(d) {
    if (d.type === "center") return "#000000";
    if (d.type === "convicted") return "#991b1b";
    if (d.type === "possibly") return "#87CEEB";
    const cats = categoryMap[d.id] || [];
    if (cats.includes("possibly involved")) return "#87CEEB";
    if (cats.includes("politicians")) return categoryColors.politicians;
    if (cats.includes("royals")) return categoryColors.royals;
    if (cats.includes("billionaires")) return categoryColors.billionaires;
    if (cats.includes("entertainment")) return categoryColors.entertainment;
    if (cats.includes("academics")) return categoryColors.academics;
    if (cats.includes("finance")) return categoryColors.finance;
    if (cats.includes("intelligence")) return categoryColors.intelligence;
    return colorMap[d.type] || "#4b5563";
}

// ─── VALIDATE LINKS ───
(function() {
    const nodeIds = new Set(graphData.nodes.map(n => n.id));
    graphData.links = graphData.links.filter(l => {
        const s = typeof l.source === "object" ? l.source.id : l.source;
        const t = typeof l.target === "object" ? l.target.id : l.target;
        const ok = nodeIds.has(s) && nodeIds.has(t);
        if (!ok) console.warn("Removed bad link:", s, "→", t);
        return ok;
    });
})();

// ─── SVG ───
const svg = d3.select("#graph").attr("width", width).attr("height", height);
const g = svg.append("g");
svg.call(d3.zoom().scaleExtent([0.2, 5]).on("zoom", e => g.attr("transform", e.transform)));
const tooltip = d3.select("#tooltip");

const defs = svg.append("defs");
const shadow = defs.append("filter").attr("id", "shadow")
    .attr("x", "-50%").attr("y", "-50%").attr("width", "200%").attr("height", "200%");
shadow.append("feDropShadow").attr("dx", 0).attr("dy", 2).attr("stdDeviation", 4).attr("flood-color", "rgba(0,0,0,0.3)");

// ─── SIMULATION ───
const simulation = d3.forceSimulation(graphData.nodes)
    .force("link", d3.forceLink(graphData.links).id(d => d.id).distance(d => {
        const sid = typeof d.source === "object" ? d.source.id : d.source;
        const tid = typeof d.target === "object" ? d.target.id : d.target;
        const srcCats = categoryMap[sid] || [];
        const tgtCats = categoryMap[tid] || [];
        const hasLikely = srcCats.includes("possibly involved") || tgtCats.includes("possibly involved");
        return hasLikely ? 100 / d.strength : 140 / d.strength;
    }))
    .force("charge", d3.forceManyBody().strength(d => {
        const cats = categoryMap[d.id] || [];
        return cats.includes("possibly involved") ? -200 : -300;
    }))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collision", d3.forceCollide().radius(d => d.radius + 8))
    .force("x", d3.forceX().x(d => {
        const cats = categoryMap[d.id] || [];
        if (cats.includes("possibly involved")) {
            // Spread likely nodes in a ring around center using their index as angle
            const idx = graphData.nodes.indexOf(d);
            const angle = (idx * 2.39996) % (Math.PI * 2); // golden angle for even spread
            return width / 2 + Math.cos(angle) * 180;
        }
        return width / 2;
    }).strength(d => {
        const cats = categoryMap[d.id] || [];
        return cats.includes("possibly involved") ? 0.08 : 0.02;
    }))
    .force("y", d3.forceY().y(d => {
        const cats = categoryMap[d.id] || [];
        if (cats.includes("possibly involved")) {
            const idx = graphData.nodes.indexOf(d);
            const angle = (idx * 2.39996) % (Math.PI * 2);
            return height / 2 + Math.sin(angle) * 180;
        }
        return height / 2;
    }).strength(d => {
        const cats = categoryMap[d.id] || [];
        return cats.includes("possibly involved") ? 0.08 : 0.02;
    }));

// ─── LINKS ───
const link = g.append("g").selectAll("line")
    .data(graphData.links).join("line")
    .attr("stroke", "#333").attr("stroke-width", d => d.strength * 2).attr("stroke-opacity", 0.5);

// ─── NODES ───
const node = g.append("g").selectAll("g")
    .data(graphData.nodes).join("g").style("cursor", "pointer");

node.append("circle")
    .attr("r", d => d.radius)
    .attr("fill", d => getNodeColor(d))
    .attr("fill-opacity", 0.85)
    .attr("stroke", "#1a1a2e")
    .attr("stroke-width", 2.5)
    .style("filter", "url(#shadow)");

node.append("text")
    .text(d => d.label)
    .attr("text-anchor", "middle")
    .attr("dy", d => d.radius + 14)
    .attr("fill", "#ccc")
    .attr("font-size", d => d.type === "center" ? "12px" : "10px")
    .attr("font-weight", "600")
    .attr("paint-order", "stroke")
    .attr("stroke", "#0a0a0f")
    .attr("stroke-width", 3)
    .style("pointer-events", "none");

// ─── DRAG ───
node.call(d3.drag()
    .on("start", (e, d) => { if (!e.active) simulation.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
    .on("drag", (e, d) => { d.fx = e.x; d.fy = e.y; })
    .on("end", (e, d) => { if (!e.active) simulation.alphaTarget(0); d.fx = null; d.fy = null; })
);

// ─── HOVER & CLICK ───
node
    .on("click", (e, d) => { e.stopPropagation(); openDossier(d); })
    .on("mouseover", function (event, d) {
        const vis = getVisibleNodes();
        if (!vis.has(d.id)) return;

        // Find connected node IDs
        const connectedIds = new Set();
        connectedIds.add(d.id);
        graphData.links.forEach(l => {
            const s = typeof l.source === "object" ? l.source.id : l.source;
            const t = typeof l.target === "object" ? l.target.id : l.target;
            if (s === d.id) connectedIds.add(t);
            if (t === d.id) connectedIds.add(s);
        });

        // Dim non-connected nodes
        node.transition().duration(200)
            .style("opacity", n => {
                if (!vis.has(n.id)) return 0.04;
                return connectedIds.has(n.id) ? 1 : 0.12;
            });

        // Highlight connected links, dim others
        link.transition().duration(200)
            .attr("stroke-opacity", l => {
                const s = typeof l.source === "object" ? l.source.id : l.source;
                const t = typeof l.target === "object" ? l.target.id : l.target;
                if (!vis.has(s) || !vis.has(t)) return 0.02;
                return (s === d.id || t === d.id) ? 0.9 : 0.04;
            })
            .attr("stroke-width", l => {
                const s = typeof l.source === "object" ? l.source.id : l.source;
                const t = typeof l.target === "object" ? l.target.id : l.target;
                return (s === d.id || t === d.id) ? l.strength * 3.5 : l.strength * 1.5;
            })
            .attr("stroke", l => {
                const s = typeof l.source === "object" ? l.source.id : l.source;
                const t = typeof l.target === "object" ? l.target.id : l.target;
                if (s === d.id || t === d.id) {
                    return getNodeColor(d);
                }
                return "#333";
            });

        // Tooltip
        const nc = getNodeColor(d);
        const cats = categoryMap[d.id] || [];
        const cc = graphData.links.filter(l => {
            const s = typeof l.source === "object" ? l.source.id : l.source;
            const t = typeof l.target === "object" ? l.target.id : l.target;
            return s === d.id || t === d.id;
        }).length;
        let h = `<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
            <div style="width:10px;height:10px;border-radius:50%;background:${nc};box-shadow:0 0 6px ${nc};"></div>
            <strong style="font-size:14px;">${d.label}</strong></div>`;
        if (d.role) h += `<div style="font-size:11px;opacity:0.7;margin-bottom:4px;">${d.role}</div>`;
        const dc = cats.filter(c => c !== "all");
        if (dc.length) {
            h += `<div style="display:flex;flex-wrap:wrap;gap:3px;margin:6px 0;">`;
            dc.forEach(c => { const col = categoryColors[c] || "#888"; h += `<span style="font-size:9px;padding:2px 6px;border-radius:3px;background:${col}33;color:${col};font-weight:600;text-transform:uppercase;">${c}</span>`; });
            h += `</div>`;
        }
        if (d.status) h += `<div style="font-size:11px;margin-top:4px;padding:3px 6px;background:rgba(255,255,255,0.05);border-radius:3px;">⚖ ${d.status}</div>`;
        if (d.agency) h += `<div style="font-size:10px;opacity:0.5;margin-top:4px;">🏛 ${d.agency}</div>`;
        if (d.networth) h += `<div style="font-size:10px;opacity:0.5;margin-top:2px;">💰 ${d.networth}</div>`;
        h += `<div style="font-size:10px;opacity:0.3;margin-top:6px;padding-top:5px;border-top:1px solid rgba(255,255,255,0.1);">🕸 ${cc} connections · Click for dossier</div>`;
        tooltip.style("display", "block").style("border-left", `3px solid ${nc}`).html(h)
            .style("left", (event.clientX + 15) + "px").style("top", (event.clientY - 10) + "px");
    })
    .on("mousemove", (event) => { tooltip.style("left", (event.clientX + 15) + "px").style("top", (event.clientY - 10) + "px"); })
    .on("mouseout", () => {
        tooltip.style("display", "none");
        // Restore all nodes and links based on current filters
        const vis = getVisibleNodes();
        node.transition().duration(300)
            .style("opacity", d => vis.has(d.id) ? 1 : 0.04);
        link.transition().duration(300)
            .attr("stroke-opacity", l => {
                const s = typeof l.source === "object" ? l.source.id : l.source;
                const t = typeof l.target === "object" ? l.target.id : l.target;
                return (vis.has(s) && vis.has(t)) ? 0.5 : 0.02;
            })
            .attr("stroke-width", l => l.strength * 2)
            .attr("stroke", "#333");
    });

// ─── CHECKBOX FILTERS ───
const tabBar = document.getElementById("filterTabs");
const categories = [
    { key: "all", label: "All" },
    { key: "most suspicious", label: "🔴 Most Suspicious" },
    { key: "politicians", label: "Politicians" },
    { key: "billionaires", label: "Billionaires" },
    { key: "royals", label: "Royals" },
    { key: "entertainment", label: "Entertainment" },
    { key: "academics", label: "Academics" },
    { key: "finance", label: "Finance" },
    { key: "convicted", label: "Convicted" },
    { key: "intelligence", label: "Intelligence" },
    { key: "predators", label: "Predators" },
    { key: "birthday book", label: "🎂 Birthday Book" },
    { key: "possibly involved", label: "🔵 Possibly Involved" },
];

function applyFilters() {
    const vis = getVisibleNodes();
    node.transition().duration(400)
        .style("opacity", d => vis.has(d.id) ? 1 : 0.04)
        .style("pointer-events", d => vis.has(d.id) ? "all" : "none");
    link.transition().duration(400)
        .attr("stroke-opacity", d => {
            const s = typeof d.source === "object" ? d.source.id : d.source;
            const t = typeof d.target === "object" ? d.target.id : d.target;
            return (vis.has(s) && vis.has(t)) ? 0.5 : 0.02;
        });
    document.querySelectorAll(".filter-check-label").forEach(lbl => {
        const k = lbl.dataset.category;
        const on = activeCategories.has(k);
        lbl.classList.toggle("active", on);
        lbl.style.borderBottomColor = on ? (categoryColors[k] || "#aaa") : "transparent";
    });
}

if (tabBar) {
    categories.forEach((cat, i) => {
        // Separator before the main categories
        if (i === 3) {
            const sep = document.createElement("div");
            sep.className = "filter-separator";
            tabBar.appendChild(sep);
        }

        const accentColor = categoryColors[cat.key] || "#aaa";
        const label = document.createElement("label");
        label.className = "filter-check-label" + (cat.key === "all" ? " active" : "");
        label.dataset.category = cat.key;

        const cb = document.createElement("input");
        cb.type = "checkbox";
        cb.checked = cat.key === "all";
        if (cb.checked) cb.style.background = accentColor;

        cb.addEventListener("change", () => {
            cb.style.background = cb.checked ? accentColor : "transparent";

            if (cat.key === "possibly involved") {
                // Likely involved is a standalone toggle — doesn't affect other filters
                if (cb.checked) {
                    activeCategories.add("possibly involved");
                } else {
                    activeCategories.delete("possibly involved");
                }
            } else if (cat.key === "all") {
                if (cb.checked) {
                    // Turn on "all", turn off everything EXCEPT "possibly involved"
                    const hadLikely = activeCategories.has("possibly involved");
                    activeCategories.clear();
                    activeCategories.add("all");
                    if (hadLikely) activeCategories.add("possibly involved");
                    tabBar.querySelectorAll("input[type=checkbox]").forEach(x => {
                        const lbl = x.closest(".filter-check-label");
                        if (!lbl) return;
                        const k = lbl.dataset.category;
                        if (k !== "all" && k !== "possibly involved") {
                            x.checked = false;
                            x.style.background = "transparent";
                        }
                    });
                } else {
                    activeCategories.delete("all");
                    if (!activeCategories.has("possibly involved") && activeCategories.size === 0) {
                        activeCategories.add("all");
                        cb.checked = true;
                        cb.style.background = accentColor;
                    }
                }
            } else {
                // Normal category — doesn't affect "possibly involved"
                if (cb.checked) {
                    activeCategories.add(cat.key);
                    activeCategories.delete("all");
                    const allCb = tabBar.querySelector("input[type=checkbox]");
                    if (allCb) { allCb.checked = false; allCb.style.background = "transparent"; }
                } else {
                    activeCategories.delete(cat.key);
                    // If nothing left (besides maybe possibly involved), re-enable "all"
                    const remaining = [...activeCategories].filter(k => k !== "possibly involved");
                    if (remaining.length === 0) {
                        activeCategories.add("all");
                        const allCb = tabBar.querySelector("input[type=checkbox]");
                        if (allCb) { allCb.checked = true; allCb.style.background = categoryColors["all"]; }
                    }
                }
            }
            applyFilters();
        });

        const dot = document.createElement("span");
        dot.className = "filter-dot";
        dot.style.background = accentColor;

        label.appendChild(cb);
        label.appendChild(dot);
        label.appendChild(document.createTextNode(" " + cat.label));
        tabBar.appendChild(label);
    });
}

// ─── DOSSIER ───
const dossierOverlay = document.getElementById("dossierOverlay");
const dossierPanel = document.getElementById("dossierPanel");
const dossierClose = document.getElementById("dossierClose");
const dossierName = document.getElementById("dossierName");
const dossierRole = document.getElementById("dossierRole");
const dossierBadges = document.getElementById("dossierBadges");
const dossierBody = document.getElementById("dossierBody");

function openDossier(d) {
    const tc = getNodeColor(d);
    dossierName.textContent = d.label;
    dossierRole.textContent = d.agency || "";
    dossierBadges.innerHTML = "";
    if (d.status) { const s = document.createElement("span"); s.className = "dossier-badge badge-status"; s.textContent = d.status; dossierBadges.appendChild(s); }
    const tb = document.createElement("span"); tb.className = "dossier-badge badge-type"; tb.style.background = tc; tb.textContent = d.type.toUpperCase(); dossierBadges.appendChild(tb);
    const cats = categoryMap[d.id] || [];
    cats.forEach(c => { if (c === "all") return; const b = document.createElement("span"); b.className = "dossier-badge badge-type"; b.style.background = categoryColors[c] || "#666"; b.style.opacity = "0.8"; b.textContent = c.toUpperCase(); dossierBadges.appendChild(b); });

    let h = `<div class="dossier-meta">`;
    if (d.role) h += `<div class="dossier-meta-item"><div class="dossier-meta-label">Role</div><div class="dossier-meta-value">${d.role}</div></div>`;
    if (d.networth) h += `<div class="dossier-meta-item"><div class="dossier-meta-label">Net Worth</div><div class="dossier-meta-value">${d.networth}</div></div>`;
    if (d.agency) h += `<div class="dossier-meta-item"><div class="dossier-meta-label">Affiliation</div><div class="dossier-meta-value">${d.agency}</div></div>`;
    if (d.status) h += `<div class="dossier-meta-item"><div class="dossier-meta-label">Legal Status</div><div class="dossier-meta-value">${d.status}</div></div>`;
    h += `</div>`;
    if (d.intelRole) h += `<div class="dossier-highlight"><p>⚠️ ${d.intelRole}</p></div>`;
    if (d.epsteinLink) h += `<div class="dossier-section"><div class="dossier-section-title">🔗 Epstein Connection</div><div class="dossier-section-text">${d.epsteinLink}</div></div>`;
    if (d.desc) h += `<div class="dossier-section"><div class="dossier-section-title">📋 Background</div><div class="dossier-section-text">${d.desc}</div></div>`;
    if (d.evidence) h += `<div class="dossier-section"><div class="dossier-section-title">📁 Evidence</div><div class="dossier-section-text">${d.evidence}</div></div>`;
    if (d.significance) h += `<div class="dossier-section"><div class="dossier-section-title">⚡ Significance</div><div class="dossier-section-text">${d.significance}</div></div>`;

    const conns = graphData.links.filter(l => l.source.id === d.id || l.target.id === d.id);
    if (conns.length) {
        h += `<div class="dossier-section"><div class="dossier-section-title">🕸️ Network Connections (${conns.length})</div><div class="dossier-connections">`;
        conns.forEach(l => {
            const oid = l.source.id === d.id ? l.target.id : l.source.id;
            const o = graphData.nodes.find(n => n.id === oid);
            if (o) { const str = Math.round(l.strength * 100); const bc = getNodeColor(o); h += `<div class="dossier-connection-item" data-node-id="${oid}"><div class="dossier-connection-dot" style="background:${bc}"></div><div class="dossier-connection-name">${o.label}</div><div class="dossier-connection-bar"><div class="dossier-connection-fill" style="width:${str}%;background:${bc}"></div></div></div>`; }
        });
        h += `</div></div>`;
    }
    if (d.link) h += `<div class="dossier-section dossier-conclusion"><div class="dossier-section-title">🔍 Why This Matters</div><div class="dossier-section-text">${d.link}</div></div>`;
    h += `<div class="dossier-disclaimer"><p>Compiled from publicly available court documents, DOJ file releases, flight logs, and sworn depositions. Inclusion does not imply guilt.</p></div>`;

    dossierBody.innerHTML = h;
    dossierBody.querySelectorAll(".dossier-connection-item").forEach(item => {
        item.addEventListener("click", () => { const t = graphData.nodes.find(n => n.id === item.dataset.nodeId); if (t) openDossier(t); });
    });
    dossierPanel.classList.add("active");
    dossierOverlay.classList.add("active");
}

function closeDossier() { dossierPanel.classList.remove("active"); dossierOverlay.classList.remove("active"); }
if (dossierClose) dossierClose.addEventListener("click", closeDossier);
if (dossierOverlay) dossierOverlay.addEventListener("click", closeDossier);
document.addEventListener("keydown", e => { if (e.key === "Escape") closeDossier(); });

// ─── TICK ───
simulation.on("tick", () => {
    link.attr("x1", d => d.source.x).attr("y1", d => d.source.y).attr("x2", d => d.target.x).attr("y2", d => d.target.y);
    node.attr("transform", d => `translate(${d.x},${d.y})`);
});

// ─── RESIZE ───
window.addEventListener("resize", () => {
    svg.attr("width", window.innerWidth).attr("height", window.innerHeight);
    simulation.force("center", d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2));
    simulation.alpha(0.3).restart();
});

// ─── INIT ───
createThemeToggle();
applyTheme();
applyFilters();