import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { ShoppingBasket, InstagramIcon } from "lucide-react";
import Logo from "@/assets/Logo.png";
import Link from "./Link";
import useMediaQuery from "@/Hooks/useMediaQuery";
import { useNavigate } from "react-router-dom";

type Props = {
  isTopOfPage: boolean;
  selectedPage: string;
  setSelectedPage: (value: string) => void;
}

const Navbar = ({isTopOfPage, selectedPage, setSelectedPage}: Props) => {
  const flexBetween = "flex items-center justify-between";
  const navbarBackground = "bg-primary-100";
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
  const navigate = useNavigate();
  
  // Function to handle link clicks on mobile
  const handleMobileLinkClick = (page: string) => {
    setSelectedPage(page);
    setIsMenuToggled(false); // Close the menu when a link is clicked
  };
  
  return(
    <nav>
      <div 
        className={`${flexBetween} ${navbarBackground} fixed top-4 left-4 right-4 z-30 py-2 transition-transform duration-300 ease-in-out rounded-2xl shadow-lg`}
        style={{
          transform: isTopOfPage ? 'translateY(0)' : 'translateY(-120%)'
        }}
      >
        <div className="flex items-center justify-between w-full px-12">
          <img alt="logo" src={Logo} className="h-20"/>
          
          {isAboveMediumScreens ? (
            <>
              <div className="flex items-center gap-8 text-sm absolute left-1/2 transform -translate-x-1/2">
                <Link page="Accueil" selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                <Link page="Acheter" selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                <Link page="À Propos" selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                <Link page="Notre Équipe" selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
               { /* <Link page="Prix" selectedPage={selectedPage} setSelectedPage={setSelectedPage}/> */}
               { /*<Link page="Donation" selectedPage={selectedPage} setSelectedPage={setSelectedPage}/>*/}
              </div>
              <div className="flex items-center gap-8">
                <button onClick={()=>navigate('/cart')}>
                  <ShoppingBasket/>
                </button>
                <button onClick={()=>navigate('https://www.instagram.com/atelier.denim.2025/')}>
                  <InstagramIcon/>
                </button>
              </div>
            </>
          ) : (
            <div>
              <button className="rounded-full bg-secondary-500 p-2" onClick={()=> setIsMenuToggled(!isMenuToggled)}>
                <Bars3Icon className="h-6 w-6 text-white"/>
              </button>
            </div>
          )}
        </div>
      </div>
      
      {!isAboveMediumScreens && isMenuToggled && (
        <div className="fixed right-0 bottom-0 z-40 h-full w-[100%] bg-primary-100 drop-shadow-xl">
          <div className="flex justify-end p-12">
            <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
              <XMarkIcon className="h-6 w-6 text-gray-400"/>
            </button>
          </div>
          <div className="ml-[15%] flex flex-col gap-10 text-2xl">
            <div onClick={() => handleMobileLinkClick("Accueil")}>
              <Link page="Accueil" selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
            </div>
            <div onClick={() => handleMobileLinkClick("Acheter")}>
              <Link page="Acheter" selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
            </div>
            <div onClick={() => handleMobileLinkClick("À Propos")}>
              <Link page="À Propos" selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
            </div>
            <div onClick={() => handleMobileLinkClick("Notre Équipe")}>
              <Link page="Notre Équipe" selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
            </div>
            <div onClick={() => handleMobileLinkClick("Prix")}>
              <Link page="Prix" selectedPage={selectedPage} setSelectedPage={setSelectedPage}/>
            </div>
            <div onClick={() => handleMobileLinkClick("Donation")}>
              <Link page="Donation" selectedPage={selectedPage} setSelectedPage={setSelectedPage}/>
            </div>
          </div>
        </div>  
      )}    
    </nav>
  );
};

export default Navbar;