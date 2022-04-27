import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { useTheme } from "@emotion/react";
import { errServer } from '../../modals/errModal';
import Autocomplete from '@mui/material/Autocomplete';
import * as services from '../../Services/Services'
import useAuth from '../../Hooks/useAuth';
import * as api from '../../Api/api';



export const NewTest: React.FC<{}> = () => {

  const { auth } = useAuth()

  const [optionList, setOptionList] = useState<any>({
    discipline: [],
    teacher: [],
    category: [],
    terms: []
  })

  const theme = useTheme()
  const [createTestForm, setCreateTestForm] = useState({
    title: "",
    pdf: "",
    category: "",
    discipline: "",
    teacher: ""
  });

  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = {
      name: createTestForm.title,
      pdfUrl: createTestForm.pdf,
      categoryId: optionList.category.find((category: any) => category.name === createTestForm.category).id,
      teacherDisciplineId: optionList.teacher.find((teacher: any) =>
        teacher.name === createTestForm.teacher).teachersDisciplines.find((teacherDiscipline: any) =>
          teacherDiscipline.disciplineId === optionList.discipline.find((discipline: any) =>
            discipline.name === createTestForm.discipline).id).id

    }

    try {
      setLoading(true)

      await api.createTest(auth, data)

      setLoading(false)

    } catch (error) {
      errServer(theme, "Something went wrong, try again later!")
      setLoading(false)

    }
  }

  async function fetchData() {
    const disciplines = await services.fetchDisciplines(auth)
    const teachers = await services.fetchTeachers(auth)
    const categories = await services.fetchCategories(auth)
    const terms = await services.fetchTerms(auth)

    setOptionList({
      discipline: disciplines,
      teacher: teachers,
      category: categories,
      terms: terms
    })
  }

  useEffect(() => {
    fetchData()
  }, []);

  useEffect(() => {

    setCreateTestForm({
      ...createTestForm,
      teacher: ""
    })

  }, [createTestForm.discipline]);


  function handleFormInput(name: string, value: any) {

    setCreateTestForm({ ...createTestForm, [name]: value })

  }

  function handleFreeFormInput(event: any) {
    setCreateTestForm({ ...createTestForm, [event.target.name]: event.target.value })
  }

  function disableForm(formData: string): boolean {
    return formData === ""
  }

  return (

    <Box
      sx={{
        marginTop: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box

        component="form"
        onSubmit={handleSubmit}
        sx={{
          marginTop: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          width: "80vw"
        }}
      >
        <TextField
          fullWidth={true}
          variant="filled"
          type="string"
          required
          id="title"
          label="Título da prova"
          name="title"
          InputLabelProps={{
            color: "secondary"
          }}
          value={createTestForm.title}
          onChange={handleFreeFormInput}
        />
        <TextField
          fullWidth={true}
          variant="filled"
          required
          type="url"
          id="pdf"
          label="PDF da Prova"
          name="pdf"
          InputLabelProps={{
            color: "secondary"
          }}
          value={createTestForm.pdf}
          onChange={handleFreeFormInput}
        />
        <Autocomplete
          fullWidth={true}
          id="category-input"
          options={optionList.category.map((option: any) => option.name)}
          autoComplete={true}
          onInputChange={(e, value) => handleFormInput("category", value)}
          renderInput={(params) =>
            <TextField
              {...params}
              label="Categoria"
              variant="filled"
              InputLabelProps={{
                color: "secondary"
              }}
              required
              size="small"
            />}
        />
        <Autocomplete
          fullWidth={true}
          id="discipline-input"
          options={optionList.discipline.map((option: any) => option.name)}
          autoComplete={true}
          onInputChange={(e, value) => handleFormInput("discipline", value)}
          renderInput={(params) =>
            <TextField
              {...params}
              label="Disciplina"
              variant="filled"
              InputLabelProps={{
                color: "secondary"
              }}
              required
              size="small"
            />}
        />
        <Autocomplete
          fullWidth={true}
          id="teacher-input"
          options={createTestForm.discipline
            ? optionList.teacher.filter((el: any) =>
              el.teachersDisciplines.map((el: any) =>
                el.disciplineId).includes(optionList.discipline.find((el: any) =>
                  el.name === createTestForm.discipline).id)).map((el: any) =>
                    el.name)
            : ["Escolha uma disciplina primeiro"]
          }
          autoComplete={true}
          disabled={disableForm(createTestForm.discipline)}
          onInputChange={(e, value) => handleFormInput("teacher", value)}
          value={createTestForm.teacher}
          renderInput={(params) =>
            <TextField
              {...params}
              label="Pessoa Instrutora"
              variant="filled"
              InputLabelProps={{
                color: "secondary"
              }}
              required
              size="small"
            />}
        />
        <Button
          color="secondary"
          type="submit"
          fullWidth
          variant="contained"
        >
          <Typography
            component="h1"
            variant="button"
          >
            {loading
              ? "Carregando"
              : "Adicionar"
            }
          </Typography>
        </Button>
      </Box>
    </Box>

  )
}