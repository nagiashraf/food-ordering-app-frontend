import { CircleUserRound, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import MobileNavLinks from "./MobileNavLinks";
import { useAppContext } from "@/contexts/AppContext";
import { Link } from "react-router-dom";

const MobileNav = () => {
  const { isLoggedIn, userEmail } = useAppContext();

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-orange-500" />
      </SheetTrigger>
      <SheetContent className="space-y-3">
        <SheetTitle>
          {isLoggedIn ? ( 
            <span className="flex items-center gap-2 font-bold">
              <CircleUserRound className="text-orange-500" />
              {userEmail}
            </span> 
          ) : ( 
            <span>Welcome to ReactEats.com</span> 
          )}
        </SheetTitle>
        <Separator />
        <SheetDescription className="flex flex-col gap-4">
          {isLoggedIn ? (
            <MobileNavLinks />
          ) : (
            <Button className="grow font-bold bg-orange-500">
              <Link to="/login">Log In</Link>
            </Button>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;