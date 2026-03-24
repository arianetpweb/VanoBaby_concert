const tickets = [
  { id: "standard", name: "Standard", price: 5000, stock: 160, qty: 0 },
  { id: "premium", name: "Premium", price: 15000, stock: 120, qty: 0 },
  { id: "vip", name: "VIP", price: 50000, stock: 60, qty: 0 },
  { id: "vvip", name: "VVIP", price: 100000, stock: 24, qty: 0 }
];

const ticketList = document.getElementById("ticketList");
const summaryLines = document.getElementById("summaryLines");
const summaryTotal = document.getElementById("summaryTotal");
const summaryNote = document.getElementById("summaryNote");
const summaryCta = document.getElementById("summaryCta");

const formatter = new Intl.NumberFormat("fr-FR");

function formatPrice(value) {
  return `${formatter.format(value)} FCFA`;
}

function renderTickets() {
  ticketList.innerHTML = tickets
    .map((ticket) => {
      const left = ticket.stock - ticket.qty;
      const ratio = Math.max(0, (left / ticket.stock) * 100);

      return `
        <article class="ticket-card">
          <div class="ticket-row">
            <div>
              <h3>${ticket.name}</h3>
              <div class="ticket-price">${formatPrice(ticket.price)}</div>
            </div>

            <div class="qty-control">
              <button class="qty-btn" data-action="decrease" data-id="${ticket.id}" aria-label="Retirer une place">−</button>
              <span class="qty-value">${ticket.qty}</span>
              <button class="qty-btn" data-action="increase" data-id="${ticket.id}" aria-label="Ajouter une place">+</button>
            </div>
          </div>

          <div class="ticket-stock">
            <span>Places restantes : ${left}</span>
          </div>

          <div class="stock-bar">
            <div class="stock-fill" style="width:${ratio}%"></div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderSummary() {
  const selected = tickets.filter((ticket) => ticket.qty > 0);
  const total = selected.reduce((sum, ticket) => sum + ticket.qty * ticket.price, 0);
  const totalQty = selected.reduce((sum, ticket) => sum + ticket.qty, 0);

  if (!selected.length) {
    summaryLines.innerHTML = `<p class="summary-empty">Aucune place sélectionnée pour le moment.</p>`;
    summaryNote.textContent = "Choisis ta catégorie et fais monter le total en temps réel.";
    summaryCta.textContent = "Réserver maintenant";
  } else {
    summaryLines.innerHTML = selected
      .map(
        (ticket) => `
          <div class="summary-line">
            <span>${ticket.qty} × ${ticket.name}</span>
            <strong>${formatPrice(ticket.qty * ticket.price)}</strong>
          </div>
        `
      )
      .join("");

    const mainTicket = selected.length === 1 ? selected[0] : null;

    summaryNote.textContent = `${totalQty} place(s) sélectionnée(s). Les montants se mettent à jour sans rechargement.`;
    summaryCta.textContent = mainTicket
      ? `Réserver ${mainTicket.qty} place(s) à ${formatPrice(mainTicket.price)} — ${formatPrice(total)}`
      : `Réserver maintenant — ${formatPrice(total)}`;
  }

  summaryTotal.textContent = formatPrice(total);
}

ticketList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;

  const { action, id } = button.dataset;
  const ticket = tickets.find((item) => item.id === id);
  if (!ticket) return;

  if (action === "increase" && ticket.qty < ticket.stock) {
    ticket.qty += 1;
  }

  if (action === "decrease" && ticket.qty > 0) {
    ticket.qty -= 1;
  }

  renderTickets();
  renderSummary();
});

renderTickets();
renderSummary();

const targetDate = new Date("2026-04-04T16:00:00");
const ids = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds")
};

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    ids.days.textContent = "00";
    ids.hours.textContent = "00";
    ids.minutes.textContent = "00";
    ids.seconds.textContent = "00";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  ids.days.textContent = String(days).padStart(2, "0");
  ids.hours.textContent = String(hours).padStart(2, "0");
  ids.minutes.textContent = String(minutes).padStart(2, "0");
  ids.seconds.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const button = item.querySelector(".faq-question");
  const icon = item.querySelector(".faq-icon");

  button.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    faqItems.forEach((faqItem) => {
      faqItem.classList.remove("active");
      faqItem.querySelector(".faq-icon").textContent = "+";
    });

    if (!isActive) {
      item.classList.add("active");
      icon.textContent = "−";
    } else {
      item.classList.remove("active");
      icon.textContent = "+";
    }
  });
});

const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");

menuToggle.addEventListener("click", () => {
  mobileNav.classList.toggle("active");
});

mobileNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("active");
  });
});