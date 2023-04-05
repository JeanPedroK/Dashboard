var seconds = 30 * 60;

setInterval(() => {
  seconds--;

  var minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  var secondsRemain = (seconds % 60).toString().padStart(2, "0");

  document.getElementById("timer").innerHTML = `${minutes}:${secondsRemain}`;

  if (seconds === 0) {
    clearInterval(intervalId);
    alert("Session expire, please relog!");
  }
}, 1000);

var firstNames = [
  "Alice",
  "Bob",
  "Charlie",
  "David",
  "Eve",
  "Frank",
  "Grace",
  "Heidi",
  "Isaac",
  "Julia",
];

var lastNames = [
  "Anderson",
  "Brown",
  "Clark",
  "Davis",
  "Evans",
  "Foster",
  "Garcia",
  "Hernandez",
  "Irwin",
  "Jones",
];

var roles = ["Gerente", "Desenvolvedor", "Analista", "Designer", "Coordenador"];
var periods = ["Turma 01", "Turma 02", "Period 1", "Period 2"];
var commands = [
  "Started a class",
  "Ended a class",
  "applied Heads Up!",
  "removed Heads Up!",
  "removed from class",
];

function generateRandomName() {
  var firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  var lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
}

var objectsArray = [];

for (let i = 0; i < 15; i++) {
  objectsArray.push({
    name: generateRandomName(),
    time: Math.floor(Math.random() * 10) + 1,
    role: roles[Math.floor(Math.random() * roles.length)],
    period: periods[Math.floor(Math.random() * periods.length)],
    command: commands[Math.floor(Math.random() * commands.length)],
  });
}

function addCommands(user) {
  var newDiv = document.createElement("div");
  newDiv.className = "users";

  var html = ' <div class="user-icon">';
  html += '  <img class="icon" src="icons/user.svg" >';
  html += "</div>";
  html += '<div class="user-info">';
  html += "  <p>" + user.name + " " + user.command + "</p>";
  html += "  <p><strong>" + user.period + "</strong> - " + user.role + "</p>";
  html += '  <p class="time-ago"> ' + user.time + " days ago</p>";
  html += "</div>";

  newDiv.innerHTML = html;

  var currentDiv = document.getElementById("last-commands");
  currentDiv.appendChild(newDiv);
}

function renderCanvas() {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");

  canvas.width = canvas.parentElement.offsetWidth;
  canvas.height = canvas.parentElement.offsetHeight;

  var months = canvas.width > 450 ? 12 : 8;

  console.log(canvas.width);

  var data = [];

  for (let i = 0; i < months; i++) {
    data.push(Math.floor(Math.random() * 250));
  }

  var labels = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  var max = Math.max(...data) + 25;
  var min = Math.min(...data) - 25;

  var range = max - min;
  var step = canvas.width / (data.length + 1);
  var x = 0;
  var y = canvas.height - ((data[0] - min) / range) * canvas.height;

  ctx.beginPath();

  for (var i = 0; i < data.length; i++) {
    x += step;
    y = canvas.height - ((data[i] - min) / range) * canvas.height;
    ctx.lineTo(x, y);
    ctx.strokeStyle = "#18bcd4 ";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "#18bcd4 ";
    ctx.fill();
    ctx.stroke();
  }
  ctx.stroke();

  ctx.beginPath();
  ctx.lineWidth = 0.5;
  ctx.strokeStyle = "#ccc";
  for (var i = 1; i <= 10; i++) {
    var y = canvas.height - (i / 10) * canvas.height;
    ctx.moveTo(step - 20, y);
    ctx.lineTo(canvas.width, y);
  }
  ctx.stroke();

  ctx.beginPath();
  ctx.lineWidth = 0.5;
  ctx.strokeStyle = "#ccc";
  ctx.moveTo(step - 20, 0);
  ctx.lineTo(step - 20, canvas.height - 34);
  ctx.stroke();

  ctx.font = "12px Arial";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  for (var i = 0; i < months; i++) {
    var x = i + 1;
    x = x * step;
    ctx.fillText(labels[i], x, canvas.height - 10);
  }

  ctx.font = "12px Arial";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";

  max += 25;

  for (var i = 0; i <= 8; i++) {
    var y = canvas.height - step / 2 - (i / 10) * canvas.height;

    var txt = Math.floor((max / 8) * i);

    ctx.fillText(txt.toString(), 20, y);
  }
}

function selectMenu(el) {
  var element = document.getElementsByClassName("menu-box");

  for (let i = 0; i < element.length; i++) {
    const e = element[i];

    e.classList.remove("active");

    if (e == el) {
      e.classList.add("active");
    }
  }
}

setTimeout(() => {
  for (let index = 0; index < objectsArray.length; index++) {
    addCommands(objectsArray[index]);
  }

  renderCanvas();
}, 100);
