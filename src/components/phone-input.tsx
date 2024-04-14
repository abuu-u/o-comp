'use client'

import { InputMask } from '@react-input/mask'
import { ComponentProps, forwardRef } from 'react'
import Input from './input'

interface Properties {
  mask: string
  replacement: string
}

const PhoneInput = forwardRef<
  HTMLInputElement,
  Properties & ComponentProps<'input'>
>(({ mask, replacement, ...rest }, forwardedReference) => {
  return (
    <InputMask
      // eslint-disable-next-line react/display-name
      component={forwardRef((_, reference) => (
        <Input
          ref={(r) => {
            if (forwardedReference) {
              if ('current' in forwardedReference) {
                forwardedReference.current = r
              } else {
                forwardedReference(r)
              }
            }
            if (reference) {
              if ('current' in reference) {
                reference.current = r
              } else {
                reference(r)
              }
            }
          }}
          {...rest}
        />
      ))}
      mask={mask}
      replacement={replacement}
      showMask
    />
  )
})

PhoneInput.displayName = 'PhoneInput'

export default PhoneInput
