import { useEffect, useRef, useState } from "react";

// click element to renderized other element
export const useOpen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  const handleAutoCloseMenu = (e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleAutoCloseMenu);
    } else {
      document.removeEventListener("click", handleAutoCloseMenu);
    }

    return () => {
      document.removeEventListener("click", handleAutoCloseMenu);
    };
  }, [isOpen]);

  return { isOpen, handleClose, containerRef };
};
