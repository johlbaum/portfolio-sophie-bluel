import { getWorks } from "./modules/getWorks.mjs";
import { showWorks } from "./modules/showWorks.mjs";
import { filters } from "./modules/filters.mjs";
import { modalManager } from "./modules/modalManager.mjs";

document.addEventListener("DOMContentLoaded", function () {
  getWorks().then((data) => {
    showWorks(data);
    filters(data, showWorks);
    modalManager(data);
  });
});
