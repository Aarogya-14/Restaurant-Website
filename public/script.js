const menu = [
  { name: 'Pizza', price: 200 },
  { name: 'Burger', price: 100 }
];

let cart = [];
let selectedTable = null;

function loadMenu() {
  const menuList = document.getElementById("menuList");
  menu.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "bg-white p-4 rounded shadow";
    div.innerHTML = `
      <h3 class='font-bold'>${item.name}</h3>
      <p>₹${item.price}</p>
      <button onclick="addToCart(${i})" class='bg-black text-white px-2 py-1 mt-2'>Add</button>
    `;
    menuList.appendChild(div);
  });
}

function addToCart(i) {
  cart.push(menu[i]);
  renderCart();
}

function renderCart() {
  document.getElementById("cart").innerHTML = cart.map(i => i.name + " - ₹" + i.price).join("<br>");
}

function createTables() {
  const container = document.getElementById("tables");
  for (let i = 1; i <= 8; i++) {
    const btn = document.createElement("button");
    btn.innerText = "Table " + i;
    btn.className = "p-2 bg-gray-300";
    btn.onclick = () => {
      selectedTable = i;
      alert("Selected Table " + i);
    };
    container.appendChild(btn);
  }
}

function bookTable() {
  fetch("/book", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: document.getElementById("name").value,
      date: document.getElementById("date").value,
      table: selectedTable
    })
  }).then(r => r.json()).then(d => alert(d.message));
}

function placeOrder() {
  fetch("/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cart })
  }).then(r => r.json()).then(d => alert(d.message));
}

loadMenu();
createTables();