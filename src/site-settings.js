"use strict";

const DOM = (() => {
  const accessibilityContainer = 
        document.querySelector("#accessibility-container");
  const animationSwitch = 
        document.querySelector("#animation-switch");
  const githubLogo = document.querySelector("#lower-nav img");
  // const modalBox = document.querySelector(".modal-box");
  // const modalContainer = document.querySelector(".modal-container");
  const themeSwitch = document.querySelector("#theme-switch");

  return {
    accessibilityContainer,
    animationSwitch,
    githubLogo,
    // modalBox,
    // modalContainer,
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

// const warningModal = (() => {
//   const render = () => {
//     const heading = document.createElement("h1");
//     const para1 = document.createElement("p");
//     const para2 = document.createElement("p");
//     const disableButton = document.createElement("button");
//     const continueButton = document.createElement("button");

//     heading.textContent = "This site uses animation effects.";

//     para1.textContent = "Effects include moving menus and smooth scrolling. If you suffer from a vestibular disorder or otherwise prefer no animations, you can turn them off by clicking the first button below.";
  
//     para2.textContent= "You can later change this setting in the Display & Accessibility tab at the top of the page.";
  
//     disableButton.setAttribute("type", "button");
//     disableButton.classList.add("disable-button", "focusable", "primary-btn");
//     disableButton.textContent = "Disable Animations";
//     disableButton.addEventListener("click", () => {
//       accessibilityOptions.animationsDisabled();
//       settings.saveToLocal();
//       DOM.modalContainer.style.display = "none";
//     });
    
//     continueButton.setAttribute("type", "button");
//     continueButton.classList.add("continue-button", "focusable", "secondary-btn");
//     continueButton.textContent = "Continue with Animations";
//     continueButton.addEventListener("click", () => {
//       accessibilityOptions.animationsEnabled();
//       settings.saveToLocal();
//       DOM.modalContainer.style.display = "none";
//     });

//     DOM.modalBox.appendChild(heading);
//     DOM.modalBox.appendChild(para1);
//     DOM.modalBox.appendChild(para2);
//     DOM.modalBox.appendChild(disableButton);
//     DOM.modalBox.appendChild(continueButton);
//   };

//   const _onLoad = () => {
//     if (localStorage.length === 0) {
//       DOM.modalBox.style.display = "flex";
//       DOM.modalContainer.style.display = "flex";
//       render();
//     };
//   };

//   window.addEventListener("load", _onLoad);
// })();

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

  // document.querySelector(".disable-button").addEventListener("click", () => {
  //   _animationsDisabled();
  //   settings.saveToLocal();
  //   DOM.modalContainer.style.display = "none";
  // });

  // document.querySelector(".continue-button").addEventListener("click", () => {
  //   _animationsEnabled();
  //   settings.saveToLocal();
  //   DOM.modalContainer.style.display = "none";
  // });

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