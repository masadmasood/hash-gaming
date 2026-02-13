import { useParams, Link, useNavigate } from "react-router-dom";
import { products, reviews, productImages } from "@/data/siteData";
import { PageTransition } from "@/components/PageTransition";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { toast } from "sonner";
import { getConditionLabel } from "@/lib/condition";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === id);
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <PageTransition>
        <div className="container py-16 text-center">
          <p className="text-muted-foreground">Product not found.</p>
          <Link to="/shop"><Button variant="outline" className="mt-4 rounded-button">Back to Shop</Button></Link>
        </div>
      </PageTransition>
    );
  }

  const condition = getConditionLabel(product.conditionScore);
  const productReviews = reviews.filter((r) => r.productId === product.id);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id && !p.isCombo).slice(0, 4);
  const inStock = product.stockQty > 0;

  const handleAddToCart = () => {
    addToCart(product, qty);
    toast.success(`${product.title} added to cart`);
  };
  const handleBuyNow = () => {
    addToCart(product, qty);
    navigate("/cart");
  };

  return (
    <PageTransition>
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-[4/3] rounded-card overflow-hidden bg-surface border border-border">
              <img src={productImages[product.id] || product.images[selectedImage]} alt={product.title} className="h-full w-full object-cover" />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 rounded-md overflow-hidden border transition-colors ${i === selectedImage ? "border-foreground" : "border-border"}`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{product.brand} · {product.category}</p>
              <h1 className="text-3xl font-gaming text-foreground">{product.title}</h1>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-2xl font-semibold text-foreground">PKR {product.pricePKR.toLocaleString()}</span>
              <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-button border border-condition/40 text-condition">
                {condition.label} · {condition.grade}
              </span>
              {product.isCombo && <span className="inline-flex text-xs font-semibold px-2.5 py-1 rounded-button bg-foreground text-background">COMBO</span>}
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{product.conditionNote}</p>
              <p className={`text-sm ${inStock ? "text-muted-foreground" : "text-muted-foreground/50"}`}>
                {inStock ? `${product.stockQty} in stock` : "Out of stock"}
              </p>
            </div>
            {product.isCombo && product.comboItems && (
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Includes:</p>
                <ul className="text-sm text-muted-foreground list-disc pl-4">
                  {product.comboItems.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            )}
            <Separator className="bg-border" />
            {inStock && (
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center border border-border rounded-button">
                  <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setQty(Math.max(1, qty - 1))} disabled={qty <= 1}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center text-sm font-medium">{qty}</span>
                  <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => {
                    if (qty >= product.stockQty) { toast.info("Maximum stock reached"); return; }
                    setQty(qty + 1);
                  }}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button onClick={handleAddToCart} className="h-11 px-6 rounded-button bg-foreground text-background hover:bg-foreground/80 gap-2 font-semibold flex-1 sm:flex-none">
                  <ShoppingCart className="h-4 w-4" /> Add to Cart
                </Button>
                <Button onClick={handleBuyNow} variant="outline" className="h-11 px-6 rounded-button border-border hover:bg-surface flex-1 sm:flex-none">
                  Buy Now
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="description" className="mt-12">
          <TabsList className="bg-surface border border-border rounded-button w-full sm:w-auto">
            <TabsTrigger value="description" className="rounded-button data-[state=active]:bg-card">Description</TabsTrigger>
            <TabsTrigger value="specs" className="rounded-button data-[state=active]:bg-card">Specs</TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-button data-[state=active]:bg-card">Reviews ({productReviews.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <p className="text-muted-foreground leading-relaxed max-w-2xl">{product.description}</p>
          </TabsContent>
          <TabsContent value="specs" className="mt-6">
            <div className="max-w-md space-y-3">
              {product.specs.map((spec) => (
                <div key={spec.label} className="flex justify-between text-sm py-2 border-b border-border">
                  <span className="text-muted-foreground">{spec.label}</span>
                  <span className="text-foreground font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            {productReviews.length === 0 ? (
              <p className="text-muted-foreground">No reviews yet for this product.</p>
            ) : (
              <div className="space-y-4 max-w-2xl">
                {productReviews.map((r) => (
                  <div key={r.id} className="flex gap-3 p-4 rounded-card border border-border bg-card">
                    <div className="h-10 w-10 rounded-full bg-surface overflow-hidden shrink-0">
                      <img src={r.image} alt={r.name} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-foreground">{r.name}</span>
                        <div className="flex gap-0.5">{Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="h-3 w-3 fill-star text-star" />)}</div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{r.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-gaming text-foreground mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </PageTransition>
  );
};

export default ProductDetail;
