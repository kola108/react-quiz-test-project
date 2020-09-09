import axios from "axios"
import {AUTH_LOGOUT, AUTH_SUCCESS} from "./actionTypes";

export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {email, password, returnSecureToken: true}
        const url = isLogin
            ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDTHhL1KUs1PYO5VWgnYJK3MObkU3plDCc'
            : 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDTHhL1KUs1PYO5VWgnYJK3MObkU3plDCc'

        const response = await axios.post(url, authData)
        const expirationDate = String(new Date(new Date().getTime() + response.data.expiresIn * 1000))

        localStorage.setItem('token', response.data.idToken)
        localStorage.setItem('userId', response.data.localId)
        localStorage.setItem('expirationDate', expirationDate)

        dispatch(authSuccess(response.data.idToken))
        dispatch(autoLogout(response.data.expiresIn))
    }
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}

export function autoLogout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    }
}

export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logout())
        } else {
            const experationDate = new Date(localStorage.getItem('expirationDate'))

            if (experationDate <= new Date()) {
                dispatch(logout())
            } else {
                dispatch(authSuccess(token))
                dispatch(autoLogout(experationDate.getTime() - (new Date().getTime() / 1000)))
            }
        }
    }
}

export function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')

    return {
        type: AUTH_LOGOUT
    }
}
