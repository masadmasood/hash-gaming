import { PageTransition } from "@/components/PageTransition";
import { Separator } from "@/components/ui/separator";
import { exchangeHighlight, exchangeEligibility, exchangeNonEligible, whatsappLink, whatsappNumber, supportEmail } from "@/data/siteData";
import { MessageCircle, Mail } from "lucide-react";

const ExchangePolicy = () => (
  <PageTransition>
    <div className="container py-16 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-4">Exchange & Returns Policy</h1>
        <p className="text-muted-foreground text-lg">Hassle-free 3-day exchange for defective items.</p>
      </div>

       <div className="bg-card border border-border/50 rounded-card p-8 md:p-12 space-y-10 shadow-sm relative overflow-hidden">
        <section>
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
              <span className="h-2 w-2 bg-primary rounded-full"></span> {exchangeHighlight.title}
            </h2>
            <p className="text-muted-foreground text-sm">{exchangeHighlight.description}</p>
          </div>
        </section>

        <section>
           <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="h-6 w-1 bg-primary rounded-full"></span> Eligibility for Exchange
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            {exchangeEligibility.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <Separator />

        <section>
           <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="h-6 w-1 bg-destructive rounded-full"></span> Non-Eligibility
          </h2>
          <p className="text-muted-foreground mb-3">We regret that we cannot offer exchanges for:</p>
           <div className="grid sm:grid-cols-2 gap-4">
              {exchangeNonEligible.map((item, i) => (
                <div key={i} className="bg-muted p-4 rounded-lg border border-border/50 text-sm text-foreground font-medium flex items-start gap-2">
                  <span className="text-destructive font-bold">×</span> {item}
                </div>
              ))}
           </div>
        </section>

        <Separator />

        <section>
           <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="h-6 w-1 bg-primary rounded-full"></span> How to Initiate Exchange
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>Please contact our support team immediately if you encounter an issue.</p>
            <div className="flex flex-col sm:flex-row gap-3">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all group flex-1">
                    <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                      <MessageCircle className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                        <div className="font-bold text-foreground text-sm">WhatsApp Support</div>
                        <div className="text-xs text-muted-foreground">{whatsappNumber}</div>
                    </div>
                </a>
                <a href={`mailto:${supportEmail}`} className="flex items-center gap-3 p-4 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all group flex-1">
                    <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                        <div className="font-bold text-foreground text-sm">Email Support</div>
                        <div className="text-xs text-muted-foreground">{supportEmail}</div>
                    </div>
                </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  </PageTransition>
);

export default ExchangePolicy;
