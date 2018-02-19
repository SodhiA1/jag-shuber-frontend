import {
    Assignment,
    AssignmentDuty, 
    Sheriff,
    StringMap, 
    AssignmentTemplate, 
    DEFAULT_RECURRENCE, 
    TrainingType,
    Courthouse,
    Courtroom,
    Region
} from "../Api";
import * as moment from 'moment';

export const TRAINING_TYPES: StringMap = {
    FRO: "FRO - Forced Response Option",
    PISTOL: "PISTOL",
    CID: "CID - Critical Incident De-Escalation",
    CEW: "CEW - Conductive Energy Weapon"
}

export const COURTHOUSES: StringMap = {
    ABBOTSFORD: "Abbotsford",
    ALEXISCREEK: "Alexis Creek",
    ANAHIMLAKE: "Anahim Lake",
    ASHCROFT: "Ashcroft",
    ATLIN: "Atlin",
    BELLABELLA: "Bella Bella",
    BELLACOOLA: "Bella Coola",
    BURNSLAKE: "Burns Lake",
    CAMPBELLRIVER: "Campbell River",
    CASTLEGAR: "Castlegar",
    CHASE: "Chase",
    CHETWYND: "Chetwynd",
    CHILLIWACK: "Chilliwack",
    CLEARWATER: "Clearwater",
    COURTENAY: "Courtenay",
    CRANBROOK: "Cranbrook",
    CRESTON: "Creston",
    DEASELAKE: "Dease Lake",
    DOWNTOWNCOMMUNITYCOURT: "Downtown Community Court",
    DUNCAN: "Duncan",
    FERNIE: "Fernie",
    FORTSTJAMES: "Fort St. James",
    FORTSTJOHN: "Fort St. John",
    FORTWARE: "Fort Ware (Kwadacha)",
    FRASERLAKE: "Fraser Lake",
    GANGES: "Ganges",
    GOLDEN: "Golden",
    GOLDRIVER: "Gold River",
    GOODHOPELAKE: "Good Hope Lake",
    GRANDFORKS: "Grand Forks",
    HAZELTON: "Hazelton",
    HOUSTON: "Houston",
    HUDSONSHOPE: "Hudson's Hope",
    INVERMERE: "Invermere",
    KAMLOOPS: "Kamloops",
    KELOWNA: "KELOWNA",
    KITIMAT: "Kitimat",
    KLEMTU: "Klemtu",
    LILLOOET: "Lilloet",
    LOWERPOST: "Lower Post",
    MACKENZIE: "Mackenzie",
    MASSET: "Masset",
    MCBRIDE: "McBride",
    MERRITT: "Merritt",
    NAKUSP: "Nakusp",
    NANAIMO: "Nanaimo",
    NELSON: "Nelson",
    NEWAIYANSH: "New Aiyansh",
    NEWWESTMINSTER: "New Westminster",
    NORTHVANCOUVER: "North Vancouver",
    HUNDREDMILEHOUSE: "100 Mile House",
    PEMBERTON: "Pemberton",
    PENTICTON: "Penticton",
    PORTALBERNI: "Port Alberni",
    PORTCOQUITLAM: "Port Coquitlam",
    PORTHARDY: "Port Hardy",
    POWELLRIVER: "Powell River",
    PRINCEGEORGE: "Prince George",
    PRINCERUPERT: "Prince Rupert",
    PRINCETON: "Princeton",
    QUEENCHARLOTTE: "Queen Charlotte",
    QUESNEL: "Quesnel",
    REVELSTOKE: "Revelstoke",
    RICHMOND: "Richmond",
    ROSSLAND: "Rossland",
    SALMONARM: "Salmon Arm",
    SECHELT: "Sechelt",
    SIDNEY: "Sidney",
    SMITHERS: "Smithers",
    SPARWOOD: "Sparwood",
    STEWART: "Stewart",
    SURREY: "Surrey",
    TAHSIS: "Tahsis",
    TERRACE: "Terrace",
    TOFINO: "Tofino",
    TSAYKEHDENE: "Tsay Keh Dene (Ingenika)",
    TUBLERRIDGE: "Tumbler Ridge",
    UCLULET: "Ucluelet",
    VALEMOUNT: "Valemont",
    VLC: "Vancouver - VLC",
    VANCOUVER: "Vancouver - 222 Main",
    ROBSONSQUARE: "Vancouver - Robson Square",
    VANDERHOOF: "Vanderhoof",
    VERNON: "Vernon",
    VICTORIA: "Victoria",
    WESTERNCOMMUNITIES: "Western Communities",
    WILLIAMSLAKE: "Williams Lake"
}

