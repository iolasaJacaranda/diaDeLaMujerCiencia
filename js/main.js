// Función retardo
function retardo(segundos) {
    return new Promise(resolve => setTimeout(resolve, segundos * 1000));
}

// Función que baraja las cartas
function barajarCartas(cartas) {
    const cartasBarajadas = [];
    const cartasOriginales = [...cartas]; // Hacer una copia del array original

    while (cartasOriginales.length > 0) {
        // Seleccionar un índice al azar
        const randomIndex = Math.floor(Math.random() * cartasOriginales.length);
        // Extraer la carta de ese índice
        const cartaSeleccionada = cartasOriginales.splice(randomIndex, 1)[0];
        // Añadir la carta al nuevo array barajado
        cartasBarajadas.push(cartaSeleccionada);
    }

    return cartasBarajadas;
}

// Variables globales del juego
let cartasHaciaArriba = [];
let cartasEmparejadas = 0;
let cartasBarajadas = [];

// Función externa para manejar el clic en una carta
async function jugada(event) {
	// Obtenemos la carta sobre la que hemos hecho clic
    const cartaIndividual = event.currentTarget;

	// Permitimos dar la vuelta a un máximo de 2 cartas
    if (cartasHaciaArriba.length < 2) {
        // Cambiamos el fondo para mostrar la carta
        const card = cartaIndividual.dataset.card;
        cartaIndividual.style.backgroundImage = `url(${card})`;

        // Añadimos la carta al array de cartas levantadas
        cartasHaciaArriba.push(cartaIndividual);

        // Comprobamos si ya hemos levantado dos cartas
        if (cartasHaciaArriba.length === 2) {
            const [primeraCarta, segundaCarta] = cartasHaciaArriba;

            if (primeraCarta.dataset.card === segundaCarta.dataset.card) {
                cartasEmparejadas += 2;
                cartasHaciaArriba = [];

                // Comprobar si el juego ha terminado
                if (cartasEmparejadas === cartasBarajadas.length) {
                    
                }
            } else {
                // Voltear las cartas después de un momento
                await retardo(1);
                primeraCarta.style.backgroundImage = '';
                segundaCarta.style.backgroundImage = '';
                cartasHaciaArriba = [];
            }
        }
    }
}

// Función que inicia y gestiona el juego
async function grid() {
	// Limpia el contenedor del juego
    const cartasContainer = document.getElementById("mostrar_cartas");
    cartasContainer.innerHTML = ""; // Limpia las cartas existentes

    

    // Duplicar y barajar las cartas
    const cartasDuplicadas = cartas.concat(cartas);
    cartasBarajadas = cartasDuplicadas;

    // Obtenemos el elemento
    const gameBoard = document.getElementById('mostrar_cartas');
    cartasHaciaArriba = [];
    cartasEmparejadas = 0;

    // Crear las cartas en el tablero
    cartasBarajadas.forEach((card, index) => {
        const cartaIndividual = document.createElement('div');
        cartaIndividual.classList.add('carta', 'reverso');
        cartaIndividual.dataset.card = card;
        cartaIndividual.dataset.index = index;
        gameBoard.appendChild(cartaIndividual);

        
    });
}

// Llamada inicial al juego
grid();

// Obtenemos el botón para reiniciar el juego
const juegoBtn = document.getElementById("boton-juego");

// Reiniciar el juego al pulsar el botón
juegoBtn.addEventListener("click", grid);
