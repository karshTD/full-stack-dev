// Projects data storage
let projects = [
  {
    id: 1,
    name: "Clean Water Initiative",
    category: "Environment",
    description: "Providing access to clean drinking water in rural communities through sustainable well systems.",
    icon: "💧"
  },
  {
    id: 2,
    name: "School for All",
    category: "Education",
    description: "Building schools and providing educational materials to underserved children in developing nations.",
    icon: "📚"
  },
  {
    id: 3,
    name: "Mobile Health Clinics",
    category: "Healthcare",
    description: "Delivering essential medical care to remote villages through mobile healthcare units.",
    icon: "🏥"
  },
  {
    id: 4,
    name: "Community Gardens",
    category: "Nutrition",
    description: "Establishing sustainable community gardens to combat food insecurity and promote healthy eating.",
    icon: "🌱"
  },
  {
    id: 5,
    name: "Literacy Champions",
    category: "Education",
    description: "Adult literacy programs helping individuals gain reading and writing skills for better opportunities.",
    icon: "📖"
  },
  {
    id: 6,
    name: "Meal Distribution",
    category: "Nutrition",
    description: "Daily meal programs ensuring children receive nutritious food to support their growth and learning.",
    icon: "🍽️"
  }
];

let currentFilter = 'all';
let isSorted = false;

// Login functionality
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const username = document.getElementById('usernameInput').value.trim();
  const password = document.getElementById('passwordInput').value;
  const usernameError = document.getElementById('usernameError');
  const passwordError = document.getElementById('passwordError');
  
  let isValid = true;
  
  // Reset errors
  usernameError.classList.remove('show');
  passwordError.classList.remove('show');
  
  // Validate username
  if (username.length < 3) {
    usernameError.classList.add('show');
    isValid = false;
  }
  
  // Validate password
  if (password.length < 6) {
    passwordError.classList.add('show');
    isValid = false;
  }
  
  if (isValid) {
    // Navigate to home page
    window.location.href = 'home.html';
  }
});

// Navigation functionality
function setupNavigation() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetPage = this.dataset.page;
      
      // Navigate to the target page
      const pageMap = {
        'homePage': 'home.html',
        'projectsPage': 'projects.html',
        'donatePage': 'donate.html',
        'aboutPage': 'about.html'
      };
      
      window.location.href = pageMap[targetPage];
    });
  });
}

function navigateToPage(page) {
  const pageMap = {
    'homePage': 'home.html',
    'projectsPage': 'projects.html',
    'donatePage': 'donate.html',
    'aboutPage': 'about.html'
  };
  
  window.location.href = pageMap[page];
}

function logout() {
  if (confirm('Are you sure you want to logout?')) {
    window.location.href = 'login.html';
  }
}

// Projects functionality
function renderProjects(projectsToRender = projects) {
  const grid = document.getElementById('projectsGrid');
  
  if (!grid) return;
  
  if (projectsToRender.length === 0) {
    grid.innerHTML = `
      <div class="no-projects">
        <h3>No projects found</h3>
        <p>Try adjusting your search or filters</p>
      </div>
    `;
    return;
  }
  
  grid.innerHTML = projectsToRender.map(project => `
    <div class="project-card" data-category="${project.category}">
      <div class="project-image-area">${project.icon}</div>
      <div class="project-info">
        <span class="project-category">${project.category}</span>
        <h3>${project.name}</h3>
        <p>${project.description}</p>
        <button class="delete-project-btn" onclick="deleteProject(${project.id})">Delete Project</button>
      </div>
    </div>
  `).join('');
  
  saveProjects();
}

function deleteProject(id) {
  if (confirm('Are you sure you want to delete this project?')) {
    projects = projects.filter(p => p.id !== id);
    filterProjects(currentFilter);
  }
}

function filterProjects(category) {
  currentFilter = category;
  
  // Update active button
  document.querySelectorAll('.control-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
  
  if (category === 'all') {
    renderProjects(projects);
  } else {
    const filtered = projects.filter(p => p.category === category);
    renderProjects(filtered);
  }
}

function sortProjects() {
  isSorted = !isSorted;
  const sorted = [...projects].sort((a, b) => {
    if (isSorted) {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });
  projects = sorted;
  filterProjects(currentFilter);
  event.target.textContent = isSorted ? 'Sort Z-A' : 'Sort A-Z';
}

// Search functionality
function setupProjectSearch() {
  const searchInput = document.getElementById('searchProjects');
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      const searchTerm = e.target.value.toLowerCase();
      const filtered = projects.filter(p => 
        p.name.toLowerCase().includes(searchTerm) || 
        p.description.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm)
      );
      renderProjects(filtered);
    });
  }
}

// Add project form
function setupAddProjectForm() {
  const form = document.getElementById('addProjectForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const icons = {
        'Education': '📚',
        'Healthcare': '🏥',
        'Nutrition': '🍽️',
        'Environment': '🌱'
      };
      
      const newProject = {
        id: Date.now(),
        name: document.getElementById('projectName').value,
        category: document.getElementById('projectCategory').value,
        description: document.getElementById('projectDescription').value,
        icon: icons[document.getElementById('projectCategory').value]
      };
      
      projects.unshift(newProject);
      renderProjects();
      this.reset();
      
      alert('Project added successfully! 🎉');
    });
  }
}

// Donate form
function setupDonateForm() {
  const form = document.getElementById('donateForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const successAlert = document.getElementById('donateSuccess');
      successAlert.classList.add('show');
      
      this.reset();
      
      setTimeout(() => {
        successAlert.classList.remove('show');
      }, 5000);
    });
  }
}

// Save and load projects from memory
function saveProjects() {
  // Store in memory for this session
  window.projectsData = projects;
}

function loadProjects() {
  if (window.projectsData) {
    projects = window.projectsData;
  }
}

// Initialize based on page
function init() {
  loadProjects();
  
  // Setup navigation if on main pages
  setupNavigation();
  
  // Setup projects page
  if (document.getElementById('projectsGrid')) {
    renderProjects();
    setupProjectSearch();
    setupAddProjectForm();
  }
  
  // Setup donate page
  setupDonateForm();
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}