import { modal } from "./modal.mjs";
import { filters } from "./filters.mjs";

export const adminAcces = (worksData) => {
  const adminAccess = document.querySelector(".admin-access");
  const editWorksButton = document.querySelector(".edit-works");
  const editPresentationText = document.querySelector(
    ".presentation-text-edit"
  );
  const editProfilePicture = document.querySelector(".profile-picture-edit");
  const filtersContainer = document.querySelector(".filters");

  const userIsLoggedIn = () => {
    const loginInformation = localStorage.getItem("loginInformation");
    return loginInformation;
  };

  const logIn = () => {
    adminAccess.innerText = "logout";
    editWorksButton.classList.add("isLoggedIn");
    editPresentationText.classList.add("isLoggedIn");
    editProfilePicture.classList.add("isLoggedIn");
    filtersContainer.classList.add("isLoggedIn");

    modal(worksData);
  };

  const logOut = () => {
    adminAccess.innerText = "login";
    localStorage.removeItem("loginInformation");
    localStorage.clear();
    editWorksButton.classList.remove("isLoggedIn");
    editPresentationText.classList.remove("isLoggedIn");
    editProfilePicture.classList.remove("isLoggedIn");
    filtersContainer.classList.remove("isLoggedIn");

    //If a project has been added, check if the category to which it belongs is already present in worksData and therefore already displayed.
    const isLastCategoryInWorksData = () => {
      const lastObject = worksData[worksData.length - 1];
      const lastCategoryId = parseInt(lastObject.categoryId);
      let isLastCategoryInWorksData = false;

      for (let i = 0; i < worksData.length - 1; i++) {
        const obj = worksData[i];
        if (obj.categoryId === lastCategoryId) {
          isLastCategoryInWorksData = true;
          break;
        }
      }

      return isLastCategoryInWorksData;
    };

    const lastObject = worksData[worksData.length - 1];
    const isLastCategoryIdNotNumber = typeof lastObject.categoryId !== "number";

    //If categoryId property of the last worksData object have a number value, it means that no project has been added. It is therefore not necessary to update the filters.
    if (isLastCategoryInWorksData() === false && isLastCategoryIdNotNumber) {
      filters(worksData, isLastCategoryInWorksData());
    }
  };

  if (userIsLoggedIn() !== null) {
    logIn();

    adminAccess.addEventListener("click", function (e) {
      if (userIsLoggedIn() !== null) {
        e.preventDefault();
        logOut();
      } else {
        window.location.href = "login.js";
      }
    });
  }
};
