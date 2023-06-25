import { addWork } from "./works.mjs";

export const addWorkForm = (addWorkManagerCallback) => {
  const addProjectForm = document.querySelector(".send-work-form");
  const imgInput = document.getElementById("img-input");
  const imgPreview = document.querySelector(".img-preview");
  const imgInputElements = document.querySelector(".img-input-elements");
  const titleInput = document.getElementById("title");
  const categorySelect = document.getElementById("category");
  const submitButton = document.getElementById("submit-button");
  let imageFile = "";

  const showImagePreview = () => {
    const [file] = imgInput.files;
    if (file) {
      imgInputElements.classList.add("hide-img-input-elements");
      imgPreview.classList.add("display-img-preview");
      imgPreview.src = URL.createObjectURL(file);
    }
  };

  const getImageFile = (e) => {
    imageFile = e.target.files[0];
  };

  const checkFormCompletion = () => {
    const isFormComplete =
      titleInput.value !== "" &&
      categorySelect.value !== "" &&
      imgInput.files.length > 0;

    isFormComplete
      ? submitButton.classList.add("submit-is-valid")
      : submitButton.classList.remove("submit-is-valid");
  };

  const resetForm = () => {
    setTimeout(() => {
      titleInput.value = "";
      categorySelect.value = "";
      imageFile = "";
      imgInput.value = "";
      imgInputElements.classList.remove("hide-img-input-elements");
      imgPreview.classList.remove("display-img-preview");
    }, 1500);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addWork(e, imageFile)
      .then((newWork) => {
        addWorkManagerCallback(newWork);
        resetForm();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  titleInput.addEventListener("input", checkFormCompletion);
  categorySelect.addEventListener("input", checkFormCompletion);
  imgInput.addEventListener("input", checkFormCompletion);
  addProjectForm.addEventListener("submit", submitHandler);
  imgInput.addEventListener("change", getImageFile);
  imgInput.addEventListener("change", showImagePreview);
};
