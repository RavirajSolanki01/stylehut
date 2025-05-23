import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CategoryResponse } from "../../utils/types";

type Categories = { label: string; color: string; id: number };

const initialState = {
  categories: [{ label: "", color: "", id: 0 }],
  subCategories: [
    {
      id: 0,
      name: "",
      description: "",
      sub_categories: [
        {
          id: 0,
          name: "",
          description: "",
          sub_category_types: [{ id: 0, name: "", description: "" }],
        },
      ],
    },
  ],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategories: (state, action: PayloadAction<Categories[]>) => {
      state.categories = action.payload;
    },
    addSubCategories: (state, action: PayloadAction<CategoryResponse[]>) => {
      state.subCategories = action.payload;
    },
  },
});

export const { addCategories, addSubCategories } =
categoriesSlice.actions;

export default categoriesSlice.reducer;
