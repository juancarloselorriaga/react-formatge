import { useState } from 'react'

const useCheckboxes = ( initial: string[] = [] ) => {
  const [ selected, setSelected ] = useState<string[]>( initial )

  const handleCheckBoxes = ( props: { name: string, checked: boolean } ) => {
    const checkboxName = props.name
    const isChecked = props.checked

    if ( !checkboxName ) return

    if ( selected.includes( checkboxName ) ) {
      if ( !isChecked ) {
        return setSelected( prevState => [ ...prevState.filter( e => e !== checkboxName ) ] )
      }
    }

     return setSelected( ( prevState ) => {
          return [ ...prevState, ...( !prevState.includes( checkboxName ) ? [ checkboxName ] : [] ) ]
        } )
  }

  return {
    handleCheckBoxes,
    selected,
  }
}

export default useCheckboxes