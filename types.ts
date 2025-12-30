export interface Post {
  id: number;
  title: string;
  content: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  posts: Post[];
}

export type TabId = 'philosophy' | 'rest-client' | 'graphql-explorer' | 'problem-solving' | 'comparison' | 'quiz';

export interface TabConfig {
  id: TabId;
  label: string;
  icon: any; // Lucide icon type
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index
}
