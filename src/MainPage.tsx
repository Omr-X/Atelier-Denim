import Navbar from "@/scenes/navbar"
import BuyNow from "@/scenes/buynow"
import AboutUs from "@/scenes/aboutus"
import OurTeam from "@/scenes/ourteam"
import Prize from "@/scenes/prize"
import HomePageGraphic from "@/assets/jeans.jpg"
import { useEffect, useState } from "react";


function App() {
  const [selectedPage, setSelectedPage] = useState<string>("accueil");
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY === 0) {
        setIsTopOfPage(true);
        setSelectedPage("accueil");
      } 
      else if (currentScrollY < lastScrollY) {
        setIsTopOfPage(true);
      }
      else if (currentScrollY > lastScrollY) {
        setIsTopOfPage(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return <div className="app bg-secondary-100">
  <div className="overflow-x-hidden">
    <Navbar isTopOfPage={isTopOfPage} selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
    <div className="pt-32 px-4">
      <div className="relative w-full">
        <img alt="jeans" src={HomePageGraphic} className="w-full h-[500px] object-cover rounded-2xl shadow-lg"/>
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <h1 className="text-white font-bold text-center leading-tight" style={{ 
            fontFamily: 'Oswald, sans-serif',
            fontSize: 'clamp(2rem, 8vw, 8rem)'
          }}>
            Durabilité<br/>
            Audacité<br/>
            Unicité
          </h1>
        </div>
      </div>
    </div>
    <div className="p-4">
      <BuyNow setSelectedPage={setSelectedPage}/>
      <AboutUs setSelectedPage={setSelectedPage}/>
      <OurTeam setSelectedPage={setSelectedPage}/>
      {/*<Prize setSelectedPage={setSelectedPage}/>*/}
    </div>
  </div>
</div>
}

export default App;