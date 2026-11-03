// Keep mobile navigation keyboard-accessible and close it after selection.
const menu = document.querySelector("#menu");
const links = document.querySelector("#links");
menu?.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(open));
});
links?.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    links.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
  }),
);
document.querySelector("#year").textContent = new Date().getFullYear();

// Portfolio V4: keep the portrait placeholder until the actual file loads.
const heroProfile = document.querySelector('#hero-profile-photo');
const profileCard = heroProfile?.closest('.hero-photo-card');
function revealProfileWhenReady() {
  if (heroProfile?.naturalWidth > 0) profileCard?.classList.add('has-photo');
}
heroProfile?.addEventListener('load', revealProfileWhenReady);
if (heroProfile?.complete) revealProfileWhenReady();
