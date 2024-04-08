import { forwardRef } from "react"

export const InputUI = forwardRef(({className, ...props}: any, ref) => <input ref={ref} className={`px-4 py-2 rounded-md outline-none w-full mb-4 read-only:bg-transparent read-only:px-0 ${className}`} {...props} />)