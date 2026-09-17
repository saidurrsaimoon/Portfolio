const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const topBtn = document.getElementById("topBtn");
const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  menuBtn.textContent = navMenu.classList.contains("open") ? "✕" : "☰";
});

document.querySelectorAll("#navMenu a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuBtn.textContent = "☰";
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

window.addEventListener("scroll", () => {
  topBtn.classList.toggle("show", window.scrollY > 500);
});

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const glow = document.querySelector(".cursor-glow");

window.addEventListener("mousemove", (e) => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

/* ============================================
   CV PASSWORD PROTECTION
   ============================================ */
const CV_PASSWORD = "Saimoon1234"; // <-- Change korle password change hobe

const cvForm     = document.getElementById("cvForm");
const cvPassword = document.getElementById("cvPassword");
const cvLock     = document.getElementById("cvLock");
const cvContent  = document.getElementById("cvContent");
const cvError    = document.getElementById("cvError");
const cvLockBtn  = document.getElementById("cvLockBtn");

function unlockCV() {
  cvLock.style.display = "none";
  cvContent.classList.add("active");
  sessionStorage.setItem("cvUnlocked", "yes");
  cvError.textContent = "";
  cvPassword.value = "";
}

function lockCV() {
  cvLock.style.display = "";
  cvContent.classList.remove("active");
  sessionStorage.removeItem("cvUnlocked");
}

// Check session on page load
if (sessionStorage.getItem("cvUnlocked") === "yes") {
  unlockCV();
}

// Form submit
cvForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const entered = cvPassword.value.trim();
  if (entered === CV_PASSWORD) {
    unlockCV();
  } else {
    cvError.textContent = "❌ Wrong password. Please try again.";
    cvPassword.value = "";
    cvPassword.focus();
    // Shake animation
    cvLock.animate(
      [
        { transform: "translateX(0)" },
        { transform: "translateX(-8px)" },
        { transform: "translateX(8px)" },
        { transform: "translateX(-6px)" },
        { transform: "translateX(6px)" },
        { transform: "translateX(0)" }
      ],
      { duration: 400, easing: "ease-in-out" }
    );
  }
});

// Lock button
cvLockBtn.addEventListener("click", () => {
  lockCV();
  window.scrollTo({ top: document.getElementById("cv").offsetTop - 100, behavior: "smooth" });
});
