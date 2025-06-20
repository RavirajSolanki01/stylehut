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
  product_additional_details: ProductAdditionalDetails[];
  product_specifications: ProductSpecifications[];
}

export interface ProductAdditionalDetails {
  id: number;
  value: string;
  product_id: number;
  additional_key_id: number;
  created_at: string;
  updated_at: string;
  product_additional_detail_key: {
    id: number;
    name: string;
  };
}

export interface ProductSpecifications {
  id: number;
  value: string;
  product_id: number;
  specification_id: number;
  created_at: string;
  updated_at: string;
  product_specification_key: {
    id: number;
    name: string;
  };
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

interface SizeChartData {
  size_field_name: string;
  size_field_value: string;
}

export interface SizeData {
  size_chart_data?: SizeChartData[];
  id: number;
  size: string;
  name: string;
  create_at: string;
  updated_at: string;
  is_deleted: boolean;
  is_cm?: boolean;
  has_size_chart?: boolean;
}
export interface ProductStockItem {
  id: number;
  quantity: number;
  product_id: string | null;
  custom_product_id: string;
  variant_id: string | null;
  size_id: number;
  create_at: string;
  updated_at: string;
  is_deleted: boolean;
  price: number;
  size_data: SizeData;
}

export interface ProductDetails {
  id: number;
  ratings?: {
    description: string;
    ratings: number;
    images: string[];
    reviewer?: string;
    updated_at?: string;
    likes?: number;
    dislikes?: number;
    users?: {
      first_name: string;
      last_name: string;
      profile_url: string;
    };
  }[];
  name: string;
  sub_category_type: { name: string; id: number } & {
    sub_category: { name: string; id: number } & {
      category: { name: string; id: number };
    };
  };
  sub_category: { id: number; name: string };
  category: { id: number; name: string };
  brand: { name: string };
  price?: number;
  discount?: number;
  description?: string;
  image?: string[];
  ratingStats?: {
    averageRating?: number;
    totalRatings?: number;
    distribution?: {
      1: number;
      2: number;
      3: number;
      4: number;
      5: number;
    };
  };
  product_additional_details: ProductAdditionalDetails[];
  product_specifications: ProductSpecifications[];
}

export interface AdminSettingsCategory {
  fontColor: string;
  cardColor: string;
}

export interface LandingPageShopByCategory {
  id: number;
  name: string;
  image: string;
  user_id: number;
  minDiscount: number;
  maxDiscount: number;
  sub_category_id: number;
  create_at: string;
  updated_at: string;
  sub_category: {
    id: number;
    name: string;
    description: string;
    create_at: string;
    updated_at: string;
    is_deleted: boolean;
    category_id: number;
    category: {
      id: number;
      name: string;
      description: string;
      create_at: string;
      updated_at: string;
      is_deleted: boolean;
    };
  };
}

export interface Order {
  id: number;
  user_id: number;
  order_number: string;
  total_amount: string;
  discount_amount: string;
  shipping_charge: string;
  final_amount: string;
  payment_method: string;
  payment_status: string;
  order_status: string;
  tracking_number: string | null;
  shipping_address_id: number;
  billing_address_id: number;
  expected_delivery: string | null;
  delivered_at: string | null;
  cancelled_at: string | null;
  cancellation_reason: string | null;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
  items: OrderItem[];
  shipping_address: Address;
  billing_address: Address;
  timeline: OrderTimeline[];
  return_request: any; // or `null` | ReturnRequest if details are available
}

export interface OrderTimeline {
  id: number;
  order_id: number;
  status: string;
  comment: string;
  created_at: string;
  updated_at: string;
}
export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  size_quantity_id: number;
  color: string;
  price: string;
  discount: number;
  final_price: string;
  created_at: string;
  updated_at: string;
  product: Product;
  size_quantity: ProductStockItem;
}

export interface Address {
  id: number;
  user_id: number;
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  postal_code: string;
  is_default: boolean;
  address_type: string;
  is_open_saturday: boolean;
  is_open_sunday: boolean;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}

export interface WishlistItem {
  id: number;
  user_id: number;
  product_id: number;
  created_at: string;
  is_deleted: boolean;
  products: ProductData;
}

interface ProductData {
  id: number;
  name: string;
  description: string;
  image: string[];
  price: string;
  discount: number;
  category: Category;
  sub_category: SubCategory;
  sub_category_type: SubCategoryType;
  brand: Brand;
}
