export default function LayoutBeforeLogin({ children, text = "" }) {
  return (
    <div className="h-[100vh] flex flex-col bg-gray-50">
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <div className="flex flex-col items-center mb-6">
            <img
              src="/test.jpg"
              alt="PJ Village"
              className="h-16 w-16 mb-2 rounded-full ring-1 ring-gray-200"
            />
            <h1 className="text-xl font-semibold">Test {text}</h1>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
