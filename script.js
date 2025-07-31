// Datos de los productos
const productos = [
    {
        id: 1,
        nombre: "Proteína Whey MGP",
        precio: 45990,
        precioFormateado: "$45.990",
        imagen: "images/wheyprotein.webp",
        descripcion: "Proteína de suero ultra refinada. Básicamente músculo en polvo.",
        ingredientes: "Suero de leche, aminoácidos, saborizante de 'ganás o ganás'.",
        beneficios: "Aumenta masa muscular, acelera recuperación, te hace ver como si supieras lo que hacés en el gym."
    },
    {
        id: 2,
        nombre: "Creatina Monohidrato",
        precio: 28990,
        precioFormateado: "$28.990",
        imagen: "images/creatina.webp",
        descripcion: "El polvo blanco legal más poderoso del mercado.",
        ingredientes: "Creatina monohidrato pura, sin cortes ni cuentos.",
        beneficios: "Aumenta fuerza, potencia y la frecuencia con la que te preguntan si te ciclaste."
    },
    {
        id: 3,
        nombre: "BCAA Premium",
        precio: 32990,
        precioFormateado: "$32.990",
        imagen: "images/bcaa.jpeg",
        descripcion: "Aminoácidos esenciales para cuando querés seguir vivo después de pierna.",
        ingredientes: "Leucina, Isoleucina, Valina, sabor a victoria.",
        beneficios: "Mejora recuperación, evita catabolismo y le da sentido a hacer cardio (más o menos)."
    },
    {
        id: 4,
        nombre: "Omega 3 Ultra",
        precio: 24990,
        precioFormateado: "$24.990",
        imagen: "images/omega3.webp",
        descripcion: "Grasa buena que no te hace sentir culpable. Ni siquiera un poco.",
        ingredientes: "Aceite de pescado salvaje, vitamina E, cápsulas de gelatina.",
        beneficios: "Mejora el corazón, el cerebro y la excusa para decir que comés pescado sin comer pescado."
    },
    {
        id: 5,
        nombre: "Multivitamínico MGP",
        precio: 19990,
        precioFormateado: "$19.990",
        imagen: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop&crop=center",
        descripcion: "Todas las vitaminas que no tenés por comer fideos con ketchup.",
        ingredientes: "Vitaminas A-Z, minerales esenciales y un poco de remordimiento.",
        beneficios: "Apoya el sistema inmunológico, mejora la energía y te hace sentir que comés saludable aunque cenes pan con mate."
    },
    {
        id: 6,
        nombre: "Pre-Entreno Boost",
        precio: 39990,
        precioFormateado: "$39.990",
        imagen: "images/preentreno.png",
        descripcion: "El diablo líquido. Vas a querer pelearle al aire.",
        ingredientes: "Cafeína, beta-alanina, motivación artificial.",
        beneficios: "Explosión de energía, foco total y sudor hasta en la sombra."
    },
    {
        id: 7,
        nombre: "Glutamina Pura",
        precio: 26990,
        precioFormateado: "$26.990",
        imagen: "images/glutamina.webp",
        descripcion: "El santo grial de la recuperación. O al menos eso dicen los que la venden.",
        ingredientes: "Glutamina 100% micronizada.",
        beneficios: "Mejora la recuperación muscular, apoya el sistema inmune y te hace sentir pro aunque no sepas para qué sirve."
    },
    {
        id: 8,
        nombre: "Magnesio",
        precio: 42990,
        precioFormateado: "$42.990",
        imagen: "images/magnesio.jpeg",
        descripcion: "El suplemento que evita que te conviertas en una piedra contracturada.",
        ingredientes: "Citrato de magnesio, cápsula vegetal, y esperanza.",
        beneficios: "Reduce calambres, mejora sueño y relaja más que 3 capítulos de Bob Esponja."
    }
];


// Número de WhatsApp (cambiar por el número real)
const numeroWhatsApp = "5491169135436"; // Formato: código país + número sin +

// Estado del carrito
let carrito = [];


// Elementos del DOM
let cartModal, cartOverlay, cartBody, cartCount, cartTotal, cartFooter, emptyCart;

// Inicializar elementos del DOM
function inicializarElementosDOM() {
    cartModal = document.getElementById('cart-modal');
    cartOverlay = document.getElementById('cart-overlay');
    cartBody = document.getElementById('cart-body');
    cartCount = document.getElementById('cart-count');
    cartTotal = document.getElementById('cart-total');
    cartFooter = document.getElementById('cart-footer');
    emptyCart = document.getElementById('empty-cart');
}

