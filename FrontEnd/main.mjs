import { showWorks, getWorks } from "./modules/work.mjs";
import { filters } from "./modules/filters.mjs";
import { modalManager } from "./modules/modalManager.mjs";

document.addEventListener("DOMContentLoaded", function () {
  getWorks().then((data) => {
    showWorks(data);
    filters(data, showWorks);
    modalManager(data);
  });
});
