/**
 * ==============================================================================
 * TravelGo - Main JavaScript (js/script.js)
 * Clean, safe vanilla JavaScript loaded across all pages.
 * Fully interactive: Dark mode, filters, booking, auth session, FAQs & toasts.
 * ==============================================================================
 */

// Initialize all features once the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initMobileNavigation();
  initDatePickers();
  initUserSession();
  initModals();
  initHeroSearch();
  initDestinationFilters();
  initContactForm();
});

/* ==========================================================================
   1. Theme Management (Light / Dark Mode with localStorage Persistence)
   ========================================================================== */

function initTheme() {
  const savedTheme = localStorage.getItem("travelgo_theme");
  const themeBtn = document.getElementById("themeBtn");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    if (themeBtn) themeBtn.textContent = "☀️";
  } else {
    document.body.classList.remove("dark");
    if (themeBtn) themeBtn.textContent = "🌙";
  }
}

function toggleTheme() {
  const isDark = document.body.classList.toggle("dark");
  const themeBtn = document.getElementById("themeBtn");

  if (isDark) {
    localStorage.setItem("travelgo_theme", "dark");
    if (themeBtn) themeBtn.textContent = "☀️";
    showToast("Dark mode activated", "info", "🌙");
  } else {
    localStorage.setItem("travelgo_theme", "light");
    if (themeBtn) themeBtn.textContent = "🌙";
    showToast("Light mode activated", "info", "☀️");
  }
}

/* ==========================================================================
   2. Mobile Navigation (Hamburger Menu Toggle)
   ========================================================================== */

function initMobileNavigation() {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const navLinks = document.getElementById("navLinks");

  if (!hamburgerBtn || !navLinks) return;

  hamburgerBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    navLinks.classList.toggle("open");
  });

  const links = navLinks.querySelectorAll("a");
  links.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });

  document.addEventListener("click", (e) => {
    const nav = document.querySelector("nav");
    if (nav && !nav.contains(e.target)) {
      navLinks.classList.remove("open");
    }
  });
}

/* ==========================================================================
   3. Date Pickers (Dynamic Today's Date Minimum Constraint)
   ========================================================================== */

function initDatePickers() {
  const today = new Date().toISOString().split("T")[0];

  const dateInputs = [
    document.getElementById("checkin"),
    document.getElementById("checkout"),
    document.getElementById("bookingDate"),
    document.getElementById("contactDate")
  ];

  dateInputs.forEach((input) => {
    if (input) {
      input.min = today;
    }
  });

  const checkinInput = document.getElementById("checkin");
  const checkoutInput = document.getElementById("checkout");
  if (checkinInput && checkoutInput) {
    checkinInput.addEventListener("change", () => {
      checkoutInput.min = checkinInput.value || today;
      if (checkoutInput.value && checkoutInput.value < checkinInput.value) {
        checkoutInput.value = checkinInput.value;
      }
    });
  }
}

/* ==========================================================================
   4. User Session & Authentication (Login / Register Tabs & Persistence)
   ========================================================================== */

let currentAuthMode = "login"; // "login" or "register"

function initUserSession() {
  const savedUser = localStorage.getItem("travelgo_user");
  updateNavUserDisplay(savedUser);
}

function updateNavUserDisplay(userName) {
  const navButtons = document.querySelector(".nav-buttons");
  if (!navButtons) return;

  const existingBadge = document.getElementById("userNavBadge");
  const loginBtn = navButtons.querySelector(".login");

  if (userName) {
    if (loginBtn) loginBtn.style.display = "none";
    if (!existingBadge) {
      const badge = document.createElement("div");
      badge.id = "userNavBadge";
      badge.className = "user-nav-badge";
      badge.innerHTML = `<span>👋 Hi, ${escapeHtml(userName)}</span> <span class="logout-link" onclick="logoutUser()">Logout</span>`;
      const themeBtn = document.getElementById("themeBtn");
      navButtons.insertBefore(badge, themeBtn ? themeBtn.nextSibling : navButtons.firstChild);
    } else {
      existingBadge.innerHTML = `<span>👋 Hi, ${escapeHtml(userName)}</span> <span class="logout-link" onclick="logoutUser()">Logout</span>`;
      existingBadge.style.display = "inline-flex";
    }
  } else {
    if (loginBtn) loginBtn.style.display = "inline-block";
    if (existingBadge) existingBadge.style.display = "none";
  }
}

