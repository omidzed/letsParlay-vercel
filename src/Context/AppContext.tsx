import { createContext, useState, useEffect, ReactNode } from 'react';
import type { Auth, User } from '../utils';
import { getToken, storeToken } from '../utils/token-storage';

export type AppContextValues = {
	user: User | undefined;
	setUser: (user: User | undefined) => void;
	token: string | undefined;
	setToken: (token: string) => void;
	funds: number | undefined;
	setFunds: (funds: number) => void;
	handleSignIn: (auth: Auth) => void;
	handleSignOut: () => void;
	updateFunds: (newFunds: number) => void;
};

export const AppContext = createContext<AppContextValues | undefined>(undefined);

type UserProviderProps = {
	children: ReactNode;
};

const tokenKey = 'react-context-jwt';
console.log('jwt', tokenKey);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
	const [funds, setFunds] = useState<number | undefined>(() => {
		const tokenData = getToken();
		return tokenData ? parseFloat(tokenData.user.funds.toString()) : undefined;
	});
	const [token, setToken] = useState<string | undefined>(undefined);
	const [user, setUser] = useState<User | undefined>(undefined);

	const handleSignIn = (auth: Auth) => {
		localStorage.setItem(tokenKey, JSON.stringify(auth));
		setUser(auth.user);
		setToken(auth.token);
		setFunds(auth.user.funds);
	};

	const handleSignOut = () => {
		localStorage.removeItem(tokenKey);
		setUser(undefined);
		setToken(undefined);
		setFunds(undefined);
	};

	const updateFunds = (newFunds: number) => {
		setFunds(newFunds);
		const tokenData = getToken();
		if (tokenData) {
			const updatedToken = {
				...tokenData,
				user: {
					...tokenData.user,
					funds: newFunds,
				},
			};
			storeToken(updatedToken);
		}
	};

	useEffect(() => {
		const auth = localStorage.getItem(tokenKey);
		if (auth) {
			const a = JSON.parse(auth);
			setUser(a.user);
			setToken(a.token);
		}
	}, [setToken, setUser]);

	useEffect(() => {
		const auth = localStorage.getItem(tokenKey);
		if (auth) {
			const parsedAuth = JSON.parse(auth);
			setUser(parsedAuth.user);
			setToken(parsedAuth.token);
			setFunds(parsedAuth.user.funds);
		}
	}, [setToken, setUser, setFunds]);

	return (
		<AppContext.Provider
			value={{
				user,
				setUser,
				token,
				setToken,
				funds,
				setFunds,
				handleSignIn,
				handleSignOut,
				updateFunds,
			}}>
			{children}
		</AppContext.Provider>
	);
};
