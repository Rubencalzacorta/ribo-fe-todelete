module.exports.initialCollateralState = {
    type: '',
    registerDate: '',
    value: '',
    currentStatus: {
        status: '',
        date: ''
    },
    // serialNumber: '',
    // model: '',
    // modelNumber: '',
    // color: '',
    // dateOfManufacture: '',
    // condition: '',
    // address: '',
    // description: '',
    // collateralPhoto: '',
    // collateralFiles: '',
    // registrationNumber: '',
    // kilometrage: '',
    // engineNumber: ''
}

module.exports.collateralTypes = [{
        value: 'automobile',
        label: 'Carro'
    },
    {
        value: 'motorcycle',
        label: 'Moto'
    },
    {
        value: 'receivables',
        label: 'Cuentas por cobrar'
    },
    {
        value: 'investments',
        label: 'Inversiones'
    },
    {
        value: 'machinaryAndEquipment',
        label: 'Maquinaria y Equipos'
    },
    {
        value: 'valuablesAndColletibles',
        label: 'Coleccionables'
    },
    {
        value: 'electronicItems',
        label: 'Equipos Electronicos'
    },
    {
        value: 'employmentBenefits',
        label: 'Beneficios Laborales'
    }
]

module.exports.currentStatus = [{
        value: 'depositedIntoBranch',
        label: 'En control'
    },
    {
        value: 'collateralWithBorrower',
        label: 'Con prestatario'
    },
    {
        value: 'returnedToBorrower',
        label: 'devuelto al Prestatario'
    },
    {
        value: 'reposessionInitiated',
        label: 'En embargo'
    },
    {
        value: 'repossed',
        label: 'Embargada'
    },
    {
        value: 'underAuction',
        label: 'En subasta'
    },
    {
        value: 'sold',
        label: 'Vendido'
    },
    {
        value: 'transferedOwnership',
        label: 'transferido'
    },
    {
        value: 'lost',
        label: 'Perdido'
    },
    {
        value: 'stolen',
        label: 'Robado'
    },
    {
        value: 'insuranceClaim',
        label: 'En reclamación'
    },
]

module.exports.vehicleCollateralTypes = [
    'automobile',
    'motorcycle',
    'receivables',
    'machinaryAndEquipment',
    'electronicItems',
]

module.exports.basicCollateral = [{
    name: 'type',
    label: 'Tipo',
    select: true,
}, {
    name: 'registerDate',
    label: 'Fecha de registro',
    type: 'date'

}, {
    name: 'value',
    label: 'Valor',
    type: 'number'
}, {
    name: 'status',
    label: 'Estatus',
    select: true
}, {
    name: 'date',
    label: 'Fecha de Estatus',
    type: 'date'
}]




module.exports.vehicleConstants = [{
    name: 'serialNumber',
    label: 'Serial',
    type: 'text'
}, {
    name: 'model',
    label: 'Modelo',
    type: 'text'
}, {
    name: 'modelNumber',
    label: 'Numero de Modelo o motor',
    type: 'text'
}, {
    name: 'color',
    label: 'Color',
    type: 'text'
}, {
    name: 'dateOfManufacture',
    label: 'Fecha de Manufactura',
    type: 'date'
}, {
    name: 'condition',
    label: 'Condicion',
    select: true,
}, {
    name: 'address',
    label: 'Dirección',
    type: 'text'
}, {
    name: 'description',
    label: 'Descripción',
    type: 'text'
}, {
    name: 'registrationNumber',
    label: 'Numero de Registro',
    type: 'text'
}, {
    name: 'kilometrage',
    label: 'Kilometraje',
    type: 'number'
}, {
    name: 'engineNumber',
    label: 'Numero de motor',
    type: 'text'
}]