import LoginLeftSide from "../../components/login_left_side/LoginLeftSide";
import LoginRightSide from "../../components/login_right_side/LoginRightSide";

export default function App() {
  return (
    <div className="flex justify-between h-screen">
      <LoginLeftSide />
      <LoginRightSide />
    </div>
  );
}
