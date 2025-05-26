import React from 'react';
import { Slider as MuiSlider, styled } from '@mui/material';

interface RangeSliderProps {
  value: number[];
  onChange: (event: Event, newValue: number | number[]) => void;
  min: number;
  max: number;
  label?: string;
  valueLabelDisplay?: 'auto' | 'off' | 'on';
}

const CustomSlider = styled(MuiSlider)({
  color: '#2979ff',
  height: 5,
  padding: '15px 0',

  '& .MuiSlider-thumb': {
    height: 12,
    width: 12,
    backgroundColor: '#fff',
    border: '4px solid #2979ff',
    boxShadow: 'none',
    '&:hover, &.Mui-focusVisible': {
      boxShadow: '0px 0px 0px 8px rgba(41, 121, 255, 0.16)',
    },
    '&.Mui-active': {
      boxShadow: '0px 0px 0px 14px rgba(41, 121, 255, 0.16)',
    },
  },

  '& .MuiSlider-track': {
    border: 'none',
    height: 1,
  },

  '& .MuiSlider-rail': {
    opacity: 0.3,
    height: 1,
  },
});

export const RangeSlider: React.FC<RangeSliderProps> = ({
  value,
  onChange,
  min,
  max,
  label,
  valueLabelDisplay = 'auto',
}) => {
  return (
    <CustomSlider
      value={value}
      onChange={onChange}
      valueLabelDisplay={valueLabelDisplay}
      min={min}
      max={max}
      getAriaLabel={() => label || 'Range slider'}
    />
  );
};
