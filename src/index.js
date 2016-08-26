import React from 'react'

export default class Input extends React.Component {

  style = {
    default: this.props.style ? this.props.style.default : {},
    onFocus: this.props.style ? this.props.style.onFocus : {},
    onError: this.props.style ? this.props.style.onError : {}
  }

  state = {
    disabled: true,
    initialValue: this.props.value,
    value: this.props.value,
    style: this.style.default
  }

  onClick = e => {
    e.persist()
    this.setState({disabled: false}, () => e.target.closest('input, textarea').focus())
  }

  onBlur = () => {

    this.setState({
      disabled: true,
      style: this.state.error ? {...this.style.default, ...this.style.onError} : this.style.default
    })

    if (this.state.value != this.state.initialValue)
      this.props.onChange(this.state.value)
  }

  onChange = (e) => {

      let value = e.target.value
      this.setState({value})

      this.props.check(value)
        ? this.setState({style: {...this.style.default, ...this.style.onFocus}, error: false })
        : this.setState({style: {...this.style.default, ...this.style.onError}, error: true })
  }

  onFocus = () => {
    this.setState({style: {...this.style.default, ...this.style.onFocus}})
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
      disabled: this.state.disabled,
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
