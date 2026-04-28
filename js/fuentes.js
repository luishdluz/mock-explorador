//$(document).on('change', '.switch input', function () {

  //  const card = $(this).closest('.fuente-card');

    //if (this.checked) {
      //  card.addClass('activa');
        //console.log('Fuente activada:', card.data('fuente'));
    //} else {
      //  card.removeClass('activa');
        //console.log('Fuente desactivada:', card.data('fuente'));
    //}
//});

$(document).on('change', '.switch input', function () {

    const $switchActual = $(this);
    const $cardActual = $switchActual.closest('.fuente-card');

    if (this.checked) {

        // Apagar todas las demás fuentes
        $('.fuente-card').not($cardActual).each(function () {
            $(this)
                .removeClass('activa')
                .find('.switch input')
                .prop('checked', false);
        });

        // Activar solo esta
        $cardActual.addClass('activa');

        console.log('Fuente activada:', $cardActual.data('fuente'));

        orionNotificarFuenteActiva($cardActual.data('fuente'));


    } else {
        // Opcional: permitir apagarla
        $cardActual.removeClass('activa');
        console.log('Fuente desactivada:', $cardActual.data('fuente'));
    }
});

$(document).on('click', '.btn-fuente.eliminar', function () {
    $(this).closest('.fuente-card').fadeOut(300, function () {
        $(this).remove();
    });
});




document.addEventListener('click', function (e) {
    const btnVer = e.target.closest('.btn-fuente.ver');
    if (!btnVer) return;

    const nombreFuente = btnVer.dataset.fuente;

    mostrarPrevisualizacionFuente('Indicadores financieros');
});

function mostrarPrevisualizacionFuente(nombreFuente) {
    

    const previewTabla = generarTablaPreview();

    chatMensajes.insertAdjacentHTML('beforeend', `
    <div class="mensaje orion">
        <div class="avatar avatar-orion">ORION</div>
        <div class="burbuja">
            <div class="autor">ORION</div>
            <div class="texto">
                <strong>Previsualización de la fuente:</strong> ${nombreFuente}<br><br>
                Esta vista muestra <strong>datos de ejemplo</strong> únicamente para efectos ilustrativos.
                <br><br>
                ${previewTabla}
            </div>
        </div>
    </div>
`);

    scrollChat();
}

function generarTablaPreview() {
    return `
    <div class="tabla-orion-wrapper">
        <table class="tabla-orion">
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Indicador</th>
                    <th>Valor</th>
                    <th>Unidad</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>2024-12</td>
                    <td>Tasa de Referencia</td>
                    <td>11.25</td>
                    <td>%</td>
                </tr>
                <tr>
                    <td>2024-12</td>
                    <td>Inflación Anual</td>
                    <td>4.32</td>
                    <td>%</td>
                </tr>
            </tbody>
        </table>
    </div>
    `;
}


document.addEventListener('click', function (e) {
    const btnMetadata = e.target.closest('.btn-fuente.metadata');
    if (!btnMetadata) return;

    const nombreFuente = btnMetadata.dataset.fuente;
    mostrarMetadatosFuente(nombreFuente);
});

function mostrarMetadatosFuente(nombreFuente) {

    const tablaMetadata = generarTablaMetadatos();

    chatMensajes.insertAdjacentHTML('beforeend', `
        <div class="mensaje orion">
            <div class="avatar avatar-orion">ORION</div>
            <div class="burbuja">
                <div class="autor">ORION</div>
                <div class="texto">
                    <strong>Metadatos de la fuente:</strong> ${nombreFuente}<br><br>
                    A continuación se muestra el <strong>diccionario de datos</strong> disponible para esta fuente.
                    <br><br>
                    ${tablaMetadata}
                </div>
            </div>
        </div>
    `);

    scrollChat();
}

function generarTablaMetadatos() {
    return `
    <div class="tabla-orion-wrapper">
        <table class="tabla-orion">
            <thead>
                <tr>
                    <th>Campo</th>
                    <th>Descripción</th>
                    <th>Tipo</th>
                    <th>Unidad</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>fecha</td>
                    <td>Periodo de referencia del indicador</td>
                    <td>Date</td>
                    <td>N/A</td>
                </tr>
                <tr>
                    <td>indicador</td>
                    <td>Nombre del indicador financiero</td>
                    <td>String</td>
                    <td>N/A</td>
                </tr>
                <tr>
                    <td>valor</td>
                    <td>Valor observado del indicador</td>
                    <td>Decimal</td>
                    <td>%</td>
                </tr>
                <tr>
                    <td>fuente</td>
                    <td>Institución responsable del dato</td>
                    <td>String</td>
                    <td>N/A</td>
                </tr>
            </tbody>
        </table>
    </div>
    `;
}


const btnAbrirCatalogo = document.getElementById('btn-abrir-todo-config');
const modalCatalogo = document.getElementById('modalCatalogoFuentes');
const cerrarModalFuentes = document.getElementById('cerrarModalFuentes');

