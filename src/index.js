import React from 'react'

const style = {
  p: {
    margin: 0
  },
  input: {
    defaultStyle: {
      display: 'inline',
      background: 'none',
      border: 'none',
      fontSize: '1rem',
      fontWeight: 100,
      background: 'none',
      border: 'none',
      paddingLeft: 10,
      paddingBottom: 5
    },
    onFocus: {
      outline: 'none',
      fontStyle: 'italic',
      color: 'grey'
    }
  },
  icon: {
    defaultStyle: {
      fontSize: 18,
      opacity: 0,
      width: 16,
      lineHeight: '18px',
      verticalAlign: 'top',
      color: '#F26F6F'
    },
    onMouseOver: {
      opacity: 1
    }
  }
}

class Input extends React.Component {

  state = {
    style: {
      input: {
        ...style.input.defaultStyle,
        ...this.props.style
      },
      icon: style.icon.defaultStyle
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

  onMouseOver = e => {
    this.setState({
      style: {
        ...this.state.style,
        icon: {
          ...style.icon.defaultStyle,
          ...style.icon.onMouseOver
        }
      }
    })
  }

  onMouseLeave = e => {
    this.setState({
      style: {
        ...this.state.style,
        icon: {
          ...style.icon.defaultStyle
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
          ...style.input.defaultStyle,
          ...style.input.onFocus
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
          ...style.input.defaultStyle
        }
      }
    })

    if (this.state.text.new != this.state.text.old) {

      let o, i, l = e.target.closest('form').querySelectorAll('input:not([type=submit])')
      for (i of l) { o = { ...o, [i.name]: i.value } }

      this.props.onValueChange(o)

    }

  }

  render = () => (
    <div
      onMouseOver={this.onMouseOver}
      onMouseLeave={this.onMouseLeave}
      onClick={this.onClick}
      onBlur={this.onBlur}
      style={{...style.p, ...this.props.style}}
    >
      {this.props.icon
        ? React.cloneElement(this.props.icon, {style: this.state.style.icon})
        : <span style={this.state.style.icon}>✏️</span>
      }
      <input
        style={{
          ...this.state.style.input,
          width: this.props.width ? this.props.width : 230
        }}
        value={this.state.text.new}
        onChange={this.onChange}
        onFocus={this.onFocus}
        onKeyPress={this.onKeyPress}
        disabled
        name={this.props.name}
      />
    </div>
  )

}

export default Input
