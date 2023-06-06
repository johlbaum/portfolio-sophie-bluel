//Affichage des catégories
export const showCategories = (categoriesArray) => {
  console.log(categoriesArray);
  categoriesArray.forEach((category) => {
    const filters = document.querySelector(".filters");
    const filterElement = document.createElement("p");
    filterElement.classList.add("filter");
    filterElement.innerText = category;
    filters.appendChild(filterElement);
  });
};

//Filtrer les projets par catégorie
export const filterProjectsByCategorie = (data, showWorks) => {
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