btnAbrirCatalogo.addEventListener('click', () => {
    modalCatalogo.classList.add('activa');
});

cerrarModalFuentes.addEventListener('click', () => {
    modalCatalogo.classList.remove('activa');
});

modalCatalogo.addEventListener('click', (e) => {
    if (e.target === modalCatalogo) {
        modalCatalogo.classList.remove('activa');
    }
});


document.addEventListener('click', function (e) {
    const btnUsar = e.target.closest('.btn-usar-fuente');
    if (!btnUsar) return;

    const nombreFuente = btnUsar.dataset.fuente;
    agregarFuenteAlMenu(nombreFuente);

    modalCatalogo.classList.remove('activa');
});


function agregarFuenteAlMenu(nombreFuente) {

    const menuScroll = document.querySelector('.fuentes-container');



    const cardFuente = `
        <div class="fuente-card" data-fuente="mercados">
                <div class="fuente-header">
                  <div class="fuente-avatar">
                    <img src="imagenes/fuente.png" alt="Banco Central">
                  </div>
                  <div class="fuente-info">
                    <div class="fuente-nombre">${nombreFuente}</div>
                  </div>
                </div>
                <div class="fuente-acciones">
                  <label class="switch">
                    <input type="checkbox">
                    <span class="slider"></span>
                  </label>
                  <button class="btn-fuente ver" data-tooltip="Previsualizar fuente" data-tooltip-position="top">
                    <img src="imagenes/ver.svg">
                  </button>
                  <button class="btn-fuente metadata" data-fuente="${nombreFuente}" data-tooltip="Ver diccionario de datos" data-tooltip-position="top">
                      <img src="imagenes/diccionario.svg" alt="Ver diccionario de datos">
                  </button>
                  <button class="btn-fuente eliminar" data-tooltip="Remover fuente" data-tooltip-position="top">
                    <img src="imagenes/eliminar.svg">
                  </button>
                </div>
              </div>
    `;

    menuScroll.insertAdjacentHTML('beforeend', cardFuente);
}


function orionNotificarFuenteActiva(nombreFuente) {

    chatMensajes.insertAdjacentHTML('beforeend', `
        <div class="mensaje orion">
            <div class="avatar avatar-orion">ORION</div>
            <div class="burbuja">
                <div class="autor">ORION</div>
                <div class="texto">
                    🔌 La fuente <strong>${nombreFuente}</strong> ha sido activada.<br>
                    A partir de ahora, todas las consultas usarán esta fuente de información.
                </div>
            </div>
        </div>
    `);

    scrollChat();
}


$(document).ready(function() {
    // Datos maestros para simular la búsqueda
    const fuentesMaestras = [
        { nombre: "Sistema de Indicadores Financieros", desc: "Tasas, inflación y agregados monetarios", tags: ["tasas", "inflacion", "monetarios", "ipc", "precios"] },
        { nombre: "Mercado de Valores", desc: "Índices bursátiles y rendimientos", tags: ["valores", "bolsa", "acciones", "rendimientos", "indices", "bmv"] },
        { nombre: "Reservas Internacionales", desc: "Saldo y variaciones semanales", tags: ["reservas", "dolares", "oro", "divisas"] }
    ];

    // Función para quitar acentos y caracteres especiales
    const normalizarTexto = (texto) => {
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

    $('#btnConsultarFuente').on('click', function() {
        const queryOriginal = $('#inputBusquedaLLM').val().trim();
        const queryLimpia = normalizarTexto(queryOriginal);
        
        if (queryLimpia === "") return;

        // Limpiar interfaz
        $('#contenedorResultados, #mensajeErrorLLM').hide();
        $('#tablaCatalogoFuentes').empty();
        $('#loaderLLM').show();
        
        setTimeout(function() {
            $('#loaderLLM').hide();

            // 2. Búsqueda flexible
            const resultados = fuentesMaestras.filter(f => {
                const nombreLimpio = normalizarTexto(f.nombre);
                const descLimpia = normalizarTexto(f.desc);
                
                // Verifica si la query está en nombre, descripción o en los tags
                return nombreLimpio.includes(queryLimpia) || 
                       descLimpia.includes(queryLimpia) ||
                       f.tags.some(tag => queryLimpia.includes(normalizarTexto(tag)));
            });

            if (resultados.length > 0) {
                resultados.forEach(f => {
                    const row = `
                        <tr>
                            <td>${f.nombre}</td>
                            <td>${f.desc}</td>
                            <td>
                                <button class="btn-usar-fuente" data-fuente="${f.nombre}">
                                    Usar
                                </button>
                            </td>
                        </tr>`;
                    $('#tablaCatalogoFuentes').append(row);
                });
                $('#contenedorResultados').fadeIn();
            } else {
                $('#mensajeErrorLLM').fadeIn();
            }
        }, 1000); 
    });

    // Resetear modal al cerrar (opcional)
    $('#cerrarModalFuentes').on('click', function() {
        $('#inputBusquedaLLM').val('');
        $('#contenedorResultados, #mensajeErrorLLM').hide();
    });
});