export const filters = (data, showWorks) => {
  const uniqueCategoriesArray = [
    ...new Set(data.map((item) => JSON.stringify(item.category))),
  ].map((category) => JSON.parse(category));

  uniqueCategoriesArray.forEach((category) => {
    const categories = document.querySelector(".works-categories");
    const categoryElement = document.createElement("p");
    categoryElement.classList.add("category");
    categoryElement.innerText = category.name;
    categories.appendChild(categoryElement);
  });

  const categories = document.querySelectorAll(".category");
  categories.forEach((category, index) => {
    category.addEventListener("click", function () {
      const uniqueCategory = uniqueCategoriesArray[index];
      const filteredProjects = data.filter((work) => {
        return parseInt(work.categoryId) === uniqueCategory.id;
      });

      document.querySelector(".gallery").innerHTML = "";
      showWorks(filteredProjects);
    });
  });
};
