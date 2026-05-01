import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailPage from "@/components/pages/ProductDetail";
import { products, productImages } from "@/data/siteData";

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return {
      title: "Product Not Found | Hashtech Gaming",
    };
  }

  return {
    title: `${product.title} | Hashtech Gaming`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: productImages[product.id] ? [productImages[product.id]] : undefined,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return <ProductDetailPage productId={id} />;
}