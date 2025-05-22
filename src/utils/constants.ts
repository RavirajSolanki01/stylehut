import {
  Orders,
  Cards,
  Addersses,
  Collections,
  Coupons,
  Credits,
  MyntraPoints,
  UPIs,
  Wallets,
  ProfileDetails,
  Product1,
  Product2,
  Product3,
  Product4,
  Product5,
  ColorProduct1,
  ColorProduct2,
  SimilarProduct1,
  SimilarProduct2,
  SimilarProduct3,
  CasualWear,
  EthnicWear,
  WesternWear,
  SleepWear,
  ActiveWear,
  Makeup,
  KidsWear,
  FootWearImage,
  BagsImage,
  Watches,
  JewelleryImage,
  Home,
  SizeInclusive,
  Sunglasses,
  HeadPhones,
} from "../assets";
import StarIcon from "../assets/Cart/SVGs/StarIcon";
import CardIcon from "../assets/Cart/SVGs/CardIcon";
import PayLaterIcon from "../assets/Cart/SVGs/PayLaterIcon";
import WalletIcon from "../assets/Cart/SVGs/WalletIcon";
import EMIIcon from "../assets/Cart/SVGs/EMIIcon";
import NetBankingIcon from "../assets/Cart/SVGs/NetBankingIcon";
import UPIIcon from "../assets/Cart/SVGs/UPIIcon";
import CODIcon from "../assets/Cart/SVGs/CODIcon";

export const colorMap: Record<string, string> = {
  BEAUTY: "#0db7af",
  MEN: "#3880FF",
  WOMEN: "#fb56c1",
  KIDS: "#f26a10",
  HOME: "#f2c210",
  GENZ: "#3880FF",
  Studio: "#f26a10",
};
export const clothingSizeOrder = [
  "XXS",
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "3XL",
  "4XL",
  "5XL",
];
export const volumeSizeRegex = /(\d+(?:\.\d+)?)\s*(ml|ltr|l|g|kg)/i;
export const ShopByCategoryData = [
  {
    imageUrl: CasualWear,
    category: "Casual Wear",
    discount: "40-80% OFF",
    text: "Shop Now",
  },
  {
    imageUrl: EthnicWear,
    category: "Ethnic Wear",
    discount: "50-70% OFF",
    text: "Shop Now",
  },
  {
    imageUrl: WesternWear,
    category: "Western Wear",
    discount: "50-70% OFF",
    text: "Shop Now",
  },
  {
    imageUrl: SleepWear,
    category: "Innerwear & Sleepwear",
    discount: "UP TO 70% OFF ",
    text: "Shop Now",
  },
  {
    imageUrl: ActiveWear,
    category: "Activewear",
    discount: "30-70% OFF",
    text: "Shop Now",
  },
  {
    imageUrl: Makeup,
    category: "Beauty & Makeup",
    discount: "UP TO 80% OFF",
    text: "Shop Now",
  },
  {
    imageUrl: KidsWear,
    category: "Kids Wear",
    discount: "40-70% OFF",
    text: "Shop Now",
  },
  {
    imageUrl: FootWearImage,
    category: "Foot Wear",
    discount: "40-80% OFF",
    text: "Shop Now",
  },
  {
    imageUrl: BagsImage,
    category: "Bags & Handbags",
    discount: "40-80% OFF",
    text: "Shop Now",
  },
  {
    imageUrl: Watches,
    category: "Watches",
    discount: "UP TO 70% OFF",
    text: "Shop Now",
  },
  {
    imageUrl: JewelleryImage,
    category: "Jewellery",
    discount: "UP TO 80% OFF",
    text: "Shop Now",
  },
  {
    imageUrl: Home,
    category: "Home Furnishings",
    discount: "40-70% OFF",
    text: "Shop Now",
  },
  {
    imageUrl: HeadPhones,
    category: "Headphones & Speakers",
    discount: "UP TO 70% OFF",
    text: "Shop Now",
  },
  {
    imageUrl: SizeInclusive,
    category: "Size-Inclusive Styles",
    discount: "UP TO 70% OFF",
    text: "Shop Now",
  },
  {
    imageUrl: Sunglasses,
    category: "Sunglasses",
    discount: "UP TO 70% OFF",
    text: "Shop Now",
  },
];

export const headerMenuItems = [
  { id: 0, label: "Men", color: "#3880FF" },
  { id: 1, label: "Women", color: "#3880FF" },
  { id: 2, label: "Kids", color: "#3880FF" },
  { id: 3, label: "Home", color: "#3880FF" },
  { id: 4, label: "Beauty", color: "#0db7af" },
  { id: 5, label: "Genz", color: "#3880FF" },
  { id: 6, label: "Studio", color: "#3880FF" },
];

export const ProfileMenuItems = [
  {
    title: "Orders",
    path: "/orders",
  },
  {
    title: "Wishlist",
    path: "/wishlist",
  },
  {
    title: "Gift Cards",
    path: "/gift-cards",
  },
  {
    title: "Contact Us",
    path: "/contact-us",
  },
  {
    title: "Myntra Insider",
    path: "/insider",
  },
];

export const ProfileDataItems = [
  {
    title: "Myntra Credit",
    path: "/credit",
  },
  {
    title: "Coupons",
    path: "/coupons",
  },
  {
    title: "Saved Cards",
    path: "/saved-cards",
  },
  {
    title: "Saved VPA",
    path: "/saved-upi",
  },
  {
    title: "Saved Addresses",
    path: "/Addresses",
  },
];

