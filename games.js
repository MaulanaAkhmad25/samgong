const startBtn = document.querySelector(".btn-start");
const addCardBtn = document.querySelector(".btn-draw");
const openBtn = document.querySelector(".btn-open");

const playerArea = document.querySelector(".player-area");
const playerCardsEl = playerArea.querySelector(".cards");
const playerScoreEl = playerArea.querySelector(".score");

const botArea = document.querySelectorAll(".player-area")[1];
const botCardsEl = botArea.querySelector(".cards");
const botScoreEl = botArea.querySelector(".score");

let userCards = [];
let userTotal = 0;

let botCards = [];
let botTotal = 0;

function getRandomCardValue() {
  const cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  const suits = ["S", "H", "D", "C"];

  const card = cards[Math.floor(Math.random() * cards.length)];
  const suit = suits[Math.floor(Math.random() * suits.length)];

  let value = 0;
  if (card === "A") value = 11;
  else if (["J", "Q", "K"].includes(card)) value = 10;
  else value = parseInt(card);

  const image = `https://deckofcardsapi.com/static/img/${card}${suit}.png`;

  return { card, suit, value, image };
}

// function applyCardContainerStyle(container) {
//   container.style.display = "flex";
//   container.style.flexDirection = "row";
//   container.style.gap = "8px";
//   container.style.alignItems = "center";
// }

function renderPlayerCards() {
//   applyCardContainerStyle(playerCardsEl);
  playerCardsEl.innerHTML = "";

  userCards.forEach(c => {
    const cardEl = document.createElement("div");
    cardEl.className = "card";
    cardEl.style.width = "60px";
    cardEl.style.height = "90px";

    const img = document.createElement("img");
    img.src = c.image;
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "contain";

    cardEl.appendChild(img);
    playerCardsEl.appendChild(cardEl);
  });

  playerScoreEl.textContent = `Total Kartu: ${userTotal}`;
}

function renderBotCards(show = false) {
//   applyCardContainerStyle(botCardsEl);
  botCardsEl.innerHTML = "";

  botCards.forEach(c => {
    const cardEl = document.createElement("div");
    cardEl.className = "card";
    cardEl.style.width = "60px";
    cardEl.style.height = "90px";

    if (show) {
      const img = document.createElement("img");
      img.src = c.image;
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "contain";
      cardEl.appendChild(img);
    } else {
      cardEl.classList.add("back");
      cardEl.textContent = "?";
    }

    botCardsEl.appendChild(cardEl);
  });
}


// function checkUserLose() {
//   if (userTotal > 30) {
//     playerScoreEl.textContent = `Total Kartu: ${userTotal} (KALAH)`;
//     addCardBtn.disabled = true;
//     openBtn.disabled = true;
//   }
// }

startBtn.addEventListener("click", () => {
  userCards = [];
  botCards = [];
  userTotal = 0;

  playerCardsEl.innerHTML = "";
  playerScoreEl.textContent = "Total Kartu: ??";

  botTotal = Math.floor(Math.random() * 21) + 20;
  botScoreEl.textContent = "Kartu Masih Tertutup";

  const botCardCount = Math.floor(Math.random() * 3) + 3;

  for (let i = 0; i < botCardCount; i++) {
    botCards.push(getRandomCardValue());
  }

  renderBotCards(false);

  const firstCard = getRandomCardValue();
  userCards.push(firstCard);
  userTotal += firstCard.value;

  renderPlayerCards();

  addCardBtn.disabled = false;
  openBtn.disabled = false;
});

addCardBtn.addEventListener("click", () => {
  const newCard = getRandomCardValue();
  userCards.push(newCard);
  userTotal += newCard.value;

  renderPlayerCards();
  checkUserLose();
});

openBtn.addEventListener("click", () => {
  renderBotCards(true);
  botScoreEl.textContent = `Total Kartu Bot: ${botTotal}`;

  let result = "";

    if (botTotal > 30) {
      if (userTotal < botTotal) {
        playerScoreEl.textContent = "Selamat, Kamu Menang!";
      } else {
        playerScoreEl.textContent = "Sayang sekali, tapi kamu Kalah!"
      }
    } else {
      if (userTotal > botTotal) {
        playerScoreEl.textContent = "Selamat, Kamu Menang!";
      } else if (userTotal < botTotal) {
        playerScoreEl.textContent = "Sayang sekali, tapi kamu Kalah!"
    }   else {
        playerScoreEl.textContent = "Draw!";
    }
    }

  playerScoreEl.textContent += ` — ${result}`;

  addCardBtn.disabled = true;
  openBtn.disabled = true;
});
