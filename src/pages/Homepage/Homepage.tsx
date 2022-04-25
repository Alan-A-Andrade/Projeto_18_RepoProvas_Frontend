import Container from '@mui/material/Container';
import TopMenu from '../../Components/TopMenu/TopMenu';
import { useState, useEffect } from 'react';

import useAuth from '../../Hooks/useAuth';
import * as services from "../../Services/Services"

import { DisciplineList } from '../../Components/List/DisciplineList/DisciplineList';
import { TeacherList } from '../../Components/List/TeacherList/TeacherList';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from '@mui/material';

export default function Homepage() {

  const [repository, setRepository] = useState<any>({
    discipline: [],
    teacher: []
  })
  const { auth } = useAuth()

  const [loading, setLoading] = useState(false)

  const [option, setOption] = useState('DISCIPLINA');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newOption: string,
  ) => {
    setOption(newOption);
  };

  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function fetchData() {
    setLoading(true)
    await sleep(5000);
    try {
      const discipline: any = await services.fetchDisciplineData(auth)
      const teacher: any = await services.feachTeachersData(auth)
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

  //"DISCIPLINA":"PESSOA INSTRUTORA":"ADICIONAR":


  return (
    <Container component="main" maxWidth="xl">
      <TopMenu
        option={option}
        handleChange={handleChange}
      />
      <Container component="main" maxWidth="xl" sx={{
        marginTop: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>{
          loading && <>
            <CircularProgress color='secondary' />
            <Typography
              color='secondary'
              sx={{ mt: 2 }}
              component="h1"
              variant="button"
            >Carregando</Typography>
          </>
        }
        {option === 'DISCIPLINA'
          ? <DisciplineList repository={repository.discipline} />
          : option === 'PESSOA INSTRUTORA'
            ? <TeacherList repository={repository.teacher} />
            : <></>
        }

      </Container >
    </Container>
  );
}