function switchAuthTab(mode) {
  currentAuthMode = mode;
  const tabSignIn = document.getElementById("tabSignIn");
  const tabSignUp = document.getElementById("tabSignUp");
  const title = document.getElementById("loginTitle");
  const submitBtn = document.getElementById("authSubmitBtn");
  const registerGroup = document.getElementById("registerNameGroup");
  const alertBox = document.getElementById("loginAlert");

  if (alertBox) {
    alertBox.style.display = "none";
    alertBox.textContent = "";
  }

  if (mode === "register") {
    if (tabSignUp) tabSignUp.classList.add("active");
    if (tabSignIn) tabSignIn.classList.remove("active");
    if (title) title.textContent = "Create an Account ✈️";
    if (submitBtn) submitBtn.textContent = "Create Account";
    if (registerGroup) registerGroup.style.display = "block";
  } else {
    if (tabSignIn) tabSignIn.classList.add("active");
    if (tabSignUp) tabSignUp.classList.remove("active");
    if (title) title.textContent = "Welcome Back ✈️";
    if (submitBtn) submitBtn.textContent = "Sign In";
    if (registerGroup) registerGroup.style.display = "none";
  }
}

function handleAuthSubmit(event) {
  event.preventDefault();
  const alertBox = document.getElementById("loginAlert");
  const emailInput = document.getElementById("loginEmail");
  const passwordInput = document.getElementById("loginPassword");
  const nameInput = document.getElementById("registerName");

  const email = emailInput ? emailInput.value.trim() : "";
  const password = passwordInput ? passwordInput.value : "";
  let displayName = "Traveler";

  if (currentAuthMode === "register") {
    displayName = nameInput && nameInput.value.trim() ? nameInput.value.trim() : email.split("@")[0];
  } else {
    displayName = email.split("@")[0];
    displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
  }

  localStorage.setItem("travelgo_user", displayName);
  updateNavUserDisplay(displayName);

  if (alertBox) {
    alertBox.className = "form-alert success";
    alertBox.textContent = currentAuthMode === "register"
      ? `🎉 Account created! Welcome aboard, ${displayName}.`
      : `👋 Welcome back, ${displayName}! You are logged in.`;
    alertBox.style.display = "block";
  }

  showToast(`Welcome, ${displayName}!`, "success", "✈️");

  setTimeout(() => {
    closeLogin();
    const form = document.getElementById("authForm");
    if (form) form.reset();
  }, 1200);
}

function logoutUser() {
  localStorage.removeItem("travelgo_user");
  updateNavUserDisplay(null);
  showToast("You have been logged out", "info", "👋");
}

/* ==========================================================================
   5. Hero Search Component (index.html)
   ========================================================================== */

function initHeroSearch() {
  const destInput = document.getElementById("destination");
  if (!destInput) return;

  destInput.addEventListener("input", () => {
    destInput.classList.remove("input-error");
    const feedback = document.getElementById("searchFeedback");
    if (feedback) feedback.classList.remove("active");
  });

  destInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchTravel();
    }
  });
}

function searchTravel() {
  const destInput = document.getElementById("destination");
  const feedback = document.getElementById("searchFeedback");

  if (!destInput) return;

  const destination = destInput.value.trim();

  if (destination === "") {
    destInput.classList.add("input-error");
    destInput.focus();
    if (feedback) {
      feedback.textContent = "Please enter a destination to search.";
      feedback.classList.add("active");
    }
    return;
  }

  // Redirect to destinations page with query parameter
  window.location.href = `destinations.html?search=${encodeURIComponent(destination)}`;
}

/* ==========================================================================
   6. Live Destination & Tour Packages Filtering (destinations.html)
   ========================================================================== */

let activeCategory = "all";
let activeSearchQuery = "";

function initDestinationFilters() {
  const filterInput = document.getElementById("destinationFilterInput");

  // Check URL query parameters (e.g. ?search=Paris)
  if (window.location.search) {
    const params = new URLSearchParams(window.location.search);
    const searchVal = params.get("search");
    if (searchVal) {
      activeSearchQuery = searchVal.trim().toLowerCase();
      if (filterInput) {
        filterInput.value = searchVal.trim();
      }
      applyDestinationFilters();
    }
  }

  if (filterInput) {
    filterInput.addEventListener("input", (e) => {
      handleDestinationSearch(e.target.value);
    });
  }
}

function handleDestinationSearch(query) {
  activeSearchQuery = (query || "").trim().toLowerCase();
  applyDestinationFilters();
}

function setCategoryFilter(category, btnElement) {
  activeCategory = category || "all";

  const pills = document.querySelectorAll(".filter-pill");
  pills.forEach((p) => p.classList.remove("active"));
  if (btnElement) {
    btnElement.classList.add("active");
  }

  applyDestinationFilters();
}

