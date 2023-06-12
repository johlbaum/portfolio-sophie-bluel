export async function addWork(e) {
  const jsonLoginInformation = localStorage.getItem("loginInformation");
  const loginInformation = JSON.parse(jsonLoginInformation);
  const token = loginInformation.token;

  const formData = new FormData();

  const fileInput = document.querySelector('input[type="file"]');
  const imageFile = fileInput.files[0];
  formData.append("image", imageFile);
  formData.append("title", e.target.elements.title.value);
  formData.append("category", e.target.elements.category.value);

  const showMessage = (message) => {
    const errorMessage = document.querySelector(".form-message");
    errorMessage.textContent = message;

    setTimeout(() => {
      errorMessage.textContent = "";
    }, 1500);
  };

  if (
    !imageFile ||
    e.target.elements.title.value === "" ||
    e.target.elements.category.value === ""
  ) {
    showMessage("Il faut remplir tous les champs du formulaire !");
    throw new Error("Not all form fields are filled in.");
  }

  try {
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      showMessage("Le projet a bien été ajouté.");
      return data;
    } else {
      return Promise.reject(new Error("Erreur lors de l'ajout d'un projet."));
    }
  } catch (error) {
    console.error(error);
  }
}
