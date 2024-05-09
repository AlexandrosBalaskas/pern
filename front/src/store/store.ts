import { configureStore } from "@reduxjs/toolkit";
import TableReducer from "./table/reducers";
import DrawerReducer from "./drawer/reducers";

export const store = configureStore({
  reducer: {
    Tables: TableReducer,
    Drawer: DrawerReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
