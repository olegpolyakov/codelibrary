import { useEffect, useState } from 'react';

export function useScreenSize() {
    const [screenSize, setScreenSize] = useState();

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 640 && screenSize !== 'phone') {
                setScreenSize('phone');
            } else if (window.innerWidth > 640 && window.innerWidth < 960 && screenSize !== 'tablet') {
                setScreenSize('tablet');
            } else if (window.innerWidth > 960 && screenSize !== 'desktop') {
                setScreenSize('desktop');
            }
        }

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return screenSize;
}