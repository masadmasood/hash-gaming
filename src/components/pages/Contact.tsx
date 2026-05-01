"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin, Hash, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { contactInfo, supportHours } from "@/data/siteData";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  location: MapPin, email: Mail, phone: Phone, hashtag: Hash,
};

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Enter a valid email address"),
  subject: z.string().trim().optional(),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const Contact = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = () => {
    toast.success("Message sent! We'll get back to you soon.");
    form.reset();
  };

  return (
    <PageTransition>
      <div className="overflow-hidden bg-background pb-16 md:pb-24">
        {/* Hero */}
        <section className="py-16 md:py-20">
          <div className="container text-center max-w-2xl mx-auto space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface text-foreground">
              <MessageCircle className="h-5 w-5" />
            </div>
            <h1 className="text-4xl md:text-5xl font-gaming-black text-foreground">GET IN TOUCH</h1>
            <p className="text-muted-foreground">
              Questions about a product, order, exchange, or delivery? Send us a message and our team will help.
            </p>
          </div>
        </section>

        <div className="container py-12 max-w-5xl">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Left: Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-gaming text-foreground mb-2">Contact Information</h2>
              <p className="text-sm text-muted-foreground">Reach out through any of the channels below and we'll get back to you promptly.</p>
            </div>
            <div className="space-y-5">
              {contactInfo.map((item) => {
                const Icon = iconMap[item.type] || Hash;
                return (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-secondary text-foreground mt-0.5">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Our support hours are {supportHours}. Orders placed outside these hours will be processed on the next business day.
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <Card className="mx-auto w-full max-w-xl rounded-card border-border bg-card lg:max-w-none">
            <CardContent className="p-8">
              <h2 className="text-xl font-gaming text-foreground mb-6">Send us a message</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground font-medium">Name *</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Your name"
                              className="rounded-input border-border bg-background h-11 transition-all duration-200 focus-visible:border-foreground/30"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground font-medium">Email *</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="you@email.com"
                              className="rounded-input border-border bg-background h-11 transition-all duration-200 focus-visible:border-foreground/30"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground font-medium">Subject</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="e.g. Order inquiry"
                            className="rounded-input border-border bg-background h-11 transition-all duration-200 focus-visible:border-foreground/30"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground font-medium">Message *</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="How can we help you?"
                            className="rounded-input border-border bg-background min-h-[140px] transition-all duration-200 focus-visible:border-foreground/30"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={!form.formState.isValid || form.formState.isSubmitting}
                    className="w-full h-11 rounded-button bg-foreground text-background transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground/85 font-semibold"
                  >
                    Send Message
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
