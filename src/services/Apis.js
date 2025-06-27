// const BASE_URL = import.meta.env.REACT_BASE_URL + '/api/v1'
const BASE_URL = 'http://localhost:4000/api/v1'

export const categories = {
    CATEGORY_API : BASE_URL + '/course/showAllCategories'
}

export const endPoints = {
    LOGIN_API : BASE_URL + '/auth/login',
    SIGNUP_API : BASE_URL + '/auth/signin',
}