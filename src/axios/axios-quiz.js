import axios from 'axios'

export default axios.create({
    baseURL: "https://react-quiz-d0011-default-rtdb.firebaseio.com"
})