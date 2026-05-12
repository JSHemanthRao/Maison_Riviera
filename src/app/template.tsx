export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-[pageReveal_700ms_ease-out_both]">{children}</div>;
}
