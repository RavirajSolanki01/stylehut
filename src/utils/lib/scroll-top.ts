import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollTop = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return children || null;
};

export default ScrollTop;
