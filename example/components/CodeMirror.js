import React from 'react'
import debounce from 'lodash/debounce'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import codemirror from 'codemirror/lib/codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/jsx/jsx'


const Container = styled.div`
  width: 100%;
  height: 100%;
  .CodeMirror {
    height: 100%;
  }
`

const normalizeLineEndings = (str) => {
  if (!str) return str
  return str.replace(/\r\n|\r/g, '\n')
}

class CodeMirror extends React.Component {
  componentWillMount = () => {
    this.componentWillReceiveProps = debounce(this.componentWillReceiveProps, 0)
  }

  componentDidMount = () => {
    this.codeMirror = codemirror.fromTextArea(this.textarea, this.props.options)
    this.codeMirror.on('change', this.codemirrorValueChanged)
    this.codeMirror.setValue(this.props.defaultValue || this.props.value || '')
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.codeMirror && nextProps.value !== undefined) {
      const codeValue = normalizeLineEndings(this.codeMirror.getValue())
      const propsValue = normalizeLineEndings(nextProps.value)

      if (codeValue !== propsValue) {
        this.codeMirror.setValue(nextProps.value)
      }
    }

    const options = nextProps.options
    if (options) {
      Object.keys(options).forEach((optionName) => {
        if (options[optionName]) {
          this.codeMirror.setOption(optionName, options[optionName])
        }
      })
    }
  }

  componentWillUnmount = () => {
    if (this.codeMirror) { this.codeMirror.toTextArea() }
  }

  codemirrorValueChanged = (doc, change) => {
    if (this.props.onChange && change.origin !== 'setValue') {
      this.props.onChange(doc.getValue(), change)
    }
  }

  render = () => (
    <Container>
      <textarea
        ref={(ref) => { this.textarea = ref }}
        defaultValue={this.props.value}
        autoComplete="off"
      />
    </Container>
  )
}

CodeMirror.defaultProps = {
  defaultValue: undefined,
  value: undefined,
  options: {
    mode: 'jsx',
    lineNumbers: true,
    theme: 'material',
  },
}

CodeMirror.propTypes = {
  defaultValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.shape({}),
  value: PropTypes.string,
}

export default CodeMirror
