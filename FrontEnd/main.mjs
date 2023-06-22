import { showWorks, getWorks } from "./modules/works.mjs";
import { filters } from "./modules/filters.mjs";
import { adminAccess } from "./modules/adminAccess.mjs";

document.addEventListener("DOMContentLoaded", function () {
  getWorks().then((data) => {
    showWorks(data);
    filters(data, showWorks);
    adminAccess(data);
  });
});
