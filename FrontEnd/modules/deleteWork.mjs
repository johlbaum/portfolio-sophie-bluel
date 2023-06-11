export const deleteWork = async (workToDeleteId) => {
  const domUpDate = () => {
    const workInGalleryAndModal = document.querySelectorAll(
      `.work-${workToDeleteId}`
    );
    workInGalleryAndModal.forEach((work) => {
      work.classList.add("is-deleted");
      work.remove();
    });
  };

  const showMessage = (message) => {
    const deleteMessage = document.querySelector(".delete-message");
    deleteMessage.textContent = message;

    setTimeout(() => {
      deleteMessage.textContent = "";
    }, 2000);
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
      domUpDate();
      showMessage("Le projet a été supprimé avec succès.");
    } else {
      return Promise.reject(
        new Error("Erreur lors de la suppression du projet.")
      );
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