export const accountSections = [
  {
    icon: Orders,
    title: "Orders",
    path: "orders",
    subtitle: "Check your order status",
  },
  {
    icon: Cards,
    title: "Saved Cards",
    path: "saved-cards",
    subtitle: "Save your cards for faster checkout",
  },
  {
    icon: Addersses,
    title: "Addresses",
    path: "Addresses",
    subtitle: "Save addresses for a hassle-free checkout",
  },
  {
    icon: Collections,
    title: "Collections & Wishlist",
    path: "orders",
    subtitle: "All your curated product collections",
  },
  {
    icon: Coupons,
    title: "Coupons",
    path: "coupons",
    subtitle: "Manage coupons for additional discounts",
  },
  {
    icon: Credits,
    title: "Myntra Credit",
    path: "credit",
    subtitle: "Manage all your refunds & gift cards",
  },
  {
    icon: MyntraPoints,
    title: "MynCash",
    path: "myncash",
    subtitle: "Earn MynCash as you shop and use them in checkout",
  },
  {
    icon: UPIs,
    title: "Saved UPI",
    path: "saved-upi",
    subtitle: "View your saved UPI",
  },
  {
    icon: Wallets,
    title: "Wallets/BNPL",
    path: "saved-wallets",
    subtitle: "View you saved Wallets and BNPL",
  },
  {
    icon: ProfileDetails,
    title: "Profile Details",
    path: "my-profile",
    subtitle: "Change your profile details",
  },
];

export const ProfileSection = [
  {
    icon: ProfileDetails,
    title: "Profile Details",
    path: "my-profile",
    subtitle: "Change your profile details",
  },
];

export const ordersAndCollection = [
  {
    icon: Orders,
    title: "Orders",
    path: "orders",
    subtitle: "Check your order status",
  },
  {
    icon: Collections,
    title: "Collections & Wishlist",
    path: "orders",
    subtitle: "All your curated product collections",
  },
];

export const PaymentSections = [
  {
    icon: Credits,
    title: "Myntra Credit",
    path: "credit",
    subtitle: "Manage all your refunds & gift cards",
  },
  {
    icon: MyntraPoints,
    title: "MynCash",
    path: "myncash",
    subtitle: "Earn MynCash as you shop and use them in checkout",
  },
  {
    icon: UPIs,
    title: "Saved UPI",
    path: "saved-upi",
    subtitle: "View your saved UPI",
  },
  {
    icon: Wallets,
    title: "Wallets/BNPL",
    path: "saved-wallets",
    subtitle: "View you saved Wallets and BNPL",
  },
  {
    icon: Cards,
    title: "Saved Cards",
    path: "saved-cards",
    subtitle: "Save your cards for faster checkout",
  },
  {
    icon: Addersses,
    title: "Addresses",
    path: "Addresses",
    subtitle: "Save addresses for a hassle-free checkout",
  },
  {
    icon: Coupons,
    title: "Coupons",
    path: "coupons",
    subtitle: "Manage coupons for additional discounts",
  },
];

export const FooterSections = [
  "FAQs",
  "About",
  "Terms of use",
  "Customer policies",
  "Useful Links",
];

