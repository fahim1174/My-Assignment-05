// সব সার্ভিস লিস্ট
const services = [
    { name: "National Emergency", nameEn: "Emergency Number", number: "999", category: "All" },
    { name: "Police", nameEn: "Police Helpline", number: "999", category: "Emergency" },
    { name: "Fire Service", nameEn: "Fire Service", number: "999", category: "Emergency" },
    { name: "Ambulance", nameEn: "Ambulance Service", number: "1994-999999", category: "Health" },
    { name: "Women & Child", nameEn: "Women & Child Helpline", number: "109", category: "Helpline" },
    { name: "Anti-Corruption", nameEn: "Anti-Corruption Helpline", number: "106", category: "Govt" },
    { name: "Electricity", nameEn: "Electricity Helpline", number: "16216", category: "Utility" },
    { name: "BRAC", nameEn: "BRAC Helpline", number: "16445", category: "NGO" },
    { name: "Railway", nameEn: "Bangladesh Railway", number: "163", category: "Travel" },
    { name: "Gas Service", nameEn: "Gas Helpline", number: "996", category: "Utility" }
];

let favCount = 0;
let coins = 100;
let history = [];

// DOM Elements
const favCountEl = document.getElementById("fav-count");
const coinCountEl = document.getElementById("coin-count");
const cardContainer = document.getElementById("card-container");
const historyList = document.getElementById("history-list");
const clearBtn = document.getElementById("clear-history");

// কার্ড বানানো
function createCard(service) {
    const card = document.createElement("div");
    card.className = "card";

    // কার্ডের কনটেন্ট
    card.innerHTML = `
    <div class="heart">💗</div>
    <h4>${service.name}</h4>
    <p>${service.nameEn}</p>
    <span class="badge">${service.category}</span>
    <p>📞 ${service.number}</p>
    <div class="buttons">
      <button class="copy-btn">📋 Copy</button>
      <button class="call-btn">📞 Call</button>
    </div>
  `;

    // ফেভারিট বাটন ইভেন্ট
    card.querySelector(".heart").addEventListener("click", () => {
        favCount++;
        favCountEl.innerText = favCount;
    });

    // কপি বাটন ইভেন্ট
    card.querySelector(".copy-btn").addEventListener("click", () => {
        navigator.clipboard.writeText(service.number);
        alert(Copied: ${ service.number });
    });

    // কল বাটন ইভেন্ট
    card.querySelector(".call-btn").addEventListener("click", () => {
        if (coins < 20) {
            alert("Not enough coins!");
            return;
        }

        coins -= 20;
        coinCountEl.innerText = coins;

        alert(Calling ${ service.name } at ${ service.number });

        const time = new Date().toLocaleTimeString();
        history.push({ name: service.name, number: service.number, time });

        showHistory();
    });

    cardContainer.appendChild(card);
}

// কল হিস্টরি দেখানো
function showHistory() {
    historyList.innerHTML = "";
    history.forEach(item => {
        const li = document.createElement("li");
        li.innerText = ${ item.name } - ${ item.number } at ${ item.time };
        historyList.appendChild(li);
    });
}

// হিস্টরি ক্লিয়ার
clearBtn.addEventListener("click", () => {
    history = [];
    historyList.innerHTML = "";
});

// সব কার্ড তৈরি
services.forEach(service => createCard(service));