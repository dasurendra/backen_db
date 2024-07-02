import bcrypt from "bcryptjs";

// Define the User interface
interface User {
    id: number;
    username: string;
    email: string;
    password: string;
}

// In-memory users array and a counter for user IDs
const users: User[] = [];
let userIdCounter = 1;

export class UserService {
    // Create a new user with hashed password
    async createUser(username: string, email: string, password: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user: User = { id: userIdCounter++, username, email, password: hashedPassword };
        users.push(user);
        return user;
    }

    // Find a user by their email
    async getUserByEmail(email: string): Promise<User | undefined> {
        return users.find(user => user.email === email);
    }

    // Compare the provided password with the hashed password
    async comparePassword(user: User, password: string): Promise<boolean> {
        return bcrypt.compare(password, user.password);
    }
}
