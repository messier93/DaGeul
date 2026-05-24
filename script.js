const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const reserveForm = document.querySelector(".reserve-form");
const carousel = document.querySelector("[data-carousel]");
const prevButton = document.querySelector(".carousel-button.prev");
const nextButton = document.querySelector(".carousel-button.next");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (reserveForm) {
  reserveForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(reserveForm);
    const nama = formData.get("nama");
    const tanggal = formData.get("tanggal");
    const jam = formData.get("jam");
    const orang = formData.get("orang");
    const catatan = formData.get("catatan") || "-";

    const message = [
      "Halo Dapur Geulis, saya ingin reservasi meja atas nama.",
      `Nama: ${nama}`,
      `Tanggal: ${tanggal}`,
      `Jam: ${jam}`,
      `Jumlah orang: ${orang}`,
      `Catatan: ${catatan}`,
    ].join("\n");

    window.open(`https://wa.me/6285776372537?text=${encodeURIComponent(message)}`, "_blank");
  });
}

if (carousel) {
  const getScrollAmount = () => {
    const card = carousel.querySelector(".interior-card");
    return card ? card.getBoundingClientRect().width + 18 : 360;
  };

  const moveCarousel = (direction) => {
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    const nextLeft = carousel.scrollLeft + getScrollAmount() * direction;

    if (nextLeft >= maxScroll - 8) {
      carousel.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    if (nextLeft <= 0) {
      carousel.scrollTo({ left: maxScroll, behavior: "smooth" });
      return;
    }

    carousel.scrollBy({ left: getScrollAmount() * direction, behavior: "smooth" });
  };

  nextButton?.addEventListener("click", () => moveCarousel(1));
  prevButton?.addEventListener("click", () => moveCarousel(-1));

  let autoScroll = window.setInterval(() => moveCarousel(1), 3200);

  carousel.addEventListener("mouseenter", () => window.clearInterval(autoScroll));
  carousel.addEventListener("mouseleave", () => {
    autoScroll = window.setInterval(() => moveCarousel(1), 3200);
  });
}
