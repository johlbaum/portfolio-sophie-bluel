export function addWork() {
  const addProjectForm = document.querySelector(".send-project-form");
  const jsonLoginInformation = localStorage.getItem("loginInformation");
  if (jsonLoginInformation) {
    const loginInformation = JSON.parse(jsonLoginInformation);
    const token = loginInformation.token;

    addProjectForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData();

      const fileInput = document.querySelector('input[type="file"]');
      const imageFile = fileInput.files[0];

      formData.append("title", e.target.elements.title.value);
      formData.append("category", e.target.elements.category.value);
      formData.append("image", imageFile);

      fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }
}