export const SimilarProducts = [
  {
    id: 18,
    user_id: 15,
    product_id: 9,
    created_at: "2025-05-09T07:09:05.292Z",
    is_deleted: false,
    products: {
      id: 9,
      name: "Sport shoes with color",
      description: "These are the shoes for boys to wear",
      image: [
        "https://res.cloudinary.com/db8k5q0ix/image/upload/v1746707590/products/3e380143c862bddf061e2ff00_aprg6p.jpg",
      ],
      quantity: 19,
      price: "4300",
      discount: 40,
      category: {
        id: 1,
        name: "MEN",
        description: "Category For Men",
        create_at: "2025-04-25T00:00:00.000Z",
        updated_at: "2025-04-27T00:00:00.000Z",
        is_deleted: false,
      },
      sub_category: {
        id: 8,
        name: "Footwear",
        description: "Footwear for men",
        create_at: "2025-05-07T03:47:37.045Z",
        updated_at: "2025-05-07T03:47:37.045Z",
        is_deleted: false,
        category_id: 1,
      },
      sub_category_type: {
        id: 26,
        name: "Sport shoes",
        description: "Footwear Sport shoes for MEN",
        category_id: 1,
        sub_category_id: 8,
        create_at: "2025-05-07T04:23:48.193Z",
        updated_at: "2025-05-07T04:23:48.193Z",
        is_deleted: false,
      },
      brand: {
        id: 7,
        name: "Nike",
        description: "This is a brand",
        create_at: "2025-05-08T12:30:15.885Z",
        updated_at: "2025-05-08T12:30:15.885Z",
        is_deleted: false,
      },
    },
  },
  {
    id: 15,
    user_id: 15,
    product_id: 2,
    created_at: "2025-05-08T12:17:45.803Z",
    is_deleted: false,
    products: {
      id: 2,
      name: "New good t shrt",
      description: "Good for sikn",
      image: [
        "https://res.cloudinary.com/db8k5q0ix/image/upload/v1746097813/products/00009de22a26236782ff7c102_c98zeq.jpg",
        "https://res.cloudinary.com/db8k5q0ix/image/upload/v1746097813/products/00009de22a26236782ff7c103_ng2ety.jpg",
      ],
      quantity: 50,
      price: "3999",
      discount: 44,
      category: {
        id: 1,
        name: "MEN",
        description: "Category For Men",
        create_at: "2025-04-25T00:00:00.000Z",
        updated_at: "2025-04-27T00:00:00.000Z",
        is_deleted: false,
      },
      sub_category: {
        id: 1,
        name: "Topwear",
        description: "Topwear category",
        create_at: "2025-04-23T00:00:00.000Z",
        updated_at: "2025-04-26T00:00:00.000Z",
        is_deleted: false,
        category_id: 1,
      },
      sub_category_type: {
        id: 1,
        name: "T-shirts",
        description: "T-shirt for Men",
        category_id: 1,
        sub_category_id: 1,
        create_at: "2025-05-01T08:04:47.030Z",
        updated_at: "2025-05-01T08:04:47.030Z",
        is_deleted: false,
      },
      brand: {
        id: 3,
        name: "PUMA",
        description: "A practical brand",
        create_at: "2025-05-01T11:07:38.281Z",
        updated_at: "2025-05-01T11:07:38.281Z",
        is_deleted: false,
      },
    },
  },
   {
    id: 18,
    user_id: 15,
    product_id: 9,
    created_at: "2025-05-09T07:09:05.292Z",
    is_deleted: false,
    products: {
      id: 9,
      name: "Sport shoes with color",
      description: "These are the shoes for boys to wear",
      image: [
        "https://res.cloudinary.com/db8k5q0ix/image/upload/v1746707590/products/3e380143c862bddf061e2ff00_aprg6p.jpg",
      ],
      quantity: 19,
      price: "4300",
      discount: 40,
      category: {
        id: 1,
        name: "MEN",
        description: "Category For Men",
        create_at: "2025-04-25T00:00:00.000Z",
        updated_at: "2025-04-27T00:00:00.000Z",
        is_deleted: false,
      },
      sub_category: {
        id: 8,
        name: "Footwear",
        description: "Footwear for men",
        create_at: "2025-05-07T03:47:37.045Z",
        updated_at: "2025-05-07T03:47:37.045Z",
        is_deleted: false,
        category_id: 1,
      },
      sub_category_type: {
        id: 26,
        name: "Sport shoes",
        description: "Footwear Sport shoes for MEN",
        category_id: 1,
        sub_category_id: 8,
        create_at: "2025-05-07T04:23:48.193Z",
        updated_at: "2025-05-07T04:23:48.193Z",
        is_deleted: false,
      },
      brand: {
        id: 7,
        name: "Nike",
        description: "This is a brand",
        create_at: "2025-05-08T12:30:15.885Z",
        updated_at: "2025-05-08T12:30:15.885Z",
        is_deleted: false,
      },
    },
  },
  {
    id: 15,
    user_id: 15,
    product_id: 2,
    created_at: "2025-05-08T12:17:45.803Z",
    is_deleted: false,
    products: {
      id: 2,
      name: "New good t shrt",
      description: "Good for sikn",
      image: [
        "https://res.cloudinary.com/db8k5q0ix/image/upload/v1746097813/products/00009de22a26236782ff7c102_c98zeq.jpg",
        "https://res.cloudinary.com/db8k5q0ix/image/upload/v1746097813/products/00009de22a26236782ff7c103_ng2ety.jpg",
      ],
      quantity: 50,
      price: "3999",
      discount: 44,
      category: {
        id: 1,
        name: "MEN",
        description: "Category For Men",
        create_at: "2025-04-25T00:00:00.000Z",
        updated_at: "2025-04-27T00:00:00.000Z",
        is_deleted: false,
      },
      sub_category: {
        id: 1,
        name: "Topwear",
        description: "Topwear category",
        create_at: "2025-04-23T00:00:00.000Z",
        updated_at: "2025-04-26T00:00:00.000Z",
        is_deleted: false,
        category_id: 1,
      },
      sub_category_type: {
        id: 1,
        name: "T-shirts",
        description: "T-shirt for Men",
        category_id: 1,
        sub_category_id: 1,
        create_at: "2025-05-01T08:04:47.030Z",
        updated_at: "2025-05-01T08:04:47.030Z",
        is_deleted: false,
      },
      brand: {
        id: 3,
        name: "PUMA",
        description: "A practical brand",
        create_at: "2025-05-01T11:07:38.281Z",
        updated_at: "2025-05-01T11:07:38.281Z",
        is_deleted: false,
      },
    },
  },
  {
    id: 15,
    user_id: 15,
    product_id: 2,
    created_at: "2025-05-08T12:17:45.803Z",
    is_deleted: false,
    products: {
      id: 2,
      name: "New good t shrt",
      description: "Good for sikn",
      image: [
        "https://res.cloudinary.com/db8k5q0ix/image/upload/v1746097813/products/00009de22a26236782ff7c102_c98zeq.jpg",
        "https://res.cloudinary.com/db8k5q0ix/image/upload/v1746097813/products/00009de22a26236782ff7c103_ng2ety.jpg",
      ],
      quantity: 50,
      price: "3999",
      discount: 44,
      category: {
        id: 1,
        name: "MEN",
        description: "Category For Men",
        create_at: "2025-04-25T00:00:00.000Z",
        updated_at: "2025-04-27T00:00:00.000Z",
        is_deleted: false,
      },
      sub_category: {
        id: 1,
        name: "Topwear",
        description: "Topwear category",
        create_at: "2025-04-23T00:00:00.000Z",
        updated_at: "2025-04-26T00:00:00.000Z",
        is_deleted: false,
        category_id: 1,
      },
      sub_category_type: {
        id: 1,
        name: "T-shirts",
        description: "T-shirt for Men",
        category_id: 1,
        sub_category_id: 1,
        create_at: "2025-05-01T08:04:47.030Z",
        updated_at: "2025-05-01T08:04:47.030Z",
        is_deleted: false,
      },
      brand: {
        id: 3,
        name: "PUMA",
        description: "A practical brand",
        create_at: "2025-05-01T11:07:38.281Z",
        updated_at: "2025-05-01T11:07:38.281Z",
        is_deleted: false,
      },
    },
  },
  {
    id: 15,
    user_id: 15,
    product_id: 2,
    created_at: "2025-05-08T12:17:45.803Z",
    is_deleted: false,
    products: {
      id: 2,
      name: "New good t shrt",
      description: "Good for sikn",
      image: [
        "https://res.cloudinary.com/db8k5q0ix/image/upload/v1746097813/products/00009de22a26236782ff7c102_c98zeq.jpg",
        "https://res.cloudinary.com/db8k5q0ix/image/upload/v1746097813/products/00009de22a26236782ff7c103_ng2ety.jpg",
      ],
      quantity: 50,
      price: "3999",
      discount: 44,
      category: {
        id: 1,
        name: "MEN",
        description: "Category For Men",
        create_at: "2025-04-25T00:00:00.000Z",
        updated_at: "2025-04-27T00:00:00.000Z",
        is_deleted: false,
      },
      sub_category: {
        id: 1,
        name: "Topwear",
        description: "Topwear category",
        create_at: "2025-04-23T00:00:00.000Z",
        updated_at: "2025-04-26T00:00:00.000Z",
        is_deleted: false,
        category_id: 1,
      },
      sub_category_type: {
        id: 1,
        name: "T-shirts",
        description: "T-shirt for Men",
        category_id: 1,
        sub_category_id: 1,
        create_at: "2025-05-01T08:04:47.030Z",
        updated_at: "2025-05-01T08:04:47.030Z",
        is_deleted: false,
      },
      brand: {
        id: 3,
        name: "PUMA",
        description: "A practical brand",
        create_at: "2025-05-01T11:07:38.281Z",
        updated_at: "2025-05-01T11:07:38.281Z",
        is_deleted: false,
      },
    },
  },
  
];