function resetDestinationFilters() {
  activeCategory = "all";
  activeSearchQuery = "";

  const filterInput = document.getElementById("destinationFilterInput");
  if (filterInput) filterInput.value = "";

  const pills = document.querySelectorAll(".filter-pill");
  pills.forEach((p) => {
    if (p.getAttribute("data-filter") === "all") {
      p.classList.add("active");
    } else {
      p.classList.remove("active");
    }
  });

  applyDestinationFilters();
  showToast("Filters reset to view all packages", "info", "🔄");
}

function applyDestinationFilters() {
  const cards = document.querySelectorAll(".filterable-card");
  if (!cards.length) return;

  let visibleCount = 0;

  cards.forEach((card) => {
    const category = (card.getAttribute("data-category") || "").toLowerCase();
    const tags = (card.getAttribute("data-tags") || "").toLowerCase();
    const textContent = card.textContent.toLowerCase();

    const matchesCategory =
      activeCategory === "all" || category.includes(activeCategory);

    const matchesQuery =
      !activeSearchQuery ||
      tags.includes(activeSearchQuery) ||
      textContent.includes(activeSearchQuery);

    if (matchesCategory && matchesQuery) {
      card.style.display = "";
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });

  // Update Status Banner
  const statusContainer = document.getElementById("filterStatus");
  const statusText = document.getElementById("filterStatusText");
  const noResultsMsg = document.getElementById("noResultsMsg");

  if (statusContainer && statusText) {
    if (activeCategory !== "all" || activeSearchQuery !== "") {
      statusContainer.style.display = "block";
      const filterLabel = activeCategory !== "all" ? `category '${activeCategory}'` : "";
      const searchLabel = activeSearchQuery ? `matching '${activeSearchQuery}'` : "";
      const label = [filterLabel, searchLabel].filter(Boolean).join(" & ");
      statusText.textContent = `Showing ${visibleCount} destination(s) ${label}`;
    } else {
      statusContainer.style.display = "none";
    }
  }

  // Handle empty search results view
  if (noResultsMsg) {
    if (visibleCount === 0) {
      noResultsMsg.classList.add("active");
    } else {
      noResultsMsg.classList.remove("active");
    }
  }
}

/* ==========================================================================
   7. Modals (Booking Modal & Login Modal)
   ========================================================================== */

function initModals() {
  window.addEventListener("click", (event) => {
    const bookingModal = document.getElementById("bookingModal");
    const loginModal = document.getElementById("loginModal");

    if (bookingModal && event.target === bookingModal) {
      closeBooking();
    }
    if (loginModal && event.target === loginModal) {
      closeLogin();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeBooking();
      closeLogin();
    }
  });
}

function openBooking(packageName) {
  const bookingModal = document.getElementById("bookingModal");
  const packageInput = document.getElementById("selectedPackage");

  if (!bookingModal) {
    window.location.href = "destinations.html";
    return;
  }

  if (packageInput) {
    packageInput.value = packageName || "General Package";
  }

  const alertBox = document.getElementById("bookingAlert");
  if (alertBox) {
    alertBox.className = "form-alert";
    alertBox.textContent = "";
    alertBox.style.display = "none";
  }

  bookingModal.classList.add("active");
  const nameInput = document.getElementById("bookingName");
  if (nameInput) nameInput.focus();
}

function closeBooking() {
  const bookingModal = document.getElementById("bookingModal");
  if (bookingModal) {
    bookingModal.classList.remove("active");
  }
}

function confirmBooking(event) {
  event.preventDefault();
  const alertBox = document.getElementById("bookingAlert");
  const form = event.target;
  const packageInput = document.getElementById("selectedPackage");
  const pkgName = packageInput ? packageInput.value : "Trip";

  const bookingRef = "TRV-" + Math.floor(10000 + Math.random() * 90000);

  if (alertBox) {
    alertBox.className = "form-alert success";
    alertBox.innerHTML = `🎉 <strong>Booking Request Confirmed!</strong><br>Reference ID: <strong>#${bookingRef}</strong> for <em>${escapeHtml(pkgName)}</em>. Our travel team will contact you within 24 hours.`;
    alertBox.style.display = "block";
    form.reset();
  }

  showToast(`Booking #${bookingRef} confirmed!`, "success", "🎉");

  setTimeout(() => {
    closeBooking();
  }, 2800);
}

function openLogin() {
  const loginModal = document.getElementById("loginModal");
  if (loginModal) {
    switchAuthTab("login");
    loginModal.classList.add("active");
    const emailInput = document.getElementById("loginEmail");
    if (emailInput) emailInput.focus();
  }
}

function closeLogin() {
  const loginModal = document.getElementById("loginModal");
  if (loginModal) {
    loginModal.classList.remove("active");
  }
}

// Legacy fallback for handleLogin if called directly
function handleLogin(event) {
  handleAuthSubmit(event);
}

/* ==========================================================================
   8. Contact Form Validation & Submission (contact.html)
   ========================================================================== */

function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("contactName");
    const email = document.getElementById("contactEmail");
    const phone = document.getElementById("contactPhone");
    const destination = document.getElementById("contactDestination");
    const message = document.getElementById("contactMessage");
    const alertBox = document.getElementById("contactAlert");

    if (!alertBox) return;

    alertBox.className = "form-alert";
    alertBox.style.display = "none";
    alertBox.textContent = "";

    if (!name.value.trim()) {
      showContactAlert(alertBox, "error", "⚠️ Please enter your full name.");
      name.focus();
      return;
    }

    if (!email.value.trim() || !validateEmail(email.value.trim())) {
      showContactAlert(alertBox, "error", "⚠️ Please enter a valid email address.");
      email.focus();
      return;
    }

    if (!phone.value.trim()) {
      showContactAlert(alertBox, "error", "⚠️ Please enter your phone number.");
      phone.focus();
      return;
    }

    if (!destination.value) {
      showContactAlert(alertBox, "error", "⚠️ Please select a destination.");
      destination.focus();
      return;
    }

    if (!message.value.trim()) {
      showContactAlert(alertBox, "error", "⚠️ Please enter your message or enquiry details.");
      message.focus();
      return;
    }

    const enquiryRef = "ENQ-" + Math.floor(10000 + Math.random() * 90000);

    showContactAlert(
      alertBox,
      "success",
      `✅ Thank you, ${escapeHtml(name.value.trim())}! Your enquiry (Ref #${enquiryRef}) has been received. Our Chennai travel team will contact you within 24 hours.`
    );

    showToast(`Enquiry #${enquiryRef} submitted!`, "success", "✅");
    form.reset();
  });
}

