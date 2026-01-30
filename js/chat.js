$(document).ready(function () {

    const chatMensajes = $('#chatMensajes');
    const inputPrompt = $('#inputPrompt');
    const btnEnviar = $('#btnEnviar');

    let contadorMensajes = 1;

    // Simulador de respuestas ORION
    const respuestasOrion = [
        "Interesante 🤔, déjame revisar esa información.",
        "He analizado los datos disponibles y esto es lo que encontré.",
        "Puedo ayudarte a profundizar más en ese tema.",
        "Esa es una buena pregunta. Aquí tienes un resumen claro.",
        "Estoy procesando la información… listo ✅"
    ];

    function agregarMensajeUsuario(texto) {
        chatMensajes.append(`
            <div class="mensaje usuario" data-id="${contadorMensajes++}">
                <div class="avatar avatar-usuario">TÚ</div>
                <div class="burbuja">
                    <div class="autor">Usuario</div>
                    <div class="texto">${texto}</div>
                </div>
            </div>
        `);
        scrollChat();
    }

    function agregarMensajeOrion(textoUsuario) {

        setTimeout(() => {

            let respuesta;

            if (
                textoUsuario.toLowerCase().includes("financ") ||
                textoUsuario.toLowerCase().includes("banco") ||
                textoUsuario.toLowerCase().includes("indicador")
            ) {
                respuesta = `
                    <div>
                        <strong>Fuente:</strong> Sistema de Indicadores Financieros – Banco Central<br>
                        <strong>Resultado de la consulta:</strong>
                        ${generarRespuestaFinanciera()}
                    </div>
                `;
            } else {
                respuesta = respuestasOrion[Math.floor(Math.random() * respuestasOrion.length)];
            }

            if (
                textoUsuario.toLowerCase().includes("grafica") ||
                textoUsuario.toLowerCase().includes("gráfica") ||
                textoUsuario.toLowerCase().includes("chart")
            ) {
                respuesta = `
                    <div>
                        <strong>Visualización generada:</strong>
                        <div id="grafica-financiera" style="width:100%; height:400px;"></div>
                    </div>
                `;

                setTimeout(generarGraficaFinanciera, 0);
                setTimeout(() => {
                        if (Highcharts.charts.length) {
                            Highcharts.charts.forEach(chart => {
                                if (chart) {
                                    chart.reflow();
                                }
                            });
                        }
                    }, 300);
            }

            const esContenidoVisual =
                                        respuesta.includes('tabla-financiera') ||
                                        respuesta.includes('grafica-financiera');

            chatMensajes.append(`
                <div class="mensaje orion ${esContenidoVisual ? 'ancho-completo' : ''}" data-id="${contadorMensajes++}">
                    <div class="avatar avatar-orion">ORION</div>
                    <div class="burbuja">
                        <div class="autor">ORION</div>
                        <div class="texto">${respuesta}</div>
                    </div>
                </div>
            `);

            scrollChat();

        }, 1000);
    }

    function scrollChat() {
        chatMensajes.scrollTop(chatMensajes[0].scrollHeight);
    }

    btnEnviar.on('click', enviarMensaje);
    inputPrompt.on('keypress', function (e) {
        if (e.which === 13) enviarMensaje();
    });

    function enviarMensaje() {
        const texto = inputPrompt.val().trim();
        if (!texto) return;

        agregarMensajeUsuario(texto);
        inputPrompt.val('');
        agregarMensajeOrion(texto);

        setTimeout(() => {
            document
                .querySelectorAll('.datatable-financiero')
                .forEach(tabla => activarFiltrosTabla(tabla));
        }, 0);

    }

});


function activarFiltrosTabla(tabla) {

    const filtros = tabla.querySelectorAll('thead .fila-filtros input');
    const filas = tabla.querySelectorAll('tbody tr');

    filtros.forEach((input, index) => {
        input.addEventListener('input', () => {

            const valorFiltro = input.value.toLowerCase();

            filas.forEach(fila => {
                const celda = fila.children[index];
                const textoCelda = celda.textContent.toLowerCase();

                if (textoCelda.includes(valorFiltro)) {
                    fila.style.display = '';
                } else {
                    fila.style.display = 'none';
                }
            });

        });
    });
}


function generarGraficaFinanciera() {
    Highcharts.chart('grafica-financiera', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Indicadores Financieros - Banco Central'
        },
        subtitle: {
            text: 'Datos simulados'
        },
        xAxis: {
            categories: ['Sep 2024', 'Oct 2024', 'Nov 2024', 'Dic 2024']
        },
        yAxis: {
            title: {
                text: 'Porcentaje (%)'
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: '%'
        },
        series: [
            {
                name: 'Inflación',
                data: [4.8, 4.7, 4.6, 4.66]
            },
            {
                name: 'Tasa de Interés',
                data: [11.25, 11.25, 11.25, 11.25]
            }
        ],
        credits: {
            enabled: false
        }
    });
}