
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { CategoryItem } from '../Itens/CategoryItem/CategoryItem';
import { TeacherItem } from '../Itens/TeacherItem/TeacherItem';
import { TestItemTeacher } from '../Itens/TestItemTeacher/TestItemTeacher';

export function TeacherList({ repository }: any) {

  return (
    <List
      sx={{ width: '100%', maxWidth: "none", bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {repository.map((teacher: any, id: any) =>
        <TeacherItem
          key={`teacher_${id}`}
          name={teacher.teacherName}
        >
          {teacher.categories.map((category: any, id: any) =>
            <CategoryItem key={`category_teacher_${id}`} name={category.categoryName}>
              {category.tests.map((test: any, id: any) =>
                <TestItemTeacher
                  key={`test_teacher_${id}`}
                  name={test.testName}
                  url={test.testPdfUrl}
                  discipline={test.testDisciplineName}
                  id={test.testId}
                  views={test.testViews}
                />
              )}
            </CategoryItem>)
          }
        </TeacherItem>)
      }
      <Divider></Divider>
    </List>
  )

}
