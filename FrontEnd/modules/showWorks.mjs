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
