/* [2026-02-24] Please keep the comments in the code and do not delete them. */

// --- INITIALISATION UI ---
const video = document.getElementById('intro-video');
const intro = document.getElementById('intro-container');
const ui = document.getElementById('main-ui');
const logo = document.querySelector('.logo-layer'); 
const clock = document.getElementById('clock');
const winProjets = document.getElementById('win-projets');
const winAbout = document.getElementById('win-about');
const winVeille = document.getElementById('win-veille');
const winCompetences = document.getElementById('win-competences'); // Fenêtre Compétences
const winContact = document.getElementById('win-contact'); 
const btnSkills = document.getElementById('btn-toggle-skills');
const skillsPanel = document.getElementById('skills-panel');
const sidebar = document.getElementById('project-sidebar');

const sessionSeed = Math.random() * 2000.0;

const projectOrder = ['glpi', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7'];

const projectData = {
    'glpi': {
        title: "R1 - GLPI (Gestion de Parc & Helpdesk)",
        desc: "Déploiement de GLPI sur Apache via un hébergement XAMPP sur serveur interne pour la gestion d'un parc informatique.",
        details: ["Installation de l'environnement XAMPP", "Configuration de la base de données MySQL", "Gestion du parc informatique et solution de ticketing"],
        images: [{src: "GLPI.png", label: "Dashboard"}, {src: "BDD GLPI.png", label: "Structure BDD"}],
        skills: [
            {cat: "Gestion de services", val: "Mise en œuvre d'une solution de helpdesk ITIL : collecte, suivi et orientation des tickets incidents."},
            {cat: "Patrimoine", val: "Recensement et identification des ressources numériques via l'inventaire automatisé GLPI."},
            {cat: "Habilitations", val: "Mise en place d'une hiérarchie de rôles et gestion des niveaux d'accès pour sécuriser le service."},
            {cat: "Accompagnement", val: "Rédaction et mise en place d'une procédure utilisateur pour faciliter la prise en main de l'outil."}
        ]
    },
    'r2': {
        title: "R2 - Maintenance & Réseau",
        desc: "Maintenance de l’infrastructure matérielle et supervision du réseau via PRTG et GLPI.",
        details: ["Gestion de l'inventaire matériel", "Détection d'anomalies en temps réel avec PRTG", "Supervision des switches et routeurs"],
        images: [{src: "Maintenance.png", label: "Suivi Maintenance"}, {src: "PRTG.png", label: "Dashboard PRTG"}],
        skills: [
            {cat: "Supervision", val: "Configuration de sondes SNMP sur PRTG pour vérifier la continuité des services et collecter les alertes."},
            {cat: "Maintenance HT", val: "Diagnostic, installation et déploiement de nouveaux postes de travail et composants réseaux."},
            {cat: "Réactivité", val: "Traitement des demandes concernant les services système et applicatifs suite aux remontées de supervision."}
        ]
    },
    'r3': {
        title: "R3 - Administration Système",
        desc: "Gestion des utilisateurs et de la sécurité du parc.",
        details: ["Administration Active Directory (AD)", "Gestion des Group Policy Objects (GPO)", "Mise en place de tâches panifiés via des scripts PowerShell"],
        images: [{src: "AD.png", label: "Active Directory"}],
        skills: [
            {cat: "Identité (AD)", val: "Gestion complète de l'annuaire Active Directory : création d'utilisateurs et gestion des droits d'accès."},
            {cat: "Sécurité (GPO)", val: "Déploiement de stratégies de groupe pour assurer le respect des règles d'utilisation des ressources."},
            {cat: "Sauvegarde", val: "Configuration et vérification des sauvegardes via Windows Server Backup pour garantir l'intégrité des données."},
            {cat: "Automatisation", val: "Utilisation de scripts PowerShell et Bash pour optimiser l'administration courante du serveur."}
        ]
    },
    'r4': {
        title: "R4 - Baie & Brassage",
        desc: "Installation physique d'équipements réseaux et virtualisation de serveurs.",
        details: ["Installation de l'équipement en baie", "Brassage Ethernet", "Virtualisation via Hyper-V"],
        images: [{src: "Brassage.jpg", label: "Câblage"}, {src: "Baie.webp", label: "Baie Informatique"}],
        skills: [
            {cat: "Infrastructure Physique", val: "Réalisation d'un câblage structuré et brassage de prises réseaux selon les normes professionnelles."},
            {cat: "Virtualisation", val: "Mise en place et gestion de machines virtuelles sous Hyper-V pour isoler les services critiques."},
            {cat: "Continuité", val: "Configuration des accès distants (VPN) et locaux pour assurer la disponibilité permanente du réseau."}
        ]
    },
    'r7': {
        title: "R7 - Site Web Matrice",
        desc: "Conception et hébergement d'un portail interne pour centraliser les matrices.",
        details: ["Développement HTML/CSS/JS", "Accès VPN/Local", "Optimisation flux de travail"],
        images: [{src: "Matrice-Askil.png", label: "Interface Intranet"}, {src: "Schema.png", label: "Schéma Explicatif"}],
        skills: [
            {cat: "Développement Web", val: "Création d'une interface responsive en HTML/CSS facilitant la saisie et la lecture des données."},
            {cat: "Mode Projet", val: "Analyse du besoin via un cahier des charges et planification des tâches avec GanttProject."},
            {cat: "Déploiement", val: "Mise en production d'un service Web interne pour améliorer la productivité des collaborateurs."},
            {cat: "Test & Qualité", val: "Réalisation de tests d'intégration en local puis avec les utilisateurs finaux avant validation."}
        ]
    },
    'r6': {
        title: "R6 - Bataille Navale Unity",
        desc: "Jeu développé sous Unity avec persistance des données via MySQL.",
        details: ["Développement C# / Unity", "Liaison BDD MySQL via PhpMyAdmin", "Gestion de projet Gantt"],
        images: [{src: "BN.png", label: "Interface Unity"}, {src: "BNBDD.png", label: "Structure BDD"}],
        skills: [
            {cat: "Programmation C#", val: "Maîtrise de la logique de jeu orientée objet et gestion des interactions complexes sous Unity."},
            {cat: "Persistance", val: "Modélisation et conception d'une base de données MySQL pour sauvegarder les scores et profils."},
            {cat: "Veille Tech", val: "Mise en œuvre d'une stratégie de veille (forums, docs officielles) pour résoudre des problèmes techniques."},
            {cat: "Agilité", val: "Planification itérative des activités avec tests d'acceptation après chaque ajout de fonctionnalité."}
        ]
    },
    'r5': {
        title: "R5 - Bataille de Cartes Java",
        desc: "Développement d'un jeu de cartes en POO avec Java.",
        details: ["Conception de classes POO", "Algorithmes de jeu", "Interface Console"],
        images: [{src: "BJ.png", label: "Simulation Java"}, {src: "BJ1.png", label: "Distibution de cartes"}],
        skills: [
            {cat: "Orienté Objet (Java)", val: "Application des principes d'encapsulation et d'héritage pour structurer le moteur de jeu."},
            {cat: "Analyse d'Écarts", val: "Évaluation du suivi de projet via un calendrier d'étapes pour analyser les dérives de temps."},
            {cat: "Algorithmique", val: "Conception de règles métiers complexes et gestion automatique des tours de jeu en console."}
        ]
    }
};

let currentProjectKey = null;
let isSkillsPanelOpen = false;

// --- GESTION FENÊTRES ---

function toggleWindow(id) {
    const win = document.getElementById(id);
    const isOpen = win.classList.contains('active');

    // Fermeture de toutes les fenêtres
    ['win-projets', 'win-about', 'win-contact', 'win-veille', 'win-competences'].forEach(w => closeWindow(w));

    if (!isOpen) {
        openWindow(id);
        // Animation des jauges si on ouvre les compétences
        if(id === 'win-competences') {
            setTimeout(() => {
                const fills = document.querySelectorAll('.gauge-fill');
                fills.forEach(f => {
                    const targetWidth = f.parentElement.previousElementSibling.lastElementChild.innerText;
                    f.style.width = targetWidth;
                });
            }, 100);
        }
    }
}

function openWindow(id) {
    const win = document.getElementById(id);
    if(win) win.classList.add('active');
}

function closeWindow(id) {
    const win = document.getElementById(id);
    if (!win) return;
    win.classList.remove('active');
    
    // Reset des jauges à la fermeture
    if(id === 'win-competences') {
        document.querySelectorAll('.gauge-fill').forEach(f => f.style.width = '0%');
    }
    
    if(id === 'win-projets') setTimeout(hideProjectDetails, 400);
}

// --- LOGIQUE PROJETS ---

function showProjectDetails(key) {
    currentProjectKey = key;
    const data = projectData[key];
    winProjets.classList.add('win-expanded');
    document.getElementById('projects-main-content').classList.add('hidden');
    document.getElementById('project-details').classList.remove('hidden');
    sidebar.classList.remove('hidden');
    btnSkills.classList.remove('hidden');
    document.getElementById('win-title').innerText = `📂 Projets > ${data.title}`;
    
    const pointsHtml = data.details.map(pt => `<li>${pt}</li>`).join('');
    const imagesHtml = data.images.map(img => `
        <div class="img-card">
            <img src="${img.src}" alt="${img.label}">
            <p>${img.label}</p>
        </div>
    `).join('');

    document.getElementById('detail-content').innerHTML = `
        <h1 class="cyan-title">${data.title}</h1>
        <div class="desc-box">
            <p style="color: white; margin-bottom: 20px; font-size: 1.1rem;">${data.desc}</p>
            <ul class="missions-list">${pointsHtml}</ul>
            <div class="detail-images">${imagesHtml}</div>
        </div>
    `;

    const currentIndex = projectOrder.indexOf(key);
    const nextBtn = document.getElementById('next-project-btn');
    if (currentIndex < projectOrder.length - 1) {
        nextBtn.classList.remove('hidden');
        nextBtn.onclick = (e) => { e.stopPropagation(); showProjectDetails(projectOrder[currentIndex + 1]); };
    } else {
        nextBtn.classList.add('hidden');
    }
    if(isSkillsPanelOpen) updateSkillsContent(data.skills);
    renderSidebarNav();
}

function renderSidebarNav() {
    const list = document.getElementById('quick-nav-list');
    list.innerHTML = projectOrder.map(key => `
        <div class="nav-item ${key === currentProjectKey ? 'active' : ''}" onclick="showProjectDetails('${key}')">
            ${projectData[key].title.split(' - ')[0]}
        </div>
    `).join('');
}

function toggleSkillsPanel() {
    isSkillsPanelOpen = !isSkillsPanelOpen;
    if (isSkillsPanelOpen) {
        winProjets.classList.add('dual-view');
        skillsPanel.classList.remove('hidden');
        btnSkills.classList.add('active');
        updateSkillsContent(projectData[currentProjectKey].skills);
    } else {
        winProjets.classList.remove('dual-view');
        skillsPanel.classList.add('hidden');
        btnSkills.classList.remove('active');
    }
}

function updateSkillsContent(skills) {
    const container = document.getElementById('skills-list-content');
    container.innerHTML = skills.map(s => `
        <div class="skill-badge">
            <strong style="color: #14f4fe;">${s.cat}</strong>
            <p style="font-size: 0.95rem; line-height: 1.4; color: #eee; margin-top: 5px;">${s.val}</p>
        </div>
    `).join('');
}

function hideProjectDetails() {
    winProjets.classList.remove('win-expanded');
    winProjets.classList.remove('dual-view');
    document.getElementById('projects-main-content').classList.remove('hidden');
    document.getElementById('project-details').classList.add('hidden');
    sidebar.classList.add('hidden');
    btnSkills.classList.add('hidden');
    skillsPanel.classList.add('hidden');
    isSkillsPanelOpen = false;
    btnSkills.classList.remove('active');
    document.getElementById('win-title').innerText = "📂 Explorateur de Projets";
}

// --- CYCLE DE VIE ---

video.onended = () => {
    intro.classList.add('fade-out');
    ui.classList.remove('hidden');
    openWindow('win-about');
    setTimeout(() => {
        ui.classList.add('active-ui');
        if(logo) logo.classList.add('show-logo'); 
        setTimeout(() => intro.remove(), 1200);
    }, 50); 
};

function updateClock() {
    const now = new Date();
    clock.innerText = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}
setInterval(updateClock, 1000);
updateClock();

// --- MOTEUR WEBGL (BG) ---

const canvas = document.getElementById('bg-canvas');
const gl = canvas.getContext('webgl');
const vSource = `attribute vec2 p; void main(){ gl_Position=vec4(p,0,1); }`;
const fSource = `
    precision mediump float;
    uniform float t;
    uniform float seed;
    uniform vec2 r;
    float organicWave(float x, float time, float s) {
        float wave = sin(x * 1.0 + time * 0.6 + s);
        wave += sin(x * 1.5 - time * 0.4 + s * 1.2) * 0.5;
        wave += cos(x * 0.4 + time * 0.2) * 0.7;
        return wave * 0.15;
    }
    void main() {
        vec2 p = (gl_FragCoord.xy * 2.0 - r) / min(r.y, r.x);
        vec3 col = vec3(0.005, 0.005, 0.012);
        float s = seed;
        float w1 = organicWave(p.x * 0.7, t * 0.4, s);
        col += vec3(0.0, 0.35, 1.0) * (0.01 / abs(p.y + w1 + 0.1));
        float w2 = organicWave(p.x * 0.9, t * -0.5, s + 100.0);
        col += vec3(0.5, 0.1, 0.8) * (0.008 / abs(p.y + w2 - 0.2));
        float w3 = organicWave(p.x * 0.6, t * 0.3, s + 200.0);
        col += vec3(0.1, 0.7, 1.0) * (0.007 / abs(p.y + w3 + sin(t*0.2)*0.2));
        float stars = fract(sin(dot(gl_FragCoord.xy + s, vec2(12.9898, 78.233))) * 43758.5453);
        if(stars > 0.998) col += (0.2 + 0.2 * sin(t * 2.0 + stars * 10.0));
        gl_FragColor = vec4(col, 1.0);
    }
`;

function compile(gl, type, src) { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; }
const prog = gl.createProgram();
gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, vSource));
gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, fSource));
gl.linkProgram(prog); gl.useProgram(prog);
const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
const loc = gl.getAttribLocation(prog, "p"); gl.enableVertexAttribArray(loc);
gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
const tLoc = gl.getUniformLocation(prog, "t"), rLoc = gl.getUniformLocation(prog, "r"), seedLoc = gl.getUniformLocation(prog, "seed");

function loop(now) {
    if (!canvas) return;
    canvas.width = window.innerWidth; canvas.height = window.innerHeight; gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform1f(tLoc, now * 0.001); gl.uniform1f(seedLoc, sessionSeed); gl.uniform2f(rLoc, canvas.width, canvas.height);
    gl.drawArrays(gl.TRIANGLES, 0, 6); requestAnimationFrame(loop);
}
requestAnimationFrame(loop);