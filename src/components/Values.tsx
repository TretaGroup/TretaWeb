export default function ValuesSection({ values }: { values: string[] }) {
  return (
    <div>
      <h3 className="text-2xl font-semibold">Our Philosophy / Values</h3>
      <div className="mt-6 flex flex-wrap gap-4">
        {values.map((value) => (
          <div
            key={value}
            className="flex h-12 w-12 items-center justify-center rounded-full border text-sm font-medium"
          >
            {value.charAt(0)}
          </div>
        ))}
      </div>
    </div>
  );
}
