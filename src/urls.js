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
        text: 'General',
        links: [{
                link: true,
                url: 'activity',
                text: 'Resumen'
            },
            {
                link: true,
                url: 'loan-collection',
                text: 'Cobranza'
            },
            {
                link: true,
                url: 'payments',
                text: 'Pagos'
            }, {
                link: true,
                url: 'portfolio',
                text: 'Portafolio'
            }, {
                link: true,
                super: true,
                url: 'evolution',
                text: 'Evolución'
            },
        ]
    }, {
        link: false,
        text: 'Finanzas',
        links: [{
            link: true,
            url: 'financials/indicators',
            text: 'Indicadores'
        }, {
            link: true,
            url: 'financials/p-and-l',
            text: 'P & L'
        }, ]
    }, {
        link: false,
        text: 'Cliente',
        links: [{
            link: true,
            url: 'client/list',
            text: 'Listado'
        }]
    },
    {
        link: false,
        text: 'Compañia',
        links: [{
                link: true,
                url: 'company/create',
                text: 'Crear'
            },
            {
                link: true,
                url: 'company/list',
                text: 'Listado'
            }
        ]
    },
    {
        link: false,
        text: 'Inversionista',
        links: [{
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
            }
        ]
    },
    {
        link: false,
        text: 'Prestamo',
        links: [{
                link: true,
                url: 'loan/calculator',
                text: 'Calculadora'
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
    }
]

module.exports = {
    clientUrls,
    adminUrls
}