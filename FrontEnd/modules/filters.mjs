import { showWorks, getWorks } from "./works.mjs";

export const filters = async (worksData, isLastCategoryInWorksData) => {
  const filtersContainer = document.querySelector(".filters");

  const resetFilters = () => {
    while (filtersContainer.firstChild) {
      filtersContainer.removeChild(filtersContainer.firstChild);
    }
  };

  const setUniqueCategoriesArray = async () => {
    //Each time a project is added, if the added project belongs to a category already present, no category must be added.
    //Otherwise, since adding a project does not return a category property that is associated with an Id and a name, we must fetch to add the new category.
    try {
      const updatedWorksData =
        isLastCategoryInWorksData !== true &&
        typeof isLastCategoryInWorksData !== "undefined"
          ? await getWorks()
          : worksData;

      //In the case of JavaScript objects, a strict comparison will not work for different objects, even if they have the same properties.
      //As a workaround, we use JSON.stringify() to convert each category object to a JSON string. JSON character strings can be strictly compared and therefore allow duplicates to be detected.
      //Then the duplicates are eliminated using a Set, and finally the JSON strings are converted back into category objects with JSON.parse().
      const uniqueCategories = [
        ...new Set(
          updatedWorksData.map((item) => JSON.stringify(item.category))
        ),
      ].map((category) => JSON.parse(category));

      return uniqueCategories;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const addAllToFiltersCategories = (uniqueCategoriesArray) => {
    uniqueCategoriesArray.unshift({ id: 0, name: "Tous" });
  };

  const createFilterElements = (uniqueCategoriesArray) => {
    uniqueCategoriesArray.forEach((category) => {
      const filterElement = document.createElement("p");
      filterElement.classList.add("filter");
      filterElement.innerText = category.name;
      filtersContainer.appendChild(filterElement);
    });
  };

  const setFirstFilterActiveBackground = () => {
    const firstFilter = document.querySelector(".filters").firstChild;
    firstFilter.classList.add("active");
  };

  const changeActiveFilterBackground = (filterElements, filterIndex) => {
    filterElements.forEach((filter, index) => {
      filter.classList.remove("active");
      if (filterIndex === index) {
        filter.classList.add("active");
      }
    });
  };

  const applyFilter = (filterIndex) => {
    const uniqueCategorySelected = uniqueCategoriesArray[filterIndex];
    const filteredProjects = worksData.filter((work) => {
      //Zero is the filter category id for all projects
      if (uniqueCategorySelected.id !== 0) {
        //When creating a new project, the back-end returns a string as value for the categoryId property
        return parseInt(work.categoryId) === uniqueCategorySelected.id;
      } else {
        return true;
      }
    });
    document.querySelector(".gallery").innerHTML = "";
    showWorks(filteredProjects);
  };

  const activateFilterListeners = () => {
    const filterElements = document.querySelectorAll(".filter");
    filterElements.forEach((filter, filterIndex) => {
      filter.addEventListener("click", function () {
        changeActiveFilterBackground(filterElements, filterIndex);
        applyFilter(filterIndex);
      });
    });
  };

  resetFilters();
  const uniqueCategoriesArray = await setUniqueCategoriesArray();
  addAllToFiltersCategories(uniqueCategoriesArray);
  createFilterElements(uniqueCategoriesArray);
  setFirstFilterActiveBackground();
  activateFilterListeners();
};
