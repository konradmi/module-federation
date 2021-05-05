import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'
import MarketingApp from './components/MarketingApp'
import Header from './components/Header'
import AuthApp from './components/AuthApp'

const generateClassName = createGenerateClassName({
  productionPrefix: 'co'
})

export default () => {
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header/>
          <MarketingApp/>
          <Switch>
             <Route path='/auth' component={AuthApp}/>
             <Route path='/' component={MarketingApp}/>
          </Switch>
        </div>
      </StylesProvider>
    </BrowserRouter>
  )
}
