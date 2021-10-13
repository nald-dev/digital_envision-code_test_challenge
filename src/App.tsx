import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css'

import Home from './pages/home'
import Country from './pages/country'

function App() {
  return (
    <Router>
      <Switch>
        <Route
          exact path = '/'
        >
          <Home />
        </Route>

        <Route
          path = '/country'
        >
          <Country />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
