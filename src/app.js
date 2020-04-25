import React from 'react'
import ReactDOM from 'react-dom'
import './styles/main.scss'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Nav from './components/common/Nav'
import Home from './components/common/Home'
import SecureRoute from './components/common/SecureRoute'
import PubEdit from './components/pubs/PubEdit'
import PubNew from './components/pubs/PubNew'
import PubShow from './components/pubs/PubShow'
import PubIndex from './components/pubs/PubIndex'
import EventEdit from './components/events/EventEdit'
import EventNew from './components/events/EventNew'
import EventShow from './components/events/EventShow'
import EventIndex from './components/events/EventIndex'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import TeamNew from './components/teams/TeamNew'
import Unknown from './components/common/Unknown'
import Profile from './components/profile/Profile'
import ProfileEdit from './components/profile/ProfileEdit'


class App extends React.Component {



  render() {
    return (
      <main>
        <BrowserRouter>
          <Nav />
          <Switch>
            <Route exact path='/' component={Home} />
            <SecureRoute path='/pubs/:id/edit' component={PubEdit} />
            <SecureRoute path='/pubs/new' component={PubNew} />
            <Route path='/pubs/:id' component={PubShow} />
            <Route path='/pubs' component={PubIndex} />

            <SecureRoute path='/events/:id/teams/new' component={TeamNew} />

            <SecureRoute path='/events/:id/edit' component={EventEdit} />
            <SecureRoute path='/events/new' component={EventNew} />
            <Route path='/events/:id' component={EventShow} />
            <Route path='/events' component={EventIndex} />
            <SecureRoute path='/profiles/:id/edit' component={ProfileEdit} />
            <Route path='/profiles/:id' component={Profile} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Route path='/*' component={Unknown} />
          </Switch>
        </BrowserRouter>
      </main>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)