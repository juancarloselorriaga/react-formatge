import React, { FC, ForwardedRef, forwardRef } from 'react'
import { Text, TextProps, Tooltip } from '@chakra-ui/react'

export interface TextComponentProps extends TextProps {
  tooltip?: string
}

const TextComponent: FC<TextComponentProps> = forwardRef(({ tooltip, ...props }, ref) => {
  return (
    <Tooltip label={tooltip || ''}>
      <Text ref={ref as ForwardedRef<HTMLInputElement>} noOfLines={1} cursor='default' {...props} />
    </Tooltip>
  )
})

TextComponent.displayName = 'TextComponent'

export default TextComponent
