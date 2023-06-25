import { showWorks, deleteWork } from "./works.mjs";
import { addWorkForm } from "./addWorkForm.mjs";

export const modal = (worksData) => {
  const editWorksButton = document.querySelector(".edit-works");
  const editWorksButtonIcon = editWorksButton.querySelector(":first-child");
  const editWorksButtonPara = editWorksButton.querySelector(":nth-child(2)");
  const modalContainer = document.querySelector(".modal-container");
  const modalContent = document.querySelector(".modal-content");
  const modalWorks = document.querySelector(".modal-works");
  const closeModalIcon = document.querySelectorAll(".close-modal-icon");
  const addPictureContent = document.querySelector(".add-picture-content");
  const photoGalleryContent = document.querySelector(".photo-gallery-content");
  const addPictureButton = document.querySelector(".add-picture");
  const backToPhotoGalleryIcon = document.querySelector(
    ".back-to-photo-gallery-icon"
  );

  const showModalWorks = (worksData) => {
    worksData.forEach((work) => {
      const worksContainer = document.createElement("div");
      const workImgContainer = document.createElement("div");
      const workImage = document.createElement("img");
      const deleteIcon = document.createElement("i");
      const workEdit = document.createElement("p");

      worksContainer.classList.add("modal-work");
      worksContainer.classList.add(`work-${work.id}`);
      workImgContainer.classList.add("work-img-container");
      workImage.src = work.imageUrl;
      deleteIcon.classList.add(
        "fa",
        "regular",
        "fa-trash-can",
        "delete-work-icon"
      );
      workEdit.textContent = "éditer";

      modalWorks.appendChild(worksContainer);
      worksContainer.appendChild(workImgContainer);
      workImgContainer.appendChild(workImage);
      workImgContainer.appendChild(deleteIcon);
      worksContainer.appendChild(workEdit);
    });

    const firstModalWork = document.querySelector(".modal-work:first-child");
    const firstWorkImgContainer = firstModalWork.querySelector(
      ".work-img-container"
    );
    const moveWorkIcon = document.createElement("i");
    moveWorkIcon.classList.add(
      "fa-solid",
      "fa-up-down-left-right",
      "move-work-icon"
    );
    firstWorkImgContainer.appendChild(moveWorkIcon);

    attachDeleteEventListeners(worksData);
  };

  const attachDeleteEventListeners = (worksData) => {
    const deleteWorkIcons = document.querySelectorAll(".delete-work-icon");
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
    showModalWorks(worksData);
  };

  const closeModal = () => {
    modalContainer.classList.remove("modal-is-open");
    addPictureContent.classList.add("hide");
    photoGalleryContent.classList.add("show");
  };

  const handleClickOutsideModal = (e) => {
    if (
      !modalContent.contains(e.target) &&
      e.target !== editWorksButtonIcon &&
      e.target !== editWorksButtonPara
    ) {
      closeModal();
    }
  };

  const toogleModalContent = () => {
    photoGalleryContent.classList.toggle("show");
    addPictureContent.classList.toggle("hide");
  };

  const emptyModal = () => {
    while (modalWorks.firstChild) {
      modalWorks.removeChild(modalWorks.firstChild);
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
      showModalWorks(worksData);
      showWorks(worksData);
    }, 1500);
  };

  const deleteWorkManager = (workToDelete) => {
    setTimeout(() => {
      emptyModal();
      updateWorksDataAfterDelete(workToDelete);
      showModalWorks(worksData);
      showWorks(worksData);
    }, 1500);
  };

  editWorksButton.addEventListener("click", openModal);
  closeModalIcon.forEach((curr) => {
    curr.addEventListener("click", closeModal);
  });
  document.addEventListener("click", handleClickOutsideModal);
  addPictureButton.addEventListener("click", toogleModalContent);
  backToPhotoGalleryIcon.addEventListener("click", toogleModalContent);
  addWorkForm(addWorkManager);
};
