export function filterDiscipline(repository: any, discipline: string) {
  return repository.map((el: any) => { return { ...el, disciplines: el["disciplines"].filter((el: any) => el.disciplineName.includes(discipline)) } }).filter((el: any) => el.disciplines.length !== 0)
}

export function filterTeacher(repository: any, teacher: string) {
  return repository.filter((el: any) => el.teacherName.includes(teacher))
}