export const listing_page_data = [
  {
    id: "25561504",
    brand: "Globus",
    productType: "Self Design Bodycon Dress",
    sizesAvailable: ["L"],
    price: {
      discountedPrice: 574,
      originalPrice: 2299,
      discountPercentage: "75% OFF",
    },
    imageLink:
      "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/25561504/2023/10/19/be9bfe40-b298-4e16-8988-c560b9bcedfc1697736273897GlobusBlackBodyconDress1.jpg",
  },
  {
    id: "26005874",
    brand: "Globus",
    productType: "Cotton Fitted Crop Top",
    sizesAvailable: ["L"],
    price: {
      discountedPrice: 337,
      originalPrice: 1299,
      discountPercentage: "74% OFF",
    },
    imageLink:
      "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/26005874/2023/11/23/5b9f4bf2-c585-4a6e-85ff-767b0577b0631700729134540GlobusPinkCottonCropTop1.jpg",
  },
  {
    id: "17301320",
    brand: "Globus",
    productType: "Women T-shirt",
    sizesAvailable: ["L"],
    price: {
      discountedPrice: 283,
      originalPrice: 1049,
      discountPercentage: "73% OFF",
    },
    imageLink:
      "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/17301320/2022/2/25/a8b7cd8f-92db-4ab8-b5bb-c308ec2a47331645807170337Tshirts1.jpg",
  },
  {
    id: "26334394",
    brand: "Globus",
    productType: "Self Design Sheath Dress",
    sizesAvailable: ["XL"],
    price: {
      discountedPrice: 620,
      originalPrice: 2299,
      discountPercentage: "73% OFF",
    },
    imageLink:
      "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/26334394/2023/12/8/5841741b-a063-4bf5-aa34-5765b5e3d3bc1702052079083GlobusTealHalterNeckCrepeBodyconDress1.jpg",
  },
  {
    id: "16335274",
    brand: "Globus",
    productType: "Women T-shirt",
    sizesAvailable: ["S"],
    price: {
      discountedPrice: 293,
      originalPrice: 1049,
      discountPercentage: "72% OFF",
    },
    imageLink:
      "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/16335274/2021/12/2/761a89a4-4478-4ae8-a978-f39f3b1927721638430135658GlobusWomenBlackPocketsT-shirt1.jpg",
  },
  {
    id: "17168814",
    brand: "Globus",
    productType: "Women Mustard T-shirt",
    sizesAvailable: ["M"],
    price: {
      discountedPrice: 314,
      "original Price": 1049,
      discountPercentage: "70% OFF",
    },
    imageLink:
      "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/17168814/2022/2/16/509a75d7-26db-4c2b-aa7b-4b75749e29ee1645000870760GlobusWomenMustardYellowT-shirt1.jpg",
  },
  {
    id: "25561504",
    brand: "Globus",
    productType: "Self Design Bodycon Dress",
    sizesAvailable: ["L"],
    price: {
      discountedPrice: 574,
      originalPrice: 2299,
      discountPercentage: "75% OFF",
    },
    imageLink:
      "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/25561504/2023/10/19/be9bfe40-b298-4e16-8988-c560b9bcedfc1697736273897GlobusBlackBodyconDress1.jpg",
  },
  {
    id: "26005874",
    brand: "Globus",
    productType: "Cotton Fitted Crop Top",
    sizesAvailable: ["L"],
    price: {
      discountedPrice: 337,
      originalPrice: 1299,
      discountPercentage: "74% OFF",
    },
    imageLink:
      "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/26005874/2023/11/23/5b9f4bf2-c585-4a6e-85ff-767b0577b0631700729134540GlobusPinkCottonCropTop1.jpg",
  },
  {
    id: "17301320",
    brand: "Globus",
    productType: "Women T-shirt",
    sizesAvailable: ["L"],
    price: {
      discountedPrice: 283,
      originalPrice: 1049,
      discountPercentage: "73% OFF",
    },
    imageLink:
      "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/17301320/2022/2/25/a8b7cd8f-92db-4ab8-b5bb-c308ec2a47331645807170337Tshirts1.jpg",
  },
  {
    id: "26334394",
    brand: "Globus",
    productType: "Self Design Sheath Dress",
    sizesAvailable: ["XL"],
    price: {
      discountedPrice: 620,
      originalPrice: 2299,
      discountPercentage: "73% OFF",
    },
    imageLink:
      "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/26334394/2023/12/8/5841741b-a063-4bf5-aa34-5765b5e3d3bc1702052079083GlobusTealHalterNeckCrepeBodyconDress1.jpg",
  },
  {
    id: "16335274",
    brand: "Globus",
    productType: "Women T-shirt",
    sizesAvailable: ["S"],
    price: {
      discountedPrice: 293,
      originalPrice: 1049,
      discountPercentage: "72% OFF",
    },
    imageLink:
      "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/16335274/2021/12/2/761a89a4-4478-4ae8-a978-f39f3b1927721638430135658GlobusWomenBlackPocketsT-shirt1.jpg",
  },
  {
    id: "17168814",
    brand: "Globus",
    productType: "Women Mustard T-shirt",
    sizesAvailable: ["M"],
    price: {
      discountedPrice: 314,
      "original Price": 1049,
      discountPercentage: "70% OFF",
    },
    imageLink:
      "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/17168814/2022/2/16/509a75d7-26db-4c2b-aa7b-4b75749e29ee1645000870760GlobusWomenMustardYellowT-shirt1.jpg",
  },
];

