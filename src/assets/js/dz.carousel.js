const HvillasCarousel = (function () {
  const handleServiceSwiper = () => {
    const slider = document.querySelector(".services-slider");
    if (!slider) return;

    new Swiper(".services-slider", {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      effect: "fade",
      speed: 1000,
      autoplay: {
        delay: 2000,
      },
      navigation: {
        nextEl: ".services-swiper-button-next",
        prevEl: ".services-swiper-button-prev",
      },
    });
  };

  const handleSliderhomeone = function () {
    var swiper2 = new Swiper(".twm-slider1", {
      thumbs: { swiper: swiper },
      slidesPerView: 1,
      speed: 3000,
      parallax: true,
      freeMode: false,
      loop: true,
      grabCursor: true,
      effect: "creative",
      creativeEffect: {
        prev: {
          shadow: false,
          translate: ["-120%", 0, -500],
        },
        next: {
          shadow: false,
          translate: ["120%", 0, -500],
        },
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      scrollbar: {
        el: ".swiper-scrollbar",
        hide: false,
      },
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
      },
    });

    var swiper = new Swiper(".twm-slider1-content", {
      slidesPerView: 1,
      speed: 3000,
      parallax: true,
      freeMode: false,
      loop: true,
      grabCursor: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      scrollbar: {
        el: ".swiper-scrollbar",
        hide: false,
      },
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
      },
    });
  };

  const handleBrandSwiper3 = function () {
    const brandSwiper = document.querySelector(".brand-swiper3");

    if (brandSwiper) {
      const swiper = new Swiper(".brand-swiper3", {
        speed: 1500,
        parallax: true,
        slidesPerView: 5,
        spaceBetween: 20,
        loop: true,
        autoplay: {
          delay: 1500,
        },
        breakpoints: {
          300: {
            slidesPerView: 2,
          },
          360: {
            slidesPerView: 2,
          },
          767: {
            slidesPerView: 4,
          },
          991: {
            slidesPerView: 6,
          },
          1200: {
            slidesPerView: 6,
          },
        },
      });
    }
  };

  const handleBrandSwiper4 = function () {
    const brandSwiper = document.querySelector(".brand-swiper4");

    if (brandSwiper) {
      const swiper = new Swiper(".brand-swiper4", {
        speed: 1500,
        parallax: true,
        slidesPerView: 5,
        spaceBetween: 20,
        loop: true,
        autoplay: {
          delay: 1500,
        },
        breakpoints: {
          300: {
            slidesPerView: 2,
          },
          360: {
            slidesPerView: 2,
          },
          767: {
            slidesPerView: 4,
          },
          991: {
            slidesPerView: 6,
          },
          1200: {
            slidesPerView: 7,
          },
        },
      });
    }
  };

  const handleProjectSingle = function () {
    const brandSwiper = document.querySelector(".project-single");

    if (brandSwiper) {
      const swiper = new Swiper(".project-single", {
        speed: 3000,
        parallax: true,
        slidesPerView: 5,
        spaceBetween: 20,
        loop: true,
        autoplay: {
          delay: 1500,
        },
        breakpoints: {
          300: {
            slidesPerView: 1,
          },
          360: {
            slidesPerView: 2,
          },
          575: {
            slidesPerView: 3,
          },
          767: {
            slidesPerView: 3,
          },
          991: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        },
      });
    }
  };

  const handleSwiperContainer = () => {
    const swiperContainer = document.querySelector(".pro-filtr-cate-bx");
    if (!swiperContainer) return;

    let config = {
      slidesPerView: 1,
      slidesPerColumn: 1,
      spaceBetween: 20,
      autoHeight: false,
      centerInsufficientSlides: true,
      centeredSlidesBounds: true,
      cssMode: false,
      mousewheel: false,
      keyboard: false,
      speed: 3000,
      parallax: true,
      freeMode: true,
      loop: true,
      grabCursor: true,
      autoplay: {
        delay: 1500,
        disableOnInteraction: false,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          slidesPerColumn: 1,
          spaceBetween: 20,
        },
        575: {
          slidesPerView: 2,
          slidesPerGroup: 1,
          slidesPerColumn: 1,
          spaceBetween: 30,
        },
        991: {
          slidesPerView: 3,
          slidesPerGroup: 1,
          slidesPerColumn: 1,
          spaceBetween: 30,
        },
        1366: {
          slidesPerView: 4,
          slidesPerGroup: 1,
          slidesPerColumn: 1,
          spaceBetween: 30,
        },
      },
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      scrollbar: {
        el: ".swiper-scrollbar",
      },
    };

    let swiper = new Swiper(".pro-filtr-cate-bx", config);

    const filters = document.querySelectorAll(".pro-filtr-cate-carousal li");

    const updateFilter = (activeFilter) => {
      if (!activeFilter && filters.length > 0) {
        filters[0].classList.add("active");
        activeFilter = filters[0];
      }

      filters.forEach((el) => {
        el.classList.toggle("active", el === activeFilter);
      });
    };

    filters.forEach((_filter) => {
      _filter.addEventListener("click", (e) => {
        e.preventDefault();
        const self = e.currentTarget;
        const filter = self.getAttribute("data-filter").toLowerCase();
        updateFilter(self);

        if (filter === "all") {
          document
            .querySelectorAll(".pro-filtr-cate-bx [data-filter]")
            .forEach((item) => {
              item.classList.remove("non-swiper-slide");
              item.classList.add("swiper-slide");
            });
        } else {
          document
            .querySelectorAll(
              `.pro-filtr-cate-bx [data-filter]:not([data-filter='${filter}'])`
            )
            .forEach((el) => {
              el.classList.add("non-swiper-slide");
              el.classList.remove("swiper-slide");
              el.removeAttribute("style");
            });

          document
            .querySelectorAll(`.pro-filtr-cate-bx [data-filter='${filter}']`)
            .forEach((el) => {
              el.classList.remove("non-swiper-slide");
              el.classList.add("swiper-slide");
              el.removeAttribute("style");
            });
        }

        swiper.destroy();
        swiper = new Swiper(".pro-filtr-cate-bx", config);
      });
    });

    updateFilter(null);
  };

  const handleReviewSlider = function () {
    const reviewSliderEl = document.querySelector(".reviewtwo-slider");

    if (reviewSliderEl) {
      const swiper = new Swiper(".reviewtwo-slider", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        speed: 2000,
        freeMode: false,
        autoplay: {
          delay: 2000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        },

        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          10: {
            slidesPerView: 1,
          },
          575: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          992: {
            slidesPerView: 1,
          },
          1200: {
            slidesPerView: 2,
          },
        },
      });
    }
  };

  const handleSliderHomeTwo = function () {
    const swiper = new Swiper(".hvillas-sl-2", {
      grabCursor: true,
      slidesPerView: 2,
      slidesPerGroup: 1,
      centeredSlides: true,
      spaceBetween: 10,
      mousewheel: {
        forceToAxis: true,
      },
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 3,
        slideShadows: false,
      },
      keyboard: {
        enabled: true,
      },
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 2,
        },
        1560: {
          slidesPerView: 2,
        },
      },
      speed: 700,
      slideActiveClass: "is-active",
      slideDuplicateActiveClass: "is-active",
    });
  }

  const handleBlogSwiper = function () {
    const blogSwiper = document.querySelector(".blog-swiper");

    if (blogSwiper) {
      const swiper = new Swiper(".blog-swiper", {
        speed: 1500,
        parallax: false,
        slidesPerView: 1,
        spaceBetween: 35,
        loop: true,
        autoplay: {
          delay: 3000,
        },
        breakpoints: {
          567: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          767: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 35,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 35,
          },
          1400: {
            slidesPerView: 4,
            spaceBetween: 35,
          },
        },
      });
    }
  };

  const handleTwmTmonial2Slider = function () {
    const blogSwiper = document.querySelector(".twmTmonial2Slider");

    if (blogSwiper) {
      const swiper = new Swiper(".twmTmonial2Slider", {
        speed: 1500,
        parallax: false,
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
          delay: 3000,
        },
        breakpoints: {
          567: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          767: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1200: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
        },
      });
    }
  };

  const handleTwmBlogListCarousal = function () {
    var swiper = new Swiper(".twm-blog-list-carousal", {
      slidesPerView: 1,
      spaceBetween: 1,
      spaceBetween: 10,
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  };

  const handleProductThumbSlider = function () {
    var swiper = new Swiper(".product-SW-view", {
      loop: true,
      spaceBetween: 2,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
    });
    var swiper2 = new Swiper(".product-SW-view2", {
      loop: true,
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      thumbs: {
        swiper: swiper,
      },
    });
  };

  const handleRelatedProjectSlider = function () {
    const RelatedProjectSlider = document.querySelector(
      ".related-project-slider"
    );

    if (RelatedProjectSlider) {
      const swiper = new Swiper(".related-project-slider", {
        speed: 1500,
        parallax: false,
        slidesPerView: 1,
        spaceBetween: 35,
        loop: true,
        autoplay: {
          delay: 3000,
        },
        breakpoints: {
          567: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          767: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 35,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 35,
          },
          1400: {
            slidesPerView: 4,
            spaceBetween: 35,
          },
        },
      });
    }
  };

  return {
    load: function () {
      handleServiceSwiper();
      handleSwiperContainer();
      handleSliderhomeone();
      handleBrandSwiper3();
      handleBrandSwiper4();
      handleReviewSlider();
      handleSliderHomeTwo();
      handleBlogSwiper();
      handleTwmTmonial2Slider();
      handleProjectSingle();
      handleTwmBlogListCarousal();
      handleProductThumbSlider();
      handleRelatedProjectSlider();
    },
  };
})();

document.addEventListener("DOMContentLoaded", () => {
  HvillasCarousel.load();
});