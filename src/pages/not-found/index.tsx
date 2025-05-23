import React from 'react';
import { Link } from 'react-router-dom';

const fashionTags = [
  {
    id: 1,
    tag: '#Dresses',
    path: '/product-list?category=WOMENrequestid2&subcategory=Western%20wearrequestid6&sub_category_type=Dressesrequestid4'
  },
  {
    id: 2,
    tag: '#Tops',
    path: '/product-list?category=WOMENrequestid2&subcategory=Western%20wearrequestid6&sub_category_type=Topsrequestid31'
  },
  {
    id: 3,
    tag: '#Accessories',
    path: '/product-list?category=MENrequestid1&subcategory=Fashion%20Accessoriesrequestid17'
  },
  {
    id: 4,
    tag: '#Shoes',
    path: '/product-list?category=MENrequestid1&subcategory=Footwearrequestid8'
  },
  {
    id: 5,
    tag: '#Kids',
    path: '/product-list?category=KIDSrequestid3'
  }
];
const NotFoundPage: React.FC = () => {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F9FF] bg-pattern px-4 py-12 text-center">
      {/* Hanger Icon with 404 */}
      <div className="mb-8 relative animate-bounce">
        <svg width="180" height="100" viewBox="0 0 64 64" fill="none">
          <text x="50%" y="40%" dominantBaseline="middle" textAnchor="middle" fontSize="40" fill="#3880FF" fontWeight="bold">404</text>
        </svg>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        Oops! Page not found
      </h1>
      <p className="text-gray-600 max-w-xl mx-auto mb-8">
        This page seems to be missing from our collection. <br />
        Let's find you something fabulous instead.
      </p>


      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <Link
          to="/home"
          className="bg-[#3880FF] hover:bg-[#2D6CD9] text-white font-semibold px-6 py-3 rounded-full shadow-md transition"
        >
          Back to Home
        </Link>
        <Link
          to="/product-list"
          className="border-2 border-[#3880FF] text-[#3880FF] hover:bg-[#F0F5FF] font-semibold px-6 py-3 rounded-full transition"
        >
          New Arrivals
        </Link>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {fashionTags.map((tag) => (
          <Link
            key={tag.id}
            to={tag.path}
            className="bg-white text-gray-700 border border-gray-200 rounded-full px-4 py-2 text-sm shadow-sm hover:shadow hover:border-[#3880FF] hover:text-[#3880FF] transition"
          >
            {tag.tag}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NotFoundPage;
