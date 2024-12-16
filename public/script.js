document.addEventListener('DOMContentLoaded', async () => {
    const appContainer = document.getElementById('app');

    // Ejemplo usando variables y operadores
    const nombre = "Rey";
    const edad = 23;

    // Crear un párrafo para mostrar el mensaje
    const paragraph = document.createElement('p');
    paragraph.textContent = `Hola desde JavaScript, soy ${nombre} y tengo ${edad} años.`;

    // Añadir el párrafo al contenedor
    appContainer.appendChild(paragraph);

    // Lógica para cargar empleados desde el backend
    const empleadosLink = document.getElementById('empleados-link');

    empleadosLink.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/empleados'); // Unificada para local y producción
            if (!response.ok) throw new Error('Error al obtener datos');

            const empleados = await response.json();

            // Limpiar el contenedor
            appContainer.innerHTML = '';

            // Mostrar empleados
            empleados.forEach(empleado => {
                const p = document.createElement('p');
                p.textContent = `${empleado.nombre} ${empleado.apellido}, edad: ${empleado.edad}, salario: ${empleado.salario}`;
                appContainer.appendChild(p);
            });
        } catch (error) {
            console.error('Error al conectar con el backend:', error);
            appContainer.textContent = 'No se pudo cargar la lista de empleados.';
        }
    });
});
