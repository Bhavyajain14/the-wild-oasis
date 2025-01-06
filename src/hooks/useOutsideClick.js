import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      // Check if the click is outside the referenced element
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }

    // Attach event listener
    document.addEventListener("click", handleClickOutside, listenCapturing);

    // Cleanup event listener on component unmount
    return () =>
      document.removeEventListener(
        "click",
        handleClickOutside,
        listenCapturing
      );
  }, [handler, listenCapturing]);

  return ref;
}
