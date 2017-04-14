import React from 'react'
import debounce from 'lodash/debounce'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Input = styled.input`
  &:required, &:invalid { box-shadow: none }
  &:disabled { background-color: rgba(0,0,0,0) }
`

const Textarea = styled.textarea`
  &:required, &:invalid { box-shadow: none }
  &:disabled { background-color: rgba(0,0,0,0) }
`

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
        return <Textarea {...props} />
      case 'text':
      default:
        return <Input {...props} />
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
  style: PropTypes.shape({
    default: PropTypes.shape({}),
    onFocus: PropTypes.shape({}),
    onError: PropTypes.shape({}),
  }),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  placeholder: PropTypes.string,
  type: PropTypes.string,
  step: PropTypes.number,
  min: PropTypes.number,
  format: PropTypes.func,
  onKeyDown: PropTypes.func,
  spellCheck: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  check: PropTypes.func,
  onMount: PropTypes.func,
  onChange: PropTypes.func,
}
