import { PageTransition } from "@/components/PageTransition";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { cityDeliveryCharges, deliveryOptions } from "@/data/products";

const Policies = () => {
  return (
    <PageTransition>
      <div className="container py-8 max-w-3xl">
        <h1 className="text-3xl font-semibold mb-8 text-foreground">Policies</h1>
        <Tabs defaultValue="delivery">
          <TabsList className="bg-surface border border-border rounded-button w-full grid grid-cols-4">
            <TabsTrigger value="delivery" className="rounded-button text-xs sm:text-sm data-[state=active]:bg-surface-2">Delivery</TabsTrigger>
            <TabsTrigger value="exchange" className="rounded-button text-xs sm:text-sm data-[state=active]:bg-surface-2">Exchange</TabsTrigger>
            <TabsTrigger value="privacy" className="rounded-button text-xs sm:text-sm data-[state=active]:bg-surface-2">Privacy</TabsTrigger>
            <TabsTrigger value="terms" className="rounded-button text-xs sm:text-sm data-[state=active]:bg-surface-2">Terms</TabsTrigger>
          </TabsList>

          <TabsContent value="delivery" className="mt-6 space-y-6">
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">Delivery Policy</h2>
              <p className="text-muted-foreground text-sm">We deliver across Pakistan with three speed options. Charges vary by city and delivery speed.</p>
            </div>
            <Card className="rounded-card border-border bg-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-surface">
                      <th className="text-left p-3 text-foreground font-medium">City</th>
                      {deliveryOptions.map((opt) => (
                        <th key={opt.id} className="text-right p-3 text-foreground font-medium">{opt.label}<br /><span className="text-xs text-muted-foreground font-normal">{opt.days}</span></th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {cityDeliveryCharges.map((city) => (
                      <tr key={city.city} className="border-b border-border last:border-0">
                        <td className="p-3 text-foreground">{city.city}</td>
                        <td className="p-3 text-right text-muted-foreground">PKR {city.express}</td>
                        <td className="p-3 text-right text-muted-foreground">PKR {city.standard}</td>
                        <td className="p-3 text-right text-muted-foreground">PKR {city.economy}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="exchange" className="mt-6 space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Exchange Policy</h2>
            <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
              <p>We offer <strong className="text-foreground">same product exchange only</strong> if the item has a functional defect that was not disclosed in the condition notes.</p>
              <p>Exchange requests must be made within <strong className="text-foreground">3 days</strong> of delivery.</p>
              <h3 className="text-foreground font-medium pt-2">We do NOT accept exchanges for:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Physical damage caused after delivery (drops, spills, etc.)</li>
                <li>Broken items due to misuse</li>
                <li>Change of mind or preference</li>
                <li>Cosmetic wear that was already noted in the listing</li>
              </ul>
              <p>To request an exchange, contact us at <strong className="text-foreground">0313-2153277</strong> or email <strong className="text-foreground">hammadparekh52@gmail.com</strong> with your order ID and photos of the issue.</p>
            </div>
          </TabsContent>

          <TabsContent value="privacy" className="mt-6 space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Privacy Policy</h2>
            <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
              <p>Hashtech Gaming collects your name, email, phone number, and delivery address solely for order processing and delivery purposes.</p>
              <p>We do not sell, trade, or share your personal information with third parties except our delivery partners for order fulfillment.</p>
              <p>Payment information is handled securely. For Cash on Delivery, no payment data is collected online. For Nayapay, transactions are processed through Nayapay's secure platform.</p>
              <p>You may contact us at any time to request deletion of your personal data.</p>
            </div>
          </TabsContent>

          <TabsContent value="terms" className="mt-6 space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Terms of Service</h2>
            <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
              <p>By placing an order on Hashtech Gaming, you agree to these terms.</p>
              <p>All products are used/pre-owned and sold as-is with the condition noted on each listing. We make every effort to accurately describe and grade each item.</p>
              <p>Prices are in Pakistani Rupees (PKR) and include no hidden fees. Delivery charges are calculated based on your city and chosen speed.</p>
              <p>We reserve the right to cancel or refuse orders if stock is unavailable or if we suspect fraudulent activity.</p>
              <p>For any disputes, please contact us directly. We aim to resolve all issues amicably.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default Policies;
