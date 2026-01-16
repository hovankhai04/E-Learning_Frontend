import {
	createContext,
	createElement,
	useCallback,
	useContext,
	useMemo,
	useState,
	type PropsWithChildren,
} from "react";
import { authService } from "./auth.service";
import type {
	LoginPayload,
	RegisterPayload,
	TokenResponse,
} from "./auth.types";
import {
	clearTokens,
	readTokens,
	writeTokens,
	type StoredTokens,
} from "./tokenStorage";

type AuthContextValue = {
	isAuthenticated: boolean;
	tokens: StoredTokens | null;
	authenticating: boolean;
	login: (payload: LoginPayload) => Promise<TokenResponse>;
	register: (payload: RegisterPayload) => Promise<void>;
	logout: () => Promise<void>;
	setTokens: (tokens: TokenResponse) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const useProvideAuth = () => {
	const [tokens, setTokensState] = useState<StoredTokens | null>(() => readTokens());
	const [authenticating, setAuthenticating] = useState(false);

	const persistTokens = useCallback((next: TokenResponse) => {
		writeTokens(next);
		setTokensState(next);
	}, []);

	const login = useCallback(
		async (payload: LoginPayload) => {
			setAuthenticating(true);
			try {
				const { tokens: freshTokens } = await authService.login(payload);
				persistTokens(freshTokens);
				return freshTokens;
			} finally {
				setAuthenticating(false);
			}
		},
		[persistTokens]
	);

	const register = useCallback(async (payload: RegisterPayload) => {
		await authService.register(payload);
	}, []);

	const logout = useCallback(async () => {
		try {
			await authService.logout();
		} catch (error) {
			console.error("Logout failed", error);
		} finally {
			clearTokens();
			setTokensState(null);
		}
	}, []);

	const value = useMemo<AuthContextValue>(
		() => ({
			isAuthenticated: Boolean(tokens?.accessToken),
			tokens,
			authenticating,
			login,
			register,
			logout,
			setTokens: persistTokens,
		}),
		[authenticating, login, logout, persistTokens, register, tokens]
	);

	return value;
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
	const value = useProvideAuth();
	return createElement(AuthContext.Provider, { value }, children);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within AuthProvider");
	}
	return context;
};
