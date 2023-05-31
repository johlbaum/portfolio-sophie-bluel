fetch("http://localhost:5678/api/works")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Erreur HTTP " + response.status);
    }
    return response.json();
  })
  .then((data) => {
    data.map((curr) => {
      const gallery = document.querySelector(".gallery");
      const article = document.createElement("figure");
      const image = document.createElement("img");
      const figcaption = document.createElement("figcaption");
      image.src = curr.imageUrl;
      figcaption.innerText = curr.title;
      gallery.appendChild(article);
      article.appendChild(image);
      article.appendChild(figcaption);
    });
  })
  .catch((error) => {
    console.error(error);
  });
