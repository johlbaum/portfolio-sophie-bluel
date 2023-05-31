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
    const filter = document.createElement("p");
    filter.innerText = category;
    filters.appendChild(filter);
  });
};
