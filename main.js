const $nombreProducto = document.querySelector('#nombreProducto')
const $precioProducto = document.querySelector('#precioProducto')
const $stockProducto = document.querySelector('#stockProducto')
const $botonAgregar = document.querySelector('#agregarProducto')
const $contenedorStock = document.querySelector('.stock')
const $modal = document.getElementById('ventanaModal');
const $closeModal = document.getElementById('cerrarModal');
const $buscadorInput = document.querySelector('#buscador')


const Compras = function compras(nombre, precio, stock) {
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
}
let producto1 = new Compras('guitarra', 200000, 14)
let producto2 = new Compras('piano', 183000, 2)
let producto3 = new Compras('violin', 59000, 4)
let producto4 = new Compras('bateria', 262000, 8)
let producto5 = new Compras('flauta', 9000, 10)
let producto6 = new Compras('tambor', 8000, 9)

let lista = [producto1, producto2, producto3, producto4, producto5, producto6]

function card() {
    $contenedorStock.innerHTML = "";
    lista.forEach(producto => {
        let cardProducto = document.createElement('DIV')
        cardProducto.classList.add('contenedorStock')
        cardProducto.innerHTML = `
        <div class="titulo">
            <h2 class="tituloProductos">Producto en stock</h2>
        </div>
        <p class="nombreProductoStock">NOMBRE DEL PRODUCTO: <span class="span"> ${producto.nombre.toUpperCase()} </span></p>
        <p class="precioProductoStock">PRECIO DEL PRODUCTO:  <span class="span">  $${producto.precio} </span></p>
        <p class="stockDisponible">STOCK DEL PRODUCTO: <span class="span"> ${producto.stock} </span></p>`
        $contenedorStock.append(cardProducto)
    });
}
card()

productoAgregado()
function productoAgregado() {


    datosProductos()

    let nombreProducto = "";
    let precioProducto = "";
    let stockProducto = "";


    function datosProductos() {

        $nombreProducto.addEventListener('keyup', (e) => {
            nombreProducto = e.target.value
        })

        $precioProducto.addEventListener('keyup', (e) => {
            precioProducto = e.target.value
        })

        $stockProducto.addEventListener('keyup', (e) => {
            stockProducto = e.target.value
        })

    }

    $botonAgregar.addEventListener('click', () => {
        const nombreProducto = $nombreProducto.value.trim();
        const precioProducto = $precioProducto.value.trim();
        const stockProducto = $stockProducto.value.trim();

        if (nombreProducto === "" || precioProducto === "" || stockProducto === "") {
            alert('Por favor, complete todos los campos antes de agregar el producto.');
            return;
        }

        if (isNaN(parseFloat(precioProducto)) || isNaN(parseInt(stockProducto))) {
            alert('Los datos son inválidos. El precio y el stock deben ser números válidos.');
            $nombreProducto.value = '';
            $precioProducto.value = '';
            $stockProducto.value = '';
            $modalExistente.style.display = 'block';
            return;
        }


        const productoExistente = lista.find(producto => producto.nombre.toLowerCase() === nombreProducto.toLowerCase());

        if (productoExistente) {
            alert(`${nombreProducto} ya cuenta con stock.`);
            $nombreProducto.value = '';
            $precioProducto.value = '';
            $stockProducto.value = '';
            return;
        }

        const producto = new Compras(nombreProducto, parseFloat(precioProducto), parseInt(stockProducto));
        lista.unshift(producto);
        guardarEnLocalStorage();
        card();
        $nombreProducto.value = '';
        $precioProducto.value = '';
        $stockProducto.value = '';
        $modal.style.display = 'block';
    })

    $closeModal.addEventListener('click', () => {
        $modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === $modal) {
            $modal.style.display = 'none';
        }
    });

}

let inputBuscadorLupa = '';

$buscadorInput.addEventListener('keyup', (e) => {
    inputBuscadorLupa = e.target.value.toLowerCase();
    filtrarProductos(inputBuscadorLupa);
});

function filtrarProductos(filtro) {
    const productosFiltrados = lista.filter(producto => producto.nombre.toLowerCase().includes(filtro));

    $contenedorStock.innerHTML = '';

    if (productosFiltrados.length === 0) {
        const noCoincidencias = document.createElement('h2');
        noCoincidencias.classList.add('noSeEncontro')
        noCoincidencias.textContent = 'No encontramos el producto, agregalo a nuestro stock!';
        $contenedorStock.appendChild(noCoincidencias);
    } else {
        productosFiltrados.forEach(producto => {
            let cardProducto = document.createElement('DIV');
            cardProducto.classList.add('contenedorStock');
            cardProducto.innerHTML = `
            <div class="titulo">
                <h2 class="tituloProductos">Producto en Stock</h2>
            </div>
            <p class="nombreProductoStock">NOMBRE DEL PRODUCTO: <span class="span">${producto.nombre.toUpperCase()}</span></p>
            <p class="precioProductoStock">PRECIO DEL PRODUCTO:  <span class="span">$${producto.precio}</span></p>
            <p class="stockDisponible">STOCK DEL PRODUCTO: <span class="span">${producto.stock}</span></p>`;

            $contenedorStock.appendChild(cardProducto);
        });
    }
}

function guardarEnLocalStorage() {
    const productosJSON = JSON.stringify(lista);
    localStorage.setItem('productos', productosJSON);
}
function cargarDesdeLocalStorage() {
    const productosJSON = localStorage.getItem('productos');

    if (productosJSON) {
        lista = JSON.parse(productosJSON);
        card();
    }
}
window.addEventListener('load', () => {
    cargarDesdeLocalStorage();
});
