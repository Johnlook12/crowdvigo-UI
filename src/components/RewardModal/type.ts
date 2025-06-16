interface Reward{
    id: number;
    title: string;
    description: string;
    minimumAmount: number;
    estimatedDeliveryDate: string;
    projectId: number;
}

export type { Reward };