'use client'

import React, { useState } from 'react'
import { MdWbSunny, MdMyLocation, MdOutlineLocationOn } from 'react-icons/md';
import Searchbox from './searchbox';
import axios from 'axios';
import { useAtom } from 'jotai';
import { loadingCityAtom, placeAtom } from '@/app/atom';
import ThemeToggle from './themeToggle';
import GrillModal from './grillmodal';
import { API_KEY, countryCode, limit } from '@/utils/globalValues';

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

  async function handleInputChange(value: string) {
    setCity(value);
    if (value.length >= 3) {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${value},${countryCode}&limit=${limit}&appid=${API_KEY}`
        );

        console.log("City name", response.data.map((item: any) => console.log(item.name)));

        const suggestions = response.data.map((item: any) => item.name);
        setSuggestions(suggestions);
        console.log("Suggestions",suggestions);
        setError("")
        setShowSuggestions(true);
      } catch (error) {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }
    else {
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
    e.preventDefault();
    if (suggestions.length == 0) {
      console.log("Suggestions in handler",suggestions)
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
        <p className='flex items-center justify-center gap-2'>
          <h2 className='text-content-1 text-3xl'>Weather</h2>
          <MdWbSunny className='text-3xl mt-1 text-bkg-3' />
        </p>
        <GrillModal apiData={apiDataFromMainPage} forecast={forcastData}/>
        <section className='flex gap-2 items-center'>
          <div>
            <ThemeToggle />
          </div>
          <MdMyLocation className='text 2xl text-content-1 hover:opacity-80 cursor-pointer' />
          <MdOutlineLocationOn className='text-3xl' />
          <p className='text-content-1 text-sm'>{location}</p>
          <div className='relative'>
            <Searchbox
              value={city}
              buttonType='text'
              onChange={(e) => handleInputChange(e.target.value)}
              onSubmit={handleSubmitSearch} />
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

function SuggetionBox({
  showSuggestions,
  suggestions,
  handleSuggestionClick,
  error
}: {
  showSuggestions: boolean;
  suggestions: string[];
  handleSuggestionClick: (item: string) => void;
  error: string;
}) {
  return (
    <>
      {((showSuggestions && suggestions.length > 1) || error) && (
        <ul className="mb-4 bg-bkg-2 text-content-2 absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px]  flex flex-col gap-1 py-2 px-2">
          {error && suggestions.length < 1 && (
            <li className="text-red-500 p-1 "> {error}</li>
          )}
          {suggestions.map((item, i) => (
            <li
              key={i}
              onClick={() => handleSuggestionClick(item)}
              className="cursor-pointer p-1 rounded   hover:bg-gray-200"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}