import { Filters } from "./filters.mjs";
import { AdminAccess } from "./AdminAccess.mjs";
import { Works } from "./works.mjs";

export class App {
  constructor() {
    this.works = new Works();
    this.filters = new Filters();
    this.adminAccess = new AdminAccess();
  }

  init = () => {
    this.works.getWorks().then((worksData) => {
      this.works.showWorks(worksData);
      this.filters.setupFilters(worksData, false);
      this.adminAccess.handleAdminAccess(worksData);
    });
  };
}
