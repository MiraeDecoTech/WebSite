(function () {
  const parallax = document.querySelectorAll(".parallax-image");
  const speed = 0.5;

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY || window.pageYOffset;

    parallax.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const elTop = rect.top + scrollTop;
      const dist = scrollTop - elTop;

      el.style.transform = `translateY(${dist * speed}px)`;
      el.style.willChange = "transform";
    });
  });
})();
