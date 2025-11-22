// export const isAuthenticated = () => {
//     //  get the token
//     const token = localStorage.getItem('token');

//     // check for token
//     return !!token; // Returns true if token exists, false otherwise
// };

// check for token
export const isAuthenticated = async () => {
  const token = localStorage.getItem("token");
  if (!token) return false; // no token in local
  

  try {
    // trying to check of secret thing on the token side
    const response = await fetch("/api/auth/validate", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.ok; // token valid on backend
  } catch (err) {
    return false;
  }
};