// Función para formatear precio
function formatearPrecio(precio) {
    return `$${precio.toLocaleString('es-CL')}`;
}

// Función para agregar producto al carrito
function agregarAlCarrito(productId) {
    const producto = productos.find(p => p.id === productId);
    if (!producto) return;

    const itemExistente = carrito.find(item => item.id === productId);

    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }

    actualizarCarrito();
    mostrarNotificacion(`${producto.nombre} agregado al carrito`);
}

// Función para remover producto del carrito
function removerDelCarrito(productId) {
    carrito = carrito.filter(item => item.id !== productId);
    actualizarCarrito();
}

// Función para cambiar cantidad
function cambiarCantidad(productId, nuevaCantidad) {
    const item = carrito.find(item => item.id === productId);
    if (item) {
        if (nuevaCantidad <= 0) {
            removerDelCarrito(productId);
        } else {
            item.cantidad = nuevaCantidad;
            actualizarCarrito();
        }
    }
}

// Función para calcular total del carrito
function calcularTotal() {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
}

// Función para contar items del carrito
function contarItems() {
    return carrito.reduce((total, item) => total + item.cantidad, 0);
}

// Función para actualizar UI del carrito
function actualizarCarrito() {
    const totalItems = contarItems();
    const totalPrecio = calcularTotal();

    cartCount.textContent = totalItems;
    cartTotal.textContent = formatearPrecio(totalPrecio);

    if (carrito.length === 0) {
        emptyCart.style.display = 'block';
        cartFooter.style.display = 'none';
        cartBody.innerHTML = '<div class="empty-cart"><p>Tu carrito está vacío</p><span>¡Agrega algunos productos!</span></div>';
    } else {
        emptyCart.style.display = 'none';
        cartFooter.style.display = 'block';
        renderizarItemsCarrito();
    }

    // 👉 Guardar en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
}


