import { useState, useCallback, useEffect } from "react";

let logoutTimer;

export function useAuth() {
  const [token, setToken] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const login = useCallback((token, expirationDate) => {
    setToken(token);
    const tokenExpiration =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60); // 1-hour expiration
    setTokenExpirationDate(tokenExpiration);

    localStorage.setItem(
      "userData",
      JSON.stringify({
        token,
        expiration: tokenExpiration.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.token, new Date(storedData.expiration));
    }
  }, [login]);

  return { token, login, logout };
}

// OLD VERSION - saved a slightly different DS in localStorage

// import { useState, useCallback, useEffect } from "react";

// let logoutTimer;

// export function useAuth() {
//   const [token, setToken] = useState(null);
//   const [tokenExpirationDate, setTokenExpirationDate] = useState();
//   const [userId, setUserId] = useState(null);

//   const login = useCallback((uid, token, expirationDate) => {
//     setToken(token);
//     setUserId(uid);
//     const tokenExpiration =
//       expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);

//     setTokenExpirationDate(tokenExpiration);

//     localStorage.setItem(
//       "userData",
//       JSON.stringify({
//         userId: uid,
//         token,
//         expiration: tokenExpiration.toISOString(),
//       })
//     );
//   }, []);

//   const logout = useCallback(() => {
//     setToken(null);
//     setTokenExpirationDate(null);
//     setUserId(null);
//     localStorage.removeItem("userData");
//   }, []);

//   useEffect(() => {
//     if (token && tokenExpirationDate) {
//       const remainingTime =
//         tokenExpirationDate.getTime() - new Date().getTime();
//       logoutTimer = setTimeout(logout, remainingTime);
//     } else {
//       clearTimeout(logoutTimer);
//     }
//   }, [token, logout, tokenExpirationDate]);

//   useEffect(() => {
//     const storedData = JSON.parse(localStorage.getItem("userData"));
//     if (
//       storedData &&
//       storedData.token &&
//       new Date(storedData.expiration) > new Date()
//     ) {
//       login(
//         storedData.userId,
//         storedData.token,
//         new Date(storedData.expiration)
//       );
//     }
//   }, [login]);

//   return { token, login, logout, userId };
// }