export const REGIONS: StringMap = {
    FRASER: "Fraser",
    INTERIOR: "Interior",
    NORTHERN: "Northern",
    VANCENTRE: "Van Centre",
    VANISLAND: "Vancouver Island"
}

export const WORK_SECTIONS: StringMap = {
    COURTS: "Courts",
    JAIL: "Jail",
    ESCORTS: "Escorts",
    DOCUMENTS: "Documents",
    GATES: "Gates",
    OTHER: "Other"
}

export const COURTROOMS: StringMap = {
    101: "Courtroom 101",
    102: "Courtroom 102",
    103: "Courtroom 103",
    104: "Courtroom 104",
    201: "Courtroom 201",
    202: "Courtroom 202",
    203: "Courtroom 203",
    204: "Courtroom 204"
}

export const sheriffList: Sheriff[] = [
    {
        firstName: "Garfield",
        lastName: "Shirley",
        badgeNumber: 969,
        imageUrl: '/img/garfield_shirley.jpg',
        permanentLocation: { courthouseId: "VANCOUVER", regionId: "VANCENTRE" },
        currentLocation: { courthouseId: "VANCOUVER", regionId: "VANCENTRE" },
        training: [
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "FRO" },
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "PISTOL" },
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "CID" },
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "CEW" }
        ],
        onDuty: true
    },
    {
        firstName: "Jaqueline",
        lastName: "Jackson",
        badgeNumber: 204,
        imageUrl: '/img/jaqueline_jackson.jpg',
        permanentLocation: { courthouseId: "KAMLOOPS", regionId: "INTERIOR" },
        currentLocation: { courthouseId: "KAMLOOPS", regionId: "INTERIOR" },
        training: [
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "FRO" },
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "PISTOL" },
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "CID" },
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "CEW" }
        ],
        onDuty: true
    },
    {
        firstName: "Landon",
        lastName: "Bludnell",
        badgeNumber: 790,
        imageUrl: '/img/landon_bludnell.jpg',
        permanentLocation: { courthouseId: "PRINCEGEORGE", regionId: "NORTHERN" },
        currentLocation: { courthouseId: "PRINCEGEORGE", regionId: "NORTHERN" },
        training: [
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "FRO" },
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "PISTOL" },
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "CID" },
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "CEW" }
        ],
        onDuty: false
    },
    {
        firstName: "Rob",
        lastName: "Lucas",
        badgeNumber: 987,
        imageUrl: '/img/rob_lucas.jpg',
        permanentLocation: { courthouseId: "NEWWESTMINSTER", regionId: "FRASER" },
        currentLocation: { courthouseId: "NEWWESTMINSTER", regionId: "FRASER" },
        training: [
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "FRO" },
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "PISTOL" },
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "CID" },
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "CEW" }
        ],
        onDuty: true
    },
    {
        firstName: "Steve",
        lastName: "Gill",
        badgeNumber: 932,
        imageUrl: '/img/steve_gill.jpg',
        permanentLocation: { courthouseId: "SURREY", regionId: "FRASER" },
        currentLocation: { courthouseId: "SURREY", regionId: "FRASER" },
        training: [
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "FRO" },
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "PISTOL" },
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "CID" },
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "CEW" }
        ],
        onDuty: false
    },
    {
        firstName: "Steve",
        lastName: "Jervis",
        badgeNumber: 579,
        imageUrl: '/img/steve_jervis.jpg',
        permanentLocation: { courthouseId: "VLC", regionId: "VANCENTRE" },
        currentLocation: { courthouseId: "VLC", regionId: "VANCENTRE" },
        training: [
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "FRO" },
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "PISTOL" },
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "CID" },
            { certificationDate: "Mon Jan 20 2017", expiryDate: "Mon Jan 20 2018", trainingType: "CEW" }
        ],
        onDuty: true
    }
];


