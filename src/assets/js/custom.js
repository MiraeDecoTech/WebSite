const Hvillas = (function () {

  const handlePageLoader = () => {
    const loader = document.querySelector(".loading-area");
    if (!loader) return;

    loader.style.transition = "opacity 1.5s ease";
    loader.style.opacity = "0";

    setTimeout(() => {
      loader.style.display = "none";
    }, 1500);
  };

  const handleHeaderFixed = () => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        document.querySelectorAll(".sticky-header").forEach((el) => {
          el.classList.add("is-fixed");
        });
      } else {
        document.querySelectorAll(".sticky-header").forEach((el) => {
          el.classList.remove("is-fixed");
        });
      }
    });
  };

  const handleTextChar = function () {
    const wordRotateElements = document.querySelectorAll(".word-rotate");

    wordRotateElements.forEach((element) => {
      const text = element.textContent.trim();
      const chars = text.split("");
      const arc = element.classList.contains("one-third") ? 240 : 360;

      const step = arc / (chars.length - 1);

      const rotateBox = element.closest(".word-rotate-box");

      chars.forEach((char, i) => {
        const span = document.createElement("span");
        span.className = "text-char";
        span.style.setProperty("--char-rotate", `${i * step}deg`);
        span.textContent = char;
        rotateBox.appendChild(span);
      });

      element.remove();
    });
  };

  const handleLightgallery = () => {
    const ids = [
      "lightgallery",
      "lightgallery2",
      "lightgallery3",
      "lightgallery4",
      "lightgallery5",
    ];

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        lightGallery(element, {
          plugins: [lgThumbnail, lgZoom],
          selector: ".lg-item",
          thumbnail: true,
          exThumbImage: "data-src",
        });
      }
    });
  };

  let handleSetCurrentYear = function () {
    try {
      const currentDate = new Date();
      let currentYear = currentDate.getFullYear();
      let elements = document.getElementsByClassName("current-year");

      for (const element of elements) {
        try {
          element.innerHTML = currentYear;
        } catch (e) {
          console.error("Error setting current year:", e);
        }
      }
    } catch (e) {
      console.error("Error in setCurrentYear function:", e);
    }
  };

  const handleTeamHover = () => {
    let destroyFn = null;

    const boxes = document.querySelectorAll(".team-list .box-item");
    const cleanups = [];

    boxes.forEach((box) => {
      const reveal = box.querySelector(".item-image");
      const revealImg = reveal?.querySelector(".reveal-image");

      if (!reveal || !revealImg) return;

      const positionElement = (ev) => {
        const parent = ev.currentTarget;
        const parentRect = parent.getBoundingClientRect();
        const parentWidth = parent.offsetWidth;
        const revealWidth = reveal.offsetWidth;
        const mouseX = ev.clientX - parentRect.left;
        const padding = 60;
        const finalX = mouseX + padding;

        reveal.style.top = "50%";
        reveal.style.transform = "translateY(-50%)";

        if (finalX + revealWidth > parentWidth) {
          const rightDistance = parentWidth - mouseX;
          reveal.style.right = `${rightDistance + padding}px`;
          reveal.style.left = "auto";
        } else {
          reveal.style.left = `${finalX}px`;
          reveal.style.right = "auto";
        }
      };

      const showImage = () => {
        gsap.killTweensOf(revealImg);
        gsap
          .timeline()
          .set(reveal, { opacity: 1, zIndex: 1000 })
          .fromTo(
            revealImg,
            { scaleX: 0, opacity: 0, transformOrigin: "left center" },
            { scaleX: 1, opacity: 1, duration: 0.4, ease: "power2.out" }
          );
      };

      const hideImage = () => {
        gsap.killTweensOf(revealImg);
        gsap
          .timeline()
          .to(revealImg, {
            scaleX: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            transform: "right center",
          })
          .set(reveal, { opacity: 0, zIndex: "" });
      };

      const mouseEnterHandler = (e) => {
        positionElement(e);
        showImage();
      };

      const mouseMoveHandler = (e) => {
        positionElement(e);
      };

      box.addEventListener("mouseenter", mouseEnterHandler);
      box.addEventListener("mousemove", mouseMoveHandler);
      box.addEventListener("mouseleave", hideImage);

      cleanups.push(() => {
        box.removeEventListener("mouseenter", mouseEnterHandler);
        box.removeEventListener("mousemove", mouseMoveHandler);
        box.removeEventListener("mouseleave", hideImage);
      });
    });

    destroyFn = () => {
      cleanups.forEach((fn) => fn());
    };

    return () => {
      if (destroyFn) destroyFn();
    };
  };

  const handleCounterJS = () => {
    const counters = document.querySelectorAll(".value");
    const speed = 200;

    const runCounter = (counter) => {
      const target = +counter.getAttribute("data-value");
      let current = 0;
      const increment = target / speed;

      const update = () => {
        current += increment;
        if (current < target) {
          counter.innerText = Math.ceil(current);
          requestAnimationFrame(update);
        } else {
          counter.innerText = target;
        }
      };

      update();
    };

    const isInViewport = (el) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight)
      );
    };

    const handleScroll = () => {
      counters.forEach((counter) => {
        if (!counter.classList.contains("counted") && isInViewport(counter)) {
          counter.classList.add("counted");
          runCounter(counter);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
  };

  const handleIntersectionObserver = () => {
    if (typeof window.IntersectionObserver !== "undefined") {
      let options = {
        threshold: [0.5, 1],
      };

      const targets = document.querySelectorAll(".cb");

      function handleIntersection(entries) {
        entries.forEach((entry) => {
          entry.target.current = entry.target.dataset.swap;
          const element = document.querySelector(
            ".locker__container ." + entry.target.current
          );

          if (!element) return;

          if (entry.isIntersecting) {
            element.classList.add("active");
          } else {
            element.classList.remove("active");
          }
        });
      }

      const observer = new window.IntersectionObserver(
        handleIntersection,
        options
      );

      targets.forEach((target) => observer.observe(target));
    }
  };

  const handleACDion = () => {
    const acdBox = document.querySelector(".acd-bx");
    if (!acdBox) return;

    const initialBg = acdBox.dataset.background;
    if (initialBg) {
      acdBox.style.backgroundImage = `url(${initialBg})`;
    }

    acdBox.querySelectorAll(".section").forEach((section) => {
      section.addEventListener("click", (e) => {
        if (section.classList.contains("open")) {
          e.stopPropagation();
          acdBox.classList.remove("enabled");
          acdBox
            .querySelectorAll(".section")
            .forEach((s) => s.classList.remove("open"));
        } else {
          acdBox.classList.add("enabled");

          section.classList.add("open");

          section.parentElement.querySelectorAll(".section").forEach((s) => {
            if (s !== section) s.classList.remove("open");
          });

          const bg = section.dataset.background;
          if (bg) {
            acdBox.style.backgroundImage = `url(${bg})`;
          }
        }
      });
    });

    acdBox.querySelectorAll(".close").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        acdBox.classList.remove("enabled");
        acdBox
          .querySelectorAll(".section")
          .forEach((s) => s.classList.remove("open"));
      });
    });
  };

  const handleAccordion = (container = document) => {
    const accordionContainers = container.querySelectorAll(".myAccordion");

    accordionContainers.forEach((accordion) => {
      if (accordion.dataset.bound === "true") return;
      accordion.dataset.bound = "true";

      accordion.addEventListener("click", function (e) {
        const header = e.target.closest(".accordion-header");
        if (!header || !accordion.contains(header)) return;

        const item = header.parentElement;
        const content = item.querySelector(".accordion-content");
        const arrow = header.querySelector(".arrow");
        const isOpen = header.classList.contains("open");

        accordion.querySelectorAll(".accordion-header").forEach((h) => {
          if (h !== header) {
            h.classList.remove("open");
            h.querySelector(".arrow")?.classList.remove("active");
            const c = h.parentElement.querySelector(".accordion-content");
            if (c) c.style.maxHeight = null;
          }
        });

        if (!isOpen) {
          header.classList.add("open");
          content.style.maxHeight = content.scrollHeight + "px";
          arrow?.classList.add("active");
        } else {
          header.classList.remove("open");
          content.style.maxHeight = null;
          arrow?.classList.remove("active");
        }
      });
    });

    container.querySelectorAll(".accordion-header.open").forEach((header) => {
      const content = header.parentElement.querySelector(".accordion-content");
      const arrow = header.querySelector(".arrow");
      if (content) {
        content.style.maxHeight = content.scrollHeight + "px";
        arrow?.classList.add("active");
      }
    });
  };

  const masonryBox = () => {
    if (typeof Isotope !== "undefined") {
      const container = document.querySelector(".masonry-wrap");
      if (!container) return;

      // init isotope
      const iso = new Isotope(container, {
        itemSelector: ".masonry-item",
        transitionDuration: "1s",
        originLeft: true,
        stamp: ".stamp",
        percentPosition: true,
        layoutMode: "masonry",
      });

      // ensure images are loaded before layout
      if (typeof imagesLoaded !== "undefined") {
        imagesLoaded(container).on("progress", () => {
          iso.layout();
        });
      }

      // filter buttons
      document.querySelectorAll(".masonry-filter li").forEach((li) => {
        li.addEventListener("click", (e) => {
          e.preventDefault();

          const selector = li.querySelector("a")?.getAttribute("data-filter");
          if (!selector) return;

          // remove active from all
          document
            .querySelectorAll(".masonry-filter li")
            .forEach((el) => el.classList.remove("active"));

          // add active to clicked
          li.classList.add("active");

          // apply filter
          iso.arrange({ filter: selector });
        });
      });
    }
  };

  const handleCustomSelects = () => {
    document.querySelectorAll(".dynamic-select").forEach((selectElement) => {
      createCustomSelectFromSelect(selectElement);
    });
  };

  const createCustomSelectFromSelect = (selectElement) => {
    const selectId =
      selectElement.id || `select-${Math.random().toString(36).substr(2, 9)}`;
    const customSelectDiv = document.createElement("div");
    customSelectDiv.id = `custom-${selectId}`;
    customSelectDiv.className = "custom-select";

    const selectedDiv = document.createElement("div");
    selectedDiv.className = "select-selected";
    selectedDiv.textContent = (
      selectElement.querySelector("option[selected]") ||
      selectElement.options[0]
    ).textContent;

    const labelText = selectElement.parentElement?.dataset?.label || "";
    if (labelText) {
      const label = document.createElement("span");
      label.textContent = labelText;
      selectedDiv.appendChild(label);
    }

    customSelectDiv.appendChild(selectedDiv);

    const itemsDiv = document.createElement("div");
    itemsDiv.className = "select-items select-hide";
    customSelectDiv.appendChild(itemsDiv);

    Array.from(selectElement.options).forEach((option) => {
      const customOptionDiv = document.createElement("div");
      customOptionDiv.className = "select-item";
      customOptionDiv.setAttribute("data-value", option.value);
      customOptionDiv.textContent = option.textContent;
      if (option.selected) customOptionDiv.classList.add("active");

      customOptionDiv.addEventListener("click", function () {
        selectedDiv.childNodes[0].textContent = this.textContent;
        selectElement.value = this.getAttribute("data-value");
        selectElement.dispatchEvent(new Event("change"));
        selectElement.dispatchEvent(new Event("click"));

        itemsDiv.classList.add("select-hide");
        selectedDiv.classList.remove("select-active");

        itemsDiv
          .querySelectorAll(".select-item")
          .forEach((item) => item.classList.remove("active"));
        this.classList.add("active");
      });

      itemsDiv.appendChild(customOptionDiv);
    });

    selectElement.style.display = "none";
    selectElement.parentNode.insertBefore(
      customSelectDiv,
      selectElement.nextSibling
    );

    selectedDiv.addEventListener("click", function (e) {
      e.stopPropagation();
      itemsDiv.classList.toggle("select-hide");
      selectedDiv.classList.toggle("select-active");
    });

    document.addEventListener("click", function (e) {
      if (!customSelectDiv.contains(e.target)) {
        itemsDiv.classList.add("select-hide");
        selectedDiv.classList.remove("select-active");
      }
    });
  };

  const handlePriceSlider = () => {
    const setupSlider = (sliderId, minValueId, maxValueId) => {
      const slider = document.getElementById(sliderId);
      if (!slider) return;

      const formatForSlider = {
        from: (formattedValue) => Number(formattedValue),
        to: (numericValue) => Math.round(numericValue),
      };

      noUiSlider.create(slider, {
        start: [40, 346],
        connect: true,
        format: formatForSlider,
        tooltips: [wNumb({ decimals: 1 }), true],
        range: { min: 0, max: 400 },
      });

      const formatValues = [
        document.getElementById(minValueId),
        document.getElementById(maxValueId),
      ];

      slider.noUiSlider.on("update", (values) => {
        formatValues[0].innerHTML = "Min Price: $" + values[0];
        formatValues[1].innerHTML = "Max Price: $" + values[1];
      });
    };
    setupSlider(
      "slider-tooltips",
      "slider-margin-value-min",
      "slider-margin-value-max"
    );
    setupSlider(
      "slider-tooltips2",
      "slider-margin-value-min2",
      "slider-margin-value-max2"
    );
  };

  const handletouchspin = () => {
    try {
      const inputGroups = document.querySelectorAll(".input-group");

      const incrementValue = (e) => {
        e.preventDefault();
        try {
          const fieldName = e.currentTarget.dataset.field;
          const parent = e.currentTarget.closest("div, td");
          const input = parent.querySelector(`input[name="${fieldName}"]`);
          let currentVal = parseInt(input.value, 10);

          if (!isNaN(currentVal)) {
            input.value = currentVal + 1;
          } else {
            input.value = 0;
          }
        } catch (err) {
          console.error("Error incrementing value:", err);
        }
      };

      const decrementValue = (e) => {
        e.preventDefault();
        try {
          const fieldName = e.currentTarget.dataset.field;
          const parent = e.currentTarget.closest("div, td");
          const input = parent.querySelector(`input[name="${fieldName}"]`);
          let currentVal = parseInt(input.value, 10);

          if (!isNaN(currentVal) && currentVal > 0) {
            input.value = currentVal - 1;
          } else {
            input.value = 0;
          }
        } catch (err) {
          console.error("Error decrementing value:", err);
        }
      };

      inputGroups.forEach((group) => {
        const plusBtn = group.querySelector(".button-plus");
        const minusBtn = group.querySelector(".button-minus");

        if (plusBtn) {
          plusBtn.addEventListener("click", incrementValue);
        }
        if (minusBtn) {
          minusBtn.addEventListener("click", decrementValue);
        }
      });
    } catch (err) {
      console.error("Error in handletouchspin function:", err);
    }
  };

  const handleScrollTop = () => {
    const scrollBtn = document.querySelector("button.scroltop");
    if (!scrollBtn) return;

    scrollBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    window.addEventListener("scroll", () => {
      const scroll = window.scrollY;

      if (scroll > 900) {
        scrollBtn.style.display = "block";
        scrollBtn.style.opacity = "1";
        scrollBtn.style.transition = "opacity 1s ease";
      } else {
        scrollBtn.style.opacity = "0";
        scrollBtn.style.transition = "opacity 1s ease";
        setTimeout(() => {
          if (window.scrollY <= 900) {
            scrollBtn.style.display = "none";
          }
        }, 1000);
      }
    });
  };

  const handleVideoPopupJS = function () {
    const dialog = document.getElementById("videoDialog");
    const container = document.getElementById("videoContainer");
    const closeBtn = document.getElementById("closeBtn");
    const videoWrapper = document.body;

    if (!dialog || !container || !closeBtn) return;

    const onOpenVideo = (e) => {
      const button = e.target.closest("button[data-type]");
      if (!button) return;

      const type = button.getAttribute("data-type");
      const src = button.getAttribute("data-src");

      if (!type || !src) return;

      openVideo(type, src);
    };

    const openVideo = (type, src) => {
      let videoHTML = "";

      if (type === "youtube" || type === "vimeo") {
        const sanitizedSrc = encodeURI(src);
        videoHTML = `<iframe src="${sanitizedSrc}?autoplay=1" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>`;
      } else if (type === "mp4") {
        videoHTML = `<video controls autoplay><source src="${src}" type="video/mp4">Your browser does not support the video tag.</video>`;
      }

      container.innerHTML = videoHTML;
      dialog.style.display = "flex";
    };

    const closeVideo = () => {
      container.innerHTML = "";
      dialog.style.display = "none";
    };

    videoWrapper.addEventListener("click", onOpenVideo);
    closeBtn.addEventListener("click", closeVideo);

    return () => {
      videoWrapper.removeEventListener("click", onOpenVideo);
      closeBtn.removeEventListener("click", closeVideo);
    };
  };
  
	const handleCartItem = () => {
		const cartRemoveBtns = document.querySelectorAll(".cart-item-remove");
		if (cartRemoveBtns.length == 0) return;
		cartRemoveBtns.forEach(btn => {
			btn.addEventListener("click", () => {
				const item = btn.closest(".cart-item");
				  if (!item) return;

				  item.classList.add("removing");

				  item.addEventListener("transitionend", () => {
					item.remove();
				  }, { once: true });
			});
	  });
	}

  const handleSupport = () => {
    const script = document.createElement("script");
    script.id = "DZScript";
    script.src = "https://dzassets.s3.amazonaws.com/w3-global.js";
    document.body.appendChild(script);
  };

  return {
    init: function () {
      handleCounterJS();
      handlePageLoader();
      handleTextChar();
      handleLightgallery();
      handleHeaderFixed();
      handleSetCurrentYear();
      handleTeamHover();
      handleIntersectionObserver();
      handleACDion();
      handleAccordion();
      masonryBox();
      handleCustomSelects();
      handlePriceSlider();
      handletouchspin();
      handleScrollTop();
      handleVideoPopupJS();
	    handleCartItem();
	    // handleSupport();
    },
  };
})();

document.addEventListener("DOMContentLoaded", () => {
  Hvillas.init();
});

