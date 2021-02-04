

const DOM = (() => {
  const groupButtons = document.getElementsByClassName("group-btn");
  const menuContainer = document.querySelector("#main-nav");
  const menuOpenButton = document.querySelector(".menu-button");
  const menuCloseButton = document.querySelector(".menu-close-button");
  
  return {
    groupButtons,
    menuContainer,
    menuOpenButton,
    menuCloseButton
  }
})();

const visibility = (() => {
  const _onScreenSize = () => {
    if (document.documentElement.scrollWidth > 763) {
      DOM.menuContainer.style.visibility = "visible";
      DOM.menuContainer.style.left = "0";
    } else {
      DOM.menuContainer.style.visibility = "hidden";
      DOM.menuContainer.style.left = "-800px";
    };
  };
  
  window.addEventListener("resize", _onScreenSize);
  window.addEventListener("load", _onScreenSize);

  const _toggleMenu = () => {
    if (DOM.menuContainer.style.visibility === "hidden") {
      DOM.menuContainer.style.visibility = "visible";
      DOM.menuContainer.style.left = "0";
      DOM.menuCloseButton.focus();
    } else {
      DOM.menuContainer.style.left = "-800px";
      setTimeout(() => {
        DOM.menuContainer.style.visibility = "hidden"
      }, 600);
      DOM.menuOpenButton.focus();
    };
  };

  DOM.menuOpenButton.addEventListener("click", _toggleMenu);
  DOM.menuCloseButton.addEventListener("click", _toggleMenu);
})();

const groupButtons = (() => {
  const _removeActive = () => {
    Array.from(DOM.groupButtons).forEach(button => {
      button.classList.remove("active");
    });
  };

  const _setActive = (target) => {
    target.classList.add("active");
  };

  Array.from(DOM.groupButtons).forEach(button => {
    button.addEventListener("click", () => {
      _removeActive();
      _setActive(button);
    });
  });
})();

export {visibility, groupButtons}