import React from 'react'
import debounce from 'lodash/debounce'
import styled from 'styled-components'

const Input = styled.input`
  &:required, &:invalid { box-shadow: none }
  &:disabled { background-color: rgba(0,0,0,0) }
`

const Textarea = styled.textarea`
  &:required, &:invalid { box-shadow: none }
  &:disabled { background-color: rgba(0,0,0,0) }
`

export default class EnhancedInput extends React.Component {

  style = {
    default: this.props.style ? this.props.style.default : {},
    onFocus: this.props.style ? this.props.style.onFocus : {},
    onError: this.props.style ? this.props.style.onError : {},
    normalizr: {
      borderBottom: 'none',
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none'
    }
  }

  state = {
    value: this.props.value,
    style: this.style.default
  }

  onFocus = () => {
    this.setState({style: {
      ...this.style.normalizr,
      ...this.style.default,
      ...this.style.onFocus,
      ...this.state.error ? this.style.onError : null
    }})
  }

  componentWillReceiveProps = ({value}) => {
    this.setState({
      value: this.props.format ? this.props.format(value) : value
    }, this.propagate)
  }

  onBlur = () => {
    this.setState({
      style: this.state.error
        ? {...this.style.normalizr, ...this.style.default, ...this.style.onError}
        : {...this.style.normalizr, ...this.style.default}
    })
  }

  onChange = (e) => {
    this.setState({
      value: this.props.format ? this.props.format(e.target.value) : e.target.value
    }, this.propagate)
    
    if (this.props.format) {
      const range = e.target.selectionStart
      const lengthFormat = this.props.format(e.target.value).length
      const length = e.target.value.length
      
      const newRange = range - (length - lengthFormat)
      this.range = newRange
    }
  }
  
  componentDidUpdate = () => {
    if (this.range !== undefined) {
      console.log(this.range, this.input)
      this.input.setSelectionRange(this.range, this.range)
      this.range = undefined
    }
  }
 
  propagate = (init) => {

    let value = this.state.value

    let error = !this.props.check(value)
    if (value === '' && this.props.required) error = true
    if (value === '' && !this.props.required) error = false

    const onFocus = {...this.style.normalizr, ...this.style.default, ...this.style.onFocus}
    const onError = {...this.style.normalizr, ...this.style.default, ...this.style.onError}

    error
      ? this.setState({style: onError, error}, this.next)
      : init
        ? this.setState({error}, this.next(true))
        : this.setState({style: onFocus, error}, this.next)
  }

  next = (init) => {
    if (init && this.props.onMount)
      this.props.onMount(this.state.value, this.state.error)

    if (!init && this.props.onChange)
      this.props.onChange(this.state.value, this.state.error)
  }

  componentDidMount = () => {
    this.next = debounce(this.next, 500)
    this.propagate(true)
  }

  byType = props => {
    switch (this.props.type) {
      case 'textarea':
        return <Textarea {...props}/>
      case 'text':
      default:
        return <Input {...props}/>
    }
  }

  render = () => {

    const props = {
      onKeyDown: this.props.onKeyDown,
      type: this.props.type,
      disabled: this.props.disabled,
      onBlur: this.onBlur,
      onChange: this.onChange,
      style: this.state.style,
      onFocus: this.onFocus,
      required: this.props.required ? true : false,
      spellCheck: this.props.spellcheck || this.props.spellCheck || false,
      min: this.props.min,
      step: this.props.step,
      value: this.state.value
      placeholder: this.props.placeholder,
    }

    return <div onClick={this.onClick}>{this.byType(props)}</div>
  }
}
