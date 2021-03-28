// DOM Elements

const openNav = document.querySelector("header .navToggle");
const closeNav = document.querySelector("#mobileNav .navToggle");
const mobileNav = document.querySelector("#mobileNav");
const header = document.querySelector("header");
const main = document.querySelector("main");
const tabs = document.querySelectorAll(".tab");
const underline = document.querySelector("#desktopUnderline");
const questions = document.querySelectorAll(".question");
const form = document.querySelector("form");
const errorMessage = document.querySelector("#email p");


// Mobile Navigation Menu

openNav.addEventListener("click", () => {
    header.classList.add("inactive");
    mobileNav.style.visibility = "visible";
    mobileNav.classList.add("active");
    main.classList.add("inactive");
});

closeNav.addEventListener("click", () => {
    mobileNav.classList.remove("active");
    setTimeout(() => {
        mobileNav.style.visibility = "hidden";
        header.classList.remove("inactive");
        main.classList.remove("inactive");
    }, 500);
});


// Interactive Tabs

tabs.forEach(tab => tab.addEventListener("click", () => {
    if (!tab.classList.contains("active")) {
        tabs.forEach(t => t.style.pointerEvents = "none");
        document.querySelector(".tab.active").classList.remove("active");
        tab.classList.add("active");
        const tabID = tab.id;
        moveUnderline(tabID);
        const tabImage = document.querySelector(`.tabImage.${tabID}`);
        const currentImage = document.querySelector(".tabImage.active");
        currentImage.classList.replace("active", "fadeOut");
        tabImage.classList.replace("fadeIn", "active");
        setTimeout(() => currentImage.classList.replace("fadeOut", "fadeIn"), 500);
        const newImage = document.querySelector(".tabImage.active");
        changeText(newImage, "bookmarking");
        changeText(newImage, "searching");
        changeText(newImage, "sharing");
    }
}));

const changeText = (image, className) => {
    if (image.classList.contains(className)) {
        const currentText = document.querySelector(".option.active");
        currentText.classList.remove("active");
        setTimeout(() => {
            currentText.style.display = "none";
            const newText = document.querySelector(`.option.${className}`);
            newText.style.display = "block";
            setTimeout(() => {
                newText.classList.add("active");
                tabs.forEach(t => t.style.pointerEvents = "all");
            }, 50);
        }, 500);
    }
}

const moveUnderline = id => {
    switch (id) {
        case "bookmarking":
            underline.style.marginLeft = 0;
            break;
        case "searching":
            underline.style.marginLeft = `${100 / 3}%`;
            break;
        case "sharing":
            underline.style.marginLeft = `${100 / 3 * 2}%`;
            break;
    };
};


// Frequently Asked Questions

questions.forEach(q => q.addEventListener("click", event => {
    console.log(event.target);
    const currentQuestion = document.querySelector(".faq.active");
    const newQuestion = q.parentElement;
    const newAnswer = q.nextElementSibling;
    if (!newQuestion.classList.contains("active")) {
        newQuestion.classList.add("active");
        newAnswer.style.maxHeight = newAnswer.scrollHeight + "px";
    };
    if (currentQuestion) {
        const currentAnswer = currentQuestion.lastElementChild;
        currentQuestion.classList.remove("active");
        currentAnswer.style.maxHeight = 0;
    };
}));


// Form Submission

form.addEventListener("submit", event => {
    const email = form.firstElementChild.firstElementChild;
    if (!email.value || !email.value.match(/\S+@\S+\.\S+/)) {
        event.preventDefault();
        email.parentElement.classList.add("error");
        errorMessage.style.maxHeight = errorMessage.scrollHeight + "px";
        email.focus();
    } else {
        errorMessage.style.maxHeight = 0;
        email.parentElement.classList.remove("error");
    };
});