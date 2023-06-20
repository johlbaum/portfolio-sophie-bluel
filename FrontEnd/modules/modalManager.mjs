import { showWorks, addWork, deleteWork } from "./work.mjs";

export const modalManager = (worksData) => {
  const editProjectsButton = document.querySelector(".edit-projects");
  const editPresentationText = document.querySelector(
    ".presentation-text-edit"
  );
  const editProfilePicture = document.querySelector(".profile-picture-edit");
  const filters = document.querySelector(".filters");
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
  const addProjectForm = document.querySelector(".send-project-form");

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

  const attachDeleteEventListeners = (worksData) => {
    const deleteWorkIcons = document.querySelectorAll(".delete-project-icon");
    deleteWorkIcons.forEach((deleteWorkIcon, deleteIconIndex) => {
      deleteWorkIcon.addEventListener("click", function () {
        worksData.forEach((workToDelete, workToDeleteIndex) => {
          if (deleteIconIndex === workToDeleteIndex) {
            deleteWork(workToDelete.id).then(() => {
              deleteWorkManager(workToDelete);
            });
          }
        });
      });
    });
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
  };

  const handleClickOutsideModal = (e) => {
    if (
      !modalContent.contains(e.target) &&
      e.target !== editProjectsButtonIcon &&
      e.target !== editProjectsButtonPara
    ) {
      closeModal();
    }
  };

  const toogleModalContent = () => {
    photoGalleryContent.classList.toggle("show");
    addPictureContent.classList.toggle("hide");
  };

  const emptyModal = () => {
    while (modalProjects.firstChild) {
      modalProjects.removeChild(modalProjects.firstChild);
    }
  };

  const updateWorksDataAfterAdd = (newWork) => {
    worksData.push(newWork);
  };

  const updateWorksDataAfterDelete = (workToDelete) => {
    const index = worksData.findIndex((work) => work.id === workToDelete.id);
    if (index !== -1) {
      worksData.splice(index, 1);
    }
  };

  const addWorkManager = (newWork) => {
    setTimeout(() => {
      toogleModalContent();
      emptyModal();
      updateWorksDataAfterAdd(newWork);
      showModalProjects(worksData);
      showWorks(worksData);
    }, 1500);
  };

  const deleteWorkManager = (workToDelete) => {
    setTimeout(() => {
      emptyModal();
      updateWorksDataAfterDelete(workToDelete);
      showModalProjects(worksData);
      showWorks(worksData);
    }, 1500);
  };

  const userIsLoggedIn = () => {
    return localStorage.getItem("loginInformation");
  };

  if (userIsLoggedIn()) {
    editProjectsButton.classList.add("isLoggedIn");
    editPresentationText.classList.add("isLoggedIn");
    editProfilePicture.classList.add("isLoggedIn");
    filters.classList.add("isLoggedIn");
    editProjectsButton.addEventListener("click", openModal);
    closeModalIcon.forEach((curr) => {
      curr.addEventListener("click", closeModal);
    });
    document.addEventListener("click", handleClickOutsideModal);
    addPictureButton.addEventListener("click", toogleModalContent);
    backToPhotoGalleryIcon.addEventListener("click", toogleModalContent);
    addProjectForm.addEventListener("submit", (e) => {
      e.preventDefault();
      addWork(e).then((newWork) => {
        addWorkManager(newWork);
      });
    });
  }
};
