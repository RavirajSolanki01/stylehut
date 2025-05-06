import api from "./api";
import { REVIEWS_ENDPOINT } from "./endpoints";

export const addReview = async (payload: {
  product_id: number;
  ratings: number;
  description?: string;
  images?: File[];
}) => {
  try {
    const formData = new FormData();
    formData.append("product_id", String(payload.product_id));
    formData.append("ratings", String(payload.ratings));
    
    if (payload.description) {
      formData.append("description", payload.description);
    }
    
    if (payload.images?.length) {
      payload.images.forEach((file) => {
        formData.append("images", file);
      });
    }

    return await api.post(REVIEWS_ENDPOINT, formData, {
      withAuth: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    throw error;
  }
};

export const getReviews = (payload: { product_id: number }) => {
  return api.get(`${REVIEWS_ENDPOINT}/${payload.product_id}`, { withAuth: true });
};

export const deleteReview = (payload: { review_id: number }) => {
  return api.delete(`${REVIEWS_ENDPOINT}/${payload.review_id}`, { withAuth: true });
};

export const updateReview = async (payload: {
  review_id: number;
  data: {
    rating: number;
    description: string;
    images?: File[];
  };
}) => {
  try {
    const formData = new FormData();
    formData.append("rating", String(payload.data.rating));
    formData.append("description", payload.data.description);
    
    if (payload.data.images?.length) {
      payload.data.images.forEach((file) => {
        formData.append("images", file);
      });
    }

    return await api.put(`${REVIEWS_ENDPOINT}/${payload.review_id}`, formData, {
      withAuth: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    throw error;
  }
};

