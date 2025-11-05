import { useRef, useState } from 'react';
import { GoHome, GoHomeFill, GoSearch } from "react-icons/go";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { TbPhotoVideo } from "react-icons/tb";
import { Clapperboard, Film, House, Search, SquarePlus } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { MdOutlineHome, MdOutlineSearch, MdOutlineAddBox  } from "react-icons/md";

export default function NavBar({ onLongPressReels }) {
  const location = useLocation();
  const isOnReels = location.pathname === '/reels';

  const timerRef = useRef(null);
  const [pressing, setPressing] = useState(false);

  const handleMouseDown = () => {
    if (isOnReels) {
      setPressing(true);
      timerRef.current = setTimeout(() => {
        if (onLongPressReels) {
          onLongPressReels();
        }
      }, 600); // Tempo de "long press" em ms
    }
  };

  const handleMouseUp = () => {
    clearTimeout(timerRef.current);
    setPressing(false);
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 z-50">
      <div className="flex justify-around items-center h-12">
        <Link to="/"><House /> </Link>
        <Link to="/music"><Search /></Link>
        <Link to="/create"><SquarePlus /></Link>

        <div
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          className="flex items-center justify-center"
        >
          <Link to="/reels">
            <Clapperboard 
              className={`${pressing ? 'text-blue-600' : 'text-black'}`}
            />
          </Link>
        </div>

        <Link to="/profile">
          <img
            src="../img/loading.png"
            className="h-8 w-8 rounded-full object-cover"
          />
        </Link>
      </div>
    </nav>
  );
}