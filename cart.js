const titulo = document.getElementById("titulo")

titulo.addEventListener("mouseenter", ()=>{
    titulo.innerText="Los numero 1 en sneakers"
})

titulo.addEventListener("mouseleave", ()=>{
    titulo.innerText="Tu distribuidor de zapatillas!"
})

let productosEnCarrito = localStorage.getItem("productosdelcarrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const btnVaciar = document.querySelector(".btnVaciar")
const btnComprar = document.querySelector(".Comprar")
const total = document.querySelector("#total")
const contenedorCarritoProductos = document.querySelector('.contenedorCarritoProductos');
let botonesEliminar = document.querySelectorAll(".buttonDelete")

function cargarProductosCarrito(){


    contenedorCarritoProductos.innerHTML=""

    productosEnCarrito.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add()
        div.innerHTML= `
        <div class="row shoppingCartItem">
              <div class="col-6">
                  <div class="shopping-cart-item d-flex justify-content-center align-items-center border-bottom pb-2 pt-3">
                      <img src=${producto.img} class="shopping-cart-image">
                      <h6 class="ml-3 mb-0">${producto.nombre}</h6>
                  </div>
              </div>
              <div class="col-2">
                  <div class="d-flex align-items-center  border-bottom pb-2 pt-3 fs-2 justify-content-center">
                      <p class="mb-0">${producto.precio}$</p>
                  </div>
              </div>
              <div class="col-4">
                  <div class="d-flex justify-content-between align-items-center border-bottom mr-5 p-3">
                      <p>${producto.talle}</p>
                      <button class="btn btn-danger buttonDelete" type="button" id="${producto.id}"><i class="bi bi-trash"></i></button>
                  </div>
              </div>
          </div>`
       
          contenedorCarritoProductos.append(div)
    });
    actualizarBotonesEliminar()
    actualizarTotal()
}

cargarProductosCarrito();


function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".buttonDelete")
 
    botonesEliminar.forEach(botones => {
     botones.addEventListener("click", eliminarDelCarrito)
    });
 };

 function eliminarDelCarrito(e){

    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton)

    productosEnCarrito.splice(index,1)

    cargarProductosCarrito()

    localStorage.setItem("productosdelcarrito", JSON.stringify(productosEnCarrito));
 }



btnVaciar.addEventListener("click", VaciarCart)
function VaciarCart (){

productosEnCarrito.length = 0;
localStorage.setItem("productosdelcarrito", JSON.stringify(productosEnCarrito));
cargarProductosCarrito()
vaciadoConExito()
}

function actualizarTotal(){
    total.innerText = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio),0)
}

btnComprar.addEventListener('click', () => {
    productosEnCarrito.length = 0;
    localStorage.setItem("productosdelcarrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito()
    graciasporlacompra ()
})

let turu = document.querySelector(".turu")

function graciasporlacompra (){
    Swal.fire(
        'Tu compra se ha realizado con exito',
        'Muchisimas gracias por comprar!',
        'success'
      )
}

function vaciadoConExito(){
    Swal.fire(
        'Tu carrito se ha vaciado',
        'Ve al inicio para seguir comprando',
        'error'
      )
}