export interface Task {
  id: string;
  name: string;
  completed: boolean;
}

export interface SvgProps {
  width?: number;
  height?: number;
  color?: string;
}

export type Filter = "active" | "completed" | "all";
