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

export interface ISearchOption {
  id: number;
  name: string;
  group: string;
  path?: string;
}

// User Addresses-------------------------------------------------------------------------------------------------------------->
export interface FormAddressData {
  id?: number;
  full_name: string;
  phone: string;
  address_line1: string;
  city: string;
  postal_code: string;
  state: string;
  address_line2: string;
  address_type: string;
  is_open_saturday: boolean;
  is_open_sunday: boolean;
  is_default: boolean;
}

export interface AddressCardProps {
  address: FormAddressData;
  isDefault: boolean;
  selectedIndex: number;
  onMakeDefault: () => void;
  isSelected: boolean;
  onClick: () => void;
  onEdit: () => void;
  handleDeleteClick: (index: number) => void;
}

// ADD TO CART >>>>>>>------------------------------------------------------>>>>>>>>>>---------------------------------------------------------------->>>>>>>>>>>>>>

export interface CartResponse {
  user: User;
  items: CartItems[];
  total: number;
  totalAmount: number;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
}

export interface CartItems {
  id: number;
  cart_id: number;
  product_id: number;
  quantity: number;
  size: string | null;
  color: string | null;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
  product: Product;
  isAvailable: boolean;
  isSelected: boolean;
}

export interface Coupon {
  id: number;
  code: string;
  discount: string;
  discount_text: string;
  min_order_amount: string;
  max_savings_amount: string;
  expiry_date: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  image: string[];
  price: string;
  discount: number;
  quantity: number;
  category_id: number;
  sub_category_id: number;
  sub_category_type_id: number;
  brand_id: number;
  create_at: string;
  updated_at: string;
  is_deleted: boolean;
  is_featured: boolean;
  views_count: number;
  category: Category;
  sub_category: SubCategory;
  sub_category_type: SubCategoryType;
  brand: Brand;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  create_at: string;
  updated_at: string;
  is_deleted: boolean;
}

export interface SubCategory {
  id: number;
  name: string;
  description: string;
  create_at: string;
  updated_at: string;
  is_deleted: boolean;
  category_id: number;
}

export interface SubCategoryType {
  id: number;
  name: string;
  description: string;
  category_id: number;
  sub_category_id: number;
  create_at: string;
  updated_at: string;
  is_deleted: boolean;
}

export interface Brand {
  id: number;
  name: string;
  description: string;
  create_at: string;
  updated_at: string;
  is_deleted: boolean;
}
