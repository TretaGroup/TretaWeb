export default function CTA({ label }: { label: string }) {
  return (
    <section className="border-t">
      <div className="mx-auto max-w-7xl px-6 py-16 text-center">
        <button className="rounded-xl bg-black px-8 py-3 text-white dark:bg-white dark:text-black">
          {label}
        </button>
      </div>
    </section>
  );
}
