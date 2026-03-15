const width = window.innerWidth;
const height = window.innerHeight;

// Color scheme by node type
const colorMap = {
    center: "#000000",
    convicted: "#991b1b",
    suspicious: "#c2410c",
    unclear: "#4b5563"
};

// Extended color palette for categories
const categoryColors = {
    "all": "#333",
    "politicians": "#1d4ed8",
    "billionaires": "#7c3aed",
    "royals": "#b45309",
    "entertainment": "#be185d",
    "academics": "#0d9488",
    "finance": "#16a34a",
    "convicted": "#991b1b",
    "intelligence": "#6d28d9",
    "predators": "#dc2626"
};

// Category assignments
const categoryMap = {
    epstein: ["all", "predators"],
    maxwell_g: ["all", "convicted", "predators"],
    brunel: ["all", "convicted", "predators"],
    nader: ["all", "convicted", "politicians", "intelligence", "predators"],
    trump: ["all", "politicians"],
    clinton: ["all", "politicians"],
    andrew: ["all", "royals", "predators"],
    musk: ["all", "billionaires"],
    gates: ["all", "billionaires"],
    wexner: ["all", "billionaires", "intelligence"],
    staley: ["all", "finance"],
    dubin: ["all", "finance", "billionaires"],
    mitchell: ["all", "politicians"],
    sultan_brunei: ["all", "royals", "billionaires"],
    dershowitz: ["all", "academics", "intelligence"],
    black: ["all", "finance", "billionaires"],
    joi_ito: ["all", "academics"],
    summers: ["all", "academics", "politicians"],
    hoffman: ["all", "billionaires"],
    krauss: ["all", "academics"],
    copperfield: ["all", "entertainment"],
    dimon: ["all", "finance"],
    blair: ["all", "politicians"],
    mort_z: ["all", "billionaires"],
    pritzker: ["all", "billionaires"],
    burkle: ["all", "billionaires", "politicians"],
    lutnick: ["all", "finance", "politicians"],
    branson: ["all", "billionaires"],
    tisch: ["all", "billionaires", "entertainment"],
    wasserman: ["all", "entertainment"],
    barak: ["all", "politicians", "intelligence", "predators"],
    thiel: ["all", "billionaires", "intelligence"],
    mandelson: ["all", "politicians", "intelligence"],
    barrack: ["all", "politicians", "intelligence"],
    casablancas: ["all", "entertainment", "predators"],
    woody: ["all", "entertainment", "predators"],
    spacey: ["all", "entertainment", "predators"],
    tucker: ["all", "entertainment"],
    richardson: ["all", "politicians"],
    sultan_ahmed: ["all", "finance"],
    hawking: ["all", "academics"],
    naomi: ["all", "entertainment"],
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
    mette_marit: ["all", "royals"]
};

// Light mode colors
const bgColor = "#f5f5f5";
const linkColor = "#ccc";
const labelColor = "#333";

let activeCategory = "all";

// Apply light background
document.body.style.background = bgColor;

// Update tooltip styles for light mode
const tooltipEl = document.getElementById("tooltip");
if (tooltipEl) {
    tooltipEl.style.background = "rgba(255, 255, 255, 0.95)";
    tooltipEl.style.border = "1px solid #ddd";
    tooltipEl.style.color = "#333";
}

// ─── NODE COLOR BY CATEGORY ───
function getNodeColor(d) {
    if (d.type === "center") return "#000000";
    if (d.type === "convicted") return "#991b1b";
    const cats = categoryMap[d.id] || [];
    if (cats.includes("politicians")) return categoryColors.politicians;
    if (cats.includes("royals")) return categoryColors.royals;
    if (cats.includes("billionaires")) return categoryColors.billionaires;
    if (cats.includes("entertainment")) return categoryColors.entertainment;
    if (cats.includes("academics")) return categoryColors.academics;
    if (cats.includes("finance")) return categoryColors.finance;
    if (cats.includes("intelligence")) return categoryColors.intelligence;
    return colorMap[d.type] || "#4b5563";
}

