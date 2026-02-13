export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/923132153277"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center h-12 w-12 rounded-full border border-border bg-card hover:bg-surface transition-colors"
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.477 2 2 6.253 2 11.5c0 1.737.493 3.376 1.36 4.8L2 22l5.233-1.237A10.63 10.63 0 0012 21c5.523 0 10-4.253 10-9.5S17.523 2 12 2z" />
        <path d="M8.5 12.5c.5 1 1.5 2.2 3 3 1 .5 2 .7 2.5.3l.5-.5c.3-.3.3-.7 0-1l-1-1c-.3-.3-.7-.3-1 0l-.3.3c-.2.2-.5.1-.8-.1-.5-.4-1-1-1.3-1.5-.2-.3-.1-.6.1-.8l.3-.3c.3-.3.3-.7 0-1l-1-1c-.3-.3-.8-.3-1 0l-.5.5c-.4.5-.3 1.5.5 3.1z" />
      </svg>
    </a>
  );
}
