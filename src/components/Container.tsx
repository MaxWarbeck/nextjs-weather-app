import { cn } from '@/utils/cn'
import React from 'react'

export default function container(props: React.HTMLProps<HTMLDivElement>) {
    return (
        <div
            {...props}
            className={cn(
                "w-full bg-con border border-con rounded-xl flex py-4 shadow-sm",
                props.className
            )} />
    )
}
