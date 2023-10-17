// let productosGamer = [
//   {
//     id: 1,
//     nombre: "Logitech G502",
//     category: "Mouse Gamer",
//     manufacturer: "Logitech",
//     price: 49.99,
//     envio: "envio rapido",
//     stock: 2,
//     rutaImagen: "logitech-g502.webp",
//   },
//   {
//     id: 2,
//     nombre: "Razer BlackWidow Elite",
//     category: "Teclados Gamer",
//     manufacturer: "Razer",
//     price: 169.99,
//     envio: "envio rapido",
//     stock: 2,
//     rutaImagen: "razer-blackWidow-elite.webp",
//   },
//   {
//     id: 3,
//     nombre: "SteelSeries Arctis Pro",
//     category: "Audifonos Gamer",
//     manufacturer: "SteelSeries",
//     price: 179.99,
//     envio: "envio rapido",
//     stock: 2,
//     rutaImagen: "steelSeries-arctis-pro.webp",
//   },
//   {
//     id: 4,
//     nombre: "ASUS ROG Strix GeForce RTX 3080",
//     category: "Tarjetas Graficas",
//     manufacturer: "ASUS",
//     price: 699.99,
//     envio: "envio rapido",
//     stock: 2,
//     rutaImagen: "asus-rog-strix-geforce-rtx-3080.webp",
//   },
//   {
//     id: 5,
//     nombre: "HyperX Alloy Origins",
//     category: "Teclados Gamer",
//     manufacturer: "HyperX",
//     price: 109.99,
//     envio: "envio rapido",
//     stock: 2,
//     rutaImagen: "hyperx-alloy-origins.webp",
//   },
//   {
//     id: 6,
//     nombre: "Corsair K70 RGB MK.2",
//     category: "Teclados Gamer",
//     manufacturer: "Corsair",
//     price: 159.99,
//     envio: "envio rapido",
//     stock: 2,
//     rutaImagen: "corsair-k70-rgb-mk-2.webp",
//   },
//   {
//     id: 7,
//     nombre: "LG 27GL850-B",
//     category: "Monitor Gamer",
//     manufacturer: "LG",
//     price: 499.99,
//     envio: "envio rapido",
//     stock: 2,
//     rutaImagen: "lg-27GL850-B.webp",
//   },
//   {
//     id: 8,
//     nombre: "Sony PlayStation 5",
//     category: "Consolas",
//     manufacturer: "Sony",
//     price: 499.99,
//     envio: "envio rapido",
//     stock: 2,
//     rutaImagen: "sony-playStation-5.webp",
//   },
//   {
//     id: 9,
//     nombre: "Microsoft Xbox Series X",
//     category: "Consolas",
//     manufacturer: "Microsoft",
//     price: 499.99,
//     envio: "envio rapido",
//     stock: 2,
//     rutaImagen: "microsoft-xbox-series-x.webp",
//   },
//   {
//     id: 10,
//     nombre: "Logitech G Pro X Superlight",
//     category: "Mouse Gamer",
//     manufacturer: "Logitech",
//     price: 149.99,
//     envio: "envio rapido",
//     stock: 2,
//     rutaImagen: "logitech-g-pro-x-superlight.webp",
//   },
// ];

// console.log(JSON.stringify(productosGamer));
fetch("../info.json")
  .then((respuesta) => respuesta.json())
  .then((productosGamer) => principal(productosGamer));

function principal(productosGamer) {
  let carritoRecuperado = localStorage.getItem("carrito");
  let carrito = carritoRecuperado ? JSON.parse(carritoRecuperado) : [];

  // let carrito = [];

  renderizarCarrito(carrito);
  renderizarProductos(productosGamer, carrito);
  actualizarContadorCarrito(carrito);

  let buscador = document.getElementById("buscador");
  let botonBuscar = document.getElementById("buscar");

  botonBuscar.addEventListener("click", () =>
    filtrarYRenderizar(productosGamer, buscador)
  );

  let btnsCategoria = document.querySelectorAll(".btn-category");

  btnsCategoria.forEach((btn) => {
    btn.addEventListener("click", () => {
      let category = btn.getAttribute("data-category");

      filtrarporCategoria(category);
    });
  });
}

