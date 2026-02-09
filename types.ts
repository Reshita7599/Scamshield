
export enum RiskLevel {
  SAFE = 'SAFE',
  SUSPICIOUS = 'SUSPICIOUS',
  MALICIOUS = 'MALICIOUS',
  UNKNOWN = 'UNKNOWN'
}

export interface SecurityAnalysisResult {
  riskLevel: RiskLevel;
  score: number; // 0 to 100
  summary: string;
  details: string[];
  recommendation: string;
}

export interface Flashcard {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export interface Article {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: 'News' | 'Best Practice' | 'Exploit';
  readTime: string;
  url: string;
}

export interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: string;
  isAi: boolean;
}

export interface User {
  username: string;
  avatar: string; // Initial
  isLoggedIn: boolean;
}

export interface CommunityPost {
  id: number;
  author: string;
  avatar: string; // URL or initial
  content: string;
  timestamp: string;
  likedBy: string[]; // Array of usernames who liked
  comments: Comment[];
  tags: string[];
}

export enum AppView {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  URL_SCANNER = 'URL_SCANNER',
  EMAIL_SCANNER = 'EMAIL_SCANNER',
  COMMUNITY = 'COMMUNITY',
  CODE_SCANNER = 'CODE_SCANNER',
  PASSWORD_CHECKER = 'PASSWORD_CHECKER',
  EDUCATION = 'EDUCATION',
  DEPLOY_GUIDE = 'DEPLOY_GUIDE',
}
