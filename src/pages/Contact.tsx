import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const contactInfo = [
  { icon: MapPin, title: "Location", value: "Karachi, Pakistan" },
  { icon: Mail, title: "Email", value: "hammadparekh52@gmail.com" },
  { icon: Phone, title: "Phone", value: "0313-2153277" },
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
      <section className="py-16 md:py-20 border-b border-border">
        <div className="container text-center max-w-2xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-5xl font-gaming-black text-foreground">GET IN TOUCH</h1>
          <p className="text-muted-foreground">
            Have a question about a product or your order? We'd love to hear from you. Our team typically responds within 24 hours.
          </p>
        </div>
      </section>

      <div className="container py-12 max-w-5xl">
        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {contactInfo.map((item) => (
            <Card key={item.title} className="rounded-card border-border bg-card">
              <CardContent className="p-6 text-center space-y-3">
                <div className="h-11 w-11 rounded-lg bg-surface flex items-center justify-center mx-auto">
                  <item.icon className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="font-semibold text-foreground text-sm">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Form */}
        <Card className="rounded-card border-border bg-card max-w-2xl mx-auto">
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
    </PageTransition>
  );
};

export default Contact;
