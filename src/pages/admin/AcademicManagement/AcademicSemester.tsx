import { useGetAllSemesterQuery } from "../../../redux/features/academicSemester/academicSemesterApi";


const AcademicSemester = () => {
  const { data, error } = useGetAllSemesterQuery(undefined);

  console.log( data, error );
  
  return (
    <div>
      <h1>This is Academic Semester</h1>
    </div>
  );
};

export default AcademicSemester;
