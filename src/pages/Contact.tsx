import { Mail, Instagram, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon 💕");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="font-heading text-4xl font-bold text-foreground mb-2">Get in Touch</h1>
          <p className="text-muted-foreground">Have a question or want a custom order? We'd love to hear from you!</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card p-8 rounded-xl border space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Name</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border bg-background text-sm" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border bg-background text-sm" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Message</label>
            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border bg-background text-sm" rows={5} required />
          </div>
          <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
            Send Message
          </button>
        </form>

        <div className="flex justify-center gap-8 mt-10">
          {[
            { icon: Mail, label: "Email", href: "mailto:hello@WoolNeedleMe.com" },
            { icon: Instagram, label: "Instagram", href: "#" },
            { icon: MessageCircle, label: "WhatsApp", href: "#" },
          ].map((s) => (
            <a key={s.label} href={s.href} className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <s.icon className="w-6 h-6" />
              <span className="text-xs">{s.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
