/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hook";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { veryfyToken } from "../utils/veryfyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../component/form/PHForm";
import PHInput from "../component/form/PHInput";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // const { register, handleSubmit } = useForm({
  //   defaultValues: {
  //     userId: "A-0001",
  //     password: "admin123",
  //   },
  // });

  const [login] = useLoginMutation();

  const defaultValues = {
    userId: "A-0001",
    password: "admin123",
  };

  const onSubmit = async (data: FieldValues) => {
    const tosterId = toast.loading("logging in");
    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = veryfyToken(res.data.accessToken) as TUser;

      dispatch(setUser({ user: user, token: res.data.accessToken }));

      toast.success("This is a success toast", {
        id: tosterId,
        duration: 2000,
      });
      console.log(data);
      navigate(`/${user.role}/dashboard`);
    } catch (error) {
      toast.error("Something went wrong", { id: tosterId, duration: 2000 });
    }
  };


  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <PHInput type="text" name="userId" label="ID:"></PHInput>
        <PHInput type="text" name="password" label="Password:"></PHInput>
        <Button htmlType="submit">Login</Button>
      </PHForm>
    </Row>
  );
};

export default Login;
