import { createContext } from 'react'
import { createRoot } from 'react-dom/client'

import Store from './store/store.ts'

import App from './App.tsx'

import './index.scss'

interface State {
	store: Store
}

const store = new Store()

export const Context = createContext<State>({
	store,
})

createRoot(document.getElementById('root')!).render(
	<Context.Provider value={{ store }}>
		<App />
	</Context.Provider>,
)
