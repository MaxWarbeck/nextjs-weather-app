import React from 'react'
import { MdWbSunny, MdOutdoorGrill } from 'react-icons/md';
import GrillModal from './GrillModal'
import Searchbox from './Searchbox'

type Props = {
    forecast: any
    value: string
    buttonType: string
    onChange: React.ChangeEventHandler<HTMLInputElement> | undefined
    onSubmit: React.FormEventHandler<HTMLFormElement> | undefined
    onButtonSubmit: React.MouseEventHandler<HTMLButtonElement> | undefined
}


export default function SideNavBar(props: Props) {
    return (
        <div className='w-full bg-bkg-1 flex flex-col justify-end sticky py-4 '>
            <h2 className='flex items-center justify-center gap-2'>
                <p className='text-content-1 text-3xl'>Weather</p>
                <MdWbSunny className='text-3xl mt-1 text-bkg-3' />
            </h2>
            <h2 className='flex items-center justify-center gap-1 border border-gray-200 rounded-xl px-3 py-1 hover:border-gray-400 hover:bg-gray-100 sm:hidden'>
                <MdOutdoorGrill className='text-2xl text-content-1' />
                <GrillModal forecast={props.forecast} />
            </h2>
            <Searchbox value={props.value} buttonType={props.buttonType} onButtonSubmit={props.onButtonSubmit} onChange={props.onChange} onSubmit={props.onSubmit} />
        </div>
    )
}
