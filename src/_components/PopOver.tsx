import React, { FC, ReactElement, ReactNode } from 'react'
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverContentProps,
  PopoverHeader,
  PopoverProps,
  PopoverTrigger,
} from '@chakra-ui/react'

export interface PopoverComponentProps extends PopoverProps {
  children?: ReactNode
  title?: string
  hideCloseButton?: boolean
  target: ReactElement
  contentProps?: PopoverContentProps
}

const PopoverComponent: FC<PopoverComponentProps> = ({
  title,
  hideCloseButton,
  target,
  children,
  contentProps,
  ...props
}) => {
  return (
    <Popover returnFocusOnClose={false} placement='auto' closeOnBlur={true} {...props}>
      <PopoverTrigger>{target}</PopoverTrigger>
      <PopoverContent color='text.default' {...contentProps}>
        {title && <PopoverHeader fontWeight='semibold'>{title}</PopoverHeader>}
        <PopoverArrow />
        {!hideCloseButton && <PopoverCloseButton />}
        <PopoverBody>{children}</PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default PopoverComponent
