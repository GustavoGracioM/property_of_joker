import { MdGridOn } from 'react-icons/md'
import { BiMoviePlay } from 'react-icons/bi'
import { Clapperboard, Construction, Grid3x2 } from 'lucide-react'
// import { LuUserSquare2 } from 'react-icons/lu'

export default function ProfileTabs({ activeTab, setActiveTab }) {
  const iconClass = (tab) =>
    `flex flex-col items-center pb-2 cursor-pointer ${
      activeTab === tab ? 'text-black' : 'text-gray-400'
    }`

  return (
    <div className="flex justify-around border-b border-gray-300 p-2 mt-4 mb-0.1 relative bg-white">
      <div className={iconClass('posts')} onClick={() => setActiveTab('posts')}>
        <Grid3x2 className="w-7 h-7" />
        {activeTab === 'posts' && (
          <div className="w-full h-0.5 bg-black rounded-full mt-1" />
        )}
      </div>

      <div className={iconClass('reels')} onClick={() => setActiveTab('reels')}>
        <Clapperboard className="w-7 h-7" />
        {activeTab === 'reels' && (
          <div className="w-full h-0.5 bg-black rounded-full mt-1" />
        )}
      </div>

      <div className={iconClass('tagged')} onClick={() => setActiveTab('tagged')}>
        <Construction className="w-7 h-7" />
        {activeTab === 'tagged' && (
          <div className="w-full h-0.5 bg-black rounded-full mt-1" />
        )}
      </div>
    </div>
  )
}
