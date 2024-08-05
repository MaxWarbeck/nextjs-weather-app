'use client'

import React, { useState } from 'react'
import { MdWbSunny, MdMyLocation, MdOutlineLocationOn } from 'react-icons/md';
import Searchbox from './Searchbox';
import axios from 'axios';
import { useAtom } from 'jotai';
import { loadingCityAtom, placeAtom } from '@/app/atom';
import ThemeToggle from './DarkModeSwitch';
import GrillModal from './GrillModal';
import { API_KEY, countryCode, limit } from '@/utils/globalValues';
import SuggetionBox from './SuggetionBox';
import { MdOutdoorGrill } from "react-icons/md";

type Props = {
  location?: string
  apiDataFromMainPage: any
  forcastData: any
};

export default function Navbar({ location, apiDataFromMainPage, forcastData }: Props) {

  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [place, setPlace] = useAtom(placeAtom);
  const [_, setLoadingCity] = useAtom(loadingCityAtom);

  const removeDuplicateCitys = (names: string[]): string[] => {
    const uniqueNames = Array.from(new Set(names));
    return uniqueNames;
  };

  async function handleInputChange(value: string) {
    setCity(value);
    if (value.length >= 3) {
      try {
        const response = await axios.get(
          //make input its own Suggestions
          `https://openplzapi.org/de/Localities?name=${value}`
        );
        const suggestions = response.data.map((item: any) => item.name);
        setSuggestions(removeDuplicateCitys(suggestions));
        console.log("Should work", suggestions);
        setError("")
        setShowSuggestions(true);
      } catch (error) {
        console.log("Should not", suggestions);
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }
    else {
      console.log("Should work", suggestions);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }

  function handleSuggestionClick(value: string) {
    setCity(value);
    setShowSuggestions(false);
  }

  function handleSubmitSearch(e: React.FormEvent<HTMLFormElement>) {
    setLoadingCity(true);
    if (e !== null) {
      e.preventDefault();
    }
    if (suggestions.length == 0) {
      setError("Location not found");
      setLoadingCity(false);
    }
    else {
      setError("");
      setTimeout(() => {
        setLoadingCity(false);
        setPlace(city);
        setShowSuggestions(false);
      }, 500);
    }
  }

  function handleButtonSubmitSearch() {
    setLoadingCity(true);
    if (suggestions.length == 0) {
      setError("Location not found");
      setLoadingCity(false);
    }
    else {
      setError("");
      setTimeout(() => {
        setLoadingCity(false);
        setPlace(city);
        setShowSuggestions(false);
      }, 500);
    }
  }

  return (
    <nav className='shadow-sm sticky top-0 left-0 z-50 bg-bkg-1'>
      <div className='h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto'>
        <h2 className='flex items-center justify-center gap-2'>
          <p className='text-content-1 text-3xl'>Weather</p>
          <MdWbSunny className='text-3xl mt-1 text-bkg-3' />
        </h2>
        <h2 className='flex items-center justify-center gap-1 border border-gray-200 rounded-xl px-3 py-1 hover:border-gray-400 hover:bg-gray-100'>
          <MdOutdoorGrill className='text-2xl text-content-1' />
          <GrillModal apiData={apiDataFromMainPage} forecast={forcastData} />
        </h2>
        <section className='flex gap-2 items-center'>
          <div>
            <ThemeToggle />
          </div>
          <MdMyLocation className='text 2xl text-content-1 hover:opacity-80 cursor-pointer' />
          <MdOutlineLocationOn className='text-3xl text-content-1' />
          <p className='text-content-1 text-sm'>{location}</p>
          <div className='relative'>
            <Searchbox
              value={city}
              buttonType='text'
              onChange={(e) => handleInputChange(e.target.value)}
              onSubmit={handleSubmitSearch}
              onButtonSubmit={handleButtonSubmitSearch}
            />
            <SuggetionBox
              {...{
                showSuggestions,
                suggestions,
                handleSuggestionClick,
                error
              }}
            />
          </div>
        </section>
      </div>
    </nav>
  );
}
