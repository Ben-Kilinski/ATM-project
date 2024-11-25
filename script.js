// Variables
let accountBalance = 1000; // Initial balance
const correctPIN = "1234"; // Mock PIN for testing

// DOM Elements
const screens = document.querySelectorAll(".screen");
const pinInput = document.getElementById("pin-input");
const pinFeedback = document.getElementById("pin-feedback");
const balanceAmount = document.getElementById("balance-amount");
const withdrawAmount = document.getElementById("withdraw-amount");
const depositAmount = document.getElementById("deposit-amount");
const withdrawFeedback = document.getElementById("withdraw-feedback");
const depositFeedback = document.getElementById("deposit-feedback");

// Helper Functions
const showScreen = (id) => {
    screens.forEach(screen => screen.classList.remove("active"));
    document.getElementById(id).classList.add("active");
};

// Event Listeners
document.getElementById("insert-card").addEventListener("click", () => {
    showScreen("pin-screen");
});

document.getElementById("validate-pin").addEventListener("click", () => {
    if (pinInput.value === correctPIN) {
        showScreen("menu-screen");
        pinFeedback.textContent = "";
    } else {
        pinFeedback.textContent = "Incorrect PIN. Try again.";
    }
    pinInput.value = "";
});

document.querySelectorAll("#menu-screen button").forEach(button => {
    button.addEventListener("click", (e) => {
        const action = e.target.getAttribute("data-action");
        if (action === "balance") {
            balanceAmount.textContent = `$${accountBalance.toFixed(2)}`;
            showScreen("balance-screen");
        } else if (action === "withdraw") {
            showScreen("withdraw-screen");
        } else if (action === "deposit") {
            showScreen("deposit-screen");
        } else if (action === "exit") {
            showScreen("welcome-screen");
        }
    });
});

document.getElementById("confirm-withdraw").addEventListener("click", () => {
    const amount = parseFloat(withdrawAmount.value);
    if (isNaN(amount) || amount <= 0) {
        withdrawFeedback.textContent = "Enter a valid amount.";
    } else if (amount > accountBalance) {
        withdrawFeedback.textContent = "Insufficient funds.";
    } else {
        accountBalance -= amount;
        withdrawFeedback.textContent = "";
        showScreen("menu-screen");
    }
    withdrawAmount.value = "";
});

document.getElementById("confirm-deposit").addEventListener("click", () => {
    const amount = parseFloat(depositAmount.value);
    if (isNaN(amount) || amount <= 0) {
        depositFeedback.textContent = "Enter a valid amount.";
    } else {
        accountBalance += amount;
        depositFeedback.textContent = "";
        showScreen("menu-screen");
    }
    depositAmount.value = "";
});

document.getElementById("back-menu").addEventListener("click", () => {
    showScreen("menu-screen");
});
