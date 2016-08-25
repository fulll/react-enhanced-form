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

  handleSubmit = e => {
    e.preventDefault()
    console.log(this.refs.inputName.state.error ? true : false)
  }

  handleChange = e => {
    this.setState({save: true})
  }

  render = () => (
    <form onSubmit={this.handleSubmit}>
      <Input
        type='number'
        ref='inputName'
        value='1'
        onChange={this.handleChange}
        style={this.style}
        check={this.check}
        required
      />
      <br />
      {this.state.save ? <input type='submit' /> : null}
    </form>
 )
}
```