export const categoriesData = [
  { label: "Tops", count: 1498 },
  { label: "Dresses", count: 1298 },
  { label: "Trousers", count: 316 },
  { label: "Tshirts", count: 246 },
  { label: "Skirts", count: 167 },
  { label: "Jumpsuit", count: 162 },
  { label: "Shirts", count: 157 },
  { label: "Jeggings", count: 108 },
  { label: "Shorts", count: 102 },
  { label: "Blazers", count: 97 },
  { label: "Hoodies", count: 88 },
  { label: "Coats", count: 85 },
  { label: "Jeans", count: 76 },
  { label: "Sweaters", count: 60 },
  { label: "Shrugs", count: 58 },
  { label: "Kurtas", count: 52 },
  { label: "Jackets", count: 49 },
  { label: "Capes", count: 45 },
  { label: "Ponchos", count: 40 },
  { label: "Dungarees", count: 30 },
];

export const brandsData = [
  { label: "DressBerry", count: 19604 },
  { label: "BAESD", count: 19344 },
  { label: "Trendyol", count: 19056 },
  { label: "Roadster", count: 17526 },
  { label: "StyleCast", count: 17525 },
  { label: "COLOR CAPITAL", count: 15082 },
  { label: "Tokyo Talkies", count: 11010 },
  { label: "LULU & SKY", count: 7907 },
];

