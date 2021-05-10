import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createMemoryHistory, createBrowserHistory } from 'history'

const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath }) => {
  const history = defaultHistory || createMemoryHistory({
    initialEntries: [initialPath]
  })

  if(onNavigate) {
    history.listen(onNavigate)
  }

  ReactDOM.render(
    <App history={history} onSignIn={onSignIn}/>,
    el
  )

  return {
    onParentNavigate({ pathname: nextPathname }) {
      if (history.location === nextPathname) return

      history.push(nextPathname)
    }
  }
}

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_auth-dev-root')

  if (devRoot) {
    mount(devRoot, {
      defaultHistory: createBrowserHistory()
    })
  }
}

export { mount }
