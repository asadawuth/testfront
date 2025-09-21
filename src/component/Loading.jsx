import { MdDownloading } from "react-icons/md";
export default function Loading() {
  return (
    <>
      <div className="fixed inset-0 bg-black/65 opacity-30 z-40"></div>
      <div className="fixed inset-8 z-50">
        <div className="flex items-center justify-center min-h-full text-white text-4xl">
          <MdDownloading className="text-9xl animate-spin text-red-900" />
        </div>
      </div>
    </>
  );
}
