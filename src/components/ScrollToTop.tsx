import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Component that scrolls to top when route changes
 * Place it inside Router but outside Routes
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant", // Using instant instead of smooth to avoid visual jumps
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
