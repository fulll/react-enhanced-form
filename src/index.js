import React from 'react'
import debounce from 'lodash/debounce'

const style = s => ({
  default: s ? s.default : {},
  onFocus: s ? s.onFocus : {},
  onError: s ? s.onError : {},
  normalizr: {
    borderBottom: 'none',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
  },
})

export default class EnhancedInput extends React.Component {
  // eslint-disable-next-line react/sort-comp
  style = style(this.props.style)
  state = {
    value: this.props.value,
    style: this.style.default,
  }

  componentDidMount = () => {
    this.next = debounce(this.next, 500)
    this.propagate(true)
  }

  componentWillReceiveProps = ({ value }) => {
    this.setState({
      value: this.props.format ? this.props.format(value) : value,
    }, this.propagate)
  }

  componentDidUpdate = () => {
    if (this.range !== undefined) {
      this.input.setSelectionRange(this.range, this.range)
      this.range = undefined
    }
  }

  onBlur = () => {
    this.setState({
      style: this.state.error
        ? {
          ...this.style.normalizr,
          ...this.style.default,
          ...this.style.onError,
        }
        : {
          ...this.style.normalizr,
          ...this.style.default,
        },
    })
  }

  onChange = (e) => {
    const value = e.target.value
    this.setState({
      value: this.props.format ? this.props.format(value) : value,
    }, this.propagate)

    if (this.props.format) {
      const range = e.target.selectionStart
      const lengthFormat = this.props.format(e.target.value).length
      const length = e.target.value.length

      const newRange = range - (length - lengthFormat)
      this.range = newRange
    }
  }

  onFocus = () => {
    this.setState({
      style: {
        ...this.style.normalizr,
        ...this.style.default,
        ...this.style.onFocus,
        ...this.state.error ? this.style.onError : null,
      },
    })
  }

  propagate = (init) => {
    const value = this.state.value

    let error = !this.props.check(value)
    if (value === '' && this.props.required) error = true
    if (value === '' && !this.props.required) error = false

    const onFocus = {
      ...this.style.normalizr,
      ...this.style.default,
      ...this.style.onFocus,
    }
    const onError = {
      ...this.style.normalizr,
      ...this.style.default,
      ...this.style.onError,
    }

    if (error) this.setState({ style: onError, error }, this.next)
    else if (init) this.setState({ error }, this.next(true))
    else this.setState({ style: onFocus, error }, this.next)
  }

  next = (init) => {
    if (init && this.props.onMount) {
      this.props.onMount(this.state.value, this.state.error)
    }

    if (!init && this.props.onChange) {
      this.props.onChange(this.state.value, this.state.error)
    }
  }

  byType = (props) => {
    switch (this.props.type) {
      case 'textarea':
        return <textarea {...props} />
      case 'text':
      default:
        return <input {...props} />
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
      required: this.props.required,
      spellCheck: this.props.spellCheck || false,
      min: this.props.min,
      step: this.props.step,
      value: this.state.value,
      placeholder: this.props.placeholder,
    }

    return <div onClick={this.onClick}>{this.byType(props)}</div>
  }
}

EnhancedInput.defaultProps = {
  style: undefined,
  type: undefined,
  value: '',
  format: undefined,
  onMount: undefined,
  onChange: undefined,
  onKeyDown: undefined,
  placeholder: undefined,
  step: undefined,
  min: undefined,
  spellCheck: false,
  required: false,
  disabled: false,
  check: () => true,
}

EnhancedInput.propTypes = {
  style: React.PropTypes.shape({
    default: React.PropTypes.shape({}),
    onFocus: React.PropTypes.shape({}),
    onError: React.PropTypes.shape({}),
  }),
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
  placeholder: React.PropTypes.string,
  type: React.PropTypes.string,
  step: React.PropTypes.number,
  min: React.PropTypes.number,
  format: React.PropTypes.func,
  onKeyDown: React.PropTypes.func,
  spellCheck: React.PropTypes.bool,
  required: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  check: React.PropTypes.func,
  onMount: React.PropTypes.func,
  onChange: React.PropTypes.func,
}
