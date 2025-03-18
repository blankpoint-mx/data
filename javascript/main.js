/*
* ----------------------------------------------------------------------------------------
Author        : Rama Hardian Sidik
Template Name : Freeman - Free Multipurpose Personal One Page Html Template
Version       : 1.0
Filename      : main.js
* ----------------------------------------------------------------------------------------
* ----------------------------------------------------------------------------------------
*/
const freemaninit = (function() {
    "use strict";
    // variable 
    var header = document.querySelector('#headermain');
    var body = document.querySelector('body');
    var continuousElements = document.getElementsByClassName("sectionblock");
    var counter = document.querySelectorAll(".counterwrap__counter");
    var counters = document.querySelectorAll(".counterwrap__counter");
    var mobilelink = document.querySelectorAll('.overlay__listnav li a');
    var mobilenav = document.querySelector('.navicon');
    var mainSection = document.querySelectorAll('main div.sectionblock');
    var menuSection = document.querySelectorAll('.navpage__wrap li a');
    var goup = document.querySelector('.scroll-top');
    var sliderService = document.getElementById("sliderservice");
    var yearele = document.querySelector('.years');
    var btnContainer = document.getElementById("filterwrap");
    var btns = btnContainer.getElementsByTagName("li");
    var porto = document.getElementById('porfoliowarp');
    var Shuffle = window.Shuffle;
    var wrapper;
    var dots;
    var typedText = document.querySelector("#typed-text");
    var cursor = document.querySelector(".cursor");
    var textArrayIndex = 0;
    var charIndex = 0;
    var textArray = ["Diseños Exlusivos.", "Sin Complicaciones.", "Confianza Total.", "Cerca de Ti."];
    var year = new Date().getFullYear();
    var revealPoint = 150;
    var interval = 0;
    var loop = 0;

    //detect mobile device
    const isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    // loadder page
    const loadder = function(e) {
        setTimeout(() => {
            document.querySelector(".preloader").style.display = "none";
        }, 1000);
    };

    // GLightbox
    const glight = function(e) {
        GLightbox({
            selector: 'glightboxvideo',
        });
        GLightbox();
    };

    // shuffle portfolio
    const portofolio = function(e) {
        var myShuffle = new Shuffle(porto, {
            itemSelector: '.porfoliowarp__item',
            buffer: 0,
            columnThreshold: 0.01,
            columnWidth: 0,
            delimiter: null,
            sizer: null,
            speed: 250,
            filterMode: Shuffle.FilterMode.ANY,
            group: Shuffle.ALL_ITEMS,
        });
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", function(e) {
                document.querySelector('.active').classList.remove('active');
                (document.querySelector('.active')) ? document.querySelector('.active').classList.remove('active') : '';
                this.classList.add('active');
                myShuffle.filter(e.target.dataset.group);
            });
        }
    };

    // scroll spy 
    const scrolspy = function(e) {
        menuSection.forEach(v => {
            v.onclick = (() => {
                setTimeout(() => {
                    menuSection.forEach(j => j.classList.remove('activelink'));
                    v.classList.add('activelink');
                }, 300)
            });
        });
        window.onscroll = (() => {
            mainSection.forEach((v, i) => {
                let rect = v.getBoundingClientRect().y;
                if (rect < window.innerHeight - 100) {
                    menuSection.forEach(v => v.classList.remove('activelink'));
                    menuSection[i].classList.add('activelink');
                }
            });
        });
    };

    //animated typed init ------------------------
    const erase = function(e) {
        if (charIndex > 0) {
            cursor.classList.remove('blink');
            typedText.textContent = textArray[textArrayIndex].slice(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 80);
        } else {
            cursor.classList.add('blink');
            textArrayIndex++;
            if (textArrayIndex > textArray.length - 1) {
                textArrayIndex = 0;
            }
            setTimeout(typeanimation, 1000);
        }
    };

    const typeanimation = function(e) {
        if (charIndex <= textArray[textArrayIndex].length - 1) {
            cursor.classList.remove('blink');
            typedText.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeanimation, 120);
        } else {
            cursor.classList.add('blink');
            setTimeout(erase, 1000);
        }
    };

    /* scroll counter */
    counters.forEach(function(item) {
        item.counterAlreadyFired = false;
        item.counterSpeed = item.getAttribute("data-Speed") / 45;
        item.counterTarget = +item.innerText;
        item.counterCount = 0;
        item.counterStep = item.counterTarget / item.counterSpeed;
        item.updateCounter = function() {
            item.counterCount = item.counterCount + item.counterStep;
            item.innerText = Math.ceil(item.counterCount);
            if (item.counterCount < item.counterTarget) {
                setTimeout(item.updateCounter, item.counterSpeed);
            } else {
                item.innerText = item.counterTarget;
            }
        };
    });

    const counternumber = function() {
        const isScrolledIntoView = function(el) {
            var rect = el.getBoundingClientRect();
            var elemTop = rect.top;
            var elemBottom = rect.bottom;
            var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
            return isVisible;
        };
        counter.forEach(function(item, id) {
            if (!isScrolledIntoView(item)) return;
            item.updateCounter();
            item.counterAlreadyFired = true;
        });
    };

    // click button menu burger
    const buttonclick = function(e) {
        mobilenav.addEventListener("click", function(e) {
            this.classList.toggle('active');
            body.classList.toggle('openmenu');
        }, false);
        for (var i = 0; i < mobilelink.length; i++) {
            mobilelink[i].addEventListener('click', function(e) {
                mobilenav.classList.toggle('active');
                body.classList.toggle('openmenu');
            }, false);
        }
    };

    // services slider 
    const servicesslider = function(e) {
        function autoplay(run) {
            clearInterval(interval);
            interval = setInterval(() => {
                if (run && slider) {
                    slider.next();
                }
            }, 5000);
        };

        function navigation(slider) {
            function markup(remove) {
                wrapperMarkup(remove);
                dotMarkup(remove);
            };

            function removeElement(elment) {
                elment.parentNode.removeChild(elment);
            };

            function createDiv(className) {
                var div = document.createElement("div");
                var classNames = className.split(" ");
                classNames.forEach((name) => div.classList.add(name));
                return div;
            };

            function wrapperMarkup(remove) {
                if (remove) {
                    var parent = wrapper.parentNode;
                    while (wrapper.firstChild)
                        parent.insertBefore(wrapper.firstChild, wrapper);
                    removeElement(wrapper);
                    return;
                }
                wrapper = createDiv("navigation-wrapper");
                slider.container.parentNode.appendChild(wrapper);
                wrapper.appendChild(slider.container);
            };

            function dotMarkup(remove) {
                if (remove) {
                    removeElement(dots);
                    return;
                }
                dots = createDiv("dots");
                slider.track.details.slides.forEach((_e, idx) => {
                    var dot = createDiv("dot");
                    dot.addEventListener("click", () => slider.moveToIdx(idx));
                    dots.appendChild(dot);
                });
                wrapper.appendChild(dots);
            };

            function updateClasses() {
                var slide = slider.track.details.rel;
                Array.from(dots.children).forEach(function(dot, idx) {
                    idx === slide ?
                        dot.classList.add("dot--active") :
                        dot.classList.remove("dot--active");
                });
            };

            slider.on("created", () => {
                markup();
                updateClasses();
            });
            slider.on("optionsChanged", () => {
                markup(true);
                markup();
                updateClasses();
            });
            slider.on("slideChanged", () => {
                updateClasses();
            });
            slider.on("destroyed", () => {
                markup(true);
            });
        };

        var slider = new KeenSlider(sliderService, {
            loop: true,
            mode: "free-snap",
            breakpoints: {
                "(min-width: 320px)": {
                    slides: { perView: 1, spacing: 5 },
                },
                "(min-width: 400px)": {
                    slides: { perView: 1, spacing: 5 },
                },
                "(min-width: 1000px)": {
                    slides: { perView: 3, spacing: 20 },
                },
            },
            slides: {
                perView: 1,
                spacing: 20
            },
            duration: 3000,
            dragStart: () => {
                autoplay(false);
            },
            dragEnd: () => {
                autoplay(true);
            }
        }, [navigation]);

        sliderService.addEventListener("mouseover", (e) => {
            autoplay(false);
        });
        sliderService.addEventListener("mouseout", (e) => {
            autoplay(true);
        });
        autoplay(true);
    };

    // page scroll
    const scrollpage = function(e) {
        if (window.pageYOffset > 0) {
            header.classList.add('fixid');
        } else {
            header.classList.remove('fixid');
        }
    };

    //binds event ----------------------------
    const bindEvents = function(e) {
        window.onbeforeunload = function(e) {
            window.scrollTo(0, 0);
        };
        window.addEventListener('load', (e) => {
            loadder();
        });
        window.addEventListener('DOMContentLoaded', (e) => {
            buttonclick();
            typeanimation();
            servicesslider();
            portofolio();
            glight();
            yearele.innerHTML = year;
        });
        window.addEventListener("scroll", (e) => {
            scrolspy();
            scrollpage();
            counternumber();
        });
    };

    // init - initializes elements and events
    const AppInit = function(e) {
        bindEvents();
    };

    return {
        AppInit: AppInit
    };
}());

