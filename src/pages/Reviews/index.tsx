import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { TextField, Button, Rating, Box, Typography, IconButton, CircularProgress } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { addReview } from '../../services/reviewService';
import { toast } from 'react-toastify';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const getRatingMessage = (rating: number) => {
  switch (rating) {
    case 1:
      return 'Very Bad';
    case 2:
      return 'Bad';
    case 3:
      return 'Average';
    case 4:
      return 'Good';
    case 5:
      return 'Very Good';
    default:
      return '';
  }
};

export const Reviews = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [description, setDescription] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    rating: '',
    description: ''
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newImages = Array.from(event.target.files);
      setSelectedImages([...selectedImages, ...newImages]);
    }
  };

  const handleDeleteImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {
      rating: '',
      description: ''
    };
    let isValid = true;

    if (!rating) {
      newErrors.rating = 'Rating is required';
      isValid = false;
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    } else if (description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters long';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        product_id: 2,
        ratings: rating as number,
        description,
        ...(selectedImages.length > 0 && { images: selectedImages })
      };

      const response = await addReview(payload);

      if (response?.status === 200) {
        toast.success('Review submitted successfully');
        // Reset form
        setRating(null);
        setDescription('');
        setSelectedImages([]);
        setErrors({ rating: '', description: '' });
      }
    } catch (error: any) {
      console.error('Error submitting review:', error);
      const errorMessage = error.response?.data?.message || 'Failed to submit review. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[800px] mx-auto p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8 border-b border-[#eaeaec] pb-4">
        <div>
          <h1 className="text-[24px] font-[700] text-[#282c3f]">Rating & Reviews</h1>
        </div>
        <div className="flex items-center gap-4">
          <img 
            src="https://via.placeholder.com/100" 
            alt="Product" 
            className="w-[100px] h-[100px] object-cover"
          />
          <div>
            <h2 className="text-[18px] font-[500] text-[#282c3f]">Product Name</h2>
            <p className="text-[14px] text-[#535766]">Brand Name</p>
          </div>
        </div>
      </div>

      {/* Rating Section */}
      <div className="mb-8">
        <Typography component="legend" className="text-[16px] font-[500] mb-2">
          Rate this product
        </Typography>
        <Box className="flex items-center gap-4">
          <Rating
            name="product-rating"
            value={rating}
            onChange={(_, newValue) => {
              setRating(newValue);
              setErrors(prev => ({ ...prev, rating: '' }));
            }}
            precision={1}
            icon={<StarIcon fontSize="large" />}
            emptyIcon={<StarIcon fontSize="large" />}
            sx={{
              '& .MuiRating-iconFilled': {
                color: '#3880FF',
              },
              '& .MuiRating-iconHover': {
                color: '#3880FF',
              },
            }}
          />
          {rating && (
            <Typography className="text-[16px] font-[500] text-[#3880FF]">
              {getRatingMessage(rating)}
            </Typography>
          )}
        </Box>
        {errors.rating && (
          <Typography className="text-[#d32f2f] text-[12px] mt-1">
            {errors.rating}
          </Typography>
        )}
      </div>

      {/* Description Section */}
      <div className="mb-8">
        <Typography component="legend" className="text-[16px] font-[500] mb-2">
          Write your review
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setErrors(prev => ({ ...prev, description: '' }));
          }}
          placeholder="Write your review here..."
          error={!!errors.description}
          helperText={errors.description}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: '#3880FF',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#3880FF',
              },
            },
            '& .MuiFormHelperText-root': {
              color: '#d32f2f',
            },
          }}
        />
      </div>

      {/* Image Upload Section */}
      <div className="mb-8">
        <Typography component="legend" className="text-[16px] font-[500] mb-2">
          Add Photos
        </Typography>
        <Button
          component="label"
          variant="outlined"
          startIcon={<CloudUploadIcon />}
          sx={{
            borderColor: '#3880FF',
            color: '#3880FF',
            '&:hover': {
              borderColor: '#3880FF',
              backgroundColor: 'rgba(255, 63, 108, 0.04)',
            },
          }}
        >
          Upload Images
          <VisuallyHiddenInput type="file" multiple onChange={handleImageChange} accept="image/*" />
        </Button>
        {selectedImages.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {selectedImages.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded ${index + 1}`}
                  className="w-[100px] h-[100px] object-cover"
                />
                <IconButton
                  size="small"
                  onClick={() => handleDeleteImage(index)}
                  className="!absolute bottom-0 right-0 bg-white/80 hover:bg-white/90 shadow-sm"
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    },
                  }}
                >
                  <DeleteIcon sx={{ color: '#3880FF', fontSize: '1.2rem' }} />
                </IconButton>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <Button
        variant="contained"
        fullWidth
        disabled={isSubmitting}
        onClick={handleSubmit}
        sx={{
          backgroundColor: '#3880FF',
          '&:hover': {
            backgroundColor: '#3880FF',
            opacity: 0.9,
          },
          '&.Mui-disabled': {
            backgroundColor: '#3880FF',
            opacity: 0.5,
          },
        }}
      >
        {isSubmitting ? (
          <CircularProgress size={24} sx={{ color: 'white' }} />
        ) : (
          'Submit Review'
        )}
      </Button>
    </div>
  );
};
