import axios from "axios";

const BASE_URL = process.env.REACT_APP_URL || "http://10.0.0.107:5000"


export interface authData {
  email: string
  password: string
}

function createConfig(token: string) {

  return { headers: { 'Authorization': `${token}` } }
}

export async function signUp(data: authData) {
  await axios.post(`${BASE_URL}/auth/signUp`, { ...data })
}

export async function signIn(data: authData) {
  const token = await axios.post(`${BASE_URL}/auth/signIn`, { ...data })
  return token.data
}

export async function getAllCategories(token: string) {
  const config = createConfig(token)


  const categories = await axios.get(`${BASE_URL}/category`, config)

  return categories.data
}

export async function getAllTerms(token: string) {
  const config = createConfig(token)

  const term = await axios.get(`${BASE_URL}/term`, config)

  return term.data
}

export async function getAllTeachers(token: string) {
  const config = createConfig(token)

  const teachers = await axios.get(`${BASE_URL}/teacher`, config)

  return teachers.data
}

export async function getAllTests(token: string) {
  const config = createConfig(token)

  const tests = await axios.get(`${BASE_URL}/test`, config)

  return tests.data
}

export async function getAllDisciplines(token: string) {
  const config = createConfig(token)

  const data = await axios.get(`${BASE_URL}/discipline`, config)

  return data.data
}