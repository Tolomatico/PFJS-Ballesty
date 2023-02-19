//     Funciones    //



function cantidadDeProducto(producto) {


    let cantidad = 0

    const cantidadDeProducto = carrito.find((productoCarrito) => productoCarrito.nombre === producto);

    if (cantidadDeProducto !== undefined) {

        cantidad = cantidadDeProducto.cantidad;
    }
    return cantidad;
}




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

                if (cantidad >= 0) {


                    agregarAlCarrito(producto, cantidad)

                }
            })

        div.append(img, h2, p, inputAgregarAlCarrito)






    }

}

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

function filtrarPrecios(responseProductos){

    filtroPrecio.addEventListener("change", () => {
    
        console.log(filtroPrecio.value)
    
        if (filtroPrecio.value === "mayorPrecio") {
    
            const precioMayor = responseProductos.sort((a, b) => b.precio - a.precio);
    
            renderizarProductos(precioMayor)
    
    
        }
        else if(filtroPrecio.value === "menorPrecio"){
    
    
            const precioMenor = responseProductos.sort((b, a) => b.precio - a.precio);
    
            renderizarProductos(precioMenor)
        }
    
    })}

    function buscarProducto(responseProductos){

      

        inputBuscarProducto.addEventListener("input",()=>{

            console.log(inputBuscarProducto.value)
        
        

       const productoBuscado=responseProductos.filter((el)=>el.nombre.toLowerCase().includes(inputBuscarProducto.value))
        
       renderizarProductos(productoBuscado)


        
        }
        
        )
        
        }


        function filtrarPorCategoria(responseProductos){

            inputFiltrarCategorias.addEventListener("change",()=>{


            console.log(inputFiltrarCategorias.value)

            if(inputFiltrarCategorias.value == "monitores"){

             
          const monitores=responseProductos.filter((el)=>el.nombre.toLowerCase().includes("monitor"))

           renderizarProductos(monitores)


            }else if (inputFiltrarCategorias.value == "televisores"){

                const televisores=responseProductos.filter((el)=>el.nombre.toLowerCase().includes("tv"))

                renderizarProductos(televisores)

            }

            else if(inputFiltrarCategorias.value == "mostrarTodo"){


                renderizarProductos(responseProductos)
            }


        })

        }


        function libreriaParaAlertaCarrito(){}
        




const seccionProductos = document.getElementById("productos")
const tbodyCarrito = document.getElementById("tbodyCarrito")
const filtroPrecio = document.getElementById("selectFiltroPrecio")
const inputBuscarProducto=document.getElementById("inputBuscarProducto")
const inputFiltrarCategorias=document.getElementById("categorias")

const carrito = carritoDelLS();


/*  Inicio del programa */


//    Buscar productos en json    //

fetch("json/productos.json")
    .then((response) => {
        return (response.json());
    })
    .then((responseProductos) => {

        renderizarProductos(responseProductos)


        filtrarPrecios(responseProductos)
        buscarProducto(responseProductos)
        filtrarPorCategoria(responseProductos)
    }
    )

renderizarCarrito();

