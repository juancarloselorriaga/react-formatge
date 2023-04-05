import { Checkbox, HStack, Input, StackProps } from '@chakra-ui/react'
import React, { FC, useEffect, useMemo } from 'react'
import { IOption } from './OptionSelection'
import TextComponent from '../TextComponent'
import PopoverComponent, { PopoverComponentProps } from '../PopOver'
import useCheckboxes from '../../hooks/useCheckboxes'

export interface MultipleOptionSelectionProps extends Partial<PopoverComponentProps> {
  options: IOption[]
  defaultSelected: IOption[]
  onUpdate: ( payload: IOption[] ) => void
  placeholder?: string
  label?: string
  alignItems?: string
  wrapperProps?: StackProps
}

const MultipleOptionSelection: FC<MultipleOptionSelectionProps> = (
  {
    defaultSelected,
    options,
    alignItems,
    wrapperProps,
    placeholder,
    onUpdate,
    ...selectProps
  } ) => {
  const { handleCheckBoxes, selected: selectedCheckboxes } = useCheckboxes()

  useEffect( () => {
    defaultSelected.forEach( ( i ) => {
      handleCheckBoxes( { name: i.value || '', checked: true } )
    } )
  }, [] )

  const selected = useMemo( () => {
    return options.filter( i => !!( i.value && selectedCheckboxes.includes( i.value ) ) )
  }, [ selectedCheckboxes ] )

  const inputValue = useMemo( () => {
    const label = selected.map( i => i.label ).join( ', ' )
    return selected.length ? label : placeholder || ''
  }, [ selected ] )

  useEffect( () => {
    onUpdate && onUpdate( selected )
  }, [ selected ] )

  return (
    <PopoverComponent
      matchWidth={ true }
      target={
        <Input
          readOnly
          cursor={ 'pointer' }
          borderColor={ 'primary' }
          name={ 'date-picker-input' }
          bg='background.default'
          value={ inputValue }
        />
      }
      contentProps={ {
        display: 'flex',
        w: 'full',
        maxH: '300px',
        overflow: 'scroll',
      } }
      { ...selectProps }
    >
      { options?.map( ( { value, label }, index ) => (
        <HStack
          key={ index }
          w={ 'full' }
          px={ 1.5 }
          py={ 3 }
          overflow={ 'scroll' }
          borderBottomWidth={ '1px' }>
          <Checkbox
            name={ value || '' }
            isChecked={ !!( value && selectedCheckboxes.includes( value ) ) }
            onChange={ ( e ) => handleCheckBoxes( { name: e.target.name, checked: e.target.checked } ) }
          />
          <TextComponent>{ label }</TextComponent>
        </HStack>
      ) ) }
    </PopoverComponent>
  )
}

export default MultipleOptionSelection
