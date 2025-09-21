export default function TextError({ text, className = "" }) {
  return (
    <>
      <div className={className}>
        <span className="text-red-500">{text}</span>
      </div>
    </>
  );
}
