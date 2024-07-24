'use client'
import { useState } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

export default function DarkModeSwitch() {
  const [reRender, setReRender] = useState(0);
  const container = document.getElementById('html');
  const dataTheme = container?.getAttribute('data-theme');

  function ToggleDarkLightMode() {
    if (dataTheme === 'dark') {
      container?.setAttribute('data-theme', 'light');
      setReRender(reRender + 1);
    } else {
      container?.setAttribute('data-theme', 'dark');
      setReRender(reRender - 1);
    }
  }

  return (
    <div className="flex flex-col justify-center ml-3">
      {
        (dataTheme === 'dark') ? (
          < button onClick={ToggleDarkLightMode} >
            <MdOutlineDarkMode className="text-content-2 text-2xl" />
          </button >
        ) : (
          < button onClick={ToggleDarkLightMode} >
            <MdOutlineLightMode className="text-content-2 text-2xl" />
          </button >)
      }
    </div>
  )
}