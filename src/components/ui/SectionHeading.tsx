interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({
  title,
  subtitle,
}: SectionHeadingProps) {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-semibold">{title}</h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}
