import React from 'react'
import Textfield from './Textfield'
import Textarea from './Textarea'

const Input = (props) => {
  switch (props.type) {
    case 'text':
      return <Textfield {...props}/>
    case 'textarea':
      return <Textarea {...props}/>
    default:
      return <Textfield {...props}/>
  }
}

export default Input
