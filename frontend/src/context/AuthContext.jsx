import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import authApi from "../api/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [accessToken, setAccessToken] = useState(() =>
    localStorage.getItem("accessToken")
  );

  const [loading, setLoading] = useState(true);

  /**
   * Logout
   *
   * Removes the JWT from the browser and clears
   * the authenticated user from React state.
   */
  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");

    setAccessToken(null);
    setUser(null);
  }, []);

  /**
   * Restore the authenticated user when the
   * application starts.
   *
   * axiosClient automatically attaches:
   *
   * Authorization: Bearer <accessToken>
   */
  const loadCurrentUser = useCallback(async () => {
    const token = localStorage.getItem("accessToken");

    // No token means the user is logged out.
    if (!token) {
      setAccessToken(null);
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      // Keep the token in React state.
      setAccessToken(token);

      // Ask the backend who owns this JWT.
      const currentUser = await authApi.getCurrentUser();

      // Backend successfully verified the token.
      setUser(currentUser);
    } catch (error) {
      console.error(
        "Failed to restore authenticated user:",
        error
      );

      /*
       * The token is no longer valid.
       *
       * For authentication failures, remove it completely.
       */
      if (
        error.response?.status === 401 ||
        error.response?.status === 403
      ) {
        logout();
      } else {
        /*
         * Backend/network error.
         *
         * Do not immediately destroy a potentially valid token
         * just because the backend is temporarily unavailable.
         */
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  }, [logout]);

  /**
   * Restore authentication when the application starts.
   */
  useEffect(() => {
    loadCurrentUser();
  }, [loadCurrentUser]);

  /**
   * Login
   *
   * 1. POST /api/v1/auth/login
   * 2. Receive accessToken
   * 3. Store accessToken
   * 4. GET /api/v1/users/me
   * 5. Store authenticated user
   */
  const login = useCallback(async (loginData) => {
    const response = await authApi.login(loginData);

    const token = response?.accessToken;

    if (!token) {
      throw new Error(
        "Authentication token was not returned by the server."
      );
    }

    // Store JWT.
    localStorage.setItem("accessToken", token);

    // Update React authentication state.
    setAccessToken(token);

    // Verify token and retrieve the authenticated user.
    const currentUser = await authApi.getCurrentUser();

    setUser(currentUser);

    return currentUser;
  }, []);

  const value = {
    user,

    accessToken,

    /*
     * Authentication is considered valid only when
     * BOTH the JWT and authenticated backend user exist.
     */
    isAuthenticated: Boolean(accessToken && user),

    loading,

    login,

    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Authentication hook.
 *
 * Example:
 *
 * const {
 *   user,
 *   login,
 *   logout,
 *   isAuthenticated
 * } = useAuth();
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error(
      "useAuth must be used inside an AuthProvider."
    );
  }

  return context;
}

export default AuthContext;