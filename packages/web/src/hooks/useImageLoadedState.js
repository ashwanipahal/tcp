import { useEffect } from 'react';
import useBooleanState from '@tcp/core/src/hooks/useBooleanState';

/**
 * Hook for wrapping the loading state of an image element
 * @param {React.RefObject} imageRef ref for image element
 * @example
 * const isLoaded = useImageLoadedState();
 */
export default function useImageLoadedState(imageRef) {
  // State for whether the image is loaded
  const [isLoaded, handleLoaded] = useBooleanState(false);
  // Set the state based on image completion or load event handling
  useEffect(() => {
    const imageElement = imageRef.current;
    if (!imageElement) return undefined;
    if (imageElement.complete) {
      handleLoaded();
      return undefined;
    }
    imageElement.addEventListener('load', handleLoaded);
    return () => imageElement.removeEventListener('load', handleLoaded);
  }, [imageRef]);
  // Return the current state
  return isLoaded;
}
