# react-enhanced-form

## Usage

```sh
npm install -S react-enhanced-form
```

```jsx
import React from 'react'
import Input from 'react-enhanced-form'

const Form = (someProps) => {

  const props = {
    onValueChange: e => e.preventDefault(),
    //icon: <Icon name='edit'/>,
    //style: {color: 'red'}
  }

  return(
    <form>
      <Input {...props} value={firstName} name='firstName'/>
      <Input {...props} value={lastName} name='lastName'/>
    </form>
  )

}
```