export const PRODUCT_DETAIL_CONSTANTS = {
  NAVIGATION: [
    "Home",
    "Clothing",
    "Men Clothing",
    "T-Shirt",
    "RoadStart T-shirt",
  ],
  PRODUCT_IMAGES: [Product1, Product2, Product3, Product4, Product5],
  MORE_COLOR_PRODUCT_IMAGES: [ColorProduct1, ColorProduct2],
  PRODUCT_SIZE: [
    {
      id: 1,
      size: 38,
      quantity: 2,
    },
    {
      id: 2,
      size: 39,
      quantity: 0,
    },
    {
      id: 3,
      size: 40,
      quantity: 5,
    },
    {
      id: 4,
      size: 41,
      quantity: 3,
    },
    {
      id: 5,
      size: 42,
      quantity: 9,
    },
  ],
  MORE_OFFER: [
    {
      id: 1,
      title: "10% Discount on HDFC Bank Credit & Debit Cards EMI",
      minSpend: "3500",
      maxDiscount: "1000",
    },
    {
      id: 2,
      title: "10% Discount on IDFC FIRST SWYP Credit Card",
      minSpend: "850",
      maxDiscount: "350",
    },
    {
      id: 3,
      title: "10% Discount on HSBC Credit Cards",
      minSpend: "5000",
      maxDiscount: "1500",
    },
    {
      id: 4,
      title: "7.5% Discount on Myntra Kotak Credit Card",
      minSpend: null,
      maxDiscount: "750",
    },
  ],
  PRODUCT_SPECIFICATION: [
    { id: 1, label: "Sleeve Length", value: "Long Sleeves" },
    { id: 2, label: "Collar", value: "Spread Collar" },
    { id: 3, label: "Fit", value: "Regular Fit" },
    { id: 4, label: "Brand Fit Name", value: "Classic" },
    { id: 5, label: "Print or Pattern Type", value: "Vertical Stripes" },
    { id: 6, label: "Occasion", value: "Formal" },
    { id: 7, label: "Length", value: "Regular" },
    { id: 8, label: "Hemline", value: "Curved" },
    { id: 9, label: "Placket", value: "Button Placket" },
    { id: 10, label: "Placket Length", value: "Full" },
    { id: 11, label: "Cuff", value: "Button" },
    { id: 12, label: "Transparency", value: "Opaque" },
    { id: 13, label: "Weave Pattern", value: "Regular" },
    { id: 14, label: "Surface Styling", value: "Chest Pocket" },
    { id: 15, label: "Main Trend", value: "New Basics" },
    { id: 16, label: "Number of Items", value: "1" },
    { id: 17, label: "Package Contains", value: "1-Shirt" },
  ],
  PRODUCT_RATING: [
    { id: 1, star: 5, count: 20 },
    { id: 2, star: 4, count: 10 },
    { id: 3, star: 3, count: 7 },
    { id: 4, star: 2, count: 3 },
    { id: 5, star: 1, count: 10 },
  ],
  PRODUCT_RATING_PROGRESS_BAR_COLOR: [
    {
      star: 1,
      color: "#f16565",
    },
    {
      star: 2,
      color: "#fcb301",
    },
    {
      star: 3,
      color: "#72bfbc",
    },
    {
      star: 4,
      color: "#14958f",
    },
    {
      star: 5,
      color: "#14958f",
    },
  ],
  CUSTOMER_PRODUCT_REVIEW: [
    {
      id: 1,
      label: "Fit",
      value: 77,
      for_title: "Just Right",
    },
    {
      id: 2,
      label: "Length",
      value: 47,
      for_title: "Just Right",
    },
  ],
  SIMILAR_PRODUCT: [
    {
      id: 1,
      brandName: "Nike",
      title: "Men's Running Shoes",
      discount: 20,
      price: "3,199",
      imgUrl: SimilarProduct1,
    },
    {
      id: 2,
      brandName: "Adidas",
      title: "Ultraboost Sports Sneakers",
      discount: 25,
      price: "5,499",
      imgUrl: SimilarProduct2,
    },
    {
      id: 3,
      brandName: "Puma",
      title: "Casual Sneakers for Men",
      discount: 30,
      price: "2,799",
      imgUrl: SimilarProduct3,
    },
    {
      id: 4,
      brandName: "Reebok",
      title: "Training Shoes",
      discount: 15,
      price: "3,899",
      imgUrl: SimilarProduct1,
    },
    {
      id: 5,
      brandName: "ASICS",
      title: "Gel-Contend 7 Running Shoes",
      discount: 18,
      price: "4,299",
      imgUrl: SimilarProduct2,
    },
    {
      id: 6,
      brandName: "New Balance",
      title: "Fresh Foam Sneakers",
      discount: 22,
      price: "4,799",
      imgUrl: SimilarProduct3,
    },
    {
      id: 7,
      brandName: "Skechers",
      title: "GOwalk Arch Fit Shoes",
      discount: 27,
      price: "3,499",
      imgUrl: SimilarProduct1,
    },
    {
      id: 8,
      brandName: "Woodland",
      title: "Leather Outdoor Shoes",
      discount: 10,
      price: "4,999",
      imgUrl: SimilarProduct2,
    },
    {
      id: 9,
      brandName: "Campus",
      title: "Running Shoes with Air Capsule",
      discount: 35,
      price: "2,099",
      imgUrl: SimilarProduct3,
    },
    {
      id: 10,
      brandName: "Bata",
      title: "Power Walking Shoes",
      discount: 12,
      price: "1,899",
      imgUrl: SimilarProduct1,
    },
    {
      id: 11,
      brandName: "Sparx",
      title: "Slip-On Sneakers",
      discount: 40,
      price: "1,499",
      imgUrl: SimilarProduct2,
    },
  ],
  SIZE: [
    {
      id: 1,
      size: "S",
      quantity: 2,
    },
    {
      id: 2,
      size: "M",
      quantity: 0,
    },
    {
      id: 3,
      size: "L",
      quantity: 5,
    },
    {
      id: 4,
      size: "XL",
      quantity: 3,
    },
    {
      id: 5,
      size: "XXL",
      quantity: 9,
    },
  ],
  QUANTITY: [
    {
      id: 1,
      quantity: 1,
    },
    {
      id: 2,
      quantity: 2,
    },
    {
      id: 3,
      quantity: 3,
    },
    {
      id: 4,
      quantity: 4,
    },
    {
      id: 5,
      quantity: 5,
    },
    {
      id: 6,
      quantity: 6,
    },
    {
      id: 7,
      quantity: 7,
    },
    {
      id: 8,
      quantity: 8,
    },
    {
      id: 9,
      quantity: 9,
    },
    {
      id: 10,
      quantity: 10,
    },
  ],
};
export const sortByOptions = [
  "Recommended",
  "What's new",
  "Popularity",
  "Better discount",
  "Price: High to Low",
  "Price: Low to High",
  "Customer rating",
];

