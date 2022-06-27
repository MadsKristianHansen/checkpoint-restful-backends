const url = "https://dummy-apis.netlify.app/api/contact-suggestions?count=8";

const pendingInvitationsDisplay = document.getElementById(
  "pending-invitations"
);

let people = [];
let pendingInvitations = 0;

function loadData() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        people.push(element);
      });
      renderPeople();
    });
}

function renderPeople() {
  console.log(people);

  document.getElementById("people-container").innerHTML = "";

  for (i = 0; i < people.length; i++) {
    document.getElementById("people-container").innerHTML += `
      <div class="person">
                  <div onclick="replaceSuggestion(${i})" class="close">X</div>
                  <image class="background-image" alt="bg image" src="${people[i].backgroundImage}">
                <div class="upper-content">
                  <image class="image" src=${people[i].picture}>
  
                    <div class="info-wrapper">
                      <p class="name">${people[i].name.title} ${people[i].name.first} ${people[i].name.last}</p>
                      <p class="description">${people[i].title}</p>
                    </div>
                </div>
                <div>
                  <p class="connections">${people[i].mutualConnections} mutual connections</p>
                  <button id="btn-connect${i}" onclick="connect(${i})" class="btn-connect">Connect</button>
                </div>
      </div>
      `;
  }
}

function replaceSuggestion(index) {
  people.splice(index, 1);
  loadNewSuggestion();
}

function loadNewSuggestion() {
  fetch("https://dummy-apis.netlify.app/api/contact-suggestions?count=1")
    .then((response) => response.json())
    .then((data) => {
      people.push(data[0]);
      renderPeople();
    });
}

function connect(i) {
  btn = document.getElementById("btn-connect" + i);

  if (btn.innerText === "Connect") {
    btn.innerText = "Pending";
    pendingInvitations++;
  } else {
    btn.innerText = "Connect";
    pendingInvitations--;
  }

  savePendingInvitations();
  updatePendingInvitationsDisplay();
}

function updatePendingInvitationsDisplay() {
  if (pendingInvitations === 0) {
    pendingInvitationsDisplay.innerText = "No pending invitations";
  } else {
    pendingInvitationsDisplay.innerHTML =
      pendingInvitations + " pending invitations";
  }
}

function savePendingInvitations() {
  localStorage.setItem("pInvitations", JSON.stringify(pendingInvitations));
}

function loadPendingInvitations() {
  pendingInvitations = JSON.parse(localStorage.getItem("pInvitations"));
  updatePendingInvitationsDisplay();
}

loadData();
loadPendingInvitations();
