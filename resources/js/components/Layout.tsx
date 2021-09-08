/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */
import React from "react";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import Timer from "./Timer";

interface ILayoutProps {
  children: React.ReactNode;
  links: { href: string; label: string }[];
}

const Layout: React.FC<ILayoutProps> = ({ children, links }: ILayoutProps) => {
  const {
    props: { authenticated },
  } = usePage();
  links = authenticated
    ? [...links, { href: "/auth/logout", label: "Logout" }]
    : links;

  return (
    <div className="flex flex-col w-full h-full">
      <nav className="flex p-5 justify-between items-center flex-col sm:flex-row">
        <div className="flex sm:w-1/3 w-full justify-center sm:justify-start">
          <img
            className="h-20 sm:h-12 w-auto mr-2"
            src="/img/dpslogo.png"
            alt="DPS Society"
          />
          <img
            className="h-20 sm:h-12 w-auto"
            src="/img/goethelogo.png"
            alt="Goethe Institut"
          />
        </div>

        <div className="flex items-center justify-center sm:w-1/3 w-full sm:my-0 my-4">
          <Timer />
        </div>

        <div className="flex items-center justify-center sm:justify-end sm:w-1/3 w-full">
          {links.map(({ href, label }, i) => (
            <InertiaLink
              href={href}
              key={i}
              className={
                "font-bold text-lg sm:text-sm text-gray-700 uppercase" +
                (i === links.length - 1 ? "" : " mr-4")
              }
            >
              {label}
            </InertiaLink>
          ))}
        </div>
      </nav>
      <main className="flex-1 py-10">{children}</main>
      <footer className="flex items-center justify-center py-4 text-gray-500 flex-col text-sm sm:text-xs text-center px-2">
        <div className="text-lg font-bold text-gray-300">
          &bull;&bull;&bull;
        </div>
        <div className="mb-3">
          <a
            className="mx-3 font-semibold"
            target="_blank"
            rel="noreferrer"
            href="#"
          >
            DPS Society
          </a>{" "}
          |
          <a
            className="mx-3 font-semibold"
            target="_blank"
            rel="noreferrer"
            href="https://goethe.de"
          >
            Goethe Institut
          </a>{" "}
          |
          <a
            className="mx-3 font-semibold"
            target="_blank"
            rel="noreferrer"
            href="https://dpsrkp.net"
          >
            DPS RK Puram
          </a>
        </div>
        <div>&copy; 2021 DPS Society and DPS RK Puram, New Delhi, India</div>
        <div>
          All rights reserved. Online quiz tool developed by{" "}
          <a
            href="//angad.dev"
            className="font-bold"
            target="_blank"
            rel="noreferrer"
          >
            Angad Singh
          </a>
          ,{" "}
          <a
            href="//kavin.me"
            className="font-bold"
            target="_blank"
            rel="noreferrer"
          >
            Kavin Valli
          </a>{" "}
          and{" "}
          <a
            href="//someshkar.com"
            className="font-bold"
            target="_blank"
            rel="noreferrer"
          >
            Somesh Kar
          </a>{" "}
          of{" "}
          <a
            href="//exunclan.com"
            className="font-bold"
            target="_blank"
            rel="noreferrer"
          >
            Exun Clan
          </a>
          .
        </div>
      </footer>
    </div>
  );
};

export default Layout;
