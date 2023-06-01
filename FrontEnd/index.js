document.addEventListener("DOMContentLoaded", function () {
  const categoriesSet = new Set();

  //Récupération des données depuis le back-end
  fetch("http://localhost:5678/api/works")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur HTTP " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      showWorks(data);
      const categoriesArray = Array.from(categoriesSet);
      showCategories(categoriesArray);
      filterProjectsByCategorie(data);
    })
    .catch((error) => {
      console.error(error);
    });

  //Affichage des travaux
  const showWorks = (data) => {
    data.forEach((work) => {
      const { imageUrl, title, category } = work;
      const gallery = document.querySelector(".gallery");
      const figure = document.createElement("figure");
      const image = document.createElement("img");
      const figcaption = document.createElement("figcaption");
      image.src = imageUrl;
      figcaption.innerText = title;
      gallery.appendChild(figure);
      figure.appendChild(image);
      figure.appendChild(figcaption);

      categoriesSet.add(category.name);
    });
  };

  //Affichage des catégories
  const showCategories = (categoriesArray) => {
    categoriesArray.forEach((category) => {
      const filters = document.querySelector(".filters");
      const filterElement = document.createElement("p");
      filterElement.classList.add("filter");
      filterElement.innerText = category;
      filters.appendChild(filterElement);
    });
  };

  //Filtrer les projets par catégorie
  const filterProjectsByCategorie = (data) => {
    const filters = document.querySelectorAll(".filter");
    let selectedCategory;
    filters.forEach((filter) => {
      filter.addEventListener("click", function () {
        selectedCategory = this.innerText;
        const filteredProjects = data.filter((project) => {
          return project.category.name === selectedCategory;
        });

        document.querySelector(".gallery").innerHTML = "";
        showWorks(filteredProjects);
      });
    });
  };

  //Apparition du bouton modifier si l'utilisateur est logué + gestion de l'apparition de la modal
  const editProjectsButton = document.querySelector(".edit-projects");
  const modal = document.querySelector(".modal-container");
  const closeModal = document.querySelector(".close-modal");

  const userIsLoggedIn = localStorage.getItem("loginInformation");
  if (userIsLoggedIn) {
    editProjectsButton.classList.add("isLoggedIn");
    editProjectsButton.addEventListener("click", function () {
      modal.classList.add("modal-is-open");
    });
    closeModal.addEventListener("click", function () {
      modal.classList.remove("modal-is-open");
    });
  }
});