export const assignments: Assignment[] = [
    {
        id: 0,
        title: COURTROOMS[101],
        workSectionId: 'COURTS',
        location:{
            courtroomId: 101
        }
    },
    {
        id: 1,
        title: COURTROOMS[102],
        workSectionId: 'COURTS',
        location:{
            courtroomId: 102
        }
    },
    {
        id: 2,
        title: COURTROOMS[103],
        workSectionId: 'COURTS',
        location:{
            courtroomId: 103
        }
    },
    {
        id: 3,
        title: COURTROOMS[104],
        workSectionId: 'COURTS',
        location:{
            courtroomId: 104
        }
    },
    {
        id: 4,
        title: COURTROOMS[201],
        workSectionId: 'COURTS',
        location:{
            courtroomId: 201
        }
    },
    {
        id: 5,
        title: 'Document Service',
        workSectionId: 'DOCUMENTS',
    },
    {
        id: 6,
        title: 'Escorts',
        workSectionId: 'ESCORTS'
    },
    {
        id: 7,
        title: 'Gate Secturity',
        workSectionId: 'GATES'
    }
];

export const assignmentDuties: AssignmentDuty[] = [
    {
        id: 0,
        assignmentId: assignments[0].id,
        sheriffIds: [],
        startDateTime: moment().startOf('day').add(16, 'hours'),
        endDateTime: moment().startOf('day').add(18, 'hours'),
        sheriffsRequired: 1,
        extraDetails:{
            notes: 'My notes on the file.'
        }        
    },
    {
        id: 1,
        assignmentId: assignments[1].id,
        sheriffIds: [579],
        startDateTime: moment().startOf('day').add(14, 'hours'),
        endDateTime: moment().startOf('day').add(18, 'hours'),
        sheriffsRequired: 1,
        extraDetails:{
            notes: 'My notes on the file.'
        }        
    }
]

export const defaultAssignmentTemplates: AssignmentTemplate[] = [
    {
        id: 0,
        assignmentId: assignments[0].id,
        recurrenceInfo: [
            DEFAULT_RECURRENCE
        ]
    },
    {
        id: 1,
        assignmentId: assignments[1].id,
        recurrenceInfo: [
            DEFAULT_RECURRENCE
        ]
    },
    {
        id: 2,
        assignmentId: assignments[2].id,
        recurrenceInfo: [
            DEFAULT_RECURRENCE
        ]
    },
    {
        id: 3,
        assignmentId: assignments[3].id,
        recurrenceInfo: [
            DEFAULT_RECURRENCE
        ]
    }
];

export const training: TrainingType[] = [
    {
        id: 0, 
        title: "FRO - Forced Response Option",
        abbreviation: "FRO"
    },
    {
        id: 1, 
        title: "PISTOL",
        abbreviation: "PISTOL"
    },
    {
        id: 2, 
        title: "CID - Critical Incident De-Escalation",
        abbreviation: "CID"
    },
    {
        id: 3, 
        title: "CEW - Conductive Energy Weapon",
        abbreviation: "CEW"
    },
];

