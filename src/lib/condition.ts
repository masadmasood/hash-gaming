export function getConditionLabel(score: number): { label: string; color: string } {
  if (score >= 9) return { label: "Like New", color: "text-neon-cyan border-neon-cyan/30 bg-neon-cyan/10" };
  if (score >= 7) return { label: "Excellent", color: "text-neon-lime border-neon-lime/30 bg-neon-lime/10" };
  if (score >= 5) return { label: "Good", color: "text-foreground border-foreground/20 bg-foreground/5" };
  return { label: "Fair", color: "text-muted-foreground border-muted-foreground/20 bg-muted-foreground/5" };
}
