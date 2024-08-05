import { cn } from '@/utils/cn'
import React from 'react'
import { IoSearch } from 'react-icons/io5'

type Props = {
  className?: string
  value: string
  buttonType: string
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined
  onButtonSubmit: React.MouseEventHandler<HTMLButtonElement> | undefined
}

//Make button do something

export default function Searchbox(props: Props) {
  return (
    <form onSubmit={props.onSubmit} className={cn('flex relative items-center justify-center h-10', props.className)}>
      <input type="text" value={props.value} onChange={props.onChange} placeholder='Search Location' className='px-4 py-2 text-content-1 bg-accent-1  border-gray-200 w-[230px] border rounded-1-md focus:outline-none focus:border-gray-400 h-full' />
      <button onClick={props.onButtonSubmit} type="button" className='px-4 py-[9px] bg-bkg-2 text-content-1 border border-gray-200 rounded-r-md focus:outline-none  hover:bg-gray-400 whitespace-nowrap h-full'>
        <IoSearch />
      </button>
    </form>
  )
}
