import React, { useState, useEffect } from "react";

import { useCoins } from "../../contexts/coins";
import getUser from "../../hooks/getSession";
import ImageCoin from "../../public/moeda.gif"
import api from '../../pages/api/config'
import Dropdown from "./Dropdown";

const NavBar = () => {
  const [navbar, setNavbar] = useState(false);
  const coins = 0;

  return (
    <nav className="w-full bg-red-600 shadow sticky top-0 z-50">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl lg:items-center lg:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 lg:block">
            <a href="/">
              <img
                className="h-9 sm:h-12 w-auto pb-1"
                src='https://sth.org.br/wp-content/themes/sth/images/logo.svg'
              />
            </a>
            <div className="lg:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 lg:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"
              }`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              <li className="text-white hover:text-black">
                <a href="/sobre-nos">Sobre nós</a>
              </li>
              <li className="text-white hover:text-black">
                <a href="/portal-transparencia">Transparência</a>
              </li>
              <li className="text-white hover:text-black">
                <a href="/campanhas">Campanhas</a>
              </li>
              <li className="text-white hover:text-black">
                <a href="/ajuda">Ajuda</a>
              </li>
            </ul>

            {/* MOBILE */}

            <div className="m-2 grid grid-cols-2 space-x-3 lg:hidden inline-block ">
              {getUser().token ?
                <>
                  <div className="flex mt-6">
                    <img src={ImageCoin.src} style={{ height: '25px', width: '25px' }} />
                    <span className="coins text-white ml-2 text-xl">{coins}</span>
                  </div>


                  <Dropdown />
                </>
                :
                <a
                  href="/login"
                  className="px-2 py-2 text-center text-red-600 bg-white rounded-md shadow hover:bg-red-100"
                >
                  Login
                </a>
              }
            </div>
          </div>
        </div>

        {/* DESKTOP */}

        <div className="hidden space-x-2 lg:flex">
          {getUser().token ?
            <>
              <div className="coins mt-1">
                <a className="coins-icon" href="#" >
                  <div className="flex py-1">
                    <img src={ImageCoin.src} className="moeda-gif ml-4 " />
                    <span className="coins text-white ml-2 text-xl">{coins}</span>
                  </div>
                </a>
              </div>


              <Dropdown />
            </>
            :
            <a
              href="/login"
              className="px-4 py-2 text-red-600 bg-white rounded-md shadow hover:bg-red-100"
            >
              Login
            </a>
          }
        </div>
      </div>
    </nav>
  );
}

export default NavBar