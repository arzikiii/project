export interface User {
  id: number;
  username: string;
  email: string;
  activeSubscription: UserSubscription;
  createdAt: Date;
  updatedAt: Date;
  rememberMeToken: string;
}

export interface UserSubscription {
  plan: string;
  endDate: Date;
}

export interface Projects {
  id: number;
  name: string;
  projectType: Type;
}

export interface ProjectType {
  types: Type[];
}

export interface Type {
  id: number;
  name: string;
}