// ─── HELPER: get visible nodes for current filter ───
function getVisibleNodes(category) {
    const visible = new Set();
    graphData.nodes.forEach(n => {
        const cats = categoryMap[n.id] || ["all"];
        if (category === "all" || cats.includes(category)) {
            visible.add(n.id);
        }
    });
    visible.add("epstein");
    return visible;
}

// ─── SVG SETUP ───
const svg = d3.select("#graph")
    .attr("width", width)
    .attr("height", height);

const g = svg.append("g");
const zoom = d3.zoom()
    .scaleExtent([0.2, 5])
    .on("zoom", (event) => g.attr("transform", event.transform));
svg.call(zoom);

const tooltip = d3.select("#tooltip");

// ─── DROP SHADOW FILTER ───
const defs = svg.append("defs");
const shadowFilter = defs.append("filter").attr("id", "shadow")
    .attr("x", "-50%").attr("y", "-50%").attr("width", "200%").attr("height", "200%");
shadowFilter.append("feDropShadow")
    .attr("dx", 0).attr("dy", 2)
    .attr("stdDeviation", 4)
    .attr("flood-color", "rgba(0,0,0,0.15)");

// ─── SIMULATION ───
const simulation = d3.forceSimulation(graphData.nodes)
    .force("link", d3.forceLink(graphData.links)
        .id(d => d.id)
        .distance(d => 140 / d.strength)
    )
    .force("charge", d3.forceManyBody().strength(-300))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collision", d3.forceCollide().radius(d => d.radius + 8));

// ─── LINKS ───
const link = g.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(graphData.links)
    .join("line")
    .attr("stroke", linkColor)
    .attr("stroke-width", d => d.strength * 2)
    .attr("stroke-opacity", 0.5);

// ─── NODES ───
const node = g.append("g")
    .attr("class", "nodes")
    .selectAll("g")
    .data(graphData.nodes)
    .join("g")
    .style("cursor", "pointer");

// Circles
node.append("circle")
    .attr("r", d => d.radius)
    .attr("fill", d => getNodeColor(d))
    .attr("fill-opacity", 0.85)
    .attr("stroke", "#fff")
    .attr("stroke-width", 2.5)
    .style("filter", "url(#shadow)");

// Labels
node.append("text")
    .text(d => d.label)
    .attr("text-anchor", "middle")
    .attr("dy", d => d.radius + 14)
    .attr("fill", labelColor)
    .attr("font-size", d => d.type === "center" ? "12px" : "10px")
    .attr("font-weight", "600")
    .attr("paint-order", "stroke")
    .attr("stroke", "#f5f5f5")
    .attr("stroke-width", 3)
    .style("pointer-events", "none");

// ─── DRAG ───
node.call(d3.drag()
    .on("start", function (event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    })
    .on("drag", function (event, d) {
        d.fx = event.x;
        d.fy = event.y;
    })
    .on("end", function (event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    })
);

