"use client";

import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/libs/utils";

// Запас в пикселях, в пределах которого прокрутка считается «у нижнего края».
const BOTTOM_THRESHOLD_PX = 32;
// Высота растушёвки у края, намекающей на скрытый текст.
const FADE_PX = 24;

type ScrollAreaProps = {
  children: ReactNode;
  className?: string;
  /**
   * Держит прокрутку у нижнего края, пока пользователь не отлистает вверх сам.
   * Нужно для стриминга ответа, чтобы был виден последний текст.
   */
  pinToBottom?: boolean;
};

/**
 * Область с ограниченной высотой и собственной прокруткой — чтобы длинный
 * ответ ИИ не растягивал страницу. Края, за которыми есть ещё текст,
 * растушёвываются, а полоса прокрутки видна всегда.
 */
export const ScrollArea = ({
  children,
  className,
  pinToBottom = false,
}: ScrollAreaProps) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [hasContentAbove, setHasContentAbove] = useState(false);
  const [hasContentBelow, setHasContentBelow] = useState(false);
  // Наблюдатель за размером читает актуальное значение без пересоздания.
  const isPinnedRef = useRef(true);

  const syncScrollState = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const distanceToBottom =
      viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight;

    isPinnedRef.current = distanceToBottom <= BOTTOM_THRESHOLD_PX;
    setHasContentAbove(viewport.scrollTop > 1);
    setHasContentBelow(distanceToBottom > 1);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    const content = contentRef.current;
    if (!viewport || !content) return;

    // Ответ приходит потоком, поэтому следим за ростом контента, а не за пропсами.
    const observer = new ResizeObserver(() => {
      if (pinToBottom && isPinnedRef.current) {
        viewport.scrollTop = viewport.scrollHeight;
      }
      syncScrollState();
    });
    observer.observe(content);
    observer.observe(viewport);

    return () => observer.disconnect();
  }, [pinToBottom, syncScrollState]);

  // Растушёвка маскирует сам текст, поэтому работает на любом фоне.
  const fadeMask =
    hasContentAbove || hasContentBelow
      ? `linear-gradient(to bottom, ${
          hasContentAbove ? `transparent 0, #000 ${FADE_PX}px` : "#000 0"
        }, ${
          hasContentBelow
            ? `#000 calc(100% - ${FADE_PX}px), transparent 100%`
            : "#000 100%"
        })`
      : undefined;

  return (
    <div
      ref={viewportRef}
      onScroll={syncScrollState}
      style={{ maskImage: fadeMask, WebkitMaskImage: fadeMask }}
      className={cn(
        "scrollbar-slim overflow-y-auto overscroll-contain",
        className,
      )}
    >
      <div ref={contentRef}>{children}</div>
    </div>
  );
};
