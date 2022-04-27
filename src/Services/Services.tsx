import * as api from "../Api/api"


export async function fetchDisciplineData(token: string) {

  const categories: any[] = await api.getAllCategories(token)

  const terms: any[] = await api.getAllTerms(token)

  const teachers: any[] = await api.getAllTeachers(token)

  const data = terms.map(term => {
    return {
      termId: term.id,
      termNumber: term.number,
      disciplines: term.disciplines.map((discipline: any) => {
        return {
          disciplineId: discipline.id,
          disciplineName: discipline.name,
          teacherDisciplines: discipline.teachersDisciplines.map((teacherDiscipline: any) => {
            return {
              categories: categories.map(category => {
                return {
                  categoryId: category.id,
                  categoryName: category.name,
                  tests: category.tests.filter((test: any) =>
                    test.teacherDisciplineId === teacherDiscipline.id).map((test: any) => {
                      return {
                        testId: test.id,
                        testViews: test.views,
                        testName: test.name,
                        testPDFUrl: test.pdfUrl,
                        teacher: teachers.filter(teacher => teacher.id === teacherDiscipline.teacherId)
                      }
                    })
                }
              })
            }
          })
        }
      })
    }
  })

  return data
}


export async function fetchTeachersData(token: string) {

  const categories: any[] = await api.getAllCategories(token)

  const teachers: any[] = await api.getAllTeachers(token)

  const disciplines: any[] = await api.getAllDisciplines(token)

  const data = teachers.map(teacher => {

    const tests = teacher.teachersDisciplines.map((teachersDiscipline: any) => {
      return categories.reduce(function (result: any[], category: any) {

        const tests = category.tests.filter((test: any) => test.teacherDisciplineId === teachersDiscipline.id)

        if (tests.length !== 0) {
          const newObject = {
            categoryId: category.id,
            categoryName: category.name,
            tests: tests
          }
          result.push(newObject)
        }
        return result
      }, [])
    }).reduce((a: any, b: any) => [...a, ...b], [])

    return {
      teacherId: teacher.id,
      teacherName: teacher.name,
      categories: categories.map((category: any) => {
        return {
          categoryId: category.id,
          categoryName: category.name,
          tests: [...tests.filter((test: any) =>
            test.categoryId === category.id).map((el: any) =>
              el.tests)].reduce((a: any, b: any) =>
                [...a, ...b], []).map((el: any) => {
                  return {
                    testName: el.name,
                    testId: el.id,
                    testViews: el.views,
                    testPdfUrl: el.pdfUrl,
                    testDisciplineId: el.teachersDisciplines.disciplineId,
                    testDisciplineName: disciplines.find((discipline: any) => discipline.id === el.teachersDisciplines.disciplineId).name
                  }
                })
        }
      })
    }
  })

  return data
}

export async function fetchDisciplines(token: string) {

  const disciplines: any[] = await api.getAllDisciplines(token)

  return disciplines

}

export async function fetchTeachers(token: string) {

  const teachers: any[] = await api.getAllTeachers(token)

  return teachers
}


export async function fetchCategories(token: string) {

  const categories: any[] = await api.getAllCategories(token)

  return categories
}

export async function fetchTerms(token: string) {

  const terms: any[] = await api.getAllTerms(token)

  return terms
}
