export default function LayoutModelRegister({ text, children }) {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">{text}</h2>
          {children}
        </div>
      </div>
    </>
  );
}
