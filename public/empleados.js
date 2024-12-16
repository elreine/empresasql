document.addEventListener('DOMContentLoaded', async () => {
    const empleadosContainer = document.getElementById('empleados-container');

    try {
        const response = await fetch('/empleados'); // Llamada al backend
        if (!response.ok) throw new Error('Error al obtener datos');

        const empleados = await response.json();

        // Mostrar empleados en el contenedor
        empleadosContainer.innerHTML = '';
        empleados.forEach(empleado => {
            const p = document.createElement('p');
            p.textContent = `${empleado.nombre} ${empleado.apellido}, edad: ${empleado.edad}, salario: ${empleado.salario}`;
            empleadosContainer.appendChild(p);
        });
    } catch (error) {
        console.error('Error al conectar con el backend:', error);
        empleadosContainer.textContent = 'No se pudo cargar la lista de empleados.';
    }
});
