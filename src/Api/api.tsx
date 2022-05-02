import axios from "axios";

const BASE_URL = process.env.REACT_APP_URL || "http://10.0.0.107:5000"


export interface authData {
  email: string
  password: string
}



export const urlOAuthGitHub = 'https://github.com/login/oauth/authorize?client_id=941b0093a2cb7c9a9182'


function createConfig(token: string) {

  return { headers: { 'Authorization': `${token}` } }
}

export async function signUpGitHub(code: string) {

  const data = axios.post(`${BASE_URL}/auth/signIn/oauth/github`, { code: code })
  return data
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

export async function createTest(token: string, data: any) {
  const config = createConfig(token)

  const formData = new FormData()

  formData.append("name", data.name)
  formData.append("pdfUrl", data.pdfUrl)
  formData.append("categoryId", data.categoryId)
  formData.append("teacherDisciplineId", data.teacherDisciplineId)

  await axios.post(`${BASE_URL}/test`, formData,
    {
      headers:
      {
        ...config.headers,
        "Content-Type": "multipart/form-data",
      }
    })

}

export async function addViewCount(token: string, id: number) {
  const config = createConfig(token)

  await axios.patch(`${BASE_URL}/test/${id}/addView`, {}, config)

}