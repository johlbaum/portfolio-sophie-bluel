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

    //Suppression d'un projet
    const deleteProjectIcon = document.querySelectorAll(".delete-project-icon");
    const jsonLoginInformation = localStorage.getItem("loginInformation");
    const loginInformation = JSON.parse(jsonLoginInformation);
    const token = loginInformation.token;

    deleteProjectIcon.forEach((curr, deleteIconIndex) => {
      curr.addEventListener("click", function () {
        data.forEach((currData, indexData) => {
          if (deleteIconIndex === indexData) {
            fetch(`http://localhost:5678/api/works/${currData.id}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            })
              .then(function (response) {
                if (response.ok) {
                  console.log("La ressource a été supprimée avec succès.");
                }
              })
              .catch(function (error) {
                console.error(error);
              });
          }
        });
      });
    });
  };

  //Vider le contenu dynamique de la modale à sa fermeture
  const emptyModal = () => {
    const modalProjects = document.querySelector(".modal-projects");
    while (modalProjects.firstChild) {
      modalProjects.removeChild(modalProjects.firstChild);
    }
  };

  //Apparition du bouton modifier si l'utilisateur est logué + gestion de l'apparition de la modal
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

  const userIsLoggedIn = localStorage.getItem("loginInformation");
  if (userIsLoggedIn) {
    editProjectsButton.classList.add("isLoggedIn");
    editProjectsButton.addEventListener("click", function () {
      modalContainer.classList.add("modal-is-open");
      showModalProjects(dataProjects);
    });
    closeModalIcon.forEach((curr) => {
      curr.addEventListener("click", function () {
        modalContainer.classList.remove("modal-is-open");
        addPictureContent.classList.add("hide");
        photoGalleryContent.classList.add("show");
        emptyModal();
      });
    });
    //Fermeture de la modale au clic en dehors de son contenu
    document.addEventListener("click", function (e) {
      if (
        !modalContent.contains(e.target) &&
        e.target !== editProjectsButtonIcon &&
        e.target !== editProjectsButtonPara
      ) {
        modalContainer.classList.remove("modal-is-open");
      }
    });
  }

  //Changement du contenu de la modale : galerie photo -> Ajout photo
  const addPictureButton = document.querySelector(".add-picture");
  const backToPhotoGalleryIcon = document.querySelector(
    ".back-to-photo-gallery-icon"
  );

  addPictureButton.addEventListener("click", function () {
    photoGalleryContent.classList.toggle("show");
    addPictureContent.classList.toggle("hide");
  });

  backToPhotoGalleryIcon.addEventListener("click", function () {
    addPictureContent.classList.toggle("hide");
    photoGalleryContent.classList.toggle("show");
  });
});
