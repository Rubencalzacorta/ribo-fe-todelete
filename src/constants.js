const accounts = ["RBPERU", "GCUS", "GFUS", "GCDR"]


const location = {
    'DOMINICAN_REPUBLIC': 'República Dominicana',
    'VENEZUELA': 'Venezuela',
    'USA': 'USA',
    'PERU': 'Perú'
}

const totalConcepts = [
    'Fecha',
    'Ingresos Financieros',
    'Costos Financieros',
    'Margen Financiero Bruto',
    'Gastos por Servicios Financieros',
    'Margen Operativo',
    'Gasto General Administrativo y Servicios',
    'Resultado Operativo',
    'Dividendos',
]

const periodicityData = [{
        value: 'weekly',
        label: 'Semanal'
    },
    {
        value: 'monthly',
        label: 'Mensual'
    },
    {
        value: 'yearly',
        label: 'Anual'
    },
]


let gender = [{
    value: 'MALE',
    label: 'Masculino'
}, {
    value: 'FEMALE',
    label: 'Femenino'
}]



let civilStatus = [{
    label: 'Soltero',
    value: 'SINGLE'
}, {
    label: 'Casado',
    value: 'MARRIED'
}, {
    label: 'Divorciado',
    value: 'DIVORCED'
}, {
    label: 'Viudo',
    value: 'WIDOW'
}]

let academicLevel = [{
    label: 'Primaria',
    value: 'MIDDLESCHOOL'
}, {
    label: 'Secundaria',
    value: 'HIGHSCHOOL'
}, {
    label: 'Universidad',
    value: 'UNIVERSITY'
}, {
    label: 'Posgrado',
    value: 'POSTGRADUATE'
}]

let employmentStatus = [{
    label: 'Empleado',
    value: 'EMPLOYED'
}, {
    label: 'Desempleado',
    value: 'UNEMPLOYED'
}, {
    label: 'Independiente',
    value: 'INDEPENDANT'
}, {
    label: 'Retirado',
    value: 'RETIRED'
}, {
    label: 'Otro',
    value: 'OTHER'
}]

let countries = [{
    label: 'Perú',
    value: 'PERU'
}, {
    label: 'República Dominicana',
    value: 'DOMINICAN_REPUBLIC'
}, {
    label: 'Venezuela',
    value: 'VENEZUELA'
}]

let ownership = [{
    label: 'Privada',
    value: 'PRIVATE'
}, {
    label: 'Pública',
    value: 'PUBLIC'
}]


let txConstants = [{
        label: 'DEPOSIT',
        value: 'Deposito'
    },
    {
        label: 'WITHDRAWAL',
        value: 'Retiro'
    },
    {
        label: 'INTERNAL_TRANSFER_RECIPIENT',
        value: 'Transfer interna - destinario'
    },
    {
        label: 'INTERNAL_TRANSFER_SENDER',
        value: 'Transfer interna - remitente'
    },
    {
        label: 'INTERNATIONAL_TRANSFER_RECIPIENT',
        value: 'Intl. transfer - destinatario'
    },
    {
        label: 'INTERNATIONAL_TRANSFER_SENDER',
        value: 'Intl. transfer - remitente'
    },
    {
        label: 'COST',
        value: 'Costo'
    }, {
        label: 'COMMISSION',
        value: 'Comisión'
    },
    {
        label: 'COST',
        value: 'Costo'
    },
    {
        label: 'COMMISSION',
        value: 'Comisión'
    },
    {
        label: 'INSURANCE_COST',
        value: 'Costo de seguro'
    },
    {
        label: 'BANKING_FEE',
        value: 'Fee bancario general'
    },
    {
        label: 'BANKING_TRANSFER_FEE',
        value: 'Fee bancario por transferencias'
    },
    {
        label: 'INCOME_ORIGINATION_FEE',
        value: 'Ingreso por originación'
    },
    {
        label: 'COST_ORIGINATION_LEGAL',
        value: 'Costo legal por originación'
    },
    {
        label: 'COST_ORIGINATION_TRANSPORT',
        value: 'Costo de transporte por originación'
    },
    {
        label: 'COST_ORIGINATION_EXPENSES',
        value: 'Gastos por originación'
    },
    {
        label: 'COST_ORIGINATION_SENTINEL',
        value: 'Costo originación sentinel'
    },
    {
        label: 'COST_SERVICING_LEGAL',
        value: 'Costo legal servicio de deuda'
    },
    {
        label: 'COST_SERVICING_TRANSPORT',
        value: 'Costo de transporte servicio de deuda'
    },
    {
        label: 'COST_SERVICING_EXPENSES',
        value: 'Gastos de servicio de deuda'
    },
    {
        label: 'SALARY',
        value: 'Salarios'
    }, {
        label: 'SG&A_MARKETING',
        value: 'General, Administración, Servicios - Marketing'
    }, {
        label: 'SG&A_MISCELLANEOUS',
        value: 'General, Administración, Servicios - Miscelaneo'
    },
    {
        label: 'SG&A_ACCOUNTING',
        value: 'Contabilidad'
    },
    {
        label: 'SG&A_TECH_SERVICES',
        value: 'Tecnologia'
    },
    {
        label: 'SG&A_LEGAL',
        value: 'Legal'
    },
    {
        label: 'SG&A_MAILING',
        value: 'Correspondencia'
    },
    {
        label: 'SG&A_OFFICE_RENT',
        value: 'Renta de oficina'
    },
    {
        label: 'SG&A_OFFICE_PRINT',
        value: 'Servicios de impresión'
    },
    {
        label: 'SG&A_OFFICE_STORAGE',
        value: 'Deposito'
    },
    {
        label: 'TRAVEL_EXPENSES',
        value: 'Gastos de viaje'
    },
    {
        label: 'TRANSPORT',
        value: 'Transporte general'
    }
]

