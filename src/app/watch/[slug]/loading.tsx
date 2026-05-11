export default function LoadingWatch() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="text-center">
        <div className="mx-auto mb-8 h-px w-32 animate-pulse bg-[#D4AF37]" />
        <p className="text-xs uppercase tracking-[0.34em] text-white/50">Preparing the complication</p>
      </div>
    </div>
  );
}
