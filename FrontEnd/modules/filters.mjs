export const filters = (data, showWorks) => {
  const categoriesSet = new Set();

  data.forEach((work) => {
    categoriesSet.add(work.category.name);
  });

  const categoriesArray = Array.from(categoriesSet);

  categoriesArray.forEach((category) => {
    const categories = document.querySelector(".works-categories");
    const categoryElement = document.createElement("p");
    categoryElement.classList.add("category");
    categoryElement.innerText = category;
    categories.appendChild(categoryElement);
  });

  const categories = document.querySelectorAll(".category");
  let selectedCategory;
  categories.forEach((category) => {
    category.addEventListener("click", function () {
      selectedCategory = this.innerText;
      const filteredProjects = data.filter((work) => {
        return work.category.name === selectedCategory;
      });

      document.querySelector(".gallery").innerHTML = "";
      showWorks(filteredProjects);
    });
  });
};
