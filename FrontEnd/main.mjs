import { showWorks, getWorks } from "./modules/works.mjs";
import { filters } from "./modules/filters.mjs";
import { adminAcces } from "./modules/adminAcces.mjs";

document.addEventListener("DOMContentLoaded", function () {
  getWorks().then((worksData) => {
    showWorks(worksData);
    filters(worksData);
    adminAcces(worksData);
  });
});
