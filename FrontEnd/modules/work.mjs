export const getWorks = async () => {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    if (!response.ok) {
      throw new Error("Erreur HTTP " + response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const showWorks = (data) => {
  const gallery = document.querySelector(".gallery");
  while (gallery.firstChild) {
    gallery.removeChild(gallery.firstChild);
  }

  data.forEach((work) => {
    const { imageUrl, title } = work;

    const figure = document.createElement("figure");
    const image = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    image.src = imageUrl;
    figcaption.innerText = title;
    figure.classList.add(`work-${work.id}`);

    gallery.appendChild(figure);
    figure.appendChild(image);
    figure.appendChild(figcaption);
  });
};

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

export const deleteWork = async (workToDeleteId) => {
  const showMessage = (message) => {
    const deleteMessage = document.querySelector(".error-message");
    deleteMessage.textContent = message;

    setTimeout(() => {
      deleteMessage.textContent = "";
    }, 1500);
  };

  try {
    const jsonLoginInformation = localStorage.getItem("loginInformation");
    const loginInformation = JSON.parse(jsonLoginInformation);
    const token = loginInformation.token;

    const response = await fetch(
      `http://localhost:5678/api/works/${workToDeleteId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      showMessage("Le projet a été supprimé avec succès.");
    } else {
      return Promise.reject(
        new Error("Erreur lors de la suppression du projet.")
      );
    }
  } catch (error) {
    showMessage("Erreur lors de la suppression du projet.");
    console.error(error);
    throw error;
  }
};
