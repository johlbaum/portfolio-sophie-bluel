export const showWorks = (data) => {
  data.forEach((work) => {
    const { imageUrl, title } = work;
    const gallery = document.querySelector(".gallery");

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
