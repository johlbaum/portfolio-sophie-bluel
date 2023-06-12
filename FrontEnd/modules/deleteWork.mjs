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
