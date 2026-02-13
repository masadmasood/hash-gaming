import { memo, useMemo, useCallback, useRef, useEffect, useState } from "react";
import { Grid, CellComponentProps } from "react-window";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/data/siteData";

/** Threshold: only virtualize when items exceed this count */
const VIRTUALIZE_THRESHOLD = 24;
const ROW_HEIGHT = 380; // px per card row (image aspect-[4/3] + padding)
const GAP = 12; // gap-3 = 12px

function useColumnCount() {
  const [cols, setCols] = useState(3);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setCols(1);
      else if (w < 1024) setCols(2);
      else setCols(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return cols;
}

interface Props {
  products: Product[];
}

export const VirtualizedProductGrid = memo(function VirtualizedProductGrid({ products }: Props) {
  const cols = useColumnCount();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const rowCount = useMemo(() => Math.ceil(products.length / cols), [products.length, cols]);
  const colWidth = useMemo(() => (containerWidth - GAP * (cols - 1)) / cols, [containerWidth, cols]);

  const Cell = useCallback(
    ({ columnIndex, rowIndex, style }: CellComponentProps) => {
      const idx = rowIndex * cols + columnIndex;
      if (idx >= products.length) return null;
      const product = products[idx];
      return (
        <div
          style={{
            ...style,
            left: Number(style.left) + columnIndex * GAP,
            top: Number(style.top) + rowIndex * GAP,
            width: colWidth,
          }}
        >
          <ProductCard product={product} />
        </div>
      );
    },
    [cols, products, colWidth]
  );

  // For small lists, render a normal grid — cheaper than virtualization overhead
  if (products.length <= VIRTUALIZE_THRESHOLD) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    );
  }

  const gridHeight = Math.min(rowCount * (ROW_HEIGHT + GAP), window.innerHeight - 200);

  return (
    <div ref={containerRef} className="w-full">
      {containerWidth > 0 && (
        <Grid
          columnCount={cols}
          columnWidth={colWidth + GAP}
          height={gridHeight}
          rowCount={rowCount}
          rowHeight={ROW_HEIGHT + GAP}
          width={containerWidth}
          overscanRowCount={2}
        >
          {Cell}
        </Grid>
      )}
    </div>
  );
});
