import React from 'react'
import axios from 'axios'

import TeamCard from '../teams/TeamCard'
import { Link } from 'react-router-dom'
import Authorization from '../../../lib/authorization'

export default class EventShow extends React.Component {
  state = {
    event: null,
    teams: null
  }

  async componentDidMount() {
    try {

      const eventId = this.props.match.params.id
      await axios.all([
        axios.get(`/api/events/${eventId}`),
        axios.get(`/api/events/${eventId}/teams`)
      ])
        .then(axios.spread((eventReq, teamsReq) => {
          this.setState({
            event: eventReq.data,
            teams: teamsReq.data
          })
        }))
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    if (!this.state.event) return null
    const eventId = this.props.match.params.id
    return (
      <>
        <div className="event-show">
          <h1>{this.state.event.pub}</h1>
          <h2 className="join">Join a team at this event!</h2>
          {this.state.teams.teams.map(team => <TeamCard key={team._id} {...team} />)}
        </div>

        {Authorization.isAuthenticated() ?
          <Link to={`/events/${eventId}/teams/new`}>
            <button type="button" className="button">New Team</button>
          </Link>
          : null}

      </>
    )
  }
}