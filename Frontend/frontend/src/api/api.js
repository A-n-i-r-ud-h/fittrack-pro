import axios from 'axios'

const api = axios.create({
  baseURL: 'https://your-backend-url.onrender.com/api'//'http://localhost:8080/api'
})

// Attach the JWT token to every request, if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('fittrack_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Redirect to login if the token is invalid/expired
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('fittrack_token')
      localStorage.removeItem('fittrack_user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// ---- Auth ----
export const registerUser = (data) => api.post('/auth/register', data)
export const loginUser = (data) => api.post('/auth/login', data)

// ---- Workouts ----
export const getWorkouts = () => api.get('/workouts')
export const addWorkout = (data) => api.post('/workouts', data)
export const deleteWorkout = (id) => api.delete(`/workouts/${id}`)
export const getSummary = () => api.get('/workouts/summary')
export const getWeeklyStats = () => api.get('/workouts/weekly')

export default api
