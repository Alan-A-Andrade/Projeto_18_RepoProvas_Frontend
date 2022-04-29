import Container from '@mui/material/Container';
import TopMenu from '../../Components/TopMenu/TopMenu';
import { useState, useEffect } from 'react';

import useAuth from '../../Hooks/useAuth';
import * as services from "../../Services/Services"

import { DisciplineList } from '../../Components/List/DisciplineList/DisciplineList';
import { TeacherList } from '../../Components/List/TeacherList/TeacherList';
import { NewTest } from '../../Components/NewTest/NewTest';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from '@mui/material';
import * as filter from '../../utils/filter'

export default function Homepage() {

  const [repository, setRepository] = useState<any>({
    discipline: [],
    teacher: []
  })

  const [repositoryFiltered, setRepositoryFiltered] = useState<any>({
    discipline: [],
    teacher: []
  })

  const { auth } = useAuth()

  const [loading, setLoading] = useState(false)

  const [option, setOption] = useState('DISCIPLINA');

  const [searchValue, setSearchValue] = useState("")

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newOption: string,
  ) => {
    setOption(newOption)
    setSearchValue("")
  };

  function handleSearchInput(input: string) {
    setSearchValue(input)
  }

  async function fetchData() {
    setLoading(true)
    try {
      const discipline: any = await services.fetchDisciplineData(auth)
      const teacher: any = await services.fetchTeachersData(auth)

      setRepository({
        discipline,
        teacher
      })

      setLoading(false)
    }
    catch {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, []);

  useEffect(() => {
    setRepositoryFiltered({
      discipline: filter.filterDiscipline(repository.discipline, searchValue),
      teacher: filter.filterTeacher(repository.teacher, searchValue)
    })
  }, [searchValue, repository, option]);


  return (
    <Container component="main" maxWidth="xl">
      <TopMenu
        option={option}
        handleChange={handleChange}
        searchValue={searchValue}
        handleSearch={handleSearchInput}
      />
      <Container component="main" maxWidth="xl" sx={{
        marginTop: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>{
          loading && <>
            <CircularProgress sx={{ mt: 2 }} color='secondary' />
            <Typography
              color='secondary'
              sx={{ mt: 2 }}
              component="h1"
              variant="button"
            >Carregando</Typography>
          </>
        }
        {option === 'DISCIPLINA'
          ? <DisciplineList repository={repositoryFiltered.discipline} />
          : option === 'PESSOA INSTRUTORA'
            ? <TeacherList repository={repositoryFiltered.teacher} />
            : <NewTest />
        }

      </Container >
    </Container>
  );
}