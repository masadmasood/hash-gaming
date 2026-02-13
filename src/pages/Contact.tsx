import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

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
      <div className="container py-8 max-w-4xl">
        <h1 className="text-3xl font-semibold mb-8 text-foreground">Contact Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <p className="text-muted-foreground">Have questions about a product or your order? We're here to help.</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-surface-2 flex items-center justify-center"><User className="h-5 w-5 text-foreground" /></div>
                <div><p className="text-sm font-medium text-foreground">Hammad Shafi</p><p className="text-sm text-muted-foreground">Owner</p></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-surface-2 flex items-center justify-center"><Phone className="h-5 w-5 text-foreground" /></div>
                <p className="text-sm text-foreground">0313-2153277</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-surface-2 flex items-center justify-center"><Mail className="h-5 w-5 text-foreground" /></div>
                <p className="text-sm text-foreground">hammadparekh52@gmail.com</p>
              </div>
            </div>
          </div>
          <Card className="rounded-card border-border bg-card">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Name *</label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-input border-border bg-surface h-11" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Email *</label>
                  <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="rounded-input border-border bg-surface h-11" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Subject</label>
                  <Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="rounded-input border-border bg-surface h-11" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Message *</label>
                  <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="rounded-input border-border bg-surface min-h-[120px]" />
                </div>
                <Button type="submit" className="w-full h-11 rounded-button bg-foreground text-background hover:bg-foreground/90">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