export const paymentMethods = [
  { icon: StarIcon, label: "Recommended" },
  { icon: CODIcon, label: "Cash On Delivery" },
  {
    icon: UPIIcon,
    label: "UPI (Pay via any App)",
  },
  {
    icon: CardIcon,
    label: "Credit/Debit Card",
    secondary: "10 Offers",
  },
  { icon: PayLaterIcon, label: "Pay Later" },
  {
    icon: WalletIcon,
    label: "Wallets",
    secondary: "1 Offer",
  },
  { icon: EMIIcon, label: "EMI" },
  {
    icon: NetBankingIcon,
    label: "Net Banking",
    secondary: "1 Offer",
  },
];

export const offers_list = [
  "10% Instant Discount on Canara Bank Credit Cards on a min spend of ₹3,500. TCA",
  "10% Instant Discount on DBS Bank Credit Cards & Credit Card EMI on a min spend of ₹3,000. TCA",
  "10% Instant Discount on Federal Bank Credit Cards on a min spend of ₹3,000. TCA",
  "10% Instant Discount on IDFC FIRST SWYP Credit Card on a min spend of ₹850 (Applicable only on Myntra FWD offer Products). TCA",
  "10% Instant Discount on HDFC Bank Credit & Debit Cards EMI on a min spend of ₹3,500. TCA",
  "10% Instant Discount on HSBC Credit Cards on a min spend of ₹5,000. TCA",
  "7.5% Instant Discount up to ₹750 on every spend with Myntra Kotak Credit Card. TCA",
  "Flat ₹40 Cashback on BAJAJ UPI Transactions on a min spend of ₹999. TCA",
  "Upto ₹500 Cashback on RuPay Credit card via PhonePe UPI on Myntra on a min spend of ₹1,000. TCA",
  "Assured up to ₹300 Cashbackon Paytm UPI transaction on a min spend of ₹500. TCA",
  "Get ₹5–₹500 Assured Cashback on minimum transaction of ₹1000 on RuPay Credit Card with Paytm UPI. TCA",
  "Get up to ₹399 Cashback on CRED UPI on a min spend of ₹500. TCA",
  "Get up to ₹500 Cashback on RuPay Credit Card transaction via CRED UPI on a min spend of ₹1000. TCA",
  "Get Assured ₹30 Cashback on Freecharge UPI on a minimum spend of ₹1,999. TCA",
  "Get Upto ₹500 cashback On Mobikwik Wallet transaction on a min spend of ₹1,500.TCA",
  "Get up to ₹250 Cashback on Mobikwik UPI on a min spend of ₹999. TCA",
  "Flat ₹100 Assured Cashback on first ever transaction using Mobikwik UPI on a min spend of ₹500. TCA",
];

export const emi_bank_details = [
  {
    label: "DBS Bank Credit Card EMI",
    image:
      "https://constant.myntassets.com/checkout/assets/img/default-bank.svg",
    minimum_order_value: "2500",
  },
  {
    label: "HDFC Credit Card EMI",
    image: "https://constant.myntassets.com/checkout/assets/img/hdfc2.png",
    minimum_order_value: "3000",
  },
  {
    label: "HDFC Debit Card EMI",
    image: "https://constant.myntassets.com/checkout/assets/img/hdfc2.png",
    minimum_order_value: "5000",
  },
  {
    label: "Axis Credit Card EMI",
    image: "https://constant.myntassets.com/checkout/assets/img/axis.webp",
    minimum_order_value: "2500",
  },
  {
    label: "Kotak Credit Card EMI",
    image: "https://constant.myntassets.com/checkout/assets/img/kotak.png",
    minimum_order_value: "2500",
  },
  {
    label: "IDFC First Bank Credit Card EMI",
    image: "https://constant.myntassets.com/checkout/assets/img/idfc.webp",
    minimum_order_value: "2500",
  },
  {
    label: "Bank of Baroda Credit Card EMI",
    image: "https://constant.myntassets.com/checkout/assets/img/bob.webp",
    minimum_order_value: "2500",
  },
  {
    label: "ICICI Credit Card EMI",
    image: "https://constant.myntassets.com/checkout/assets/img/icici.png",
    minimum_order_value: "1500",
  },
  {
    label: "ICICI Debit Card EMI",
    image: "https://constant.myntassets.com/checkout/assets/img/icici.png",
    minimum_order_value: "5000",
  },
  {
    label: "SBI Credit Card EMI",
    image: "https://constant.myntassets.com/checkout/assets/img/sbi.png",
    minimum_order_value: "2500",
  },
  {
    label: "RBL Bank Credit Card EMI",
    image: "https://constant.myntassets.com/checkout/assets/img/rblbank.webp",
    minimum_order_value: "2500",
  },
  {
    label: "Canara Bank Credit Card EMI",
    image:
      "https://constant.myntassets.com/checkout/assets/img/default-bank.svg",
    minimum_order_value: "2500",
  },
  {
    label: "AU Small Finance Bank Credit Card EMI",
    image:
      "https://constant.myntassets.com/checkout/assets/img/default-bank.svg",
    minimum_order_value: "2500",
  },
  {
    label: "Standard Chartered Credit Card EMI",
    image:
      "https://constant.myntassets.com/checkout/assets/img/standardchartered.webp",
    minimum_order_value: "2500",
  },
  {
    label: "HSBC Bank Credit Card EMI",
    image: "https://constant.myntassets.com/checkout/assets/img/hsbc.webp",
    minimum_order_value: "2500",
  },
  {
    label: "Home Credit Ujjwal EMI Card",
    image:
      "https://constant.myntassets.com/checkout/assets/img/homecreditlogo.webp",
    minimum_order_value: "1000",
  },
];