// ─── ALL NODE INTERACTIONS (single chained block) ───
node
    .on("click", function (event, d) {
        event.stopPropagation();
        openDossier(d);
    })
    .on("mouseover", function (event, d) {
        // Skip dimmed nodes in filtered view
        if (activeCategory !== "all") {
            const visibleNodes = getVisibleNodes(activeCategory);
            if (!visibleNodes.has(d.id)) return;
        }

        // Build rich tooltip content
        const cats = categoryMap[d.id] || [];
        const nodeColor = getNodeColor(d);
        
        // Count connections
        const connectionCount = graphData.links.filter(l => {
            const sid = typeof l.source === "object" ? l.source.id : l.source;
            const tid = typeof l.target === "object" ? l.target.id : l.target;
            return sid === d.id || tid === d.id;
        }).length;

        let tooltipHtml = `
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
                <div style="width:10px;height:10px;border-radius:50%;background:${nodeColor};flex-shrink:0;"></div>
                <strong style="font-size:14px;">${d.label}</strong>
            </div>`;
        
        if (d.role) {
            tooltipHtml += `<div style="font-size:11px;color:#666;margin-bottom:4px;">${d.role}</div>`;
        }
        
        // Category tags
        const displayCats = cats.filter(c => c !== "all");
        if (displayCats.length > 0) {
            tooltipHtml += `<div style="display:flex;flex-wrap:wrap;gap:3px;margin:6px 0;">`;
            displayCats.forEach(c => {
                tooltipHtml += `<span style="
                    font-size:9px;
                    padding:2px 6px;
                    border-radius:3px;
                    background:${categoryColors[c]}22;
                    color:${categoryColors[c]};
                    font-weight:600;
                    text-transform:uppercase;
                    letter-spacing:0.3px;
                ">${c}</span>`;
            });
            tooltipHtml += `</div>`;
        }

        if (d.status) {
            tooltipHtml += `<div style="font-size:11px;margin-top:4px;padding:3px 6px;background:${d.type === 'convicted' ? '#991b1b11' : '#f0f0f0'};border-radius:3px;color:${d.type === 'convicted' ? '#991b1b' : '#666'};">⚖ ${d.status}</div>`;
        }

        if (d.agency) {
            tooltipHtml += `<div style="font-size:10px;color:#888;margin-top:4px;">🏛 ${d.agency}</div>`;
        }

        if (d.networth) {
            tooltipHtml += `<div style="font-size:10px;color:#888;margin-top:2px;">💰 ${d.networth}</div>`;
        }

        tooltipHtml += `<div style="font-size:10px;color:#aaa;margin-top:6px;padding-top:5px;border-top:1px solid #eee;">🕸 ${connectionCount} connection${connectionCount !== 1 ? 's' : ''} · Click for dossier</div>`;

        // Show tooltip
        tooltip
            .style("display", "block")
            .style("position", "fixed")
            .style("z-index", "99999")
            .style("pointer-events", "none")
            .style("padding", "10px 14px")
            .style("background", "rgba(255,255,255,0.98)")
            .style("border", "1px solid #ddd")
            .style("border-left", `3px solid ${nodeColor}`)
            .style("border-radius", "8px")
            .style("box-shadow", "0 4px 16px rgba(0,0,0,0.12)")
            .style("max-width", "280px")
            .style("font-size", "12px")
            .style("line-height", "1.4")
            .html(tooltipHtml)
            .style("left", (event.clientX + 15) + "px")
            .style("top", (event.clientY - 10) + "px");

        // Highlight connected nodes
        const connectedIds = new Set();
        connectedIds.add(d.id);
        graphData.links.forEach(l => {
            const sid = typeof l.source === "object" ? l.source.id : l.source;
            const tid = typeof l.target === "object" ? l.target.id : l.target;
            if (sid === d.id) connectedIds.add(tid);
            if (tid === d.id) connectedIds.add(sid);
        });

        node.transition().duration(200)
            .style("opacity", n => connectedIds.has(n.id) ? 1 : 0.1);

        link.transition().duration(200)
            .attr("stroke-opacity", l => {
                const sid = typeof l.source === "object" ? l.source.id : l.source;
                const tid = typeof l.target === "object" ? l.target.id : l.target;
                return (sid === d.id || tid === d.id) ? 0.6 : 0.03;
            });
    })
    .on("mousemove", function (event) {
        tooltip
            .style("left", (event.clientX + 15) + "px")
            .style("top", (event.clientY - 10) + "px");
    })
    .on("mouseout", function () {
        tooltip.style("display", "none");

        if (activeCategory === "all") {
            node.transition().duration(200).style("opacity", 1);
            link.transition().duration(200).attr("stroke-opacity", 0.5);
        } else {
            const visibleNodes = getVisibleNodes(activeCategory);
            node.transition().duration(200)
                .style("opacity", n => visibleNodes.has(n.id) ? 1 : 0.08);
            link.transition().duration(200)
                .attr("stroke-opacity", l => {
                    const sid = typeof l.source === "object" ? l.source.id : l.source;
                    const tid = typeof l.target === "object" ? l.target.id : l.target;
                    return (visibleNodes.has(sid) && visibleNodes.has(tid)) ? 0.5 : 0.03;
                });
        }
    });