export const courthouses: Courthouse[] = [
    { 
        id: 0,
        name: "Abbotsford",
        regionId: 0
    },
    { 
        id: 1,
        name: "Alexis Creek",
        regionId: 0
    },
    { 
        id: 2,
        name: "Anahim Lake",
        regionId: 0
    },
    { 
        id: 3,
        name: "Ashcroft",
        regionId: 0
    },
    { 
        id: 4,
        name: "Atlin",
        regionId: 0
    },
    { 
        id: 5,
        name: "Bella Bella",
        regionId: 0
    },
    { 
        id: 6,
        name: "Bella Coola",
        regionId: 0
    },
    { 
        id: 7,
        name: "Burns Lake",
        regionId: 0
    },
    { 
        id: 8,
        name: "Campbell River",
        regionId: 0
    },
    { 
        id: 9,
        name: "Castlegar",
        regionId: 0
    },
    { 
        id: 10,
        name: "Chase",
        regionId: 0
    },
    { 
        id: 11,
        name: "Chetwynd",
        regionId: 0
    },
    { 
        id: 12,
        name: "Chilliwack",
        regionId: 0
    },
    { 
        id: 13,
        name: "Clearwater",
        regionId: 0
    },
   { 
       id: 14,
       name:  "Courtenay",
       regionId: 0
    },
    { 
        id: 15,
        name: "Cranbrook",
        regionId: 0
    },
    { 
        id: 16,
        name: "Creston",
        regionId: 0
    },
    { 
        id: 17,
        name: "Dease Lake",
        regionId: 0
    },
    { 
        id: 18,
        name: "Downtown Community Court",
        regionId: 0
    },
    { 
        id: 19,
        name: "Duncan",
        regionId: 0
    },
    { 
        id: 20,
        name: "Fernie",
        regionId: 0
    },
    { 
        id: 21,
        name: "Fort St. James",
        regionId: 0
    },
    { 
        id: 22,
        name: "Fort St. John",
        regionId: 0
    },
    { 
        id: 23,
        name: "Fort Ware (Kwadacha)",
        regionId: 0
    },
    { 
        id: 24,
        name: "Fraser Lake",
        regionId: 0
    },
    { 
        id: 25,
        name: "Ganges",
        regionId: 0
    },
    { 
        id: 26,
        name: "Golden",
        regionId: 0
    },
    { 
        id: 27,
        name: "Gold River",
        regionId: 0
    },
    { 
        id: 28,
        name: "Good Hope Lake",
        regionId: 0
    },
    { 
        id: 29,
        name: "Grand Forks",
        regionId: 0
    },
    { 
        id: 30,
        name: "Hazelton",
        regionId: 0
    },
    { 
        id: 31,
        name: "Houston",
        regionId: 0
    },
    { 
        id: 32,
        name: "Hudson's Hope",
        regionId: 0
    },
    { 
        id: 33,
        name: "Invermere",
        regionId: 0
    },
    { 
        id: 34,
        name: "Kamloops",
        regionId: 0
    },
    { 
        id: 35,
        name: "Kelowna",
        regionId: 0
    },
    { 
        id: 36,
        name: "Kitimat",
        regionId: 0
    },
    { 
        id: 37,
        name: "Klemtu",
        regionId: 0
    },
    { 
        id: 38,
        name: "Lilloet",
        regionId: 0
    },
    { 
        id: 39,
        name: "Lower Post",
        regionId: 0
    },
    { 
        id: 40,
        name: "Mackenzie",
        regionId: 0
    },
    { 
        id: 41,
        name: "Masset",
        regionId: 0
    },
    { 
        id: 42,
        name: "McBride",
        regionId: 0
    },
    { 
        id: 43,
        name: "Merritt",
        regionId: 0
    },
    { 
        id: 44,
        name: "Nakusp",
        regionId: 0
    },
    { 
        id: 45,
        name: "Nanaimo",
        regionId: 0
    },
    { 
        id: 46,
        name: "Nelson",
        regionId: 0
    },
    { 
        id: 47,
        name: "New Aiyansh",
        regionId: 0
    },
    { 
        id: 48,
        name: "New Westminster",
        regionId: 0
    },
    { 
        id: 49,
        name: "North Vancouver",
        regionId: 0
    },
    { 
        id: 50,
        name: "100 Mile House",
        regionId: 0
    },
    { 
        id: 51,
        name: "Pemberton",
        regionId: 0
    },
    { 
        id: 52,
        name: "Penticton",
        regionId: 0
    },
    { 
        id: 53,
        name: "Port Alberni",
        regionId: 0
    },
    { 
        id: 54,
        name: "Port Coquitlam",
        regionId: 0
    },
    { 
        id: 54,
        name: "Port Hardy",
        regionId: 0
    },
    { 
        id: 55,
        name: "Powell River",
        regionId: 0
    },
    { 
        id: 56,
        name: "Prince George",
        regionId: 0
    },
    { 
        id: 57,
        name: "Prince Rupert",
        regionId: 0
    },
    { 
        id: 58,
        name: "Princeton",
        regionId: 0
    },
    { 
        id: 59,
        name: "Queen Charlotte",
        regionId: 0
    },
    { 
        id: 60,
        name: "Quesnel",
        regionId: 0
    },
    { 
        id: 61,
        name: "Revelstoke",
        regionId: 0
    },
    { 
        id: 62,
        name: "Richmond",
        regionId: 0
    },
    { 
        id: 63,
        name: "Rossland",
        regionId: 0
    },
    { 
        id: 64,
        name: "Salmon Arm",
        regionId: 0
    },
    { 
        id: 65,
        name: "Sechelt",
        regionId: 0
    },
    { 
        id: 66,
        name: "Sidney",
        regionId: 0
    },
    { 
        id: 67,
        name: "Smithers",
        regionId: 0
    },
    { 
        id: 68,
        name: "Sparwood",
        regionId: 0
    },
    { 
        id: 69,
        name: "Stewart",
        regionId: 0
    },
    { 
        id: 70,
        name: "Surrey",
        regionId: 0
    },
    { 
        id: 71,
        name: "Tahsis",
        regionId: 0
    },
    { 
        id: 72,
        name: "Terrace",
        regionId: 0
    },
    { 
        id: 73,
        name: "Tofino",
        regionId: 0
    },
    { 
        id: 74,
        name: "Tsay Keh Dene (Ingenika)",
        regionId: 0
    },
    { 
        id: 75,
        name: "Tumbler Ridge",
        regionId: 0
    },
    { 
        id: 76,
        name: "Ucluelet",
        regionId: 0
    },
    { 
        id: 77,
        name: "Valemont",
        regionId: 0
    },
    { 
        id: 78,
        name: "Vancouver - VLC",
        regionId: 0
    },
    { 
        id: 79,
        name: "Vancouver - 222 Main",
        regionId: 0
    },
    { 
        id: 80,
        name: "Vancouver - Robson Square",
        regionId: 0
    },
    { 
        id: 81,
        name: "Vanderhoof",
        regionId: 0
    },
    { 
        id: 82,
        name: "Vernon",
        regionId: 0
    },
    { 
        id: 83,
        name: "Victoria",
        regionId: 0
    },
    { 
        id: 84,
        name: "Western Communities",
        regionId: 0
    },
    { 
        id: 85,
        name: "Williams Lake",
        regionId: 0
    }
];

