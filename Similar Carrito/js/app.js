const carrito = document.querySelector('#carrito');
const listaCiudades = document.querySelector("#lista-ciudades");
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
    listaCiudades.addEventListener("click", agregarCiudad);

    carrito.addEventListener("click", eliminarCiudad);

    vaciarCarritoBtn.addEventListener("click", limpiarHTML);
}


function agregarCiudad(e) {
    e.preventDefault();

    if (e.target.classList.contains("agregar-carrito")) {
        const ciudad = e.target.parentElement.parentElement;
        leerDatosCiudad(ciudad);
    }
}

function leerDatosCiudad(ciudad) {
    const infoCiudad = {
        imagen: ciudad.querySelector("img").src,
        titulo: ciudad.querySelector("h4").textContent,
        precio: ciudad.querySelector(".precio").textContent,
        id: ciudad.querySelector("a").getAttribute('data-id'),
        cantidad: 1
    }

    if (articulosCarrito.some(ciudad => ciudad.id === infoCiudad)) {
        const ciudades = articulosCarrito.map(ciudad => {
            if (ciudad.id === infoCiudad.id) {
                ciudad.cantidad++;
                return ciudad;
            } else {
                return ciudad;
            }
        })
        articulosCarrito = [...ciudades];
    } else {
        articulosCarrito = [...articulosCarrito, infoCiudad];

        carritoHTML();
    }
}


function eliminarCiudad(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar-curso')) {
        // e.target.parentElement.parentElement.remove();
        const ciudadId = e.target.getAttribute('data-id')

        // Eliminar del arreglo del carrito
        articulosCarrito = articulosCarrito.filter(ciudad => ciudad.id !== ciudadId);

        carritoHTML();
    }
}

function carritoHTML() {

    //Limpiar el HTML para no tener duplicados
    limpiarHTML();

    //Recorre el carrito el genera el HTML
    articulosCarrito.forEach(ciudad => {
        const { imagen, titulo, precio, cantidad, id } = ciudad;
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}" > x </a>
            </td>
        
        `;
        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);

    });
}

function limpiarHTML() {
    //Forma lenta
    // contenedorCarrito.innerHTML = "";

    // forma rapida (recomendada)
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}