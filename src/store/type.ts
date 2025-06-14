

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
    email: string;
    password?: string;
    phone: string;
}

export type { User, Direction }