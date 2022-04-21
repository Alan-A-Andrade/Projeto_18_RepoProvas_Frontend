import axios from "axios";

const BASE_URL = process.env.REACT_APP_URL || "http://localhost:5000"


export interface authData {
  email: string
  password: string
}

export async function signUp(data: authData) {
  await axios.post(`${BASE_URL}/auth/signUp`, { ...data })
}

export async function signIn(data: authData) {
  const token = await axios.post(`${BASE_URL}/auth/signIn`, { ...data })
  return token.data
}