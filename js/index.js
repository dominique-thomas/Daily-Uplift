//--------------------------
// Global delcarations
//--------------------------
const themeToggle = document.getElementById("themeToggle");
const greetingEl = document.getElementById("greeting");
const affirmationEl = document.getElementById("affirmation");
const defaultAffirmation = "You are worthy of love and happiness!";
let deferredPrompt; 

//--------------------------
// Function Delcarations
//--------------------------
document.addEventListener("DOMContentLoaded", function () {

    themeToggle.addEventListener("click", toggleTheme);    

    loadSavedTheme();
    setGreeting();    
    displayAffirmation();
    //disableSplash();
});

// Disable the splash page
const disableSplash = function(){
    setTimeout(function(){
        const splashScreen = document.getElementById("splash");
        splashScreen.classList.add("splash-hidden"); 
    }, 4500);
}

// Set the greeting based on the time of day
const setGreeting = function(){
     const hour = new Date().getHours();    
     if (hour < 12) {
         greetingEl.textContent = "Good morning,";
     } else if (hour < 18) {
         greetingEl.textContent = "Good afternoon,";
     } else {
         greetingEl.textContent = "Good evening,";
     } 
}

// Display affirmation based on whether it's a new day or not
const displayAffirmation = function() {
    const lastVisited = localStorage.getItem("lastVisited");
    const today = new Date().toDateString();

    // If the affirmation is from today, display it
    if (lastVisited === today) {
        const affirmationIndex = localStorage.getItem("affirmationIndex");
        
        affirmationEl.textContent = defaultAffirmation;

        if (affirmationIndex !== null && affirmationIndex >= 0 && affirmationIndex < affirmations.length) {
            affirmationEl.textContent = affirmations[affirmationIndex];
        } 
    } else {
        // If it's a new day, generate a new affirmation and store it
        const newAffirmation = generateAffirmation();
        affirmationEl.textContent = affirmations[newAffirmation];
    }
}

// Generate a new affirmation index and store it in localStorage
const generateAffirmation = function() {

    let usedAffirmations = JSON.parse(localStorage.getItem("usedAffirmations")) || [];
    let newAffirmationIndex;
    
    if (usedAffirmations.length === affirmations.length) {
        usedAffirmations = [];
    }

    do {
        newAffirmationIndex = Math.floor(Math.random() * affirmations.length);
    } while (usedAffirmations.includes(newAffirmationIndex));

    usedAffirmations.push(newAffirmationIndex);
    localStorage.setItem("usedAffirmations", JSON.stringify(usedAffirmations));
    localStorage.setItem("affirmationIndex", newAffirmationIndex);
    localStorage.setItem("lastVisited", new Date().toDateString());

    return newAffirmationIndex;
}

// Function to switch theme and icon
const toggleTheme = function() {

    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");

    // Change icon based on current theme
    if (document.body.classList.contains("dark-mode")) {
        themeToggle.classList.replace("fa-moon", "fa-sun"); 
        localStorage.setItem("theme", "dark");
    } else {
        themeToggle.classList.replace("fa-sun", "fa-moon"); 
        localStorage.setItem("theme", "light");
    }
}

// Load saved theme 
const loadSavedTheme = function() {

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
        document.body.classList.remove("dark-mode");
        themeToggle.classList.replace("fa-sun", "fa-moon");
    }else{
        themeToggle.classList.replace("fa-moon", "fa-sun"); 
    }
}    

// Clear logal storage 
const clearStorage = function() {
    localStorage.removeItem("dailyAffirmation");
    localStorage.removeItem("lastVisited");
    localStorage.removeItem("usedAffirmations");
    localStorage.removeItem("lastAffirmationDate");
    localStorage.removeItem("theme");
    console.log("Storage cleared!");
}

// Testing & Debugging
const getRandomAffirmation = function() {
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    return affirmations[randomIndex];
}

const testRandomAffirmation = function() {
    const affirmation = getRandomAffirmation();
    console.log(affirmation); 
}

// Service Worker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js")
        .then(() => console.log("Service Worker Registered"))
        .catch((error) => console.log("Service Worker Registration Failed:", error));
}

// Installation prompt
window.addEventListener("beforeinstallprompt", function (e) {
    
    e.preventDefault();
    deferredPrompt = e;
    deferredPrompt.prompt();

    // Handle the user's response to the prompt
    deferredPrompt.userChoice.then(function (choiceResult) {
        if (choiceResult.outcome === "accepted") {
            console.log("User accepted the prompt");
        } else {
            console.log("User dismissed the prompt");
        }
        deferredPrompt = null;
    });
});
