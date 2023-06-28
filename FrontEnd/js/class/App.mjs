import { Filters } from "./filters.mjs";
import { AdminAcces } from "./adminAcces.mjs";
import { Works } from "./works.mjs";

export class App {
  constructor() {
    this.works = new Works();
    this.filters = new Filters();
    this.adminAcces = new AdminAcces();
  }

  init = () => {
    this.works.getWorks().then((worksData) => {
      this.works.showWorks(worksData);
      this.filters.setupFilters(worksData);
      this.adminAcces.handleAdminAccess(worksData);
    });
  };
}
