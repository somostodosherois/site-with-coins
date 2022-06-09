import React, { Fragment } from 'react';

import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

const navigation = [
  { name: 'Missões', href: '/missoes' },
  { name: 'Sobre nós', href: '/sobrenos' },
  { name: 'Transparência', href: '/portal-transparencia' },
  { name: 'Ajuda', href: '/ajuda' },
]

const Menu = () => (
  <div className="relative bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <Popover>
        <div className="relative py-6 px-4 sm:px-6 lg:px-8">
          <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
            <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
              <div className="flex items-center justify-between w-full md:w-auto">
                <a href="/">
                  <span className="sr-only">Workflow</span>
                  <img
                    className="h-8 w-auto sm:h-10"
                    src="https://sth.org.br/wp-content/themes/sth/images/favicon.png"
                  />
                </a>
                <div className="-mr-2 flex items-center md:hidden">
                  <Popover.Button className="bg-gray-100 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500">
                    <span className="sr-only">Abrir menu</span>
                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
              {navigation.map((item) => (
                <a key={item.name} href={item.href} className="font-medium text-gray-500 hover:text-red-500 hover:border-b hover:border-b-1 hover:border-red-500">
                  {item.name}
                </a>
              ))}

              <a
                href="#"
                className="items-center justify-center border border-red-700 text-base rounded-md text-red-500 hover:bg-red-500 hover:text-white md:py-1 md:text-md md:px-4"
              >
                Entrar
              </a>
            </div>
          </nav>
        </div>

        <Transition
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
          >
            <div className="rounded-lg shadow-md bg-gray-100 ring-1 ring-black ring-opacity-5 overflow-hidden">
              <div className="px-5 pt-4 flex items-center justify-between">
                <div>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt=""
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-gray-100 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500">
                    <span className="sr-only">Fechar</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <a
                href="#"
                className="block w-full px-5 py-3 text-center font-medium text-red-600 bg-gray-50 hover:bg-gray-100"
              >
                Entrar
              </a>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  </div>
)

export default Menu