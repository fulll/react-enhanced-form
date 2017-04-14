import React from 'react'
import styled from 'styled-components'

import CodeMirror from './CodeMirror'
import Preview from './Preview'
import sample from './sample'
import Input from '../../src'
import isEmail from './utils'


const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`

const SubContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

class Sample extends React.Component {
  state = { code: sample }

  options = {
    lineNumbers: true,
    theme: 'material',
    mode: 'jsx',
  }

  updateCode = (code) => { this.setState({ code }) }

  render = () => (
    <Container>
      <SubContainer style={{ width: '60%' }}>
        <CodeMirror
          className="CodeMirror"
          value={this.state.code}
          onChange={this.updateCode}
          options={this.options}
        />
      </SubContainer>
      <SubContainer style={{ width: '40%' }}>
        <Preview code={this.state.code} scope={{ Input, isEmail }} />
      </SubContainer>
    </Container>
  )
}

export default Sample
