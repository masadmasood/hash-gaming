import { PageTransition } from "@/components/PageTransition";

const PrivacyPolicy = () => (
  <PageTransition>
    <div className="container py-12 max-w-2xl">
      <h1 className="text-3xl font-gaming text-foreground mb-8">Privacy Policy</h1>
      <div className="text-sm text-muted-foreground space-y-4 leading-relaxed">
        <p>Hashtech Gaming collects your name, email, phone number, and delivery address solely for order processing and delivery purposes.</p>
        <p>We do not sell, trade, or share your personal information with third parties except our delivery partners for order fulfillment.</p>
        <p>Payment information is handled securely. For Cash on Delivery, no payment data is collected online. For Nayapay, transactions are processed through Nayapay's secure platform.</p>
        <p>You may contact us at any time to request deletion of your personal data.</p>
      </div>
    </div>
  </PageTransition>
);

export default PrivacyPolicy;
