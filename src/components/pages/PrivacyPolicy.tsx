"use client";

import { PageTransition } from "@/components/PageTransition";
import { Separator } from "@/components/ui/separator";
import { privacyPolicy, privacyNote, privacyFooter } from "@/data/siteData";

const PrivacyPolicy = () => (
  <PageTransition>
    <div className="container py-16 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground text-lg">How we handle and protect your data.</p>
      </div>

      <div className="bg-card border border-border/50 rounded-card p-8 md:p-12 space-y-10 shadow-sm">
        {privacyPolicy.map((section, i) => (
          <div key={i}>
            {i > 0 && <Separator className="mb-10" />}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="h-6 w-1 bg-primary rounded-full"></span> {section.title}
              </h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>{section.content}</p>
                {section.list && (
                  <ul className="list-disc pl-6 space-y-1">
                    {section.list.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.title === "How We Use It" && (
                  <p className="mt-2 text-foreground/80 font-medium">{privacyNote}</p>
                )}
              </div>
            </section>
          </div>
        ))}

        <Separator />

        <div className="bg-muted/30 p-6 rounded-lg border border-border/30 text-center">
             <p className="text-sm text-muted-foreground">{privacyFooter}</p>
        </div>
      </div>
    </div>
  </PageTransition>
);

export default PrivacyPolicy;
