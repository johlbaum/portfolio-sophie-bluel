import { Works } from "./works.mjs";

export class AddWorkForm {
  constructor(addWorkManager) {
    this.addProjectForm = document.querySelector(".send-work-form");
    this.imgInput = document.getElementById("img-input");
    this.imgPreview = document.querySelector(".img-preview");
    this.imgInputElements = document.querySelector(".img-input-elements");
    this.titleInput = document.getElementById("title");
    this.categorySelect = document.getElementById("category");
    this.submitButton = document.getElementById("submit-button");
    this.imageFile = "";
    this.addWorkManager = addWorkManager;
    this.works = new Works();
    this.initializeListeners();
  }

  showImagePreview = () => {
    const [file] = this.imgInput.files;
    if (file) {
      this.imgInputElements.classList.add("hide-img-input-elements");
      this.imgPreview.classList.add("display-img-preview");
      this.imgPreview.src = URL.createObjectURL(file);
    }
  };

  getImageFile = (e) => {
    this.imageFile = e.target.files[0];
  };

  checkFormCompletion = () => {
    const isFormComplete =
      this.titleInput.value !== "" &&
      this.categorySelect.value !== "" &&
      this.imgInput.files.length > 0;

    isFormComplete
      ? this.submitButton.classList.add("submit-is-valid")
      : this.submitButton.classList.remove("submit-is-valid");
  };

  resetForm = () => {
    setTimeout(() => {
      this.titleInput.value = "";
      this.categorySelect.value = "";
      this.imageFile = "";
      this.imgInput.value = "";
      this.imgInputElements.classList.remove("hide-img-input-elements");
      this.imgPreview.classList.remove("display-img-preview");
    }, 1500);
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.works
      .addWork(e, this.imageFile)
      .then((newWork) => {
        this.addWorkManager(newWork);
        this.resetForm();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  initializeListeners = () => {
    this.titleInput.addEventListener("input", this.checkFormCompletion);
    this.categorySelect.addEventListener("input", this.checkFormCompletion);
    this.imgInput.addEventListener("input", this.checkFormCompletion);
    this.addProjectForm.addEventListener("submit", this.submitHandler);
    this.imgInput.addEventListener("change", this.getImageFile);
    this.imgInput.addEventListener("change", this.showImagePreview);
  };
}
