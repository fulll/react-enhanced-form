import React from 'react'
import ReactDOM from 'react-dom'

import App from './components'

const render = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

render()

// Hot Module Replacement API
if (module.hot) module.hot.accept('./components', render)
