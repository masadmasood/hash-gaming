"use client";

import { memo, useMemo, useRef, useEffect, useState } from "react";
import { Grid, type CellComponentProps } from "react-window";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/data/siteData";

/** Threshold: only virtualize when items exceed this count */
const VIRTUALIZE_THRESHOLD = 24;
const ROW_HEIGHT = 440; // px per card row (3-column cards with taller media)
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

type ProductGridCellProps = {
  cols: number;
  products: Product[];
  colWidth: number;
};

function ProductCell({
  ariaAttributes,
  columnIndex,
  rowIndex,
  style,
  cols,
  products,
  colWidth,
}: CellComponentProps<ProductGridCellProps>) {
  const idx = rowIndex * cols + columnIndex;
  if (idx >= products.length) return null;
  const product = products[idx];

  return (
    <div
      {...ariaAttributes}
      style={{
        ...style,
        width: colWidth,
      }}
    >
      <ProductCard product={product} />
    </div>
  );
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
  const cellProps = useMemo(
    () => ({ cols, products, colWidth }),
    [cols, products, colWidth]
  );

  // For small lists, render a normal grid; it is cheaper than virtualization overhead.
  if (products.length <= VIRTUALIZE_THRESHOLD) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    );
  }

  const gridHeight = rowCount * (ROW_HEIGHT + GAP);

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      {containerWidth > 0 && (
        <Grid
          cellComponent={ProductCell}
          cellProps={cellProps}
          columnCount={cols}
          columnWidth={colWidth + GAP}
          rowCount={rowCount}
          rowHeight={ROW_HEIGHT + GAP}
          overscanCount={2}
          defaultHeight={gridHeight}
          defaultWidth={containerWidth}
          style={{ height: gridHeight, width: containerWidth, overflow: "hidden" }}
        />
      )}
    </div>
  );
});
