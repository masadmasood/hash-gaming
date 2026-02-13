import { PageTransition } from "@/components/PageTransition";

const Terms = () => (
  <PageTransition>
    <div className="container py-12 max-w-2xl">
      <h1 className="text-3xl font-gaming text-foreground mb-8">Terms & Conditions</h1>
      <div className="text-sm text-muted-foreground space-y-4 leading-relaxed">
        <p>By placing an order on Hashtech Gaming, you agree to these terms.</p>
        <p>All products are used/pre-owned and sold as-is with the condition noted on each listing. We make every effort to accurately describe and grade each item.</p>
        <p>Prices are in Pakistani Rupees (PKR) and include no hidden fees.</p>
        <p>We reserve the right to cancel or refuse orders if stock is unavailable or if we suspect fraudulent activity.</p>
        <p>For any disputes, please contact us directly. We aim to resolve all issues amicably.</p>
      </div>
    </div>
  </PageTransition>
);

export default Terms;
