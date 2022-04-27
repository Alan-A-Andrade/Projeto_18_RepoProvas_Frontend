
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { TermItem } from '../TermItem/TermItem';
import { DisciplineItem } from '../DisciplineItem/DisciplineItem';
import { CategoryItem } from '../CategoryItem/CategoryItem';
import { TestItem } from '../TestItem/TestItem';

export function DisciplineList({ repository }: any) {

  return (
    <List
      sx={{ width: '100%', maxWidth: "none", bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {repository.map((el: any, id: any) =>
        <TermItem
          key={`term_${id}`}
          name={el.termNumber}
        >
          {el.disciplines.map((el: any, id: any) =>
            <DisciplineItem
              key={`discipline_${id}`}
              name={el.disciplineName}
            >
              {el.teacherDisciplines[0].categories.map((el: any, id: any) =>
                <CategoryItem
                  key={`category_${id}`}
                  name={el.categoryName}
                >
                  {el.tests.map((el: any, id: any) =>
                    <TestItem
                      key={`test_${id}`}
                      name={el.testName}
                      url={el.testPDFUrl}
                      teacher={el.teacher[0]}
                      id={el.testId}
                      views={el.testViews}
                    />)}
                </CategoryItem>)
              }
            </DisciplineItem>)}
        </TermItem>)
      }
      <Divider></Divider>
    </List>
  )

}