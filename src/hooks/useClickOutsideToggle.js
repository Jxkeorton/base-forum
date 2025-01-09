import {useEffect, useState, useRef} from 'react';

const useClickOutsideToggle = () => {
    const [expanded, setExpanded] = useState(false);
    const ref = useRef(null);
  
    useEffect(() => {
      const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
          setExpanded(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    },[ref]);
  return {expanded, setExpanded, ref};
};

export default useClickOutsideToggle;