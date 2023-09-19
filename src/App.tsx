import { Outlet } from "react-router-dom";
import { useAuth } from "./features/auth/hooks/useAuth";

function App() {
  const { isLogin } = useAuth();

  console.log(isLogin);

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
