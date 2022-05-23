/* Areglo de colores iniciales 
const colors = [
    "rgb(34, 153, 84)",
    "rgb(16, 40, 236)",
    "rgb(236, 16, 46)",
    "rgb(124, 89, 209)",
    "rgb(15, 221, 231)",
    "rgb(95, 106, 106)"
]; */

//Declaración de variables
//Arreglo de colores
let colors = [];
//Seleccionar todos los cuadrados
let squares = document.querySelectorAll(".square");
//Color aleatorio seleccionado desde el arreglo colors
let pickedColor;
//Nombre del color aleatorio asignado al SPAN con id colorDisplay
let colorDisplay = document.querySelector("#colorDisplay");
//Variable donde se guardará el color presionado por el usuario, se comparara con pickedColor
let clickedColor;
//Mensaje mostrado al usuario (Correcto - Intentalo nuevamente)
let message = document.querySelector("#message");
//Color del fondo
let backgroundBody = "#232323";
//Titulo
let titulo = document.querySelector("h1");
//Cantidad de cuadrados default
let numberOfSquares = 6;
//Boton resetear
let reset = document.querySelector("#reset");
//Botones niveles
let nivelFacil = document.querySelector("#facil")
let nivelDificil = document.querySelector("#dificil")

let estadoJuego;

resetGame()
generarSquares()

//Función para generar los cuadrados
function generarSquares() {
    for (let i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function () {
            clickedColor = colors[i];
            console.log(clickedColor);
            if (pickedColor === clickedColor) {
                message.textContent = "¡Correcto!";
                reset.textContent = "Jugar de nuevo";
                titulo.style.backgroundColor = colors[i];
                changeColors(clickedColor);
                disableSquares("gano");
            } else {
                squares[i].style.backgroundColor = backgroundBody;
                //this.style.backgroundColor = backgroundBody;
                message.textContent = "Intentalo Nuevamente";
            }
        })
    }
}

//Cambiar el color de todos lo cuadrados cuando el usuario adivina el color
function changeColors(color) {
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

//Asignar color aleatorio del arreglo colors
function pickColor() {
    let numAleatorio = Math.floor(Math.random() * colors.length);
    pickedColor = colors[numAleatorio];
    return pickedColor;
}

//Generar colores RGB aleatorios
function randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

//Generar arreglo colors con colores aleatorios
function generateRandomColors(numberOfSquares) {
    let generarColores = [];
    console.log(numberOfSquares);
    for (let i = 0; i < numberOfSquares; i++) {
        generarColores.push(randomColor());
    }
    console.log(generarColores);
    return generarColores;
}

//Resetear juego (Recuperar valores iniciales)
function resetGame() {
    //Generar un arreglo de colores para la x cantidad de cuadrados
    colors = generateRandomColors(numberOfSquares);
    pickedColor = pickColor();
    colorDisplay.innerHTML = pickedColor;
    message.textContent = "";
    reset.textContent = "Nuevos Colores";
    titulo.style.backgroundColor = "#009dff";
    disableSquares("jugando")
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
        //si existe un color 
        if (colors[i] != undefined) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
}

reset.addEventListener("click", function () {
    resetGame();
})


nivelFacil.addEventListener("click", function () {
    nivelFacil.classList.add("selected");
    nivelDificil.classList.remove("selected");
    numberOfSquares = 3;
    resetGame();
})

nivelDificil.addEventListener("click", function () {
    nivelDificil.classList.add("selected");
    nivelFacil.classList.remove("selected");
    numberOfSquares = 6;
    resetGame();
})

//Funcion extra a la pauta
//Bloquear cuadrados al ganar el juego
function disableSquares(estadoJuego) {
    for (let i = 0; i < squares.length; i++) {
        if (estadoJuego === "jugando") {
            squares[i].style.pointerEvents = "auto";
        } else {
            squares[i].style.pointerEvents = "none";
        }
    }
}