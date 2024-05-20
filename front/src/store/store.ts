import { configureStore } from "@reduxjs/toolkit";
import MenuReducer from "./menu/reducers";
import EntityReducer from "./entity/reducers";
import TableReducer from "./table/reducers";
import DrawerReducer from "./drawer/reducers";
import CodelistReducer from "./codelist/reducers";
import ValidationReducer from "./validations/reducers";

export const store = configureStore({
  reducer: {
    MenuItems: MenuReducer,
    Entities: EntityReducer,
    Tables: TableReducer,
    Drawer: DrawerReducer,
    Codelists: CodelistReducer,
    Validations: ValidationReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
