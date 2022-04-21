import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';

function TopMenu() {

  const [option, setOption] = useState('DISCIPLINA');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newOption: string,
  ) => {
    setOption(newOption);
  };

  return (
    <ToggleButtonGroup
      color="secondary"
      value={option}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton fullWidth={true} value="DISCIPLINA">DISCIPLINA</ToggleButton>
      <ToggleButton value="PESSOA INSTRUTORA">PESSOA INSTRUTORA</ToggleButton>
      <ToggleButton value="ADICIONAR">ADICIONAR</ToggleButton>
    </ToggleButtonGroup>
  );

}

export default TopMenu