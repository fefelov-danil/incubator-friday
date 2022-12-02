import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://neko-back.herokuapp.com/2.0',
  withCredentials: true,
})

export const learnAPI = {
  updateGrade(data: UpdateGradeType) {
    return instance.put<UpdatedGradeResponseType>('/cards/grade', data)
  },
}

// Types
type UpdateGradeType = {
  grade: number
  card_id: string
}

type UpdatedGradeResponseType = {
  token: string
  tokenDeathTime: number
  updatedGrade: UpdatedGradeType
}

type UpdatedGradeType = {
  _id: string
  cardsPack_id: string
  card_id: string
  user_id: string
  grade: number
  shots: number
}
