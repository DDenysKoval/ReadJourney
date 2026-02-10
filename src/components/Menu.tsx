import { NavLink, type NavLinkProps } from "react-router";
import ButtonComp from "./ButtonComp";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Menu({ isOpen, onClose }: MenuProps) {
  const handleLogout = () => {};
  const navLinkClass: NavLinkProps["className"] = ({ isActive }) =>
    `relative ${
      isActive
        ? "text-white after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-orange"
        : "hover:text-orange"
    }`;
  const logoutButton = {
    width: "w-[114px]",
    height: "h-[42px]",
    backgroundColor: "bg-transparent",
    borderColor: "border-very-light-gray",
    color: "text-white",
    backgroundColorHover: "hover:bg-white",
    borderColorHover: "hover:border-white",
    colorHover: "hover:text-middle-gray",
  };
  return (
    <>
      <div
        className={`fixed inset-0 z-999 bg-dark-gray transition-opacity duration-300 ${isOpen ? "opacity-50 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />
      <aside
        className={`fixed top-0 right-0 flex flex-col items-center z-1000 w-50 bg-middle-gray transform transition-transform ease-in-out duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <button className="absolute top-8.5 right-10" onClick={onClose}>
          <svg width={28} height={28}>
            <use href="/icons.svg#x"></use>
          </svg>
        </button>
        <nav className=" h-screen flex flex-col items-center justify-between">
          <ul className="flex flex-col gap-5 my-auto text-very-light-gray">
            <li>
              <NavLink className={navLinkClass} to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className={navLinkClass} to="/library">
                My Library
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="absolute bottom-10">
          <ButtonComp
            text="Log out"
            buttonData={logoutButton}
            onClick={handleLogout}
          />
        </div>
      </aside>
    </>
  );
}
