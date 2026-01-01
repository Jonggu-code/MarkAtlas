import { useEffect, useRef } from "react";

export function useInfiniteScroll({
  onIntersect,
  enabled = true,
  rootMargin = "300px",
}) {
  const targetRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    if (!targetRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      { rootMargin }
    );

    observer.observe(targetRef.current);

    return () => observer.disconnect();
  }, [onIntersect, enabled, rootMargin]);

  return targetRef;
}
