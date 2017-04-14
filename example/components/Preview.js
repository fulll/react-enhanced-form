import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { transform } from 'babel-standalone'

const ERROR_TIMEOUT = 500

const Container = styled.div`
  padding: 10px;
  box-sizing: border-box;
`

class Preview extends React.Component {
  state = { error: null }

  componentDidMount = () => { this.executeCode() }

  componentDidUpdate = (prevProps) => {
    clearTimeout(this.timeoutID)
    if (this.props.code !== prevProps.code) { this.executeCode() }
  }

  getScope = () => ({ React, ...this.props.scope })

  compileCode = () => {
    const code = `
      (function (${Object.keys(this.getScope()).join(', ')}, mountNode) {
        ${this.props.code}
      });`

    return transform(code, {
      presets: ['es2015', 'stage-0', 'react'],
    }).code
  }

  buildScope = (mountNode) => {
    const scope = this.getScope()
    return (Object.keys(scope).map(key => scope[key]).concat(mountNode))
  }

  executeCode = () => {
    const mountNode = this.mount
    const scope = this.buildScope(mountNode)

    try {
      ReactDOM.unmountComponentAtNode(mountNode)
    } catch (e) {
      console.warn(e)
    }

    try {
      // eslint-disable-next-line no-eval
      ReactDOM.render(eval(this.compileCode())(...scope), mountNode)
      if (this.state.error) { this.setState({ error: null }) }
    } catch (e) {
      clearTimeout(this.timeoutID)
      this.timeoutID = setTimeout(() => {
        this.setState({ error: e.toString() })
      }, ERROR_TIMEOUT)
    }
  }

  render = () => (
    <Container>
      {this.state.error !== null && <span>{this.state.error}</span>}
      <div ref={(ref) => { this.mount = ref }} />
    </Container>
  )
}

Preview.defaultProps = {
  scope: undefined,
}

Preview.propTypes = {
  code: PropTypes.string.isRequired,
  scope: PropTypes.shape({}),
}

export default Preview
