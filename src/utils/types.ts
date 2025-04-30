export interface SubCategoryType {
  id: number;
  name: string;
  description: string;
}

export interface SubCategory {
  id: number;
  name: string;
  description: string;
  sub_category_types: SubCategoryType[];
}

export interface Category {
  id: number;
  name: string;
  description: string;
  sub_categories: SubCategory[];
}

export interface CategoryResponse {
  id: number;
  name: string;
  description: string;
  sub_categories: SubCategory[];
}
