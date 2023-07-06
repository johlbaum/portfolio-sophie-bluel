import { Works } from "./works.mjs";

export class Filters {
  constructor() {
    this.filtersContainer = document.querySelector(".filters");
    this.works = new Works();
  }

  resetFilters = () => {
    while (this.filtersContainer.firstChild) {
      this.filtersContainer.removeChild(this.filtersContainer.firstChild);
    }
  };

  setUniqueCategoriesArray = async (worksData, isLastCategoryInWorksData) => {
    //Adding a project does not return a category property that is associated with an Id and a name, we must fetch to add the new category.
    try {
      const updatedWorksData =
        isLastCategoryInWorksData !== true &&
        typeof isLastCategoryInWorksData !== "undefined"
          ? await this.works.getWorks()
          : worksData;

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

  addAllToFiltersCategories = (uniqueCategoriesArray) => {
    uniqueCategoriesArray.unshift({ id: 0, name: "Tous" });
  };

  createFilterElements = (uniqueCategoriesArray) => {
    uniqueCategoriesArray.forEach((category) => {
      const filterElement = document.createElement("p");
      filterElement.classList.add("filter");
      filterElement.innerText = category.name;
      this.filtersContainer.appendChild(filterElement);
    });
  };

  setFirstFilterActiveBackground = () => {
    const firstFilter = document.querySelector(".filters").firstChild;
    firstFilter.classList.add("active");
  };

  changeActiveFilterBackground = (filterElements, filterIndex) => {
    filterElements.forEach((filter, index) => {
      filter.classList.remove("active");
      if (filterIndex === index) {
        filter.classList.add("active");
      }
    });
  };

  applyFilter = (worksData, filterIndex, uniqueCategoriesArray) => {
    const uniqueCategorySelected = uniqueCategoriesArray[filterIndex];
    const filteredProjects = worksData.filter((work) => {
      //Zero is the filter category id for all projects
      if (uniqueCategorySelected.id !== 0) {
        //When creating a new project, the back-end returns a string as value for the categoryId property.
        return parseInt(work.categoryId) === uniqueCategorySelected.id;
      } else {
        return true;
      }
    });
    document.querySelector(".gallery").innerHTML = "";
    this.works.showWorks(filteredProjects);
  };

  activateFilterListeners = (worksData, uniqueCategoriesArray) => {
    const filterElements = document.querySelectorAll(".filter");
    filterElements.forEach((filter, filterIndex) => {
      filter.addEventListener("click", () => {
        this.changeActiveFilterBackground(filterElements, filterIndex);
        this.applyFilter(worksData, filterIndex, uniqueCategoriesArray);
      });
    });
  };

  setupFilters = async (worksData, isLastCategoryInWorksData) => {
    this.resetFilters();
    const uniqueCategoriesArray = await this.setUniqueCategoriesArray(
      worksData,
      isLastCategoryInWorksData
    );
    this.addAllToFiltersCategories(uniqueCategoriesArray);
    this.createFilterElements(uniqueCategoriesArray);
    this.setFirstFilterActiveBackground();
    this.activateFilterListeners(worksData, uniqueCategoriesArray);
  };
}