"use strict";

const DOM = (() => {
  const accessibilityContainer = 
        document.querySelector("#accessibility-container");
  const animationSwitch = 
        document.querySelector("#animation-switch");
  const githubLogo = document.querySelector("#lower-nav img");
  const themeSwitch = document.querySelector("#theme-switch");

  return {
    accessibilityContainer,
    animationSwitch,
    githubLogo,
    themeSwitch
  }
})();

const settings = (() => {
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
    settings.saveToLocal();
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
    if (localStorage.getItem("animations-enabled") === "false") {
      animationsDisabled();
    } else {
      animationsEnabled();
    };
  };

  const _toggleAnimations = () => {
    if (DOM.animationSwitch.getAttribute("aria-checked") === "true") {
      animationsDisabled();
    } else {
      animationsEnabled();
    };
    settings.saveToLocal();
  };

  const animationsEnabled = () => {
    DOM.animationSwitch.setAttribute("aria-checked", "true");
    document.documentElement.style.scrollBehavior = "smooth";
    DOM.accessibilityContainer.style.transition = "top 0.75s ease-in-out";
    DOM.animationSwitch.textContent = "Animations Enabled";
    DOM.themeSwitch.style.transition = "background-position 0.3s ease-in";
    document.querySelector("#main-nav").style.transition = "left 0.5s";
    Array.from(document.querySelectorAll(".label-arrow")).forEach(item => {
      item.style.transition = "transform 0.75s";
    });
  };
        
  const animationsDisabled = () => {
    DOM.animationSwitch.setAttribute("aria-checked", "false");
    document.documentElement.style.scrollBehavior = "auto";
    DOM.animationSwitch.setAttribute("aria-checked", "false");
    DOM.animationSwitch.textContent = "Animations Disabled";
    Array.from(document.querySelectorAll(".animated")).forEach(item => {
      item.style.transition = "none";
    });
  };

  DOM.animationSwitch.addEventListener("click", _toggleAnimations);
  DOM.animationSwitch.addEventListener("keydown", (e) => {
    if (e.key === " ") {
      e.preventDefault();
      _toggleAnimations();
    };
  });
  
  window.addEventListener("load", _onLoad);

  return {animationsEnabled, animationsDisabled}
})();

export {displayOptions, accessibilityOptions, settings}