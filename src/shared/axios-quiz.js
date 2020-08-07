import axios from "axios"

export default axios.create({
    baseURL: 'https://react-quiz-test-project.firebaseio.com/'
})