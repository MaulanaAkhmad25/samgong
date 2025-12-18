const startBtn = document.querySelector(".btn-start");
const addCardBtn = document.querySelector(".btn-draw");
const compareBtn = document.querySelector(".btn-open");

// ===== AREA =====
const playerArea = document.querySelectorAll(".player-area")[0];
const botArea = document.querySelectorAll(".player-area")[1];

const userCardsEl = playerArea.querySelector(".cards");
const userTotalEl = playerArea.querySelector(".score");

const botCardsEl = botArea.querySelector(".cards");
const botTotalEl = botArea.querySelector(".score");
const resultEl = document.querySelector(".result");
  let userCards = [];
  let botCards = []; 
  let userTotal = 0;
  let botTotal = 0;
  let playing=false

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

    return { card, value, image };
  }

  function updateUserDisplay() {
    userCardsEl.innerHTML = "";

    userCards.forEach(c => {
      const img = document.createElement("img");
      img.src = c.image;
      img.width = 80;
      img.classList.add("me-2");
      userCardsEl.appendChild(img);
    });

     userTotalEl.textContent = `Total Kartu: ${userTotal}`;;
  }
  function updateBotDisplay() {
  botCardsEl.innerHTML = "";

  botCards.forEach(c => {
    const img = document.createElement("img");
    img.src = c.image;
    img.width = 80;
    img.classList.add("me-2");
    botCardsEl.appendChild(img);
  });

 
}
  
  function checkUserLose() {
    if (userTotal > 30) {
      resultEl.textContent = "Sayang sekali, tapi kamu Kalah";
      addCardBtn.classList.add("d-none");
      compareBtn.classList.add("d-none");
    }
  }
  //menutup kartu
  function showBotBackCards() {
  botCardsEl.innerHTML = ""; 

  botCards.forEach(() => {
    const cardBack = document.createElement("div");
    cardBack.classList.add("card", "back"); 
    botCardsEl.appendChild(cardBack);
  });
}

  startBtn.addEventListener("click", () => {
    playing = true;
    // reset
     botCards = []; 
    userCards = [];
    userTotal = 0;
    resultEl.textContent = "";
    botTotalEl.textContent = "?";
    userCardsEl.innerHTML = "";
      

    // bot random dari awal
    botTotal = Math.floor(Math.random() * 21) + 20; // 0 - 40
    let tempTotal = botTotal;
    while (tempTotal > 0) {
    const card = getRandomCardValue();
    botCards.push(card);
    tempTotal -= card.value;
  }
    showBotBackCards();

    
    const firstCard = getRandomCardValue();

    userCards.push(firstCard);
    userTotal += firstCard.value;

    updateUserDisplay();

    startBtn.classList.remove("d-none");
    startBtn.textContent = "Reset";
    addCardBtn.classList.remove("d-none");
    compareBtn.classList.remove("d-none");

    
  });

  addCardBtn.addEventListener("click", () => {
     if (!playing) return;
    const newCard = getRandomCardValue();

    userCards.push(newCard);
    userTotal += newCard.value;

    updateUserDisplay();
    checkUserLose();
  });
  document.body.addEventListener("click", function () {
  const audio = document.getElementById("backsound");
  audio.play();
    }, { once: true });
  compareBtn.addEventListener("click", () => {
     if (!playing) return;
     updateBotDisplay();
     botTotalEl.textContent = `Total Kartu BOT : ${botTotal}`;;
    if (botTotal > 30 && userTotal < botTotal) {
      resultEl.textContent = "Selamat, Kamu Menang!";
    } else if (userTotal < botTotal) {
      resultEl.textContent = "Sayang sekali, tapi kamu Kalah!";
    } else {
      resultEl.textContent = "Draw!";
    }
         playing = false;
  });
