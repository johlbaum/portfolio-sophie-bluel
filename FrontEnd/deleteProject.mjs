export function deleteProject(dataProjects) {
  const deleteProjectIcon = document.querySelectorAll(".delete-project-icon");
  const jsonLoginInformation = localStorage.getItem("loginInformation");
  const loginInformation = JSON.parse(jsonLoginInformation);
  const token = loginInformation.token;
  deleteProjectIcon.forEach((curr, deleteIconIndex) => {
    curr.addEventListener("click", function () {
      dataProjects.forEach((currData, indexData) => {
        if (deleteIconIndex === indexData) {
          fetch(`http://localhost:5678/api/works/${currData.id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
            .then(function (response) {
              if (response.ok) {
                console.log("La ressource a été supprimée avec succès.");
              }
            })
            .catch(function (error) {
              console.error(error);
            });
        }
      });
    });
  });
}
