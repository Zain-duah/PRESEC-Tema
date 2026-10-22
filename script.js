const menuButton = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

if (menuButton && siteNav) {
    menuButton.addEventListener("click", () => {
        const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
        menuButton.setAttribute("aria-expanded", String(!isExpanded));
        menuButton.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
        siteNav.classList.toggle("is-open", !isExpanded);
    });

    siteNav.addEventListener("click", (event) => {
        if (event.target instanceof HTMLAnchorElement && window.matchMedia("(max-width: 760px)").matches) {
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Open navigation");
            siteNav.classList.remove("is-open");
        }
    });
}

const currentYear = document.querySelector("#current-year");
if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
}

const enrollmentForm = document.querySelector("#enrollment-form");
const formStatus = document.querySelector("#form-status");

if (enrollmentForm && formStatus) {
    enrollmentForm.addEventListener("submit", (event) => {
        event.preventDefault();
        formStatus.textContent = "This website is not connected to the PRESEC-TEMA admissions office. Your details have not been sent or saved. Please contact the school directly to continue your application.";
        formStatus.hidden = false;
    });
}

const programmeSelect = document.querySelector("#enrollment-form select[name='programme']");
if (programmeSelect) {
    document.querySelectorAll("[data-program]").forEach((link) => {
        link.addEventListener("click", () => {
            const programme = link.getAttribute("data-program");
            if (programme && [...programmeSelect.options].some((option) => option.value === programme || option.textContent === programme)) {
                programmeSelect.value = programme;
            }
        });
    });
}

const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxCaption = document.querySelector(".lightbox-caption");
const lightboxClose = document.querySelector(".lightbox-close");

if (lightbox instanceof HTMLDialogElement && lightboxImage instanceof HTMLImageElement && lightboxCaption && lightboxClose) {
    document.querySelectorAll(".gallery-trigger").forEach((trigger) => {
        trigger.addEventListener("click", () => {
            const image = trigger.querySelector("img");
            if (!image) {
                return;
            }

            lightboxImage.src = image.currentSrc || image.src;
            lightboxImage.alt = image.alt;
            lightboxCaption.textContent = image.alt;
            lightbox.showModal();
        });
    });

    lightboxClose.addEventListener("click", () => lightbox.close());
    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            lightbox.close();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && lightbox.open) {
            lightbox.close();
        }
    });
}
