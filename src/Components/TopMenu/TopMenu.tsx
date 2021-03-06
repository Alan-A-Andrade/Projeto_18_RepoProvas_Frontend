import { Typography } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useAuth from '../../Hooks/useAuth';
import * as services from "../../Services/Services"
import { Box } from '@mui/material';


function TopMenu({ option, handleChange, searchValue, handleSearch }: any) {

  const { auth } = useAuth()
  const [list, setList] = useState<any[]>([{ name: "...carregando opções" }])
  const [optionList, setOptionList] = useState<any>({
    discipline: [],
    teacher: []
  })
  const [isDisable, setIsDisable] = useState(false)
  const [labels, setLabels] = useState({
    searchBar: "",
    subtitle: ""
  })

  async function fetchData() {
    const disciplines = await services.fetchDisciplines(auth)
    const teachers = await services.fetchTeachers(auth)

    setOptionList({
      discipline: disciplines,
      teacher: teachers
    })
  }



  useEffect(() => {

    
    if (option === "DISCIPLINA") {
      setList(optionList.discipline)
      setIsDisable(false)
      setLabels({
        subtitle: "Repositório por disciplina",
        searchBar: "Pesquisar por disciplina"
      })

    }
    if (option === "PESSOA INSTRUTORA") {
      setList(optionList.teacher)
      setIsDisable(false)
      setLabels({
        subtitle: "Repositório por pessoa instrutora",
        searchBar: "Pesquisar por pessoa instrutora"
      })

    }
    if (option === "ADICIONAR") {
      setIsDisable(true)
      setLabels({
        subtitle: "Adicionar prova ao repositório",
        searchBar: "Pesquisa desabilitada nessa aba"
      })

    }
  }, [option, optionList]);

  useEffect(() => {
    fetchData()
  }, []);


  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >

        <Autocomplete
          sx={{ mb: 4, width: "60vw", minWidth: '300px', alignSelf: "center" }}

          id="search-autocomplete"
          disabled={isDisable}
          freeSolo
          options={list.map((el) => el.name)}
          autoComplete={true}
          onInputChange={(e, value) => handleSearch(value)}
          renderInput={(params) =>
            <TextField
              {...params}
              label={labels.searchBar}
              variant="filled"
              InputLabelProps={{
                color: "secondary"
              }}
              fullWidth={true}
              size="small"
              value={searchValue}

            />}
        />
      </Box>
      <ToggleButtonGroup
        color="secondary"
        value={option}
        exclusive
        onChange={handleChange}
        fullWidth={true}
      >
        <ToggleButton value="DISCIPLINA">DISCIPLINA</ToggleButton>
        <ToggleButton value="PESSOA INSTRUTORA">PESSOA INSTRUTORA</ToggleButton>
        <ToggleButton value="ADICIONAR">ADICIONAR</ToggleButton>
      </ToggleButtonGroup>
    </>
  );

}

export default TopMenu