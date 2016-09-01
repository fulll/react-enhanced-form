import React from 'react'
import debounce from 'lodash/debounce'

export default class Input extends React.Component {

  style = {
    default: this.props.style ? this.props.style.default : {},
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

  onBlur = () => {
    this.setState({
      style: this.state.error
        ? {...this.style.normalizr, ...this.style.default, ...this.style.onError}
        : {...this.style.normalizr, ...this.style.default}
    })
  }

  componentDidMount = () => {
    const next = () => this.props.onChange(this.state.value, this.state.error)
    this.next = debounce(next, 500, {'leading': false, 'trailing': true})
    this.propagate(true)
  }

  onChange = (e) => this.setState({value:  e.target.value}, this.propagate)

  propagate = (init) => {

    let value = this.state.value

    let error = !this.props.check(value)
    if (value === '' && this.props.required) error = true

    const onFocus = {...this.style.normalizr, ...this.style.default, ...this.style.onFocus}
    const onError = {...this.style.normalizr, ...this.style.default, ...this.style.onError}

    error
      ? this.setState({style: onError, error}, this.next)
      : init
        ? this.setState({error}, this.next)
        : this.setState({style: onFocus, error}, this.next)
  }

  onFocus = () => {
    this.setState({style: {
      ...this.style.normalizr,
      ...this.style.default,
      ...this.style.onFocus,
      ...this.state.error ? this.style.onError : null
    }})
  }

  byType = props => {
    switch (this.props.type) {
      case 'textarea':
        return <textarea {...props}/>
      case 'text':
      default:
        return <input {...props}/>
    }
  }

  render = () => {

    const props = {
      type: this.props.type,
      disabled: this.props.disabled,
      onBlur: this.onBlur,
      defaultValue: this.props.value,
      onChange: this.onChange,
      style: this.state.style,
      onFocus: this.onFocus,
      required: this.props.required ? true : false,
      spellCheck: this.props.spellcheck || this.props.spellCheck || false,
      min: this.props.min,
      step: this.props.step
    }

    return <div onClick={this.onClick}>{this.byType(props)}</div>

  }
}
