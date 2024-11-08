import { createApi, CreateApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Project {
    id: number;
    name: string
    desc?: string
    startDate?: string
    endDate?: string
}



export enum Priority {
    Urgent = "Urgent",
    High = "High",
    Medium = "Medium",
    Low = "Low",
    Backlog = "Backlog",
}

export enum Status {
    ToDo = "To Do",
    WorkInProgress = "Work In Progress",
    UnderReview = "Under Review",
    Completed = "Completed",
}

export interface User {
    userId?: number;
    username: string;
    email: string;
    profilePictureUrl?: string;
    cognitoId?: string;
    teamId?: number;
}

export interface Attachment {
    id: number;
    fileURL: string;
    fileName: string;
    taskId: number;
    uploadedById: number;
}

export interface Task {
    id: number
    title: string
    description?: string
    status?: Status
    priority?: Priority
    tags?: string
    startDate?: string
    dueDate?: string
    points?: number
    projectId: number
    authorUserId?: number
    assignedUserId?: number

    author?: User;
    assignee?: User;
    comments?: Comment[];
    attachments?: Attachment[]

}

export interface SearchResults {
    tasks?: Task[];
    projects?: Project[];
    users?: User[];
  }

export interface Team{
    id: number;
    teamName: string;
    productOwnerUserId: number;
    projectManagerUserId: number;
    productOwnerUserName: string;
    projectManagerUsername: string;
}
  
export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
    reducerPath: 'api',
    tagTypes: ['Projects', 'Tasks','Users',"Teams"],
    endpoints: (build) => ({


        // "first will the return type of data , second is type of data we are passing"
        getProjects: build.query<Project[], void>({
            query: () => 'projects',
            providesTags: ['Projects'],
        }),

        createProject: build.mutation<Project, Partial<Project>>({
            query: (project) => ({
                url: 'projects',
                method: 'POST',
                body: project,
            }),
            invalidatesTags: ['Projects'], // Automatically refreshes the projects list
        }),

        getTasks: build.query<Task[], { projectId: number }>({
            query: ({ projectId }) => `tasks?projectId=${projectId}`,
            providesTags: (result) =>
                result
                    ? result.map(({ id }) => ({ type: 'Tasks', id }))
                    : [{ type: 'Tasks' }],
        }),

        createTask: build.mutation<Task, Partial<Task>>({
            query: (task) => ({
                url: 'tasks',
                method: 'POST',
                body: task,
            }),
            invalidatesTags: ['Tasks'], // Automatically refreshes the projects list
        }),

        updateTaskStatus: build.mutation<Task, { taskId: number, status: string }>({
            query: ({ taskId, status }) => ({
                url: `tasks/${taskId}/status`,
                method: 'PATCH',
                body: { status },
            }),

            // we aredoing this differently becuase we are invalidating this individual task dont want to refetch each only 
            // those are updatting 
            invalidatesTags: (result, error, { taskId }) => [
                { type: "Tasks", id: taskId }
            ],
        }),

        search :build.query<SearchResults, string>({
            query:(query)=>`/search?query=${query}`,

        }),
        getUsers: build.query<User[], void>({
            query: () => 'users',
            providesTags: ['Users'],
        }),
        
        getTeams: build.query<Team[], void>({
            query: () => 'teams',
            providesTags: ['Teams'],
        }),
        
        getTasksByUserId: build.query<Task[], number>({
            query: (userId) => `tasks/user/${userId}`,
            providesTags: (result, error, userId) =>
                result
                    ? result.map(({ id }) => ({ type: 'Tasks', id })) // Cache each task by its ID
                    : [{ type: 'Tasks' }], // If no result, still provide the 'Tasks' tag
        }),

    }),
});



export const {
    useGetProjectsQuery,       // Hook for getting projects
    useCreateProjectMutation,  // Hook for creating a project
    useGetTasksQuery,          // Hook for getting tasks
    useCreateTaskMutation,
    useUpdateTaskStatusMutation , // Hook for creating a task,
    useSearchQuery,
    useGetUsersQuery,
    useGetTeamsQuery,
    useGetTasksByUserIdQuery,
} = api;
