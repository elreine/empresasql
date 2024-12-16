document.addEventListener('DOMContentLoaded', async () => {
    const empleadosContainer = document.getElementById('empleados-container');

    try {
        const response = await fetch('/empleados'); // Llamada al backend
        if (!response.ok) throw new Error('Error al obtener datos');

        const empleados = await response.json();

        // Crear una lista desordenada
        const ul = document.createElement('ul');
        ul.className = 'lista-empleados'; // Clase para estilos

        empleados.forEach(empleado => {
            const li = document.createElement('li');
            li.className = 'empleado-item';

            // Crear un contenedor para los detalles del empleado
            const div = document.createElement('div');
            div.className = 'empleado-detalle';

            div.innerHTML = `
                <p><strong>Nombre:</strong> ${empleado.nombre}</p>
                <p><strong>Apellido:</strong> ${empleado.apellido}</p>
                <p><strong>Edad:</strong> ${empleado.edad}</p>
                <p><strong>Salario:</strong> ${empleado.salario} €</p>
            `;

            li.appendChild(div);
            ul.appendChild(li);
        });

        // Limpiar y agregar la lista al contenedor
        empleadosContainer.innerHTML = '';
        empleadosContainer.appendChild(ul);
    } catch (error) {
        console.error('Error al conectar con el backend:', error);
        empleadosContainer.textContent = 'No se pudo cargar la lista de empleados.';
    }
});
