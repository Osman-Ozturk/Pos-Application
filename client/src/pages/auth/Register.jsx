import { Carousel, message } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthCarousel from "../../components/auth/AuthCarousel.jsx";
import {useState} from "react"
const contentStyle = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
const Register = () => {
  const [loading,setLoading] =useState(false)
  const navigate = useNavigate()
  const onFinish = async (values) => {
    setLoading(true)
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/users/register",{
        method:"POST",
        body:JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
      }
      )
      if (res.ok) {
        message.success("the registration process was successful")
        navigate("/login")
        
        setLoading(false)
      }
    } catch (error) {
      message.error("something went wrong")
      console.log(error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  return (
    <div className="h-screen">
      <div className="flex justify-between w-full h-full">
        <div className="xl:px-20 px-10 flex flex-col w-full h-full justify-center relative">
          <h1 className="text-center text-5xl font-bold mb-2">LOGO</h1>

          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Password Again"
              name="passwordAgain"
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
              dependencies={["password"]}
            >
              <Input.Password />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              size="large"
              loading={loading}
            >
              Submit
            </Button>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10  w-full">
            do you have an account?{" "}
            <Link
              to="/login"
              className="text-blue-800 hover:scale-125 hover:text-red-500 ml-2"
            >
              Signin
            </Link>
          </div>
        </div>
        <div className="xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden bg-[#6c63ff]">
          <div className="w-full ">
            <Carousel afterChange={onChange} autoplay>
              
              <AuthCarousel title={"Responsive"} subtitle="Compatibility with all device sizes" img={"/images/responsive.svg"}/>
              <AuthCarousel title={"Statistic"} subtitle="Extensive statistics" img={"/images/statistic.svg"}/>
              <AuthCarousel title={"customer happiness"} subtitle="satisfied customers with the product at the end of the experience" img={"/images/customer.svg"}/>
              <AuthCarousel title={"Admin panel"} subtitle="Manage from one place" img={"/images/admin.svg"}/>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
