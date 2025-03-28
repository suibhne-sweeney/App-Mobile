import { Post } from "./Post";
import { User } from "./User";

export interface AuthState{
    user: User | null,
    token: string | null,
    posts: Post[],
    friends: string[]
}