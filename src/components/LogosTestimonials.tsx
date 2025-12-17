export default function LogosTestimonials() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="flex flex-wrap items-center justify-center gap-10 opacity-70">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-10 w-32 rounded bg-gray-200"
          />
        ))}
      </div>
    </section>
  );
}
