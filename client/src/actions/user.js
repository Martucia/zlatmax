import axios from 'axios'
import { setUser, setLoading } from "../reducers/userReducer";

export const registration = (name, email, password) => {
    return async dispatch => {
        try {

            const response = await axios.post(`http://localhost:5000/api/auth/reg`, {
                name,
                email,
                password
            })
            dispatch(login(email, password))

            alert(response.data.message)

        } catch (e) {
            alert(e.response.data.message)
            console.log(e)

        }
    }
}


export const login = (email, password) => {
    return async dispatch => {
        try {
            dispatch(setLoading(true))

            const response = await axios.post(`http://localhost:5000/api/auth/log`, {
                email,
                password
            })

            dispatch(setUser(response.data.user, response.data.basket, response.data.isAdmin))
            localStorage.setItem('token', response.data.token)
            dispatch(setLoading(false))

        } catch (e) {
            // alert(e.response.data.message)
            console.log(e)
        }
    }
}

export const auth = () => {
    return async dispatch => {
        try {
            const token = localStorage.getItem('token')

            if (token) {
                dispatch(setLoading(true))
                const response = await axios.get(`http://localhost:5000/api/auth/`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })

                dispatch(setUser(response.data.user, response.data.basket, response.data.isAdmin))
                localStorage.setItem('token', response.data.token)
                dispatch(setLoading(false))

            }
            dispatch(setLoading(false))

        } catch (e) {
            // alert(e.response.message)
            localStorage.removeItem('token')
        }
    }
}