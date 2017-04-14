import React from 'react'
import ReactDOM from 'react-dom'

import App from './example'

const render = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

render()

// Hot Module Replacement API
if (module.hot) module.hot.accept('./example', render)
