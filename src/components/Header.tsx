import { NavLink, type NavLinkProps } from "react-router";
import type { User } from "../types/user";
import ButtonComp from "./ButtonComp";
import LogoLink from "./LogoLink";
import Menu from "./Menu";
import { useState } from "react";

export interface HeaderProps {
  user: User | null;
}

export default function Header({ user }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const handleClick = () => {
    setIsMenuOpen(true);
  };
  const handleLogout = () => {};
  const navLinkClass: NavLinkProps["className"] = ({ isActive }) =>
    `relative ${
      isActive
        ? "text-white after:absolute after:-bottom-2 after:left-0 after:h-0.75 after:w-full after:bg-blue after:rounded-[2px]"
        : "hover:text-white"
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
      <div className="block md:hidden">
        <Menu
          onClose={() => {
            setIsMenuOpen(false);
          }}
          isOpen={isMenuOpen}
        />
      </div>
      <header className="pt-5 md:pt-8">
        <div className="container">
          <div className=" h-14.25 w-full bg-middle-gray rounded-[15px] p-5 mb-2.5 md:mb-4 flex items-center justify-between">
            <LogoLink />
            <nav className="hidden md:block">
              <ul className="flex gap-8 lg:gap-10 text-very-light-gray">
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
            <div className="flex gap-2.5 md:gap-4">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-8.75 h-8.75 md:w-10 md:h-10 rounded-[50%] bg-light-gray border border-very-light-gray text-white">
                  {user?.name?.slice(0, 1)}
                </div>
                <p className="text-white hidden lg:block">{user?.name}</p>
              </div>
              <button className="block md:hidden" onClick={handleClick}>
                <svg width={28} height={28}>
                  <use href="/icons.svg#menu"></use>
                </svg>
              </button>
              <div className="hidden md:block">
                <ButtonComp
                  text="Log out"
                  buttonData={logoutButton}
                  onClick={handleLogout}
                />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
