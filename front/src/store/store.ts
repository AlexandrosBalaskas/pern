import { configureStore } from "@reduxjs/toolkit";
import DrawerReducer from "./drawer/reducers";

console.log(DrawerReducer, "draweReducer");

export const store = configureStore({
  reducer: {
    Drawer: DrawerReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
