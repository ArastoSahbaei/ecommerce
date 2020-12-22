import React, { useContext } from 'react'
import RoutingPath from '../../../routes/RoutingPath'
import { useHistory } from 'react-router-dom'
import Logotype from '../../../shared/images/logotypeTemplate.svg'
import { UserContext } from '../../../shared/provider/UserProvider'

export const DesktopNavigation: React.FC = (): JSX.Element => {
	const [authenticatedUser,] = useContext(UserContext)
	const history = useHistory()

	const displaySignInButtonOrUsernameDependingOnAuthentication = () => {
		return authenticatedUser.authenticated
			? authenticatedUser.username
			: <span onClick={() => history.push(RoutingPath.signInView)}> Sign in </span>
	}

	return (
		<div>
			<img onClick={() => history.push(RoutingPath.homeView)} src={Logotype} alt='' style={{ width: 100 }} />
			{displaySignInButtonOrUsernameDependingOnAuthentication()}
		</div>
	)
}
