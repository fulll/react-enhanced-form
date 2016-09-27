# react-enhanced-form

## Usage

```sh
npm install -S react-enhanced-form
```

```jsx
import React from 'react'
import Input from 'react-enhanced-form'

class Main extends React.Component {

  style = {
    default: {color: 'black', outline: 'none', border: 'none', width: 300},
    onFocus: {borderBottom: '1px solid green'},
    onError: {borderBottom: '1px solid red'}
  }

  check = newValue => newValue < 10

  render = () => (
    <form onSubmit={this.handleSubmit}>
      <Input
        type='number'
        value='1'
        onChange={(data, error) => console.log('change', data, error)}
        onMount={(data,error) => console.log('mount', data, error)}
        style={this.style}
        check={this.check}
        required
      />
    </form>
 )
}
```
