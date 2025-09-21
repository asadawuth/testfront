export default function Input({ ...props }) {
  return (
    <>
      <div className="space-y-1">
        <input
          {...props}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
        />
      </div>
    </>
  );
}