//initializing app
freemaninit.AppInit();

document.addEventListener('DOMContentLoaded', function() {
    const slide = document.querySelector('.reviewslide');
    const items = document.querySelectorAll('.reviewitem');
    let currentIndex = 0;
    const totalItems = items.length;

    // Clonar los elementos para un bucle infinito
    const slideContainer = document.querySelector('.reviewslide');
    for (let i = 0; i < totalItems; i++) {
        const clone = items[i].cloneNode(true);
        slideContainer.appendChild(clone);
    }

    function getVisibleItems() {
        return window.innerWidth < 768 ? 1 : 3;
    }

    function updateSlide() {
        const visibleItems = getVisibleItems();
        const itemWidthPercentage = 100 / visibleItems;
        const marginAdjustment = visibleItems === 1 ? 5 : 2;
        const displacementFactor = 1;
        const offset = -(currentIndex * (itemWidthPercentage + marginAdjustment) * displacementFactor);
        slide.style.transform = `translateX(${offset}%)`;
    }

    function nextSlide() {
        const visibleItems = getVisibleItems();
        currentIndex++;
        if (currentIndex >= totalItems) {
            currentIndex = 0;
            // Usa una transición suave para el reinicio
            slide.style.transition = 'transform 0.5s ease-in-out'; // Animación al reiniciar
            updateSlide();
            // Reinicia la transición normal después del movimiento
            setTimeout(() => {
                slide.style.transition = 'transform 0.5s ease-in-out';
            }, 500);
        }
        updateSlide();
    }

    setInterval(nextSlide, 5000);
    updateSlide();

    window.addEventListener('resize', updateSlide);
});

// Hacer que el logo regrese al inicio con desplazamiento suave
document.querySelector('.logo').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Botón flotante para regresar arriba
document.querySelector('.scroll-top-btn').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Mostrar/Ocultar el botón según el scroll
window.addEventListener('scroll', function() {
    const scrollTopBtn = document.querySelector('.scroll-top-btn');
    if (window.scrollY > 200) {
        scrollTopBtn.style.display = 'flex';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});