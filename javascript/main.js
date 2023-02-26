        //     Funciones    //


       

// Función para saber la cantidad del producto en el carrito //

function cantidadDeProducto(producto) {


    let cantidad = 0

    const cantidadDeProducto = carrito.find((productoCarrito) => productoCarrito.nombre === producto);

    if (cantidadDeProducto !== undefined) {

        cantidad = cantidadDeProducto.cantidad;
    }
    return cantidad;
}


// Funciones de LocalStorage //

function agregarCarritoAlLS() {

    localStorage.setItem("carrito", JSON.stringify(carrito))


}

function carritoDelLS() {

    let carrito = []
    const carritoLS = localStorage.getItem("carrito")

    if (carritoLS !== null) {

        carrito = JSON.parse(carritoLS)

    }

    return carrito
}



// Función de Renderizar el carrito //

function renderizarCarrito() {

    tbodyCarrito.innerHTML = "";


    for (const productoCarrito of carrito) {




        const tr = document.createElement("tr")
        tbodyCarrito.append(tr)

        const tdNombre = document.createElement("td")
        tdNombre.innerHTML = `${productoCarrito.nombre}`

        const tdPrecio = document.createElement("td")
        tdPrecio.innerHTML = `${productoCarrito.precio}`

        const tdCantidad = document.createElement("td")
        tdCantidad.innerHTML = `${productoCarrito.cantidad}`

        tr.append(tdNombre, tdPrecio, tdCantidad)

        if (productoCarrito.cantidad <= 0) {

            tr.innerHTML = ""
        }

    }

    totalAPagar();

}





// Función de agregar al carrito //

function agregarAlCarrito(producto, cantidad) {



    const productoExisteEnElCarrito = carrito.findIndex((productoCarrito) => {
        return producto.nombre === productoCarrito.nombre;

    })

    if (productoExisteEnElCarrito === -1) {

        carrito.push({
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: cantidad,



        })
    }

    else {
        carrito[productoExisteEnElCarrito].cantidad = cantidad;
    }

    renderizarCarrito();
    agregarCarritoAlLS();



}



// Función del Renderizado de productos //

function renderizarProductos(productos) {

    seccionProductos.innerHTML = "";


    for (const producto of productos) {

        const div = document.createElement("div");
        seccionProductos.append(div)
        div.className = "tarjeta"

        const img = document.createElement("img")
        img.src = `${producto.img}`;
        img.className = "imagen"

        const h2 = document.createElement("h2")
        h2.innerHTML = `${producto.nombre}`

        const p = document.createElement("p")
        p.innerHTML = `$${producto.precio}`

        const inputAgregarAlCarrito = document.createElement("input")
        inputAgregarAlCarrito.type = "number",
            inputAgregarAlCarrito.value = cantidadDeProducto(producto.nombre),

            inputAgregarAlCarrito.addEventListener("change", () => {

                const cantidad = inputAgregarAlCarrito.value;

                if (inputAgregarAlCarrito.value > cantidadDeProducto(producto.nombre)) {

                    alertaSeAgregoAlCarrito()

                } else if (inputAgregarAlCarrito.value < cantidadDeProducto(producto.nombre) && inputAgregarAlCarrito.value >= 0) {

                    alertaSeQuitoDelCarrito()

                }


                if (cantidad >= 0) {

                    agregarAlCarrito(producto, cantidad)

                }
            })

        div.append(img, h2, p, inputAgregarAlCarrito)



    }

}

// Función de cálculo y renderizado del total del carrito //

function totalAPagar() {


    const total = carrito.reduce((acc, productoCarrito) => {

        return acc + (productoCarrito.precio * productoCarrito.cantidad)

    }, 0
    )

    const pTotal = document.getElementById("totalAPagar");

    if (total > 0) {
        pTotal.innerHTML = `$${total}`
    }
    else {

        pTotal.innerHTML = "";
    }

}

// Función de filtro por precios //

