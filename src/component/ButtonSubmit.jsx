export default function ButtonSubmit({
  submitting = false,
  label = "Submit",
  className = "",
  type = "submit",
  onClick,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={submitting}
      className={`flex-1 font-medium px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white cursor-pointer transition-all ${className}`}
    >
      {submitting ? "Loading..." : label}
    </button>
  );
}
