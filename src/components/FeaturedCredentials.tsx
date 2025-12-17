import SectionHeading from "@/src/components/ui/SectionHeading";

export default function FeaturedCredentials() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading title="Featured Credentials" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-40 rounded-xl border bg-white dark:bg-black"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
