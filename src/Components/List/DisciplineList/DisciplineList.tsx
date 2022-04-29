
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { TermItem } from '../Itens/TermItem/TermItem';
import { DisciplineItem } from '../Itens/DisciplineItem/DisciplineItem';
import { CategoryItem } from '../Itens/CategoryItem/CategoryItem';
import { TestItem } from '../Itens/TestItem/TestItem';


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
              {el.categories.map((el: any, id: any) =>
                <CategoryItem
                  key={`category_${id}`}
                  name={el.categoryName}
                >
                  {el.tests.map((el: any, id: any) =>
                    <TestItem
                      key={`test_${id}`}
                      name={el.testName}
                      url={el.pdfUrl}
                      teacher={el.teacherName}
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