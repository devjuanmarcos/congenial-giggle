"use client";

import Link from "next/link";

import React from "react";
import { useRouter } from "next/navigation";
import { IoMdArrowDropdown } from "react-icons/io";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "../ui/menubar";
import { LogoWithTheme } from "../button/LogoWithTheme";
import { Button } from "../ui/button";

export const Header = () => {
  const [dropdownVisible, setDropdownVisible] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const sidebarRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownVisible &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        // setDropdownVisible(false); resolver bug
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setSidebarOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownVisible, sidebarRef]);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <header className="header w-full bg-[rgb(var(--var-marca-100-08))] backdrop-blur-lg min-h-[3.25rem] flex items-center justify-center px-4 max-sm:px-2 max-2sm:flex-col-reverse max-2sm:py-1 fixed top-[45px] z-50">
      <div className="px-5 lg:px-[6.25rem] overflow-visible my-0 mx-auto flex items-center justify-center sm:justify-between w-full ">
        <button onClick={toggleSidebar} className="lg:hidden mr-4">
          <svg className={`w-6 h-6 text-text-cinza-escuro`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        <LogoWithTheme />

        <nav className="relative items-center justify-center px-9 w-full gap-6 hidden lg:flex">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>
                <Link className="" href="/noticias">
                  <span className="nav-bar-medium">Revista</span>
                </Link>
              </MenubarTrigger>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>
                <Link className="" href="/instituto-biomob">
                  <span className="nav-bar-medium">Notícias</span>
                </Link>
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>
                <Link className="" href="/instituto-biomob">
                  <span className="nav-bar-medium">Acessibilidade</span>
                </Link>
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>
                <Link className="" href="/instituto-biomob">
                  <span className="nav-bar-medium">Cultura</span>
                </Link>
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>
                <Link className="" href="/instituto-biomob">
                  <span className="nav-bar-medium">Justiça e Política</span>
                </Link>
              </MenubarTrigger>
            </MenubarMenu>
          </Menubar>
        </nav>

        <Button title="Assinar Revista">Assinar revista</Button>

        <aside
          className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"}  lg:hidden bg-[rgb(var(--var-background-principal))] h-screen p-5 transition-transform duration-300 flex flex-col text-md font-semibold fixed top-0 left-0 z-50`}
          ref={sidebarRef}
        >
          <button onClick={toggleSidebar} className="lg:hidden mr-4">
            <svg className={`w-6 h-6 text-text-cinza-escuro`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>

          <nav className="flex flex-col items-center justify-end px-9 w-full space-y-4">
            <div className="relative" ref={dropdownRef}>
              <button onClick={toggleDropdown} className="nav-bar-medium">
                Nossa soluções 🡻
              </button>
              {dropdownVisible && (
                <div className="absolute right-0 mt-2 w-48 bg-[rgb(var(--var-background-principal))] border rounded shadow-lg">
                  <Link
                    href="/acessibilidade-arquitetonica"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDropdownVisible(false);
                      setSidebarOpen(false);
                    }}
                    className="block px-4 py-2"
                  >
                    Acessibilidade Arquitetônica
                  </Link>
                  <Link
                    href="/acessibilidade-digital"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDropdownVisible(false);
                      setSidebarOpen(false);
                    }}
                    className="block px-4 py-2"
                  >
                    Acessibilidade Digital
                  </Link>
                </div>
              )}
            </div>

            <Link onClick={toggleSidebar} className="nav-bar-medium" href="/noticias">
              Notícias
            </Link>

            <Link onClick={toggleSidebar} className="nav-bar-medium" href="/instituto-biomob">
              Instituto
            </Link>
          </nav>
        </aside>
      </div>
    </header>
  );
};

export default Header;