export const regions: Region[] = [
    {
        id: 0, 
        name: "Fraser"
    },
    {
        id: 1, 
        name: "Interior"
    },
    {
        id: 2, 
        name: "Northern"
    },
    {
        id: 3, 
        name: "Van Centre"
    },
    {
        id: 4, 
        name: "Vancouver Island"
    }
];

export const courtrooms: Courtroom[] = [
    {
        id: 0, 
        courthouseId: 79, 
        number: 101,
        name: "Courtroom 101"
    },
    {
        id: 1, 
        courthouseId: 79, 
        number: 102,
        name: "Courtroom 102"
    },
    {
        id: 2, 
        courthouseId: 79, 
        number: 103,
        name: "Courtroom 103"
    },
    {
        id: 3, 
        courthouseId: 79, 
        number: 104,
        name: "Courtroom 104"
    },
    {
        id: 4,
        courthouseId: 79, 
        number: 201,
        name: "Courtroom 201"
    },
    {
        id: 5, 
        courthouseId: 79, 
        number: 202,
        name: "Courtroom 202"
    },
    {
        id: 6, 
        courthouseId: 79, 
        number: 203,
        name: "Courtroom 203"
    },
    {
        id: 7, 
        courthouseId: 79, 
        number: 204,
        name: "Courtroom 204"
    }
];