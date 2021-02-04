import {accessibilityOptions, settings} from "./site-settings";

const DOM = (() => {
  const modalBox = document.querySelector(".modal-box");
  const modalContainer = document.querySelector(".modal-container");

  return {
    modalBox,
    modalContainer
  }
})();

const warningModal = (() => {
  const render = () => {
    const heading = document.createElement("h1");
    const para1 = document.createElement("p");
    const para2 = document.createElement("p");
    const disableButton = document.createElement("button");
    const continueButton = document.createElement("button");

    heading.textContent = "This site uses minimal animation effects.";

    para1.textContent = "Effects include moving menus and smooth scrolling. If you suffer from a vestibular disorder or otherwise prefer no animations, you can turn them off by clicking the first button below.";
  
    para2.textContent= "You can later change this setting in the Display & Accessibility tab at the top of the page.";
  
    disableButton.setAttribute("type", "button");
    disableButton.classList.add("disable-button", "focusable", "primary-btn");
    disableButton.textContent = "Disable Animations";
    disableButton.addEventListener("click", () => {
      accessibilityOptions.animationsDisabled();
      settings.saveToLocal();
      DOM.modalContainer.style.display = "none";
    });
    
    continueButton.setAttribute("type", "button");
    continueButton.classList.add("continue-button", "focusable", "secondary-btn");
    continueButton.textContent = "Continue with Animations";
    continueButton.addEventListener("click", () => {
      accessibilityOptions.animationsEnabled();
      settings.saveToLocal();
      DOM.modalContainer.style.display = "none";
    });

    DOM.modalBox.appendChild(heading);
    DOM.modalBox.appendChild(para1);
    DOM.modalBox.appendChild(para2);
    DOM.modalBox.appendChild(disableButton);
    DOM.modalBox.appendChild(continueButton);
  };

  const _onLoad = () => {
    if (localStorage.length === 0) {
      DOM.modalBox.style.display = "flex";
      DOM.modalContainer.style.display = "flex";
      render();
    };
  };

  window.addEventListener("load", _onLoad);
})();

const projectModal = (() => {
  const renderNew = () => {

  };

  const renderEdit = () => {

  };

  const renderOptions = () => {

  };
})();

const taskModal = (() => {
  const renderNew = () => {

  };

  const renderEdit = () => {

  };
})();

export {warningModal}