// ─── FILTER TABS ───
const tabBar = document.getElementById("filterTabs");
const categories = [
    { key: "all", label: "All" },
    { key: "politicians", label: "Politicians" },
    { key: "billionaires", label: "Billionaires" },
    { key: "royals", label: "Royals" },
    { key: "entertainment", label: "Entertainment" },
    { key: "academics", label: "Academics" },
    { key: "finance", label: "Finance" },
    { key: "convicted", label: "Convicted" },
    { key: "intelligence", label: "Intelligence" },
    { key: "predators", label: "⚠ Predators" }
];

if (tabBar) {
    categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.className = "filter-tab" + (cat.key === "all" ? " active" : "");
        btn.textContent = cat.label;
        btn.dataset.category = cat.key;
        btn.style.borderBottomColor = cat.key === "all" ? categoryColors[cat.key] : "transparent";
        btn.addEventListener("click", () => filterByCategory(cat.key));
        tabBar.appendChild(btn);
    });
}

function filterByCategory(category) {
    activeCategory = category;

    document.querySelectorAll(".filter-tab").forEach(btn => {
        const isActive = btn.dataset.category === category;
        btn.classList.toggle("active", isActive);
        btn.style.borderBottomColor = isActive ? categoryColors[category] : "transparent";
    });

    const visibleNodes = getVisibleNodes(category);

    node.transition().duration(400)
        .style("opacity", d => visibleNodes.has(d.id) ? 1 : 0.08)
        .style("pointer-events", d => visibleNodes.has(d.id) ? "all" : "none");

    link.transition().duration(400)
        .attr("stroke-opacity", d => {
            const srcVisible = visibleNodes.has(d.source.id);
            const tgtVisible = visibleNodes.has(d.target.id);
            return (srcVisible && tgtVisible) ? 0.5 : 0.03;
        });
}

// ─── DOSSIER PANEL LOGIC ───
const dossierOverlay = document.getElementById("dossierOverlay");
const dossierPanel = document.getElementById("dossierPanel");
const dossierClose = document.getElementById("dossierClose");
const dossierName = document.getElementById("dossierName");
const dossierRole = document.getElementById("dossierRole");
const dossierBadges = document.getElementById("dossierBadges");
const dossierBody = document.getElementById("dossierBody");