export const highlighted_net_banking_options = [
  {
    image: "https://constant.myntassets.com/checkout/assets/img/axis.webp",
    name: "Axis Bank",
    is_facing_issue: false,
  },
  {
    image: "https://constant.myntassets.com/checkout/assets/img/hdfc2.png",
    name: "HDFC Bank",
    is_facing_issue: false,
  },
  {
    image: "https://constant.myntassets.com/checkout/assets/img/icici.png",
    name: "ICICI Bank",
    is_facing_issue: false,
  },
  {
    image: "https://constant.myntassets.com/checkout/assets/img/kotak.png",
    name: "Kotak",
    is_facing_issue: false,
  },
  {
    image: "https://constant.myntassets.com/checkout/assets/img/sbi.png",
    name: "SBI",
    is_facing_issue: true,
  },
];

export const all_banks_list_for_net_banking = [
  {
    image:
      "https://constant.myntassets.com/checkout/assets/img/default-bank.svg",
    name: "Airtel payments bank",
  },
  {
    image:
      "https://constant.myntassets.com/checkout/assets/img/default-bank.svg",
    name: "Bank of Baroda Corporate",
  },
  {
    image:
      "https://constant.myntassets.com/checkout/assets/img/default-bank.svg",
    name: "Bank of Baroda Retail Accounts",
  },
  {
    image:
      "https://constant.myntassets.com/checkout/assets/img/default-bank.svg",
    name: "Bank of India",
  },
  {
    image:
      "https://constant.myntassets.com/checkout/assets/img/default-bank.svg",
    name: "Bank of Maharashtra",
  },
  {
    image:
      "https://constant.myntassets.com/checkout/assets/img/default-bank.svg",
    name: "Canara Bank",
  },
  {
    image:
      "https://constant.myntassets.com/checkout/assets/img/default-bank.svg",
    name: "Catholic Syrian Bank",
  },
  {
    image:
      "https://constant.myntassets.com/checkout/assets/img/default-bank.svg",
    name: "Central Bank of India",
  },
  {
    image:
      "https://constant.myntassets.com/checkout/assets/img/default-bank.svg",
    name: "City Union Bank",
  },
  {
    image:
      "https://constant.myntassets.com/checkout/assets/img/default-bank.svg",
    name: "DCB BANK Personal",
  },
  {
    image:
      "https://constant.myntassets.com/checkout/assets/img/default-bank.svg",
    name: "Deutsche Bank",
  },
  {
    image:
      "https://constant.myntassets.com/checkout/assets/img/default-bank.svg",
    name: "Dhanlaxmi Bank",
  },
  {
    image:
      "https://constant.myntassets.com/checkout/assets/img/default-bank.svg",
    name: "Federal Bank",
  },
  {
    image:
      "https://constant.myntassets.com/checkout/assets/img/default-bank.svg",
    name: "IDBI Bank",
  },
  {
    image:
      "https://constant.myntassets.com/checkout/assets/img/default-bank.svg",
    name: "IDFC FIRST Bank",
  },
  {
    image:
      "https://constant.myntassets.com/checkout/assets/img/default-bank.svg",
    name: "Indian Bank",
  },
  {
    image:
      "https://constant.myntassets.com/checkout/assets/img/default-bank.svg",
    name: "Indian Overseas Bank",
  },
  {
    image:
      "https://constant.myntassets.com/checkout/assets/img/default-bank.svg",
    name: "IndusInd Bank",
  },
  {
    image:
      "https://constant.myntassets.com/checkout/assets/img/default-bank.svg",
    name: "ING Vysya Bank",
  },
  {
    image:
      "https://constant.myntassets.com/checkout/assets/img/default-bank.svg",
    name: "Jammu and kashmir Bank",
  },
  {
    image:
      "https://constant.myntassets.com/checkout/assets/img/default-bank.svg",
    name: "Karnataka Bank",
  },
  {
    image:
      "https://constant.myntassets.com/checkout/assets/img/default-bank.svg",
    name: "Karur Vysya - Corporate Netbanking",
  },
  {
    image:
      "https://constant.myntassets.com/checkout/assets/img/default-bank.svg",
    name: "Karur Vysya Bank",
  },
  {
    image:
      "https://constant.myntassets.com/checkout/assets/img/default-bank.svg",
    name: "Lakshmi Vilas Bank",
  },
  {
    image:
      "https://constant.myntassets.com/checkout/assets/img/default-bank.svg",
    name: "Oriental Bank of Commerce",
  },
  {
    image:
      "https://constant.myntassets.com/checkout/assets/img/default-bank.svg",
    name: "PayU Money",
  },
  {
    image:
      "https://constant.myntassets.com/checkout/assets/img/default-bank.svg",
    name: "Punjab and Sind Bank",
  },
  {
    image:
      "https://constant.myntassets.com/checkout/assets/img/default-bank.svg",
    name: "Punjab National Bank [Corporate]",
  },
  {
    image:
      "https://constant.myntassets.com/checkout/assets/img/default-bank.svg",
    name: "Punjab National Bank [Retail]",
  },
  {
    image:
      "https://constant.myntassets.com/checkout/assets/img/default-bank.svg",
    name: "Ratnakar Bank",
  },
  {
    image:
      "https://constant.myntassets.com/checkout/assets/img/default-bank.svg",
    name: "Saraswat Bank",
  },
];
