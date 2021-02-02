"use strict";

const DOM = (() => {
  const accessibilityContainer = 
        document.querySelector("#accessibility-container");
  const animationSwitch = 
        document.querySelector("#animation-switch");
  const githubLogo = document.querySelector("#lower-nav img");
  const modal = document.querySelector(".modal-container");
  const modalDisableButton = document.querySelector(".disable-button");
  const modalContinueButton = document.querySelector(".continue-button");
  const themeSwitch = document.querySelector("#theme-switch");


  return {
    accessibilityContainer,
    animationSwitch,
    githubLogo,
    modal,
    modalContinueButton,
    modalDisableButton,
    themeSwitch
  }
})();

const siteStorage = (() => {
  const saveToLocal = () => {
    localStorage.setItem(
      "theme", document.documentElement.getAttribute("theme"));

    localStorage.setItem("animations-enabled", 
        DOM.animationSwitch.getAttribute("aria-checked"));
  };

  return {
    saveToLocal
  };
})();

const displayOptions = (() => {
  const _onLoad = () => {
    if (localStorage.getItem("theme") === "light") {
      _lightTheme();
    } else {
      _darkTheme();
    };
  };

  const _toggleTheme = (e) => {
    if (document.documentElement.getAttribute("theme") === "light") {
      _darkTheme();
    } else {
      _lightTheme();
    };
    siteStorage.saveToLocal();
  };

  const _darkTheme = () => {
    DOM.themeSwitch.setAttribute("aria-checked", "false");
    document.documentElement.setAttribute("theme", "dark");
    DOM.themeSwitch.style.backgroundPosition = "center bottom -0.8rem";
    DOM.githubLogo.setAttribute("src",
        "assets/images/logos/GitHub-Mark-Light-32px.png");
  };

  const _lightTheme = () => {
    DOM.themeSwitch.setAttribute("aria-checked", "true");
    document.documentElement.setAttribute("theme", "light");
    DOM.themeSwitch.style.backgroundPosition = "center top 2px";
    DOM.githubLogo.setAttribute("src",
    "assets/images/logos/GitHub-Mark-32px.png");
  };

  DOM.themeSwitch.addEventListener("click", _toggleTheme);
  DOM.themeSwitch.addEventListener("keydown", (e) => {
    if (e.key === " ") {
      e.preventDefault();
      _toggleTheme();
    };
  });

  window.addEventListener("load", _onLoad);
})();

const accessibilityOptions = (() => {
  const _onLoad = () => {
    if (localStorage.length > 0) {
      DOM.modal.style.display = "none";
    };
    if (localStorage.getItem("animations-enabled") === "false") {
      _animationsDisabled();
    } else {
      _animationsEnabled();
    };
  };

  const _toggleAnimations = () => {
    if (DOM.animationSwitch.getAttribute("aria-checked") === "true") {
      _animationsDisabled();
    } else {
      _animationsEnabled();
    };
    siteStorage.saveToLocal();
  };

  const _animationsEnabled = () => {
    document.documentElement.style.scrollBehavior = "smooth";
    DOM.accessibilityContainer.style.transition = "top 0.75s ease-in-out";
    DOM.animationSwitch.setAttribute("aria-checked", "true")
    DOM.animationSwitch.textContent = "Animations Enabled";
    DOM.themeSwitch.style.transition = "background-position 0.3s ease-in";
    document.querySelector("#main-nav").style.transition = "left 0.5s";
    Array.from(document.querySelectorAll(".label-arrow")).forEach(item => {
      item.style.transition = "transform 0.75s";
    });
  };
        
  const _animationsDisabled = () => {
    document.documentElement.style.scrollBehavior = "unset";
    DOM.animationSwitch.setAttribute("aria-checked", "false")
    DOM.animationSwitch.textContent = "Animations Disabled";
    Array.from(document.querySelectorAll(".animated")).forEach(item => {
      item.style.transition = "none";
    });
  };

  DOM.modalDisableButton.addEventListener("click", () => {
    _animationsDisabled();
    siteStorage.saveToLocal();
    DOM.modal.style.display = "none";
  });

  DOM.modalContinueButton.addEventListener("click", () => {
    _animationsEnabled();
    siteStorage.saveToLocal();
    DOM.modal.style.display = "none";
  });

  DOM.animationSwitch.addEventListener("click", _toggleAnimations);
  DOM.animationSwitch.addEventListener("keydown", (e) => {
    if (e.key === " ") {
      e.preventDefault();
      _toggleAnimations();
    };
  });
  
  window.addEventListener("load", _onLoad);
})();

export {DOM, siteStorage, displayOptions, accessibilityOptions}