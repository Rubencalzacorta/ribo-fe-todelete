const fees = [{
        text: "Ribo",
        fee: [{
            "admin": "5d3b2da39657b30017a9ed0c",
            "fee": 0.70
        }]
    },
    {
        text: "Miguel 10%",
        fee: [{
            "admin": "5c80fd19a5b4b86c15c18b8c",
            "fee": 0.1
        }]
    },
    {
        text: "Carrillo 15%, Castillo 15%, Miguel 10%",
        fee: [{
                "admin": "5cbded7d396ebf05b289cbbe",
                "fee": 0.15
            },
            {
                "admin": "5cd19be0821e200017b6fec2",
                "fee": 0.15
            },
            {
                "admin": "5cd19693821e200017b6fec1",
                "fee": 0.1
            }
        ]
    },
    {
        text: "Castillo 15%, Manuela 15%, Miguel 10%",
        fee: [{
                "admin": "5cd19be0821e200017b6fec2",
                "fee": 0.15
            },
            {
                "admin": "5cd19693821e200017b6fec1",
                "fee": 0.1
            },
            {
                "admin": "5cb642eda14a6d0017039aaa",
                "fee": 0.15
            }
        ]
    },
    {
        text: "Castillo 15%, Miguel 10%",
        fee: [{
                "admin": "5cd19be0821e200017b6fec2",
                "fee": 0.15
            },
            {
                "admin": "5cd19693821e200017b6fec1",
                "fee": 0.1
            }
        ]
    }



]

const accounts = ["RBPERU", "GCUS", "GFUS", "GCDR"]

const feeDistribution = [{
        participants: "P",
        text: "Patricia 33.33%"
    },
    {
        participants: "PG",
        text: "Patricia 50%"
    },
    {
        participants: "PM",
        text: "Patricia 30%, Miguel 10%"
    },
    {
        participants: "GPM",
        text: "Patricia 45%, Miguel 10%"
    },
    {
        participants: "M",
        text: "Miguel 10%"
    }
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
        label: 'DIVESTMENT',
        value: 'Desinversión'
    },
    {
        label: 'INVESTMENT',
        value: 'Inversión'
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
        label: 'DIVIDENDS',
        value: 'Dividendos'
    },
    {
        label: 'INTEREST',
        value: 'Intereses'
    },
    {
        label: 'CAPITAL',
        value: 'Capital'
    },
    {
        label: 'FEE',
        value: 'Fee'
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
        label: 'MANAGEMENT_FEE',
        value: 'Fee de gestión'
    },
    {
        label: 'MANAGEMENT_INTEREST',
        value: 'Intereses por gestión'
    },
    {
        label: 'INSURANCE_COST',
        value: 'Costo de seguro'
    },
    {
        label: 'INSURANCE_PREMIUM',
        value: 'Prima de seguro'
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
    fees,
    accounts,
    feeDistribution,
    loanInitialState,
    nationalIdType,
    ownership,
    txConstants
}