/* Carga de los productos en el sitio */
// renderizarProductos(productosGamer, carrito);

function renderizarProductos(productosGamer, carrito) {
  let contenedor = document.getElementById("contenedorProductos");
  contenedor.innerHTML = "";

  productosGamer.forEach((producto) => {
    let tarjeta = document.createElement("div");
    tarjeta.innerHTML = `
    <div class="card-productos">
          <div class="img-producto">
              <img src="assets/img/${producto.rutaImagen}" alt="">
          </div>
          <div class="descripcion-producto">
              <div class="disponibilidad-producto">
                <div class="tag-tipo-envio">
                    <span>${producto.envio}</span>
                </div>
                <div class="tag-disponibilidad">
                  <span>${
                    producto.stock > 0 ? "DISPONIBLE EN TIENDA" : ""
                  }</span>
                </div>
              </div>
              <div class="fabricante-producto">
                  <span>${producto.manufacturer}</span>
              </div>
              <div class="titulo-producto">
                  <span>${producto.nombre}</span>
              </div>
              <div class="categoria-producto">
                  <p>${producto.category}</p>
              </div>
              <div class="precio-producto">
                  <p>$${producto.price}</p>
              </div>
              <div class="btn-agregar">
                  <span id=${producto.id}>Agregar al carro</span>
              </div>
          </div>
      </div>
    `;

    if (producto.stock <= 0) {
      const tagDisponibilidad = tarjeta.querySelector(".tag-disponibilidad");
      tagDisponibilidad.style.display = "none";
    }
    contenedor.appendChild(tarjeta);

    let botonAgregarAlCarrito = document.getElementById(producto.id);
    botonAgregarAlCarrito.addEventListener("click", (e) =>
      agregarProductoCarrito(productosGamer, carrito, e)
    );
  });
}
/* FIN */

/** Filtrar y mostrar la busqueda en Input **/

function filtrarYRenderizar(productosGamer, buscador) {
  let inputBusqueda = buscador.value.toUpperCase();
  let producutosFiltrados = productosGamer.filter((producto) =>
    producto.nombre.toUpperCase().includes(inputBusqueda)
  );
  renderizarProductos(producutosFiltrados, carrito);
}

function filtrarporCategoria(category) {
  let producutosFiltrados = productosGamer.filter(
    (producto) => producto.category === category
  );

  renderizarProductos(producutosFiltrados, carrito);
}

/******************************************************************/
function agregarProductoCarrito(productosGamer, carrito, e) {
  let productoSolicitado = productosGamer.find(
    (producto) => producto.id === Number(e.target.id)
  );
  let productoAgregado = carrito.find(
    (producto) => producto.id === productoSolicitado.id
  );

  if (productoSolicitado.stock > 0) {
    if (productoAgregado) {
      productoAgregado.unidades++;
      productoAgregado.subtotal =
        productoAgregado.unidades * productoAgregado.precioUnitario;
    } else {
      carrito.push({
        id: productoSolicitado.id,
        imagen: productoSolicitado.rutaImagen,
        nombre: productoSolicitado.nombre,
        precioUnitario: productoSolicitado.price,
        unidades: 1,
        subtotal: productoSolicitado.price,
      });
    }
    productoSolicitado.stock--;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    lanzarTostada(
      `${productoSolicitado.nombre} agregado ✅`,
      "bottom",
      "right"
    );
  } else {
    agregarAlerta(
      "top-end",
      "info",
      "El producto esta agotado 😞",
      false,
      1500
    );
  }
  renderizarCarrito(carrito);
  actualizarContadorCarrito(carrito);
}
/* FIN */

function actualizarContadorCarrito(carrito) {
  let contadorCarrito = document.getElementById("contadorCarrito");
  if (contadorCarrito) {
    contadorCarrito.textContent = carrito.reduce(
      (total, producto) => total + producto.unidades,
      0
    );
  }
}

