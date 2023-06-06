import { addProject } from "./addProject.mjs";
import { showCategories, filterProjectsByCategorie } from "./categories.mjs";
import { modalManager } from "./modal.mjs";

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
      filterProjectsByCategorie(data, showWorks);
      modalManager(data);
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

  addProject();
});
