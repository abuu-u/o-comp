import { ComponentProps, forwardRef } from 'react'

interface Properties {}

const Input = forwardRef<
  HTMLInputElement,
  Properties & ComponentProps<'input'>
>(({ className, ...rest }, forwardedReference) => {
  return (
    <input
      className={`${className} rounded-[15px] bg-[#222222] px-4 py-3 text-[36px] text-[#F0F0F0] `}
      ref={forwardedReference}
      size={1}
      {...rest}
    />
  )
})

Input.displayName = 'Input'

export default Input
