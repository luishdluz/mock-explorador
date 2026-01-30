$(document).ready(function () {

    window.generarRespuestaFinanciera = function () {

    const datos = [
        { fecha: "2024-12-31", indicador: "Tasa de Referencia", valor: "11.25", variacion: "0.00%", periodo: "Mensual", unidad: "%" },
        { fecha: "2024-12-31", indicador: "Inflación General", valor: "4.32", variacion: "-0.12%", periodo: "Mensual", unidad: "%" },
        { fecha: "2024-12-31", indicador: "Reservas Internacionales", valor: "218,450", variacion: "+1.2%", periodo: "Semanal", unidad: "MDD" },
        { fecha: "2024-12-31", indicador: "Tipo de Cambio", valor: "17.02", variacion: "-0.8%", periodo: "Diario", unidad: "MXN/USD" },
        { fecha: "2024-12-31", indicador: "Base Monetaria", valor: "2,945,200", variacion: "+0.5%", periodo: "Mensual", unidad: "MDP" }
    ];

    return `
        <div class="orion-tabla-wrapper">
            <table class="orion-tabla" id="tablaFinanciera">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Indicador</th>
                        <th>Valor</th>
                        <th>Variación</th>
                        <th>Periodicidad</th>
                        <th>Unidad</th>
                    </tr>
                    <tr class="filtros">
                        <th><input type="text" placeholder="Filtrar" data-col="0"></th>
                        <th><input type="text" placeholder="Filtrar" data-col="1"></th>
                        <th><input type="text" placeholder="Filtrar" data-col="2"></th>
                        <th><input type="text" placeholder="Filtrar" data-col="3"></th>
                        <th><input type="text" placeholder="Filtrar" data-col="4"></th>
                        <th><input type="text" placeholder="Filtrar" data-col="5"></th>
                    </tr>
                </thead>
                <tbody>
                    ${datos.map(d => `
                        <tr>
                            <td>${d.fecha}</td>
                            <td>${d.indicador}</td>
                            <td>${d.valor}</td>
                            <td>${d.variacion}</td>
                            <td>${d.periodo}</td>
                            <td>${d.unidad}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
};

});