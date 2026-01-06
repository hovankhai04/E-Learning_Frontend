import { useEffect, useRef, useState } from "react";
import Logo from '../../../public/assets/Logo.svg';
import { RxAvatar, RxExit } from "react-icons/rx";
import { RiFileUserLine } from "react-icons/ri";

type AvatarMenuDropdownProps = {
  avatarUrl?: string;
  onEditProfile?: () => void;
  onLogout?: () => void;
};

export function AvatarMenuDropdown({
  avatarUrl = `${Logo}`,
  onEditProfile,
  onLogout,
}: AvatarMenuDropdownProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative rounded-full" ref={menuRef}>
      {/* Avatar */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer flex h-9 w-auto pr-4 items-center rounded-full border border-mint-50 bg-primary text-primary-foreground focus:outline-none"
        aria-label="Open user menu"
      >
        {avatarUrl ? (
          <>
          <img
            src={avatarUrl}
            alt="User avatar"
            className="h-full w-full rounded-full object-cover"
            />
          {/*User Name*/}  
          <span className="ml-2 text-gray-700 font-medium">Nguyen</span>
        </>
        ) : (
          <span className="text-sm font-semibold"><RxAvatar className="w-10 h-10 text-gray-700" /></span>
        )}

        
      </button>

      
      {/* Dropdown */}
      <div
        className={`
          absolute right-0 mt-2 w-40 rounded-md border border-gray-200 bg-white shadow-md
          transition-all duration-200 ease-out
          ${open ? "opacity-100 scale-100" : "pointer-events-none opacity-0 scale-95"}
        `}
      >
        <button
          onClick={() => {
            setOpen(false);
            onEditProfile?.();
          }}
          className="block w-full align-middle px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
        >
          <RiFileUserLine className="inline w-5 h-5 mr-2 align-sub" /> Edit Profile
        </button>

        <button
          onClick={() => {
            setOpen(false);
            onLogout?.();
          }}
          className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
        >
          <RxExit className="inline w-5 h-5 mr-2" /> Logout
        </button>
      </div>
    </div>
  );
}
