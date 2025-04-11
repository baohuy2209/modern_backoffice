import loginImg from "../../assets/imgs/login.png";
import { Button } from "antd";
export default function LoginLeftSide() {
  return (
    <div className="bg-[#EBEBFF] h-full w-[44%] flex justify-between flex-col items-center">
      <div className="flex flex-col gap-10 items-center mt-[18rem]">
        <h2 className="text-[2.5rem]">Don't have an account yet?</h2>
        <Button className="py-7 text-[1.6rem] rounded-full px-12 bg-[#0080DF] text-white">
          Create an account
        </Button>
        <img src={loginImg} alt="login img" className="justify-end" />
      </div>
    </div>
  );
}
