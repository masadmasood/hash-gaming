import { PageTransition } from "@/components/PageTransition";

const ExchangePolicy = () => (
  <PageTransition>
    <div className="container py-12 max-w-2xl">
      <h1 className="text-3xl font-gaming text-foreground mb-8">Exchange Policy</h1>
      <div className="text-sm text-muted-foreground space-y-4 leading-relaxed">
        <p>We offer <strong className="text-foreground">same product exchange only</strong> if the item has a functional defect that was not disclosed in the condition notes.</p>
        <p>Exchange requests must be made within <strong className="text-foreground">3 days</strong> of delivery.</p>
        <h3 className="text-foreground font-semibold pt-2">We do NOT accept exchanges for:</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Physical damage caused after delivery (drops, spills, etc.)</li>
          <li>Broken items due to misuse</li>
          <li>Change of mind or preference</li>
          <li>Cosmetic wear that was already noted in the listing</li>
        </ul>
        <p>To request an exchange, contact us at <strong className="text-foreground">0313-2153277</strong> or email <strong className="text-foreground">hammadparekh52@gmail.com</strong> with your order ID and photos of the issue.</p>
      </div>
    </div>
  </PageTransition>
);

export default ExchangePolicy;
