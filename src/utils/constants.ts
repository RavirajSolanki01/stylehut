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
} from "../assets";

export const colorMap: Record<string, string> = {
  Beauty: "#0db7af",
  Men: "#ff3f6c",
  Women: "#fb56c1",
  Kids: "#f26a10",
  Home: "#f2c210",
  Genz: "#ff3f6c",
  Studio: "#f26a10",
};

export const headerMenuItems = [
  { label: "Men", color: "#ff3f6c" },
  { label: "Women", color: "#fb56c1" },
  { label: "Kids", color: "#f26a10" },
  { label: "Home", color: "#f2c210" },
  { label: "Beauty", color: "#0db7af" },
  { label: "Genz", color: "#ff3f6c" },
  { label: "Studio", color: "#f26a10" },
];

export const ProfileMenuItems = [
  {
    title: "Orders",
    path: "orders",
  },
  {
    title: "Wishlist",
    path: "/wishlist",
  },
  {
    title: "Gift Cards",
    path: "#",
  },
  {
    title: "Contact Us",
    path: "#",
  },
  {
    title: "Myntra Insider",
    path: "#",
  },
];
export const ProfileDataItems = [
  "Myntra Credit",
  "Coupons",
  "Saved Cards",
  "Saved VPA",
  "Saved Addresses",
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
    path: "adderesses",
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
]

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
]

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
    path: "adderesses",
    subtitle: "Save addresses for a hassle-free checkout",
  },
  {
    icon: Coupons,
    title: "Coupons",
    path: "coupons",
    subtitle: "Manage coupons for additional discounts",
  },
]

export const FooterSections = [
  "FAQs",
  "About",
  "Terms of use",
  "Customer policies",
  "Useful Links"
]

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

export const wishlist_page_data = [
  {
    id: "25561504",
    brand: "Globus",
    productType: "Self Design Bodycon Dress For Women",
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
    productType: "Self Design Bodycon Dress For Women",
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
      minSpend: "₹3500",
      maxDiscount: "₹1000",
    },
    {
      id: 2,
      title: "10% Discount on IDFC FIRST SWYP Credit Card",
      minSpend: "₹850",
      maxDiscount: "₹350",
    },
    {
      id: 3,
      title: "10% Discount on HSBC Credit Cards",
      minSpend: "₹5000",
      maxDiscount: "₹1500",
    },
    {
      id: 4,
      title: "7.5% Discount on Myntra Kotak Credit Card",
      minSpend: null,
      maxDiscount: "₹750",
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
      price: "₹3,199",
      imgUrl: SimilarProduct1,
    },
    {
      id: 2,
      brandName: "Adidas",
      title: "Ultraboost Sports Sneakers",
      discount: 25,
      price: "₹5,499",
      imgUrl: SimilarProduct2,
    },
    {
      id: 3,
      brandName: "Puma",
      title: "Casual Sneakers for Men",
      discount: 30,
      price: "₹2,799",
      imgUrl: SimilarProduct3,
    },
    {
      id: 4,
      brandName: "Reebok",
      title: "Training Shoes",
      discount: 15,
      price: "₹3,899",
      imgUrl: SimilarProduct1,
    },
    {
      id: 5,
      brandName: "ASICS",
      title: "Gel-Contend 7 Running Shoes",
      discount: 18,
      price: "₹4,299",
      imgUrl: SimilarProduct2,
    },
    {
      id: 6,
      brandName: "New Balance",
      title: "Fresh Foam Sneakers",
      discount: 22,
      price: "₹4,799",
      imgUrl: SimilarProduct3,
    },
    {
      id: 7,
      brandName: "Skechers",
      title: "GOwalk Arch Fit Shoes",
      discount: 27,
      price: "₹3,499",
      imgUrl: SimilarProduct1,
    },
    {
      id: 8,
      brandName: "Woodland",
      title: "Leather Outdoor Shoes",
      discount: 10,
      price: "₹4,999",
      imgUrl: SimilarProduct2,
    },
    {
      id: 9,
      brandName: "Campus",
      title: "Running Shoes with Air Capsule",
      discount: 35,
      price: "₹2,099",
      imgUrl: SimilarProduct3,
    },
    {
      id: 10,
      brandName: "Bata",
      title: "Power Walking Shoes",
      discount: 12,
      price: "₹1,899",
      imgUrl: SimilarProduct1,
    },
    {
      id: 11,
      brandName: "Sparx",
      title: "Slip-On Sneakers",
      discount: 40,
      price: "₹1,499",
      imgUrl: SimilarProduct2,
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
