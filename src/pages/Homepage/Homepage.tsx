import Container from '@mui/material/Container';
import TopMenu from '../../Components/TopMenu/TopMenu';
import { useState, useEffect } from 'react';

import useAuth from '../../Hooks/useAuth';
import * as services from "../../Services/Services"


import { DisciplineList } from '../../Components/List/DisciplineList/DisciplineList';
import { TeacherList } from '../../Components/List/TeacherList/TeacherList';


export default function Homepage() {

  const [repository, setRepository] = useState<any>({
    discipline: [],
    teacher: []
  })
  const { auth } = useAuth()

  const [option, setOption] = useState('DISCIPLINA');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newOption: string,
  ) => {
    setOption(newOption);
  };



  async function fetchData() {
    try {
      const discipline: any = await services.fetchDisciplineData(auth)
      const teacher: any = await services.feachTeachersData(auth)
      setRepository({
        discipline,
        teacher
      })
    }
    catch {
      console.log(console.error)
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
      }}>
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