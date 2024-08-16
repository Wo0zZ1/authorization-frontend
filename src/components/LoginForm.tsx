import { MouseEvent, FormEvent, FC, useContext, useState } from 'react'
import { Context } from '../main'
import { observer } from 'mobx-react-lite'

const LoginForm: FC = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const { store } = useContext(Context)

	const submitHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
	}

	const loginHandler = (e: MouseEvent<HTMLButtonElement>) => {
		store.login(email, password)
	}

	const registrationHandler = (e: MouseEvent<HTMLButtonElement>) => {
		store.registration(email, password)
	}

	return (
		<form onSubmit={submitHandler}>
			<input
				onChange={e => setEmail(e.target.value)}
				value={email}
				type='text'
				placeholder='Email'
				autoComplete='email'
			/>
			<input
				onChange={e => setPassword(e.target.value)}
				value={password}
				type='password'
				placeholder='Password'
				autoComplete='current-password'
			/>
			<button type='submit' onClick={loginHandler}>
				Логин
			</button>
			<button onClick={registrationHandler}>Регистрация</button>
		</form>
	)
}
export default observer(LoginForm)
