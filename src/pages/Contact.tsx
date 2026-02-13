import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const contactDetails = [
  { icon: MapPin, label: "Location", value: "Karachi, Pakistan" },
  { icon: Mail, label: "Email", value: "hammadparekh52@gmail.com" },
  { icon: Phone, label: "Phone", value: "0313-2153277" },
  { icon: Globe, label: "Social", value: "instagram.com/hashtechgaming" },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <PageTransition>
      {/* Hero */}
      <section className="py-16 md:py-20">
        <div className="container text-center max-w-2xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-5xl font-gaming-black text-foreground">GET IN TOUCH</h1>
          <p className="text-muted-foreground">
            Have a question about a product or your order? We'd love to hear from you. Our team typically responds within 24 hours.
          </p>
        </div>
      </section>

      <div className="container py-12 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-gaming text-foreground mb-2">Contact Information</h2>
              <p className="text-sm text-muted-foreground">Reach out through any of the channels below and we'll get back to you promptly.</p>
            </div>
            <div className="space-y-5">
              {contactDetails.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="relative mt-1">
                    <div className="h-2.5 w-2.5 rounded-full bg-foreground/60" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Our support hours are Monday–Saturday, 10:00 AM – 8:00 PM (PKT). Orders placed outside these hours will be processed on the next business day.
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <Card className="rounded-card border-border bg-card">
            <CardContent className="p-8">
              <h2 className="text-xl font-gaming text-foreground mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1.5 block font-medium">Name *</label>
                    <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-input border-border bg-background h-11" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1.5 block font-medium">Email *</label>
                    <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="rounded-input border-border bg-background h-11" />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block font-medium">Subject</label>
                  <Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="rounded-input border-border bg-background h-11" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block font-medium">Message *</label>
                  <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="rounded-input border-border bg-background min-h-[140px]" />
                </div>
                <Button type="submit" className="w-full h-11 rounded-button bg-foreground text-background hover:bg-foreground/80 font-semibold">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