function showContactAlert(alertBox, type, message) {
  alertBox.className = `form-alert ${type}`;
  alertBox.textContent = message;
  alertBox.style.display = "block";
  alertBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

/* ==========================================================================
   9. FAQ Accordion (contact.html)
   ========================================================================== */

function toggleFaq(questionElement) {
  const faqItem = questionElement.closest(".faq-item");
  if (!faqItem) return;

  const isOpen = faqItem.classList.contains("open");

  // Close other open FAQ items
  const allItems = document.querySelectorAll(".faq-item");
  allItems.forEach((item) => item.classList.remove("open"));

  // Toggle clicked item
  if (!isOpen) {
    faqItem.classList.add("open");
  }
}

/* ==========================================================================
   10. Newsletter Form (index.html)
   ========================================================================== */

function handleNewsletterSubmit(event) {
  event.preventDefault();
  const input = document.getElementById("newsletterEmail");
  const feedback = document.getElementById("newsletterFeedback");

  if (!input) return;

  const email = input.value.trim();
  if (!email || !validateEmail(email)) {
    if (feedback) {
      feedback.textContent = "⚠️ Please enter a valid email address.";
      feedback.style.color = "#fee2e2";
      feedback.classList.add("active");
    }
    return;
  }

  if (feedback) {
    feedback.textContent = "🎉 Congratulations! Check your email for secret deals and discounts.";
    feedback.style.color = "#86efac";
    feedback.classList.add("active");
  }

  showToast("Subscribed to TravelGo deals!", "success", "🎁");
  input.value = "";

  setTimeout(() => {
    if (feedback) feedback.classList.remove("active");
  }, 4000);
}

/* ==========================================================================
   11. Toast Notifications Utility
   ========================================================================== */

let toastTimeout = null;

function showToast(message, type = "success", icon = "✨") {
  let toast = document.getElementById("toastNotification");
  let toastMsg = document.getElementById("toastMessage");
  let toastIcon = document.getElementById("toastIcon");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toastNotification";
    toast.className = "toast-notification";
    toast.innerHTML = `<span id="toastIcon">${icon}</span><span id="toastMessage">${escapeHtml(message)}</span>`;
    document.body.appendChild(toast);
  } else {
    if (toastMsg) toastMsg.textContent = message;
    if (toastIcon) toastIcon.textContent = icon;
  }

  toast.className = `toast-notification ${type} toast-show`;

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("toast-show");
  }, 3200);
}

/* ==========================================================================
   12. Helper Utilities
   ========================================================================== */

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(string) {
  const div = document.createElement("div");
  div.textContent = string;
  return div.innerHTML;
}
