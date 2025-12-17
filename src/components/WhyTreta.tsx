export default function WhyTreta({ reasons }: { reasons: string[] }) {
  return (
    <div>
      <h3 className="text-2xl font-semibold">Why Treta</h3>
      <ul className="mt-6 space-y-3 text-gray-600 dark:text-gray-400">
        {reasons.map((reason) => (
          <li key={reason} className="flex gap-3">
            <span className="mt-2 h-2 w-2 rounded-full bg-black dark:bg-white" />
            {reason}
          </li>
        ))}
      </ul>
    </div>
  );
}
