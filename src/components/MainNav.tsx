import { useAppContext } from "@/contexts/AppContext";
import { Button } from "./ui/button";
import UsernameMenu from "./UsernameMenu";
import { Link } from "react-router-dom";

const MainNav = () => {
  const { isLoggedIn } = useAppContext();
  
  return (
    <>
      {isLoggedIn ? (
        <UsernameMenu />
      ) : (
        <Button
          variant="ghost"
          className="font-bold hover:text-orange-500 hover:bg-white"
        >
          <Link to={"/login"}>Log In</Link>
        </Button>
      )}
    </>
  );
};

export default MainNav;