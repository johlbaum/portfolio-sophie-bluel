export const filters = (data, showWorks) => {
  const uniqueCategoriesArray = [
    ...new Set(data.map((item) => JSON.stringify(item.category))),
  ].map((category) => JSON.parse(category));

  uniqueCategoriesArray.unshift({ id: 0, name: "Tous" });

  uniqueCategoriesArray.forEach((category) => {
    const filters = document.querySelector(".filters");
    const filterElement = document.createElement("p");

    filterElement.classList.add("filter");
    filterElement.innerText = category.name;
    filters.appendChild(filterElement);
  });

  const firstFilter = document.querySelector(".filters").firstChild;
  firstFilter.classList.add("active");

  const changeActiveFilterButtonBackground = (filterIndex) => {
    filters.forEach((filter, index) => {
      filter.classList.remove("active");
      if (filterIndex === index) {
        filter.classList.add("active");
      }
    });
  };

  const filters = document.querySelectorAll(".filter");
  filters.forEach((filter, filterIndex) => {
    filter.addEventListener("click", function () {
      changeActiveFilterButtonBackground(filterIndex);
      const uniqueCategory = uniqueCategoriesArray[filterIndex];
      const filteredProjects = data.filter((work) => {
        if (uniqueCategory.id !== 0) {
          return parseInt(work.categoryId) === uniqueCategory.id;
        } else {
          return true;
        }
      });

      document.querySelector(".gallery").innerHTML = "";
      showWorks(filteredProjects);
    });
  });
};
