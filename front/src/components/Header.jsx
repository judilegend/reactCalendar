import React from 'react'
import {Button } from "@nextui-org/react"
function Header() {
  return (
    <div className='fixed w-full z-50'>
      <header className="px-10 max-lg:bg-white ">
        <nav className="p-3">
          <ul className="flex w-full justify-between ">
            <li>
              <a href="/">
                <img src="/logo.svg" alt="" />
              </a>
            </li>
            <div className="flex items-center gap-5 text-[#F8A700] max-md:text-sm max-md:gap-1">
              <li>
                <a href="/login">Se connecter</a>
              </li>
              <li>
                <Button variant="flat" className=" text-white bg-blue-500">
                  <a href="/inscrire">S'inscrire</a>
                </Button>
              </li>
            </div>
          </ul>
        </nav>
      </header>
    </div>
  )
}

export default Header
