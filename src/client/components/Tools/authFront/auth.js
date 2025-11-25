export const isAuthenticated = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    const refreshed = await tryRefresh();
    return refreshed;
  }

  // Try validate token
  const response = await fetch("/api/auth/validate", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  // Token valid OK
  if (response.ok) return true;

// expired try refresh
  if (response.status === 403) {
    const refreshed = await tryRefresh();
  
    return refreshed;
  }

  return false;
};

//  refresh function
async function tryRefresh() {
  try {
    const refreshResponse = await fetch("/api/refresh", {
      method: "POST",
      credentials: "include",
    });

    if (!refreshResponse.ok) return false;

    const data = await refreshResponse.json();
    localStorage.setItem("token", data.accessToken);
    
    return true;

  } catch (err) {
    return false;
  }
}

// logout frontedn requesting logout from the backend and then exporting it 
export async function logout(){
  await fetch("/api/logout", {
  method: "POST",
  credentials: "include",
});

localStorage.removeItem("token");
}
