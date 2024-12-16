document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('app');

    // Crear un mensaje de bienvenida
    const paragraph = document.createElement('p');
    paragraph.textContent = 'Bienvenido a la aplicación de empleados. Haz clic en "Empleados" para ver la lista.';
    appContainer.appendChild(paragraph);
});
