import { Typography } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';

function TopMenu({ option, handleChange }: any) {



  let subTitle = ""
  switch (option) {
    case "DISCIPLINA":
      subTitle = "Repositório por disciplina"
      break;

    case "PESSOA INSTRUTORA":
      subTitle = "Repositório por pessoa instrutora"

      break;

    case "ADICIONAR":
      subTitle = "Adicionar ao repositório"

      break;

    default:
      break;
  }

  return (
    <>
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
      <Typography sx={{ m: 2 }}>{subTitle}</Typography>
    </>
  );

}

export default TopMenu