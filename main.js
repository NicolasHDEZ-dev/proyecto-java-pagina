
const titulo = document.getElementById("titulo")

titulo.addEventListener("mouseenter", ()=>{
    titulo.innerText="Los numero 1 en sneakers"
})

titulo.addEventListener("mouseleave", ()=>{
    titulo.innerText="Tu distribuidor de zapatillas!"
})

const mail = document.getElementById("mail")
const clave = document.getElementById("clave")
const form = document.getElementById("form")
const parrafo = document.getElementById("warnings")
const btnSubmit = document.getElementById("btnSubmit")
let BotonesComprar = document.querySelectorAll(".agregaralcarrito")

form.addEventListener('submit', e=>{
    e.preventDefault()
    let warnings = ""
    let entrar = false
    let regexemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
    parrafo.innerHTML=""
    if(!regexemail.test(mail.value)){
        warnings += `El email no es valido <br>`
        entrar =  true
    }
    if(clave.value.length<5 ){
        warnings += `La clave no es valida <br>`
        entrar = true
    }
    entrar ? parrafo.innerHTML = warnings : parrafo.innerHTML = "Enviado";
})

function guardar(valor){
    let user = {email: mail.value, clave: clave.value};
    valor === "localStorage" && localStorage.setItem("item", JSON.stringify(user));
    {return user}
}

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    guardar("localStorage")
})

const stockNike = ["Nike Uptempo", "Nike Airmax 1"]
const stockJordan = ["Jordan 1 Fragment", "Jordan 1 Black Toe", "Jordan 11 Concord", "Jordan 4 Bred"]
const stockTotal = [...stockNike, ...stockJordan]

const tarjetas = document.querySelector(".tarjetas")

const renderCards = (arr) => {
    let html ;
    for(const item of arr){
        const {id, nombre,img,precio,talle} = item;

        html = `<div class="col-12 col-md-6">
        <div class="item shadow mb-4">
            <h3 class="item-title text-center">${nombre}</h3>
            <img class="imagen" src="${img}">

            <div class="item-details ">
                <h4 class="item-price">${precio}$</h4>
                <h4 class="item-price">Talle ${talle}</h4>
                
            </div>
            <div class=" text-center">
            <button class="btn btn-danger agregaralcarrito btnAdd" id=${id}>AÑADIR AL CARRITO</button>
            </div>
        </div>
    </div>`;

    tarjetas.innerHTML += html;

    const itemEnCarrito = productosEnCarrito.find(zapa => zapa.id === id); // esto es nuevo
    if(itemEnCarrito) { 
        document.getElementById(id).classList.add("disabled")
        document.getElementById(id).innerText = "EN EL CARRITO"
    }
    actualizarBotonesComprar();
}       
}      
        
    



fetch("./data/data.json")
.then(res=>res.json())
.then(data=>{
    productos = data;
    renderCards(productos)
})

function actualizarBotonesComprar() {
   BotonesComprar = document.querySelectorAll(".agregaralcarrito")

   BotonesComprar.forEach(botones => {
    botones.addEventListener("click", ()=>{
        botones.innerText = "EN EL CARRITO"
        botones.classList.add("disabled")
    })
    botones.addEventListener("click", agregarAlCarrito)
   });
};

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productosdelcarrito")

if(productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
} else {
 productosEnCarrito = [];
}

function agregarAlCarrito (e){
const idBoton = e.currentTarget.id

const productoAgregado = productos.find(item => item.id === idBoton)
productosEnCarrito.push(productoAgregado)


localStorage.setItem("productosdelcarrito", JSON.stringify(productosEnCarrito))
}

if(productosEnCarritoLS === productosEnCarritoLS){
    actualizarBotonesComprar()
}


