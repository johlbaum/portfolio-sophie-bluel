import { Modal } from "./modal.mjs";
import { Filters } from "./filters.mjs";

export class AdminAccess {
  constructor() {
    this.adminAccess = document.querySelector(".admin-access");
    this.editWorksButton = document.querySelector(".edit-works");
    this.editPresentationText = document.querySelector(
      ".presentation-text-edit"
    );
    this.editProfilePicture = document.querySelector(".profile-picture-edit");
    this.filtersContainer = document.querySelector(".filters");
    this.worksTitleAndEdit = document.querySelector(".works-title-and-edit");
    this.filters = new Filters();
  }

  userIsLoggedIn = () => {
    const loginInformation = localStorage.getItem("loginInformation");
    return loginInformation;
  };

  logIn = (worksData) => {
    this.adminAccess.innerText = "logout";
    this.editWorksButton.classList.add("is-logged-in");
    this.editPresentationText.classList.add("is-logged-in");
    this.editProfilePicture.classList.add("is-logged-in");
    this.filtersContainer.classList.add("is-logged-in");
    this.worksTitleAndEdit.classList.add("title-is-logged-in");
    new Modal(worksData);
  };

  logOut = (worksData) => {
    this.adminAccess.innerText = "login";
    localStorage.removeItem("loginInformation");
    localStorage.clear();
    this.editWorksButton.classList.remove("is-logged-in");
    this.editPresentationText.classList.remove("is-logged-in");
    this.editProfilePicture.classList.remove("is-logged-in");
    this.filtersContainer.classList.remove("is-logged-in");
    this.worksTitleAndEdit.classList.remove("title-is-logged-in");

    //If a project has been added, check if the category to which it belongs is already present in worksData and therefore already displayed.
    const isLastCategoryInWorksData = () => {
      const lastObject = worksData[worksData.length - 1];

      if (lastObject !== undefined) {
        const lastCategoryId = parseInt(lastObject.categoryId);
        let isLastCategoryInWorksData = false;

        for (let i = 0; i < worksData.length; i++) {
          const obj = worksData[i];

          if (obj.categoryId === lastCategoryId) {
            isLastCategoryInWorksData = true;
            break;
          }
        }

        return isLastCategoryInWorksData;
      }
    };

    const lastObject = worksData[worksData.length - 1];

    if (lastObject !== undefined) {
      if (isLastCategoryInWorksData() === false) {
        this.filters.setupFilters(worksData, isLastCategoryInWorksData());
      }
    }
  };

  handleAdminAccess = (worksData) => {
    if (this.userIsLoggedIn() !== null) {
      this.logIn(worksData);

      this.adminAccess.addEventListener("click", (e) => {
        if (this.userIsLoggedIn() !== null) {
          e.preventDefault();
          this.logOut(worksData);
        } else {
          window.location.href = "login.js";
        }
      });
    }
  };
}
