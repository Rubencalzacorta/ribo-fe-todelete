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
    ownership
}