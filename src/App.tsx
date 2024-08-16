import { useContext, useEffect, useState } from 'react'
import LoginForm from './components/LoginForm'
import { Context } from './main'
import { observer } from 'mobx-react-lite'
import UserService from './services/UserService'
import { IUser } from './models/IUser'

const App = () => {
	const { store } = useContext(Context)
	const [users, setUsers] = useState<IUser[]>([])

	useEffect(() => {
		if (localStorage.getItem('token')) store.checkAuth()
	}, [])

	async function getUsers() {
		try {
			const response = await UserService.fetchUsers()
			setUsers(response.data)
		} catch (e) {
			console.log(e)
		}
	}

	if (store.isLoading) {
		return <div>Загрузка...</div>
	}

	if (!store.isAuth) {
		return (
			<>
				<h1>Авторизация</h1>
				<LoginForm />
			</>
		)
	}

	return (
		<>
			<h1>{`Пользователь ${store.user.email} авторизован`}</h1>
			<h1>
				{store.user.isActivated ? 'Аккаунт подтверждён по почте' : 'Подтвердите аккаунт'}
			</h1>
			<button onClick={() => store.logout()}>Выйти</button>
			<div>
				<button onClick={getUsers}>Получить пользователей</button>
			</div>
			{users.map(user => (
				<div key={user.email}>{user.email}</div>
			))}
		</>
	)
}

export default observer(App)