function renderizarCarrito(productosCarrito) {
  if (productosCarrito.length > 0) {
    let contenidoCarrito = document.getElementById("carrito");
    contenidoCarrito.innerHTML = "";

    let boxResumen = document.createElement("div");
    boxResumen.classList.add("box-resumen");
    boxResumen.innerHTML = `
      <span>Resumen</span>
    `;
    contenidoCarrito.appendChild(boxResumen);

    productosCarrito.forEach((producto) => {
      let itemProductoCarrito = document.createElement("div");
      itemProductoCarrito.classList.add("contenedor-items-carrito");
      itemProductoCarrito.innerHTML = `
        <div class="contenedor-nombre">
          <div class="nombre-producto-carrito"
            <span>${producto.nombre}</span>
          </div>
        </div>
        <div class="box-carrito">
          <div class="imagen-producto-carrito">
            <img src="assets/img/${producto.imagen}" alt="">
          </div>
          <div class="contenedor-info">
            <div class="precio-producto-carrito"
              <p class="texto-info">Unidad: <span>$${producto.precioUnitario}</span></p>
            </div>
            <div class="unidades-producto-carrito"
              <p class="texto-info">Cant: <span> ${producto.unidades}</span></p>
            </div>
            <div class="subtotal-producto-carrito"
              <p class="texto-info">Subtotal: <span>$${producto.subtotal}</span></p>
            </div>
          </div>
        </div>
      `;
      contenidoCarrito.appendChild(itemProductoCarrito);
    });

    let sumaSubtotales = calcularSumaSubtotales(productosCarrito);

    let totalElement = document.createElement("div");
    totalElement.classList.add("contenedor-total-compra");
    totalElement.id = "totalElement";
    totalElement.textContent = `Total: $${sumaSubtotales.toFixed(2)}`;

    contenidoCarrito.appendChild(totalElement);

    let btnFinalzarCompra = document.createElement("button");
    btnFinalzarCompra.innerHTML = "Finalizar compra";
    btnFinalzarCompra.addEventListener("click", finalizarCompra);
    contenidoCarrito.appendChild(btnFinalzarCompra);
  }
}

function calcularSumaSubtotales(productosCarrito) {
  let sumaSubtotales = 0;
  productosCarrito.forEach((producto) => {
    sumaSubtotales += producto.subtotal;
  });
  return sumaSubtotales;
}

function mostrarTotal(total) {
  let totalElement = document.getElementById("totalElement"); // Cambia el ID según tu estructura HTML
  totalElement.textContent = `$${total.toFixed(2)}`;
}

function finalizarCompra() {
  let carrito = document.getElementById("carrito");
  carrito.innerHTML = "";
  localStorage.removeItem("carrito");
  agregarAlerta("center", "success", "Tu compra ha sido exitosa!", false, 1500);
  setTimeout(() => {
    window.location.reload();
  }, 1500);
}

let mostrarCarrito = document.getElementById("showCarrito");
mostrarCarrito.addEventListener("click", toggleCarrito);

let cierreCarrito = document.getElementById("cierreCarrito");
cierreCarrito.addEventListener("click", toggleCarrito);

function toggleCarrito() {
  let carrito = document.getElementById("carrito");
  carrito.classList.toggle("ocultarCarrito");
}

let mostrarBurgerMenu = document.getElementById("mostrarBurgerMenu");
mostrarBurgerMenu.addEventListener("click", toggleBurgerMenu);

let cierreBurgerMenu = document.getElementById("cerrarMenuBurger");
cierreBurgerMenu.addEventListener("click", toggleBurgerMenu);

function toggleBurgerMenu() {
  let cierreBurgerMenu = document.getElementById("burgerMenu");
  cierreBurgerMenu.classList.toggle("ocultarCarrito");
  cierreBurgerMenu.classList.toggle("contenedor-burger-menu");
}

function lanzarTostada(text, gravity, position, estilo) {
  Toastify({
    text,
    className: "info",
    style: {
      background: "linear-gradient(to right, #441b98, #fbe9fb)",
    },
    gravity,
    position,
  }).showToast();
}

function agregarAlerta(position, icon, title, showConfirmButton, timer) {
  Swal.fire({
    position,
    icon,
    title,
    showConfirmButton,
    timer,
  });
}