// Función para renderizar items del carrito
function renderizarItemsCarrito() {
    const itemsHTML = carrito.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <img src="${item.imagen}" alt="${item.nombre}" class="cart-item-image">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.nombre}</div>
                <div class="cart-item-price">${item.precioFormateado}</div>
            </div>
            <div class="cart-item-controls">
                <button class="quantity-btn" onclick="cambiarCantidad(${item.id}, ${item.cantidad - 1})" ${item.cantidad <= 1 ? 'disabled' : ''}>-</button>
                <span class="quantity-display">${item.cantidad}</span>
                <button class="quantity-btn" onclick="cambiarCantidad(${item.id}, ${item.cantidad + 1})">+</button>
                <button class="remove-item" onclick="removerDelCarrito(${item.id})">🗑️</button>
            </div>
        </div>
    `).join('');

    cartBody.innerHTML = itemsHTML;
}

// Función para generar mensaje de WhatsApp del carrito
function generarMensajeCarrito() {
    if (carrito.length === 0) return '';

    let mensaje = '¡Hola! Me gustaría hacer el siguiente pedido:\n\n';

    carrito.forEach(item => {
        mensaje += `• ${item.nombre} x${item.cantidad} - ${formatearPrecio(item.precio * item.cantidad)}\n`;
    });

    mensaje += `\n*Total: ${formatearPrecio(calcularTotal())}*\n\n`;
    mensaje += '¿Podrían confirmar disponibilidad y método de entrega?';

    return encodeURIComponent(mensaje);
}

// Función para realizar checkout
function realizarCheckout() {
    if (carrito.length === 0) {
        mostrarNotificacion('Tu carrito está vacío');
        return;
    }

    const mensaje = generarMensajeCarrito();
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;

    window.open(urlWhatsApp, '_blank');

    // Opcional: limpiar carrito después del checkout
    // carrito = [];
    // actualizarCarrito();
    // cerrarCarrito();
}

// Funciones para manejar el modal del carrito
function abrirCarrito() {
    cartModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function cerrarCarrito() {
    cartModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Función para mostrar notificaciones
function mostrarNotificacion(mensaje) {
    const notificacion = document.createElement('div');
    notificacion.className = 'notificacion';
    notificacion.textContent = mensaje;
    notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--azul-jmf);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        z-index: 10000;
        font-weight: 600;
        box-shadow: 0 4px 20px rgba(15, 29, 255, 0.3);
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notificacion);

    setTimeout(() => {
        notificacion.remove();
    }, 3000);
}

// Función para crear una tarjeta de producto
function crearTarjetaProducto(producto) {
    return `
        <div class="product-card" data-id="${producto.id}">
            <a href="producto.html?id=${producto.id}">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="product-image" loading="lazy">
            </a>
            <div class="product-info">
                <h3 class="product-name">
                    <a href="producto.html?id=${producto.id}" style="text-decoration: none; color: inherit;">
                        ${producto.nombre}
                    </a>
                </h3>
                <div class="product-price">${producto.precioFormateado}</div>
                <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;">
                    <button class="add-to-cart-btn" onclick="agregarAlCarrito(${producto.id})">
                        🛒 Agregar
                    </button>
                    <a href="https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(`¡Hola! Me interesa el producto *${producto.nombre}* con precio ${producto.precioFormateado}. ¿Podrías darme más información?`)}" target="_blank" class="whatsapp-btn">
                        📱 WhatsApp
                    </a>
                </div>
            </div>
        </div>
    `;
}


// Función para cargar todos los productos
function cargarProductos() {
    const grid = document.getElementById('products-grid');

    // Mostrar loading
    grid.innerHTML = '<div class="loading">Cargando productos...</div>';

    // Simular una pequeña carga (opcional)
    setTimeout(() => {
        // Generar HTML para todos los productos
        const productosHTML = productos.map(producto => crearTarjetaProducto(producto)).join('');

        // Insertar en el DOM
        grid.innerHTML = productosHTML;

        // Agregar animación de entrada
        const tarjetas = grid.querySelectorAll('.product-card');
        tarjetas.forEach((tarjeta, index) => {
            tarjeta.style.opacity = '0';
            tarjeta.style.transform = 'translateY(20px)';

            setTimeout(() => {
                tarjeta.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                tarjeta.style.opacity = '1';
                tarjeta.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 500);
}

// Función para manejar errores de imágenes
function manejarErrorImagen(img) {
    img.src = 'https://via.placeholder.com/400x400/0f1dff/FFFFFF?text=JMF+Producto';
    img.alt = 'Imagen no disponible';
}

// Event Listeners
function configurarEventListeners() {
    // Botón del carrito
    document.getElementById('cart-btn').addEventListener('click', abrirCarrito);

    // Cerrar carrito
    document.getElementById('close-cart').addEventListener('click', cerrarCarrito);
    cartOverlay.addEventListener('click', cerrarCarrito);

    // Checkout
    document.getElementById('checkout-btn').addEventListener('click', realizarCheckout);

    // Cerrar carrito con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cartModal.classList.contains('active')) {
            cerrarCarrito();
        }
    });

    // Prevenir cierre al hacer click dentro del modal
    document.querySelector('.cart-content').addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    inicializarElementosDOM();
    // 👉 Cargar carrito desde localStorage al iniciar
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }

    configurarEventListeners();
    // Only load products on index.html
    if (document.getElementById('products-grid')) {
        cargarProductos();
    }
    actualizarCarrito();

    // Agregar listener para errores de imágenes
    document.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG') {
            manejarErrorImagen(e.target);
        }
    }, true);

    // Agregar estilos CSS para animaciones
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        .notificacion {
            animation: slideInRight 0.3s ease !important;
        }
    `;
    document.head.appendChild(style);
});

// Función para efectos adicionales
function efectosAdicionales() {
    // Efecto de parallax suave en el hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Animación del contador del carrito
    function animarContador() {
        const contador = document.getElementById('cart-count');
        contador.style.transform = 'scale(1.2)';
        setTimeout(() => {
            contador.style.transform = 'scale(1)';
        }, 200);
    }

    // Observar cambios en el contador
    const observer = new MutationObserver(animarContador);
    observer.observe(cartCount, { childList: true, characterData: true, subtree: true });
}

// Funciones de utilidad para administración
function cambiarNumeroWhatsApp(nuevoNumero) {
    numeroWhatsApp = nuevoNumero;
    cargarProductos(); // Recargar productos con el nuevo número
}

function vaciarCarrito() {
    carrito = [];
    localStorage.removeItem('carrito');
    actualizarCarrito();
    mostrarNotificacion('Carrito vaciado');
}

function obtenerEstadisticasCarrito() {
    return {
        totalItems: contarItems(),
        totalPrecio: calcularTotal(),
        productos: carrito.map(item => ({
            nombre: item.nombre,
            cantidad: item.cantidad,
            subtotal: item.precio * item.cantidad
        }))
    };
}

// Inicializar efectos adicionales
document.addEventListener('DOMContentLoaded', efectosAdicionales);