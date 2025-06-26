import { animales } from "./js/animales.js";

const contenedor = document.getElementById("contenedorAnimales");

function renderAnimales(filtro = "todos") {
  contenedor.innerHTML = "";
  const filtrados = filtro === "todos" ? animales : animales.filter(a => a.tipo === filtro);

  filtrados.forEach(animal => {
    contenedor.innerHTML += `
      <div class="bg-yellow-200 flex flex-col border py-3 px-5 items-center max-w-sm rounded-full 
                  hover:scale-105 hover:shadow-super-dark transition">
        <img class="aspect-square object-cover w-full max-w-sm rounded-full" src="${animal.imagen}" alt="${animal.nombre}" />
        <h1 class="mt-5 text-3xl font-bubblegum text-[#4c6dbe]">Mi nombre es ${animal.nombre}</h1>
        <p class="leading-7 text-center text-[#4c6dbe] mt-3">${animal.descripcion}</p>
        <div class="bg-cover bg-center bg-no-repeat h-32 w-56 mb-5 flex items-center justify-center 
                    hover:scale-110 transition hover:text-white group/perrito"
             style="background-image: url('hueso3.png');">
          <a class="hover:drop-shadow-lg font-bubblegum text-yellow-200 group-hover/perrito:text-[#4c6dbe]" href="detalle.html?id=${animal.id}">Adóptame</a>
        </div>
      </div>
    `;
  });
}

function getQueryParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

const botonesFiltro = document.querySelectorAll(".filter-btn");

botonesFiltro.forEach(boton => {
  boton.addEventListener("click", e => {
    e.preventDefault();
    const filtro = boton.getAttribute("data-filter");
    renderAnimales(filtro);
    document.getElementById("contenedorAnimales").scrollIntoView({ behavior: "smooth" });
    // Cambiar URL sin recargar para reflejar filtro
    history.replaceState(null, '', `?filter=${filtro}`);
  });
});

// Al cargar la página
const filtroInicial = getQueryParam("filter") || "todos";
renderAnimales(filtroInicial);