function openDossier(d) {
    const typeColor = getNodeColor(d);

    dossierName.textContent = d.label;
    dossierRole.textContent = d.agency || "";

    // Badges
    dossierBadges.innerHTML = "";
    if (d.status) {
        const statusBadge = document.createElement("span");
        statusBadge.className = "dossier-badge badge-status";
        statusBadge.textContent = d.status;
        dossierBadges.appendChild(statusBadge);
    }
    const typeBadge = document.createElement("span");
    typeBadge.className = "dossier-badge badge-type";
    typeBadge.style.background = typeColor;
    typeBadge.textContent = d.type.toUpperCase();
    dossierBadges.appendChild(typeBadge);

    const cats = categoryMap[d.id] || [];
    cats.forEach(c => {
        if (c === "all") return;
        const catBadge = document.createElement("span");
        catBadge.className = "dossier-badge badge-type";
        catBadge.style.background = categoryColors[c];
        catBadge.style.opacity = "0.8";
        catBadge.textContent = c.toUpperCase();
        dossierBadges.appendChild(catBadge);
    });

    let html = "";

    html += `<div class="dossier-meta">`;
    if (d.role) html += `<div class="dossier-meta-item"><div class="dossier-meta-label">Role</div><div class="dossier-meta-value">${d.role}</div></div>`;
    if (d.networth) html += `<div class="dossier-meta-item"><div class="dossier-meta-label">Net Worth</div><div class="dossier-meta-value">${d.networth}</div></div>`;
    if (d.agency) html += `<div class="dossier-meta-item"><div class="dossier-meta-label">Affiliation</div><div class="dossier-meta-value">${d.agency}</div></div>`;
    if (d.status) html += `<div class="dossier-meta-item"><div class="dossier-meta-label">Legal Status</div><div class="dossier-meta-value">${d.status}</div></div>`;
    html += `</div>`;

    if (d.intelRole) html += `<div class="dossier-highlight"><p>⚠️ ${d.intelRole}</p></div>`;
    if (d.epsteinLink) html += `<div class="dossier-section"><div class="dossier-section-title">🔗 Epstein Connection</div><div class="dossier-section-text">${d.epsteinLink}</div></div>`;
    if (d.desc) html += `<div class="dossier-section"><div class="dossier-section-title">📋 Background</div><div class="dossier-section-text">${d.desc}</div></div>`;
    if (d.evidence) html += `<div class="dossier-section"><div class="dossier-section-title">📁 Evidence & Documentation</div><div class="dossier-section-text">${d.evidence}</div></div>`;
    if (d.significance) html += `<div class="dossier-section"><div class="dossier-section-title">⚡ Significance</div><div class="dossier-section-text">${d.significance}</div></div>`;

    const connections = graphData.links.filter(l => l.source.id === d.id || l.target.id === d.id);
    if (connections.length > 0) {
        html += `<div class="dossier-section"><div class="dossier-section-title">🕸️ Network Connections (${connections.length})</div><div class="dossier-connections">`;
        connections.forEach(l => {
            const otherId = l.source.id === d.id ? l.target.id : l.source.id;
            const otherNode = graphData.nodes.find(n => n.id === otherId);
            if (otherNode) {
                const strength = Math.round(l.strength * 100);
                const barColor = getNodeColor(otherNode);
                html += `<div class="dossier-connection-item" data-node-id="${otherId}">
                    <div class="dossier-connection-dot" style="background:${barColor}"></div>
                    <div class="dossier-connection-name">${otherNode.label}</div>
                    <div class="dossier-connection-bar"><div class="dossier-connection-fill" style="width:${strength}%; background:${barColor}"></div></div>
                </div>`;
            }
        });
        html += `</div></div>`;
    }

    if (d.link) html += `<div class="dossier-section dossier-conclusion"><div class="dossier-section-title">🔍 Why This Matters</div><div class="dossier-section-text">${d.link}</div></div>`;

    html += `<div class="dossier-disclaimer"><p>This dossier is compiled from publicly available court documents, DOJ file releases, flight logs, and sworn depositions. Inclusion does not imply guilt. Some individuals listed have denied all allegations.</p></div>`;

    dossierBody.innerHTML = html;

    dossierBody.querySelectorAll(".dossier-connection-item").forEach(item => {
        item.addEventListener("click", () => {
            const targetNode = graphData.nodes.find(n => n.id === item.dataset.nodeId);
            if (targetNode) openDossier(targetNode);
        });
    });

    dossierPanel.classList.add("active");
    dossierOverlay.classList.add("active");
}

function closeDossier() {
    dossierPanel.classList.remove("active");
    dossierOverlay.classList.remove("active");
}

if (dossierClose) dossierClose.addEventListener("click", closeDossier);
if (dossierOverlay) dossierOverlay.addEventListener("click", closeDossier);
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeDossier(); });

// ─── TICK ───
simulation.on("tick", () => {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
    node.attr("transform", d => `translate(${d.x},${d.y})`);
});

// ─── RESIZE ───
window.addEventListener("resize", () => {
    svg.attr("width", window.innerWidth).attr("height", window.innerHeight);
    simulation.force("center", d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2));
    simulation.alpha(0.3).restart();
});