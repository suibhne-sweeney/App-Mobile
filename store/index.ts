import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "~/types/AuthState";

const initialState: AuthState = {
    user: null,
    token: null,
    posts: [],
    friends: []
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null
        },
        setFriends: (state, action) => {
            if(state.user){
                state.user.friends = action.payload.friends;
            }else{
                console.error("user friends non-existent :(")
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) return action.payload.post;
                return post;
            })
            state.posts = updatedPosts;
        }
    }
})

export const { setLogin, setLogout, setFriends, setPost, setPosts } = authSlice.actions;
export default authSlice.reducer;