let nationalIdType = [{
    label: 'Cédula o DNI',
    value: 'ID'
}, {
    label: 'Certificado Migratorio',
    value: 'IMMIGRATION_CERTIFICATE'
}, {
    label: 'Pasaporte',
    value: 'PASSPORT'
}, {
    label: 'Licencia de Conducir',
    value: 'DRIVING_LICENSE'
}]


let txConcepts = [{
        value: 'DEPOSIT',
        label: 'Deposito'
    },
    {
        value: 'WITHDRAWAL',
        label: 'Retiro'
    },
    {
        value: 'INTERNAL_TRANSFER_RECIPIENT',
        label: 'Recepción Transferencia Interna'
    },
    {
        value: 'INTERNAL_TRANSFER_SENDER',
        label: 'Envio Transferencia Interna'
    },
    {
        value: 'INTERNATIONAL_TRANSFER_RECIPIENT',
        label: 'Recepción Transferencia Intl'
    },
    {
        value: 'INTERNATIONAL_TRANSFER_SENDER',
        label: 'Envio Transferencia Intl'
    },
    {
        value: 'DIVIDENDS',
        label: 'Distribución de Utilidades'
    },
    {
        value: 'DIVIDEND_INCOME',
        label: 'Dividendos'
    },
    {
        value: 'INTEREST_COST',
        label: 'Pago de Intereses'
    },
    {
        value: 'FEE',
        label: 'Fee'
    },
    {
        value: 'COST',
        label: 'Costo'
    },
    {
        value: 'UNCLASSIFIED_COST',
        label: 'Costo sin clasificar'
    },
    {
        value: 'COMMISSION_INCOME',
        label: 'Ingreso por comisiones'
    },
    {
        value: 'COMMISSION_COST',
        label: 'Egreso por comisiones'
    },
    {
        value: 'INSURANCE_COST',
        label: 'Costo de Seguro'
    },
    {
        value: 'BANKING_FEE',
        label: 'Fee Bancario'
    },
    {
        value: 'BANKING_TRANSFER_FEE',
        label: 'Fee Transferencia Bancario'
    },
    {
        value: 'INCOME_ORIGINATION_FEE',
        label: 'Ingreso por originación'
    },
    {
        value: 'COST_ORIGINATION_LEGAL',
        label: 'Costo de originación - Legal'
    },
    {
        value: 'COST_ORIGINATION_TRANSPORT',
        label: 'Costo de originación - Transporte'
    },
    {
        value: 'COST_ORIGINATION_EXPENSES',
        label: 'Costo de originación - Gastos'
    },
    {
        value: 'COST_ORIGINATION_SENTINEL',
        label: 'Costo de originación - Sentinel'
    },
    {
        value: 'COST_SERVICING_LEGAL',
        label: 'Costo de servicio - Legal'
    },
    {
        value: 'COST_SERVICING_TRANSPORT',
        label: 'Costo de servicio - Transporte'
    },
    {
        value: 'COST_SERVICING_EXPENSES',
        label: 'Costo de servicio - Gastos'
    },
    {
        value: 'SALARY',
        label: 'Salarios'
    },
    {
        value: 'SG&A_MARKETING',
        label: 'General, Administración, Servicios - Marketing'
    }, {
        value: 'SG&A_MISCELLANEOUS',
        label: 'General, Administración, Servicios - Miscelaneo'
    },
    {
        value: 'SG&A_ACCOUNTING',
        label: 'General, Administracion, Servicios - Contabilidad'
    },
    {
        value: 'SG&A_TECH_SERVICES',
        label: 'General, Administracion, Servicios - Tecnologia'
    },
    {
        value: 'SG&A_LEGAL',
        label: 'General, Administracion, Servicios - Legal'
    },
    {
        value: 'SG&A_MAILING',
        label: 'General, Administracion, Servicios - Correspondencia'
    },
    {
        value: 'SG&A_OFFICE_RENT',
        label: 'General, Administracion, Servicios - Renta'
    },
    {
        value: 'SG&A_OFFICE_PRINT',
        label: 'General, Administracion, Servicios - Copias e Impresiones'
    },
    {
        value: 'SG&A_OFFICE_STORAGE',
        label: 'General, Administracion, Servicios - Almacenamiento'
    },
    {
        value: 'TRAVEL_EXPENSES',
        label: 'Gasto de viaje'
    },
    {
        value: 'TRANSPORT',
        label: 'Transporte'
    },
]

