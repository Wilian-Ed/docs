// Función para agregar las clases "form-control" y "form-select"
function agregarClasesFormulario() {
    // Agregar clases a los inputs
    const inputs = document.querySelectorAll('input:not([type="submit"]):not([type="image"]):not([type="checkbox"]):not([type="radio"])');
    inputs.forEach(input => {
        input.classList.add('form-control');
    });
    const submitInputs = document.querySelectorAll('input[type="submit"]');
    submitInputs.forEach(input => {
        // Crear un objeto que mapee las palabras clave a las clases CSS
        const keywordToClass = {
            'guardar': 'shadow btn btn-secondary',
            'guarda formulario': 'shadow btn btn-secondary',
            'guardar información': 'shadow btn btn-secondary',
            'guardar información.': 'shadow btn btn-secondary',
            'guardar informacion': 'shadow btn btn-secondary',
            'buscar': 'shadow btn btn-success',
            'buscar asociado': 'shadow btn btn-success',
            'buscar socio': 'shadow btn btn-success',
            'ingresar': 'shadow btn btn-success',
            'generar tabla': 'shadow btn btn-success',
            'calcular total': 'shadow btn btn-warning',
            'realizar depósito': 'shadow btn btn-success',
            'actualizar': 'shadow btn btn-info',
            'ver huellas': 'shadow btn btn-dark',
        };

        // Obtener el valor del input y convertirlo a minúsculas
        const inputValue = input.value.trim().toLowerCase();

        // Verificar si el valor está en el objeto keywordToClass
        if (inputValue in keywordToClass) {
            const classesToAdd = keywordToClass[inputValue].split(' ');
            input.classList.add(...classesToAdd);
        }
    });
    // Agregar clases a los selects
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
        select.classList.add('form-select');
    });

    // Agregar clases a los textareas
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.classList.add('form-control');
    });

    // Verificar si la ruta actual NO termina en 'alguna ruta'
    if (!window.location.pathname.trim().endsWith('/transferencias_pago_prestamos.aspx') ||
        !window.location.pathname.trim().endsWith('/pagos_remesas.aspx')
    ) {
        // obtiene todos los elementos <td> que tienen dos o más hijos
        var tdElements = document.querySelectorAll('td');

        // Itera a través de los elementos y verifica si tienen dos o más hijos
        for (var i = 0; i < tdElements.length; i++) {
            var tdElement = tdElements[i];
            var childElements = tdElement.children; // Obtiene los hijos del <td>

            // Verifica si hay dos o más hijos y aplica la clase si es necesario
            if (childElements.length >= 2) {
                tdElement.classList.add('d-flex', 'w-100', 'gap-2', 'align-items-center');
            }
        }
    }
}

// Función para observar cambios en el DOM
function observarCambiosEnDOM() {
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList') {
                // Se ha producido un cambio en el DOM, por lo que volvemos a aplicar las clases
                agregarClasesFormulario();

                //quitar el background que se tenga la clase ajax__tab_tab
                const ajaxTabs = document.querySelectorAll('.ajax__tab_tab');
                ajaxTabs.forEach(ajaxTab => {
                    ajaxTab.style.background = 'none';
                });
            }
        });
    });

    // Configurar el observer para observar cambios en el DOM
    const config = {
        childList: true, // Observar cambios en la lista de hijos (nuevos elementos)
        subtree: true    // Observar cambios en todo el árbol de DOM
    };

    // Comenzar a observar el DOM
    observer.observe(document.body, config);
}

// Llama a la función para agregar las clases al cargar la página
document.addEventListener('DOMContentLoaded', agregarClasesFormulario);

// Llama a la función para observar cambios en el DOM
observarCambiosEnDOM();

var contenedor = document.querySelector('.contenedor-contenido');
contenedor.addEventListener('scroll', function () {
    sessionStorage.setItem('scrollPosition', contenedor.scrollTop);
});

// Restaura la posición del scroll después de que la página se haya recargado
window.addEventListener('load', function () {
    var scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition !== null) {
        contenedor.scrollTop = scrollPosition;
    }
});

// Obtener el div
var div = document.getElementById("ctl00_tvArbol");

// Obtener el div
var div = document.getElementById("ctl00_tvArbol");

// Guardar la posición actual del scroll
var pos = div.scrollTop;

// Al salir de la página, guardar la nueva posición del scroll
window.addEventListener("onbeforeunload", function() {
    pos = div.scrollTop;
});
