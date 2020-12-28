import React, { Suspense, useEffect, useContext } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import RoutingPath from './RoutingPath'
import { HomeView } from '../view/HomeView'
import { SignInView } from '../view/SignInView'
import { BackDrop } from '../components/backdrop/BackDrop'
import { UserContext } from '../shared/provider/UserProvider'
import APIService from '../shared/api/service/APIService'

export const Routes = (props: { children?: React.ReactChild }) => {
	const { children } = props
	const [, setAuthenticatedUser] = useContext(UserContext)

	const isTokenValid = (token: number) => {
		const cTs = Math.floor(Date.now() / 1000)
		return (token >= cTs)
	}

	const parseJWT = async (token: any) => {
		if (!token) { return }
		const base64Url = token.split('.')[1]
		const base64 = base64Url.replace('-', '+').replace('_', '/')
		const JWT = JSON.parse(window.atob(base64))

		if (isTokenValid(JWT.exp)) {
			/* TODO: There has to be a better way to recieve the username? 
				You cannot just do a getUserWithID like this? */
			const response = await APIService.getUserWithID(JWT.id)
			setAuthenticatedUser({ authenticated: true, id: JWT.id, username: response.data.username })
		} else {
			setAuthenticatedUser({ authenticated: false, id: undefined, username: undefined })
			localStorage.removeItem('token')
		}
	}

	useEffect(() => {
		parseJWT(localStorage.getItem('token'))
	}, [])

	return (
		<BrowserRouter>
			<Suspense fallback={<BackDrop />} />
			{children}
			<Switch>
				<Route exact path={RoutingPath.signInView} component={SignInView} />
				<Route component={HomeView} />
			</Switch>
		</BrowserRouter>
	)
}
