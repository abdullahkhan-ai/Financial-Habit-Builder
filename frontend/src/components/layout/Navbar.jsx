import { useEffect, useRef, useState } from "react";
import {
  Search,
  ChevronDown,
  KeyRound,
  MessageSquare,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ChangePasswordModal from "../ui/ChangePasswordModal";

const avatarColors = [
  "bg-red-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-yellow-500",
  "bg-green-500",
  "bg-emerald-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-sky-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-violet-500",
  "bg-purple-500",
  "bg-pink-500",
];

const getAvatarColor = (name = "") => {
  let hash = 0;

  for (let i = 0; i < name.length; i++) {
    hash += name.charCodeAt(i);
  }

  return avatarColors[
    hash % avatarColors.length
  ];
};

const capitalize = (text = "") => {
  if (!text) return "";

  return (
    text.charAt(0).toUpperCase() +
    text.slice(1)
  );
};

function Navbar() {
  const { user } = useAuth();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const [showChangePassword, setShowChangePassword] =
    useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <>
      <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">

        {/* Search */}

        <div className="relative w-full max-w-md">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search income, expenses, goals..."
            className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />

        </div>

        {/* User */}

        <div
          ref={dropdownRef}
          className="relative"
        >

          <button
            onClick={() =>
              setOpen(!open)
            }
            className="flex items-center gap-2 rounded-xl px-2 py-2 transition hover:bg-slate-100"
          >

            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ${getAvatarColor(
                user?.name
              )}`}
            >
              {user?.name
                ?.charAt(0)
                .toUpperCase()}
            </div>

            <ChevronDown
              size={18}
              className={`transition duration-300 ${
                open
                  ? "rotate-180"
                  : ""
              }`}
            />

          </button>

          {open && (

            <div className="absolute right-0 mt-3 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

              {/* User Info */}

              <div className="flex items-center gap-4 border-b border-slate-200 p-5">

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold text-white ${getAvatarColor(
                    user?.name
                  )}`}
                >
                  {user?.name
                    ?.charAt(0)
                    .toUpperCase()}
                </div>

                <div>

                  <h3 className="font-bold text-slate-900">
                    {capitalize(
                      user?.name
                    )}
                  </h3>

                  <p className="mt-1 break-all text-sm text-slate-500">
                    {user?.email}
                  </p>

                </div>

              </div>

              {/* Menu */}

              <div className="p-2">

                <button
                  onClick={() => {
                    setOpen(false);
                    navigate(
                      "/feedback"
                    );
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-700 transition hover:bg-slate-100"
                >

                  <MessageSquare
                    size={18}
                  />

                  Feedback

                </button>

                <button
                  onClick={() => {
                    setOpen(false);
                    setShowChangePassword(
                      true
                    );
                  }}
                  className="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-700 transition hover:bg-slate-100"
                >

                  <KeyRound
                    size={18}
                  />

                  Change Password

                </button>

              </div>

            </div>

          )}

        </div>

      </header>

      <ChangePasswordModal
        open={showChangePassword}
        onClose={() =>
          setShowChangePassword(
            false
          )
        }
      />

    </>
  );
}

export default Navbar;