function filtrarPrecios(responseProductos) {

    filtroPrecio.addEventListener("change", () => {

        console.log(filtroPrecio.value)

        if (filtroPrecio.value === "mayorPrecio") {

            const precioMayor = responseProductos.sort((a, b) => b.precio - a.precio);

            renderizarProductos(precioMayor)


        }
        else if (filtroPrecio.value === "menorPrecio") {


            const precioMenor = responseProductos.sort((b, a) => b.precio - a.precio);

            renderizarProductos(precioMenor)
        }

    })
}


// Función de filtro de busqueda //

function buscarProducto(responseProductos) {



    inputBuscarProducto.addEventListener("input", () => {

        console.log(inputBuscarProducto.value)



        const productoBuscado = responseProductos.filter((el) => el.nombre.toLowerCase().includes(inputBuscarProducto.value.toLowerCase()))

        renderizarProductos(productoBuscado)



    }

    )

}


// Función de filtro por categoria del producto //


function filtrarPorCategoria(responseProductos) {

    inputFiltrarCategorias.addEventListener("change", () => {


        console.log(inputFiltrarCategorias.value)

        if (inputFiltrarCategorias.value == "monitores") {


          const  monitores = responseProductos.filter((el) => el.nombre.toLowerCase().includes("monitor"))



            renderizarProductos(monitores)
            filtrarPrecios(monitores)


        } else if (inputFiltrarCategorias.value == "televisores") {

            const televisores = responseProductos.filter((el) => el.nombre.toLowerCase().includes("tv"))

            renderizarProductos(televisores)
            filtrarPrecios(televisores)
        }

        else if (inputFiltrarCategorias.value == "mostrarTodo") {


            renderizarProductos(responseProductos)
            filtrarPrecios(responseProductos)
        }


    })



}




// Funciones de alerta para el carrito con Libreria //

function alertaSeQuitoDelCarrito() {


    Toastify({
        text: "Carrito -1 productos",
        duration: 2000,
        gravity: "bottom", 
        position: "right", 
        stopOnFocus: true, 
        style: {
            background: "linear-gradient(to right, sky blue)",
        },
    }).showToast();
}




function alertaSeAgregoAlCarrito() {


    Toastify({
        text: "Carrito +1 productos",
        duration: 2000,
        gravity: "bottom", 
        position: "right", 
        stopOnFocus: true, 
        style: {
            background: "linear-gradient(to right, sky blue)",
        },
    }).showToast();
}



// Variables //


const seccionProductos = document.getElementById("productos")
const tbodyCarrito = document.getElementById("tbodyCarrito")
const filtroPrecio = document.getElementById("selectFiltroPrecio")
const inputBuscarProducto = document.getElementById("inputBuscarProducto")
const inputFiltrarCategorias = document.getElementById("categorias")

const carrito = carritoDelLS();


/*  Inicio del programa */


//    Buscar productos en json    //

const responseProductos=[
    {
        "img": "https://http2.mlstatic.com/D_NQ_NP_722118-MLA51804662145_102022-W.webp",
        "nombre": "Monitor lcd",
        "precio": 60000
    },
    {
        "img": "https://http2.mlstatic.com/D_NQ_NP_973781-MLA48131216539_112021-W.webp",
        "nombre": "Monitor led",
        "precio": 80000
    },
    {
        "img": "https://http2.mlstatic.com/D_NQ_NP_845070-MLA46623210425_072021-W.webp",
        "nombre": "Monitor ips",
        "precio": 100000
    },
    {
        "img": "https://http2.mlstatic.com/D_NQ_NP_787221-MLA48007684849_102021-V.webp",
        "nombre": "Tv 4k",
        "precio": 120000
    },
    {
        "img": "https://http2.mlstatic.com/D_NQ_NP_680256-MLA51838363332_102022-V.webp",
        "nombre": "Tv FullHd",
        "precio": 50000
    }
]


// fetch("/json/productos.json")
//     .then((response) => {
//         return (response.json());
//     })
//     .then((responseProductos) => {
//         console.log(responseProductos)


        renderizarProductos(responseProductos)
        filtrarPorCategoria(responseProductos)
        filtrarPrecios(responseProductos)
        buscarProducto(responseProductos)

    // }
    // )

renderizarCarrito();

