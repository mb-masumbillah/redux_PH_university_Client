import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHInput from "../../../component/form/PHInput";
import PHForm from "../../../component/form/PHForm";
import { Controller, FieldValues } from "react-hook-form";
import { bloodGroupOptions, genderOptions } from "../../../Constants/global";
import PHSelect from "../../../component/form/PHSelect";
import PHDatePicker from "../../../component/form/PHDatePicker";
import {
  useGetAcademicDepartmentsQuery,
  useGetAllSemesterQuery,
} from "../../../redux/features/Admin/academicManagementApi";
import { useAddStudentMutation } from "../../../redux/features/Admin/userManagementApi";

// const studentDummyData = {
//   password: "student123",
//   student: {
//     name: {
//       firstName: "Masum",
//       middleName: "M.",
//       lastName: "Billah",
//     },
//     gender: "male",
//     dateOfBirth: "2001-05-15",
//     email: "masum11144@example.com",
//     contactNo: "01712345678",
//     emergencyContactNo: "01812345678",
//     bloodGroup: "O+",
//     presentAddress: "123/A, Main Road, Munshiganj",
//     permanentAddress: "Village: Bhatpara, Munshiganj",
//     guardian: {
//       fatherName: "Abdul Karim",
//       fatherOccupation: "Teacher",
//       fatherContactNo: "01912345678",
//       motherName: "Rahima Begum",
//       motherOccupation: "Housewife",
//       motherContactNo: "01798765432",
//     },
//     localGuardian: {
//       name: "Kamal Hossain",
//       contact: "017112233440000",
//       occupation: "Businessman",
//       address: "45/B, Dhaka Road, Munshiganj",
//     },
//     admissionSemester: "674ddeb56d9359fe5285da10",
//     academicDepartment: "67949281b2cd713880d62275",
//     isDelete: false,
//   },
// };

const studentDefaultValues = {
  name: {
    firstName: "Masum",
    middleName: "M.",
    lastName: "Billah",
  },
  gender: "male",
  contactNo: "01712345678",
  emergencyContactNo: "01812345678",
  bloodGroup: "O+",
  presentAddress: "123/A, Main Road, Munshiganj",
  permanentAddress: "Village: Bhatpara, Munshiganj",
  guardian: {
    fatherName: "Abdul Karim",
    fatherOccupation: "Teacher",
    fatherContactNo: "01912345678",
    motherName: "Rahima Begum",
    motherOccupation: "Housewife",
    motherContactNo: "01798765432",
  },
  localGuardian: {
    name: "Kamal Hossain",
    contactNo: "017112233440000",
    occupation: "Businessman",
    address: "45/B, Dhaka Road, Munshiganj",
  },
  isDelete: false,
};

const CreateStudent = () => {
  const [addStudent, { data, error }] = useAddStudentMutation();

  console.log({ data, error });

  const { data: sData, isLoading: sIsLoading } =
    useGetAllSemesterQuery(undefined);

  const { data: dData, isLoading: dIsLoading } =
    useGetAcademicDepartmentsQuery(undefined);

    console.log(dData)

  const semesterOptions = sData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  

  const departmentOptions = dData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));
  console.log(departmentOptions)

  const onSubmit = (data: FieldValues) => {
    const studentData = {
      password: "student123",
      student: data,
    };

    console.log({studentData});

    const formData = new FormData();

    formData.append("data", JSON.stringify(studentData));
    formData.append("file", data.image);

    addStudent(formData);

    //! this is for development, just for checking

    // console.log([...formData.entries()])
    // console.log(Object.fromEntries(formData));
  };

  return (
    <Row justify="center">
      <Col span={24}>
        <PHForm onSubmit={onSubmit} defaultValues={studentDefaultValues}>
          <Divider>Personal Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.firstName" label="First Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.middleName" label="Middle Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.lastName" label="Last Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect options={genderOptions} name="gender" label="Gender" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHDatePicker name="dateOfBirth" label="Date of birth" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={bloodGroupOptions}
                name="bloodGroup"
                label="Blood group"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Picture">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>
          <Divider>Contact Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="email" label="Email" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="contactNo" label="Contact" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="presentAddress"
                label="Present Address"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
              />
            </Col>
          </Row>
          <Divider>Guardian</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherName"
                label="Father Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherOccupation"
                label="Father Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherContactNo"
                label="Father ContactNo"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherName"
                label="Mother Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherOccupation"
                label="Mother Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherContactNo"
                label="Mother ContactNo"
              />
            </Col>
          </Row>
          <Divider>Local Guardian</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="localGuardian.name" label="Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.occupation"
                label="Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.contactNo"
                label="Contact No."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.address"
                label="Address"
              />
            </Col>
          </Row>
          <Divider>Academic Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={semesterOptions}
                disabled={sIsLoading}
                name="admissionSemester"
                label="Admission Semester"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={departmentOptions}
                disabled={dIsLoading}
                name="academicDepartment"
                label="Admission Department"
              />
            </Col>
          </Row>

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;
