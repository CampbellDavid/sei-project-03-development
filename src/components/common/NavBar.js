import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { notify } from 'react-notify-toast'
import Authorization from '../../../lib/authorization'
import { Navbar, Nav } from 'react-bootstrap'

class NavBar extends React.Component {
	state = { loggedIn: false }

	toggleNavbar = () => {
		this.setState({ loggedIn: !this.state.loggedIn })
	}

	handleLogout = () => {
		Authorization.logout()
		notify.show("You've logged out!", 'custom', 3000, { background: 'FFFFF0' })
		this.props.history.push('/')
	}

	componentDidUpdate(prevProps) {
		if (this.props.location.pathname !== prevProps.location.pathname) {
			this.setState({ loggedIn: false })
		}
	}

	render() {
		return (
			<Navbar
				bg='light'
				expand='lg'
				className='navbar-light fixed-top font'
				id='mainNav'
			>
				<Nav className='mr-auto'>
					<Nav.Link className='nav-link nav-link-format text-dark' href='/'>
						Home
					</Nav.Link>
				</Nav>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='ml-auto'>
						<Nav.Link
							className='nav-link nav-link-format text-dark'
							href='/pubs'
						>
							Pubs
						</Nav.Link>

						<Nav.Link
							className='nav-link nav-link-format text-dark'
							href='/events'
						>
							Events
						</Nav.Link>

						{!Authorization.isAuthenticated() && (
							<Nav.Link
								className='nav-link nav-link-format text-dark'
								href='/login'
							>
								Login
							</Nav.Link>
						)}

						{!Authorization.isAuthenticated() && (
							<Nav.Link
								className='nav-link nav-link-format text-dark'
								href='/register'
							>
								Register
							</Nav.Link>
						)}

						{Authorization.isAuthenticated() && (
							<Nav.Link
								className='nav-link nav-link-format text-dark'
								href='/'
								onClick={this.handleLogout}
							>
								Logout
							</Nav.Link>
						)}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		)
	}
}

export default withRouter(NavBar)
