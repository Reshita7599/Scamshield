
export interface AuthResponse {
  success: boolean;
  message: string;
}

const DB_KEY = 'scamshield_users_db';

// Simple helper to simulate a database delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  register: async (username: string, password: string): Promise<AuthResponse> => {
    await delay(800); // Simulate network request

    // 1. Get existing users
    const usersStr = localStorage.getItem(DB_KEY);
    const users = usersStr ? JSON.parse(usersStr) : [];

    // 2. Check if user already exists
    const exists = users.find((u: any) => u.username.toLowerCase() === username.toLowerCase());
    if (exists) {
      return { success: false, message: 'Username already taken.' };
    }

    // 3. Save new user
    // Note: In a real backend, we would Hash the password (e.g., bcrypt) before saving.
    // For this local demo, we store it simply to make the logic work.
    users.push({ username, password, joinedAt: new Date().toISOString() });
    localStorage.setItem(DB_KEY, JSON.stringify(users));

    return { success: true, message: 'Registration successful!' };
  },

  login: async (username: string, password: string): Promise<AuthResponse> => {
    await delay(800); // Simulate network request

    // 1. Get users
    const usersStr = localStorage.getItem(DB_KEY);
    const users = usersStr ? JSON.parse(usersStr) : [];

    // 2. Find user
    const user = users.find((u: any) => u.username.toLowerCase() === username.toLowerCase());

    if (!user) {
      return { success: false, message: 'User not found. Please register first.' };
    }

    // 3. Check password
    if (user.password !== password) {
      return { success: false, message: 'Invalid password.' };
    }

    return { success: true, message: 'Login successful.' };
  }
};