const initialState = {
    client: {
        gender: "MALE",
        civilStatus: "SINGLE",
        DOB: (new Date()).toISOString().substring(0, 10),
        academicLevel: "MIDDLESCHOOL",
        spouseDOB: "1990-01-01",
        country: 'peru',
        employmentStatus: "EMPLOYED",
        startDate: "2015-01-01",
        fullName: null,
        firstName: "",
        lastName: "",
        nationalId: null,
        nationality: null,
        otherNationalities: null,
        personalReference: null,
        placeOfBirth: null,
        immigrationCertificate: null,
        Occupation: null,
        spouseFullName: null,
        spouseNationalId: null,
        spousePlaceOfBirth: null,
        street: null,
        residenceName: null,
        residenceNumber: null,
        city: null,
        cellphoneNumber: null,
        email: null,
        businessName: null,
        businessAddress: null,
        businessPosition: null,
        businessPhoneNumber: null,
        businessEmail: null,
        monthlyIncome: null,
        otherIncome: null,
    },
    open: false,
    details: {}
};

const loanInitialState = {
    _id: "",
    collateralType: "NoCollateral",
    collateralValue: 0,
    collateralDescription: "",
    open: false,
    loanDetails: {
        duration: 0,
        investedCapital: 0,
        capital: 0,
        interest: 0,
        startAmortPeriod: 0,
        loanType: "linear",
        period: "monthly",
        startDate: "",
        paymentDate: ""
    },
    investmentEqCapital: true,
    // openPaymentDate: false,
    investor: "",
    currency: "USD",
    cashAccount: '',
    useOfFunds: "vehicle",
    investmentAmount: 0,
    investors: [],
    autoInvest: true
};

const initialClientState = {
    gender: "MALE",
    civilStatus: "SINGLE",
    DOB: "1990-01-01",
    academicLevel: "MIDDLESCHOOL",
    spouseDOB: "1990-01-01",
    country: 'PERU',
    employmentStatus: "EMPLOYED",
    startDate: "2015-01-01",
    fullName: null,
    nationalId: null,
    nationality: null,
    otherNationalities: null,
    placeOfBirth: null,
    immigrationCertificate: null,
    Occupation: null,
    spouseFullName: null,
    spouseNationalId: null,
    spousePlaceOfBirth: null,
    street: null,
    residenceName: null,
    residenceNumber: null,
    city: null,
    cellphoneNumber: null,
    email: null,
    businessName: null,
    businessAddress: null,
    businessPosition: null,
    businessPhoneNumber: null,
    businessEmail: null,
    monthlyIncome: null,
    otherIncome: null,
};

module.exports = {
    gender,
    civilStatus,
    academicLevel,
    employmentStatus,
    countries,
    initialState,
    initialClientState,
    accounts,
    loanInitialState,
    nationalIdType,
    ownership,
    txConstants,
    txConcepts,
    location,
    totalConcepts,
    periodicityData
}