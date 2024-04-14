import { ComponentProps, FC, PropsWithChildren } from 'react'

interface Properties {}

const Button: FC<PropsWithChildren<Properties & ComponentProps<'button'>>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <button
      className={`${className} rounded-[15px] bg-[#222222] p-3 text-[36px] text-[#F0F0F0] `}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
