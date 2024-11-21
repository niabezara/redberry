export interface Agent {
  id: number;
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  photo: string | null; // `null` if there's no photo
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  deletedAt: string | null; // `null` if not deleted
}

export interface AgentsResponse {
  data: Agent[];
}
