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
  path: string;
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
