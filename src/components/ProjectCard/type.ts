interface Project{
    id?: number;
    title: string;
    description: string;
    fundingGoal: number;
    currentAmount?: number;
    startDate?: string;
    endDate?: string;
    status: 'active' | 'pending' | 'completed';
    userId: number;
}

interface ProjectImage {
    id: number;
    filename: string;
    url: string;
}

export type { Project, ProjectImage };