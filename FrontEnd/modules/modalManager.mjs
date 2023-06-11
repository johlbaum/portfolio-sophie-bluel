import { deleteWork } from "./deleteWork.mjs";
import { addWork } from "./addWork.mjs";

export const modalManager = (worksData) => {
  const editProjectsButton = document.querySelector(".edit-projects");
  const editProjectsButtonIcon =
    editProjectsButton.querySelector(":first-child");
  const editProjectsButtonPara =
    editProjectsButton.querySelector(":nth-child(2)");
  const modalContainer = document.querySelector(".modal-container");
  const modalContent = document.querySelector(".modal-content");
  const modalProjects = document.querySelector(".modal-projects");
  const closeModalIcon = document.querySelectorAll(".close-modal-icon");
  const addPictureContent = document.querySelector(".add-picture-content");
  const photoGalleryContent = document.querySelector(".photo-gallery-content");
  const addPictureButton = document.querySelector(".add-picture");
  const backToPhotoGalleryIcon = document.querySelector(
    ".back-to-photo-gallery-icon"
  );

  const emptyModal = () => {
    while (modalProjects.firstChild) {
      modalProjects.removeChild(modalProjects.firstChild);
    }
  };

  const updateWorksData = (workToDelete) => {
    const updatedWorksData = worksData.filter((work) => {
      return work.id !== workToDelete.id;
    });
    worksData = updatedWorksData;
  };

  const attachDeleteEventListeners = (worksData) => {
    const deleteWorkIcons = document.querySelectorAll(".delete-project-icon");
    deleteWorkIcons.forEach((deleteWorkIcon, deleteIconIndex) => {
      deleteWorkIcon.addEventListener("click", function () {
        worksData.forEach((workToDelete, workToDeleteIndex) => {
          if (deleteIconIndex === workToDeleteIndex) {
            deleteWork(workToDelete.id).then(() => {
              updateWorksData(workToDelete);
            });
          }
        });
      });
    });
  };

  const showModalProjects = (worksData) => {
    worksData.forEach((project) => {
      const projectContainer = document.createElement("div");
      const deleteIconAndImgProjectContainer = document.createElement("div");
      const image = document.createElement("img");
      const deleteIcon = document.createElement("i");
      const edit = document.createElement("p");

      projectContainer.classList.add("modal-project");
      projectContainer.classList.add(`work-${project.id}`);
      deleteIconAndImgProjectContainer.classList.add(
        "deleteIconAndImgProjectContainer"
      );
      image.src = project.imageUrl;
      deleteIcon.classList.add(
        "fa",
        "regular",
        "fa-trash-can",
        "delete-project-icon"
      );
      edit.textContent = "éditer";

      modalProjects.appendChild(projectContainer);
      projectContainer.appendChild(deleteIconAndImgProjectContainer);
      deleteIconAndImgProjectContainer.appendChild(image);
      deleteIconAndImgProjectContainer.appendChild(deleteIcon);
      projectContainer.appendChild(edit);
    });
    attachDeleteEventListeners(worksData);
  };

  const userIsLoggedIn = () => {
    return localStorage.getItem("loginInformation");
  };

  const openModal = () => {
    modalContainer.classList.add("modal-is-open");
    emptyModal();
    showModalProjects(worksData);
  };

  const closeModal = () => {
    modalContainer.classList.remove("modal-is-open");
    addPictureContent.classList.add("hide");
    photoGalleryContent.classList.add("show");
    emptyModal();
  };

  const handleClickOutsideModal = (e) => {
    if (
      !modalContent.contains(e.target) &&
      e.target !== editProjectsButtonIcon &&
      e.target !== editProjectsButtonPara
    ) {
      emptyModal();
      closeModal();
    }
  };

  const toogleModalContent = () => {
    photoGalleryContent.classList.toggle("show");
    addPictureContent.classList.toggle("hide");
  };

  if (userIsLoggedIn()) {
    editProjectsButton.classList.add("isLoggedIn");
    editProjectsButton.addEventListener("click", openModal);
    closeModalIcon.forEach((curr) => {
      curr.addEventListener("click", closeModal);
    });
    document.addEventListener("click", handleClickOutsideModal);
    addPictureButton.addEventListener("click", toogleModalContent);
    backToPhotoGalleryIcon.addEventListener("click", toogleModalContent);
    addWork();
  }
};
