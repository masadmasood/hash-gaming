import { PageTransition } from "@/components/PageTransition";
import { Separator } from "@/components/ui/separator";
import { termsAndConditions, termsFooter } from "@/data/siteData";
import { FileText } from "lucide-react";

const Terms = () => (
  <PageTransition>
    <div className="container py-16 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-secondary mb-4 mx-auto">
          <FileText className="h-6 w-6 text-foreground" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-4">Terms & Conditions</h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">Please read these terms carefully before using our services.</p>
      </div>
      
      <div className="bg-card border border-border/50 rounded-card p-8 md:p-12 space-y-10 shadow-sm">
        {termsAndConditions.map((section, i) => (
          <div key={i}>
            {i > 0 && <Separator className="mb-10" />}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="h-6 w-1 bg-primary rounded-full"></span> {section.title}
              </h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>{section.content}</p>
                {section.list && (
                  <ul className="list-disc pl-6 space-y-1.5">
                    {section.list.map((item, j) => (
                      <li key={j}>
                        {section.title.includes("Grading") || section.title.includes("Condition") ? (
                          <><strong className="text-foreground">{item.split(":")[0]}:</strong>{item.substring(item.indexOf(":") + 1)}</>
                        ) : item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          </div>
        ))}

        <Separator />

        <div className="bg-muted/30 p-6 rounded-lg border border-border/30 text-center">
            <p className="text-sm text-muted-foreground">{termsFooter}</p>
        </div>
      </div>
    </div>
  </PageTransition>
);

export default Terms;
