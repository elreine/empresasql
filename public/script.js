document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('app');

    // Crear un ejemplo usando variables y operadores
    const nombre = "Rey";
    const edad = 23;

    // Crear un párrafo para mostrar el mensaje
    const paragraph = document.createElement('p');
    paragraph.textContent = `Hola desde javascript, soy ${nombre} y tengo ${edad} años.`;

    // Añadir el párrafo al contenedor
    appContainer.appendChild(paragraph);
});
