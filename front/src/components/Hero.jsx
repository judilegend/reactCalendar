import React from 'react'
import {Button} from '@nextui-org/react'
export const Hero = () => {
  return (
    <main className="px-10 flex  h-[100vh] items-center justify-around 2xl:justify-between 2xl:gap-[600px] max-lg:block ">
      <section className="max-w-[900px] max-lg:mt-20  text-gray-600 flex flex-col gap-10">
        <h1 className="text-6xl max-xl:text-5xl max-sm:text-4xl">
          Bienvenue dans l' application de gestion d’emploi du temps
        </h1>
        <h3 className="text-xl">
          Voici une application qui a pour but de gerer des emplois du temps au
          sein de l'ENI d'une semaine
        </h3>
        <a href="/login">
        <Button
          variant="flat"
          color="warning"
          className="bg-[#F8A700] z-[-20] cursor-pointer w-[250px] rounded-2xl text-white"
        >
          Decouvrir le site
        </Button>
        </a>
      </section>
      <section className="max-h-[600px] max-lg:mt-20">
        {/* <img src="/toshjmosh_a_stunning_3D_cartoon_illustration_of_a_male_student__1d5b097c-cf94-409e-a42c-6d171d839dc8.svg" alt="" />
        <img src="/toshjmosh_a_stunning_3D_cartoon_illustration_of_a_female_studen_cbfe8361-841b-47b4-87f5-310e8b96eb6a.svg" alt="" /> */}
        <img
          src="/Group 9.png"
          alt=""
          className="h-full 2xl:absolute top-0 right-0 z-[-22]"
        />
      </section>
    </main>
  )
}
