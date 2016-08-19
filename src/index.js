import React from 'react'

class Input extends React.Component {

  style = {
    p: {
      margin: 0,
      height: 18,
      padding: '5px 10px'
    },
    input: {
      defaultStyle: {
        display: 'inline',
        background: 'none',
        border: 'none',
        fontSize: 18,
        fontWeight: 100,
        fontFamily: 'Open Sans, sans-serif',
        ...this.props.style
      },
      onFocus: {
        outline: 'none',
        color: '#F26F6F'
      }
    },
    icon: {
      defaultStyle: {
        fontSize: 18,
        opacity: 0,
        verticalAlign: 'top',
        color: '#F26F6F',
        padding: '2px 5px 0 0'
      },
      onMouseOver: {
        opacity: 1
      }
    }
  }

  state = {
    style: {
      input: {
        ...this.style.input.defaultStyle
      },
      icon: this.style.icon.defaultStyle
    },
    text: {
      new: this.props.value,
      old: this.props.value
    }
  }

  onChange = e => {
    this.setState({
      text: {
        ...this.state.text,
        new: e.target.value
      }
    })
  }

  onMouseEnter = e => {
    e.preventDefault()
    this.setState({
      style: {
        ...this.state.style,
        icon: {
          ...this.style.icon.defaultStyle,
          ...this.style.icon.onMouseOver
        }
      }
    })
  }

  onMouseLeave = e => {
    e.preventDefault()
    this.setState({
      style: {
        ...this.state.style,
        icon: {
          ...this.style.icon.defaultStyle
        }
      }
    })
  }

  onClick = e => {

    let el = e.currentTarget.querySelector('input')
    el.removeAttribute('disabled')
    el.focus()

  }

  onFocus = e => {
    this.setState({
      style: {
        ...this.state.style,
        input: {
          ...this.style.input.defaultStyle,
          ...this.style.input.onFocus
        }
      }
    })
  }

  onKeyPress = e => { if (e.key == 'Enter') e.target.blur() }

  onBlur = e => {

    e.target.setAttribute('disabled', true)

    this.setState({
      style: {
        ...this.state.style,
        input: {
          ...this.style.input.defaultStyle
        }
      }
    })

    if (this.state.text.new != this.state.text.old) {

      let o, i, l = e.target.closest('form').querySelectorAll('input:not([type=submit])')
      for (i of l) {
        if (i.name[0]) {
          switch(i.type) {
            case 'checkbox':
              o = { ...o, [i.name]: i.checked }; break;
           default:
              o = { ...o, [i.name]: i.value }
          }
        }
      }

      this.props.onValueChange(o)

    }

  }

  componentWillReceiveProps = (props) => {
    this.setState({
      style: {
        ...this.state.style,
        input: {
          ...this.state.style.input,
          ...props.style
        }
      }
    })
  }

  render = () => (
    <div
      onMouseEnter={this.onMouseEnter}
      onMouseLeave={this.onMouseLeave}
      onClick={this.onClick}
      onBlur={this.onBlur}
      style={{...this.style.p, ...this.props.style}}
    >
      {this.props.icon
        ? React.cloneElement(this.props.icon, {style: this.state.style.icon})
        : <span style={this.state.style.icon}>✏️</span>}
      <input
        style={{
          ...this.state.style.input,
          width: this.props.width ? this.props.width : 230
        }}
        value={this.state.text.new}
        onChange={this.onChange}
        onFocus={this.onFocus}
        onKeyPress={this.onKeyPress}
        placeholder={this.props.placeholder}
        disabled
        name={this.props.name}
      />
    </div>
  )

}

export default Input
