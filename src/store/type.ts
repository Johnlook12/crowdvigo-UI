

interface Direction{
    id: number;
    streetType: string;
    streetName: string  ;
    floor: string;
    letter: string;
}

interface User { 
    id?: number;
    firstName: string;
    lastName: string;
    username: string;
    companyName?: string;
    email: string;
    password?: string;
    phone: string;
    typeUser: string
}

interface Contribution{
    id?: number;
    amount: number;
    date: string;
    userId: number;
    projectId: number;
}

export type { User, Direction, Contribution }