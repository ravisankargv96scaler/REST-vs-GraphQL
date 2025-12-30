import { User, QuizQuestion } from './types';

export const MOCK_USERS: User[] = [
  {
    id: 1,
    name: "Alice Developer",
    email: "alice@tech.io",
    role: "Admin",
    posts: [
      { id: 101, title: "Why I love GraphQL", content: "..." },
      { id: 102, title: "Understanding HTTP 200", content: "..." },
      { id: 103, title: "API Design 101", content: "..." },
    ]
  },
  {
    id: 2,
    name: "Bob Backend",
    email: "bob@server.net",
    role: "User",
    posts: [
      { id: 201, title: "Database Optimization", content: "..." }
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Which approach typically prevents 'Over-fetching' of data?",
    options: ["REST", "GraphQL", "Both", "Neither"],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "Which architecture leverages standard HTTP caching mechanisms (ETag, browser cache) most easily?",
    options: ["GraphQL", "WebSockets", "REST", "gRPC"],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "Does GraphQL typically expose multiple endpoints for different resources?",
    options: ["Yes, one per resource", "No, typically a single endpoint", "Only for mutations", "It depends on the browser"],
    correctAnswer: 1
  }
];
