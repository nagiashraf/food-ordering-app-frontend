import { CircleUserRound } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useAppContext } from "@/contexts/AppContext";
import { useLogout } from "@/api/AuthApi";

const UsernameMenu = () => {
  const { userEmail } = useAppContext();

  const { logOut } = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-3 font-bold hover:text-orange-500">
        <CircleUserRound className="text-orange-500" />
        {userEmail}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
      <DropdownMenuItem>
          <Link to="/manage-restaurant" className="font-bold hover:text-orange-500">
            Manage Restaurant
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <Link to="/user-profile" className="font-bold hover:text-orange-500">
            User Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button onClick={() => logOut()} className="flex grow font-bold bg-orange-500">
            Log out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UsernameMenu;