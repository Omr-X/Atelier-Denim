import { motion } from 'framer-motion'
import { useState } from 'react'
import useMediaQuery from "@/Hooks/useMediaQuery";

const team = [
  { name: 'Simone Regnault'},
  { name: 'Omar Basfaou'},
  { name: 'Melia Chau' }
]

type Props = {
  setSelectedPage: (value: string) => void;
}

const ourteam = ({ setSelectedPage }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
  
  const next = () => setActiveIndex((i) => (i + 1) % team.length)
  const prev = () => setActiveIndex((i) => (i - 1 + team.length) % team.length)
  
  return (
    <section id="notreéquipe" className="bg-secondary-100 py-20">
      {/* Added title */}
      <h1 className="text-center text-4xl font-bold text-primary-100">Notre équipe</h1>
      <motion.div className="flex items-center justify-center gap-20 px-40 pb-40 pt-20" onViewportEnter={() => setSelectedPage("notreéquipe")}>
        {/* Left Arrow */}
        <button onClick={prev} className="text-6xl text-primary-100">←</button>
        
        {/* Team Display - Only show 3 at a time */}
        <div className="flex gap-16 items-center justify-center w-[1000px]">
          {/* Left Member - Only show on larger screens */}
          {isAboveMediumScreens && (
            <motion.div
              key={`left-${activeIndex}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: activeIndex > 0 ? 0.4 : 0, x: 0, scale: 0.7 }}
              className="flex flex-col items-center"
            >
              <div className="w-40 h-40 rounded-full bg-blue-400 border-4 border-white" />
              {activeIndex > 0 && (
                <p className="mt-4 text-lg text-primary-100">{team[activeIndex - 1].name}</p>
              )}
            </motion.div>
          )}
          
          {/* Center Member (Spotlight) */}
          <motion.div
            key={`center-${activeIndex}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center"
          >
            <div className="w-64 h-64 rounded-full bg-blue-600 border-8 border-white shadow-xl" />
            <p className="mt-6 text-3xl font-bold text-primary-100">{team[activeIndex].name}</p>
          </motion.div>
          
          {/* Right Member - Only show on larger screens */}
          {isAboveMediumScreens && (
            <motion.div
              key={`right-${activeIndex}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: activeIndex < team.length - 1 ? 0.4 : 0, x: 0, scale: 0.7 }}
              className="flex flex-col items-center"
            >
              <div className="w-40 h-40 rounded-full bg-blue-400 border-4 border-white" />
              {activeIndex < team.length - 1 && (
                <p className="mt-4 text-lg text-primary-100">{team[activeIndex + 1].name}</p>
              )}
            </motion.div>
          )}
        </div>
        
        {/* Right Arrow */}
        <button onClick={next} className="text-6xl text-primary-100">→</button>
      </motion.div>
    </section>
  )
};

export default ourteam