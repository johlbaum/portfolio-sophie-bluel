document.addEventListener("DOMContentLoaded", function () {
  let dataProjects = null;

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
      //Stocke la data dans la varirable globale dataProjects pour éviter un nouveau call API à chaque ouverture de la modale
      dataProjects = data;
      showWorks(data);
      //Converti les valeurs stockés dans l'objet Set en tableau
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

      //Intègre dans l'objet Set toutes les catégories de projets pour ne conserver que les valeurs uniques
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
      deleteIcon.classList.add("fa", "regular", "fa-trash-can");
      edit.textContent = "éditer";

      modalProjects.appendChild(projectContainer);
      projectContainer.appendChild(deleteIconAndImgProjectContainer);
      deleteIconAndImgProjectContainer.appendChild(image);
      deleteIconAndImgProjectContainer.appendChild(deleteIcon);
      projectContainer.appendChild(edit);
    });
  };

  //Vider le contenu dynmaique de la modale à sa fermeture
  const emptyModal = () => {
    const modalProjects = document.querySelector(".modal-projects");
    while (modalProjects.firstChild) {
      modalProjects.removeChild(modalProjects.firstChild);
    }
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
      showModalProjects(dataProjects);
    });
    closeModal.addEventListener("click", function () {
      modal.classList.remove("modal-is-open");
      emptyModal();
    });
  }
});
