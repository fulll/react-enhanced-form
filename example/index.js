import React from 'react'
import styled from 'styled-components'

import CodeMirror from './CodeMirror'
import Preview from './Preview'
import sample from './sample'
import Input from '../src'


const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const SubContainer = styled.div`
  width: 100%;
  height: 50%;
`

class Sample extends React.Component {
  state = { code: sample }

  options = {
    lineNumbers: true,
    theme: 'seti',
    mode: 'jsx',
  }

  updateCode = (code) => { this.setState({ code }) }

  render = () => (
    <Container>
      <SubContainer>
        <CodeMirror
          className="CodeMirror"
          value={this.state.code}
          onChange={this.updateCode}
          options={this.options}
        />
      </SubContainer>
      <SubContainer>
        <Preview
          code={this.state.code}
          scope={{ Input }}
        />
      </SubContainer>
    </Container>
  )
}

export default Sample
