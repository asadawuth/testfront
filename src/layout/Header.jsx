// อาจจะไม่ได้ย่อยโค๊ดครับ เพราะว่ามีแค่ Router
// /booking /yourlist
import { AiOutlineMenu, AiOutlineSearch, AiOutlineBell } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hook/user-auth";
import { useLocation } from "react-router-dom";

export default function Header() {
  const { logout, logoutAll } = useAuth();
  const [listMenu, setListMenu] = useState(false);

  const [modalLogout, setModalLogout] = useState(false);
  const [modalLogoutAll, setModalLogoutAll] = useState(false);

  // refs สำหรับตรวจจับคลิกนอก
  const menuBtnRef = useRef(null);
  const menuRef = useRef(null);
  const location = useLocation();
  // ปิด dropdown เมื่อคลิกนอก/กด Esc
  useEffect(() => {
    const handleClick = (e) => {
      if (!listMenu) return;
      const t = e.target;
      if (
        menuRef.current &&
        !menuRef.current.contains(t) &&
        menuBtnRef.current &&
        !menuBtnRef.current.contains(t)
      ) {
        setListMenu(false);
      }
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (modalLogout) setModalLogout(false);
        else if (modalLogoutAll) setModalLogoutAll(false);
        else setListMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [listMenu, modalLogout, modalLogoutAll]);

  // lock scroll เมื่อมีโมดอล
  useEffect(() => {
    const open = modalLogout || modalLogoutAll;
    document.body.style.overflow = open ? "hidden" : "";
  }, [modalLogout, modalLogoutAll]);

  // เปิดโมดอลจากเมนู
  const openLogout = () => {
    setListMenu(false);
    setModalLogout(true);
  };
  const openLogoutAll = () => {
    setListMenu(false);
    setModalLogoutAll(true);
  };

  return (
    <>
      <header className="sticky top-0 bg-white">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between gap-3">
            {/* Left: Logo + Brand */}
            <div className="flex items-center gap-3">
              <img
                src="/public/test.jpg"
                alt="test"
                className="h-14 w-14 ring-1 ring-black/10"
              />
              <div className="hidden sm:block">
                <p className="text-xs leading-none text-gray-500">TestTen</p>
                <h1 className="text-base font-semibold tracking-tight">
                  TestTen
                </h1>
              </div>
            </div>

            {/* Middle: Search */}
            <div className="hidden sm:flex flex-1 max-w-xl items-center">
              <div className="relative w-full">
                <AiOutlineSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full rounded-xl border border-gray-200 bg-white/70 pl-10 pr-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500/50"
                  readOnly
                />
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50">
                <AiOutlineSearch size={20} />
              </div>
              <div className="hidden sm:flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50">
                <AiOutlineBell size={20} />
              </div>
              <span className="hidden lg:inline-block text-sm text-gray-700">
                Test
              </span>
            </div>

            {/* Hamburger + Dropdown */}
            <div className="relative">
              <button
                ref={menuBtnRef}
                aria-haspopup="menu"
                aria-expanded={listMenu}
                onClick={() => setListMenu((v) => !v)}
                className="inline-flex items-center justify-center rounded-lg p-2 transition hover:bg-emerald-50"
              >
                <AiOutlineMenu size={22} className="cursor-pointer" />
              </button>

              {/* Dropdown */}
              <div
                ref={menuRef}
                className={`absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-emerald-200 bg-white shadow-xl ring-1 ring-black/5
                ${
                  listMenu
                    ? "scale-100 opacity-100"
                    : "pointer-events-none scale-95 opacity-0"
                }
                transition-transform duration-150`}
              >
                <div className="rounded-t-xl bg-emerald-50 px-4 py-3">
                  <p className="text-sm font-semibold text-emerald-900">
                    Quick Menu
                  </p>
                  <p className="text-xs text-emerald-800/70">Test Ten</p>
                </div>

                <div className="flex flex-col py-2 text-sm text-gray-700">
                  <li
                    className={`px-4 py-2 cursor-pointer flex items-center gap-2 
        ${
          location.pathname === "/booking"
            ? "bg-emerald-50"
            : "hover:bg-emerald-50"
        }`}
                  >
                    <Link to="/booking" className="w-full">
                      🕒 Booking
                    </Link>
                  </li>
                  <li
                    className={`px-4 py-2 cursor-pointer flex items-center gap-2 
        ${
          location.pathname === "/yourlist"
            ? "bg-emerald-50"
            : "hover:bg-emerald-50"
        }`}
                  >
                    <Link to="/yourlist" className="w-full">
                      📋 Yourlist
                    </Link>
                  </li>
                  <div className="my-1 border-t border-emerald-100" />

                  <li
                    onClick={openLogout}
                    className="px-4 py-2 hover:bg-red-50 text-red-600 cursor-pointer flex items-center gap-2 font-medium"
                  >
                    🚪 logout
                  </li>
                  <li
                    onClick={openLogoutAll}
                    className="px-4 py-2 hover:bg-red-50 text-red-600 cursor-pointer flex items-center gap-2 font-medium"
                  >
                    🔒 logoutall
                  </li>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {modalLogout && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40"
          onClick={() => setModalLogout(false)}
        >
          <div
            className="w-[92%] max-w-md rounded-2xl bg-white shadow-2xl transition transform"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-t-2xl bg-emerald-50 px-5 py-4">
              <h3 className="text-base font-semibold text-emerald-900">
                Confirm Logout
              </h3>
              <p className="mt-1 text-sm text-emerald-800/70">
                You are about to log out from this device.
              </p>
            </div>

            <div className="px-5 py-5 space-y-3">
              <p className="text-sm text-gray-700">
                If you confirm, you will need to sign in again.
              </p>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setModalLogout(false)}
                  className="rounded-xl border border-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={logout}
                  className="rounded-xl bg-red-500 px-4 py-2 text-white hover:bg-red-600 cursor-pointer"
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {modalLogoutAll && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40"
          onClick={() => setModalLogoutAll(false)}
        >
          <div
            className="w-[92%] max-w-md rounded-2xl bg-white shadow-2xl transition transform"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-t-2xl bg-emerald-50 px-5 py-4">
              <h3 className="text-base font-semibold text-emerald-900">
                Log out from all devices
              </h3>
              <p className="mt-1 text-sm text-emerald-800/70">
                You will be logged out from every device you have previously
                signed in on.
              </p>
            </div>

            <div className="px-5 py-5 space-y-3">
              <p className="text-sm text-gray-700">
                Once confirmed, all logins on all devices will immediately end.
              </p>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setModalLogoutAll(false)}
                  className="rounded-xl border border-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={logoutAll}
                  className="rounded-xl bg-red-500 px-4 py-2 text-white hover:bg-red-600 cursor-pointer"
                >
                  Log out from all devicesด
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
