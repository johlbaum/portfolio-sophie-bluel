import { modal } from "./modal.mjs";

export const adminAcces = (data) => {
  const adminAccess = document.querySelector(".admin-access");
  const editWorksButton = document.querySelector(".edit-works");
  const editPresentationText = document.querySelector(
    ".presentation-text-edit"
  );
  const editProfilePicture = document.querySelector(".profile-picture-edit");
  const filters = document.querySelector(".filters");

  const userIsLoggedIn = () => {
    const loginInformation = localStorage.getItem("loginInformation");
    return loginInformation;
  };

  const logIn = () => {
    adminAccess.innerText = "logout";
    editWorksButton.classList.add("isLoggedIn");
    editPresentationText.classList.add("isLoggedIn");
    editProfilePicture.classList.add("isLoggedIn");
    filters.classList.add("isLoggedIn");

    modal(data);
  };

  const logOut = () => {
    adminAccess.innerText = "login";
    localStorage.removeItem("loginInformation");
    localStorage.clear();
    editWorksButton.classList.remove("isLoggedIn");
    editPresentationText.classList.remove("isLoggedIn");
    editProfilePicture.classList.remove("isLoggedIn");
    filters.classList.remove("isLoggedIn");
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
