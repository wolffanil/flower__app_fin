




// export const $apiAuth = axios.create({
//   withCredentials: true,
//   baseURL: API_URL,
// });

// export const $api = axios.create({
//   baseURL: API_URL,
// });

// $api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// $api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (
//       (error.response.status === 401 || error.message === "jwt expired") &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;
//       try {
//         const response = await $api.post(`${API_URL}/auth/refresh`, {
//           withCredentials: true,
//         });
//         localStorage.setItem("token", response.data.accessToken);
//         setUser({ ...response.data.user });
//         return $api(originalRequest);
//       } catch (e) {
//         console.log("Unauthorized");
//         setUser({});
//         setIsAuthenticated(false);
//       }
//     }
//     throw error;
//   }
// );

