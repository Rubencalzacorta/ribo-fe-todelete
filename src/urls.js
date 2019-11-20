const clientUrls = [{
        link: true,
        url: 'activity',
        text: 'Actividad'
    },
    {
        link: true,
        url: 'loan',
        text: 'Prestamos'
    },
    {
        link: true,
        url: 'profile',
        text: 'Perfil'
    },
]

const adminUrls = [{
        link: false,
        text: '- General'
    },
    {
        link: true,
        url: 'activity',
        text: 'Cobranzas'
    },
    {
        link: true,
        url: 'portfolio',
        text: 'Portafolio'
    },
    {
        link: true,
        super: true,
        url: 'evolution',
        text: 'Evolución'
    },
    {
        link: false,
        text: '- Finanzas'
    }, {
        link: true,
        url: 'financials',
        text: 'Indicadores'
    },
    {
        link: false,
        text: '- Cliente'
    },
    {
        link: true,
        url: 'client/list',
        text: 'Listado'
    },
    {
        link: false,
        text: '- Compañia'
    },
    {
        link: true,
        url: 'company/create',
        text: 'Crear'
    },
    {
        link: true,
        url: 'company/list',
        text: 'Listado'
    },
    {
        link: false,
        text: '- Inversionista'
    },
    {
        link: true,
        url: 'investor/create',
        text: 'Crear'
    },
    {
        link: true,
        url: 'investor/details',
        text: 'Detalle'
    },
    {
        link: true,
        url: 'investor/transaction',
        text: 'Transacciones'
    },
    {
        link: false,
        text: '- Prestamos'
    },
    {
        link: true,
        url: 'loan/list',
        text: 'Listado'
    },
    {
        link: true,
        url: 'loan/period',
        text: 'Periodo'
    },
]

module.exports = {
    clientUrls,
    adminUrls
}