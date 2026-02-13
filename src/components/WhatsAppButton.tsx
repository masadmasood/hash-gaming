export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/923132153277"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center h-12 w-12 rounded-full border border-border bg-card hover:bg-surface transition-colors shadow-sm"
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 32 32" className="h-5 w-5 fill-none stroke-foreground stroke-[1.5]">
        <path d="M16.004 2C8.832 2 3 7.832 3 15.004c0 2.296.6 4.536 1.74 6.508L3 29l7.672-1.712A12.94 12.94 0 0016.004 28C23.176 28 29 22.168 29 15.004S23.176 2 16.004 2z" />
        <path d="M22.5 18.5c-.4.6-1.8 1.2-2.5 1.3-.7.1-1.3.3-4.3-1.1-3.6-1.7-5.8-5.4-6-5.6-.2-.2-1.4-1.9-1.4-3.6s.9-2.6 1.2-2.9c.3-.3.7-.4 1-.4h.7c.3 0 .5 0 .7.5.3.6.9 2.2 1 2.4.1.2.1.4 0 .6-.1.2-.2.3-.3.5-.2.2-.3.3-.5.5-.2.2-.3.4-.1.7.2.3.8 1.3 1.7 2.2 1.2 1.1 2.2 1.4 2.5 1.6.3.1.5.1.7-.1.2-.2.5-.7.8-1.1.2-.3.5-.3.8-.2.3.1 1.9.9 2.2 1.1.3.1.5.2.6.4.1.1.1.8-.3 1.5z" />
      </svg>
    </a>
  );
}
