import { deleteProject } from "./deleteProject.mjs";

export const modalManager = (dataProjects) => {
  const editProjectsButton = document.querySelector(".edit-projects");
  const editProjectsButtonIcon =
    editProjectsButton.querySelector(":first-child");
  const editProjectsButtonPara =
    editProjectsButton.querySelector(":nth-child(2)");
  const modalContainer = document.querySelector(".modal-container");
  const modalContent = document.querySelector(".modal-content");
  const closeModalIcon = document.querySelectorAll(".close-modal-icon");
  const addPictureContent = document.querySelector(".add-picture-content");
  const photoGalleryContent = document.querySelector(".photo-gallery-content");
  const addPictureButton = document.querySelector(".add-picture");
  const backToPhotoGalleryIcon = document.querySelector(
    ".back-to-photo-gallery-icon"
  );

  //Vider le contenu dynamique de la modale à sa fermeture
  const emptyModal = () => {
    const modalProjects = document.querySelector(".modal-projects");
    while (modalProjects.firstChild) {
      modalProjects.removeChild(modalProjects.firstChild);
    }
  };

  //Affichage des projets dans la modale
  const showModalProjects = (data) => {
    const modalProjects = document.querySelector(".modal-projects");
    data.forEach((project) => {
      const projectContainer = document.createElement("div");
      const deleteIconAndImgProjectContainer = document.createElement("div");
      const image = document.createElement("img");
      const deleteIcon = document.createElement("i");
      const edit = document.createElement("p");

      projectContainer.classList.add("modal-project");
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
  };

  // Vérifier si l'utilisateur est connecté
  const userIsLoggedIn = () => {
    return localStorage.getItem("loginInformation");
  };

  //Ouvrir la modale et afficher les projets si l'utilisateur est connecté
  const openModal = () => {
    modalContainer.classList.add("modal-is-open");
    emptyModal();
    showModalProjects(dataProjects);
  };

  //Fermer la modale
  const closeModal = () => {
    modalContainer.classList.remove("modal-is-open");
    addPictureContent.classList.add("hide");
    photoGalleryContent.classList.add("show");
    emptyModal();
  };

  //Fermeture de la modale au clic en dehors de son contenu

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

  //Changement du contenu de la modale : galerie photo -> Ajout photo
  const toogleModalContent = () => {
    photoGalleryContent.classList.toggle("show");
    addPictureContent.classList.toggle("hide");
  };

  if (userIsLoggedIn) {
    deleteProject(dataProjects);
    editProjectsButton.classList.add("isLoggedIn");
    editProjectsButton.addEventListener("click", openModal);
    closeModalIcon.forEach((curr) => {
      curr.addEventListener("click", closeModal);
    });
    document.addEventListener("click", handleClickOutsideModal);
    addPictureButton.addEventListener("click", toogleModalContent);
    backToPhotoGalleryIcon.addEventListener("click", toogleModalContent);
  }
};
