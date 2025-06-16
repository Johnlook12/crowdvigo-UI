interface Project{
    id: number;
    title: string;
    description: string;
    category: string;
    fundingGoal: number;
    currentAmount: number;
    startDate: string;
    endDate: string;
    userId: number;
}

interface ProjectImage {
    id: number;
    filename: string;
    url: string;
}

export type { Project, ProjectImage };