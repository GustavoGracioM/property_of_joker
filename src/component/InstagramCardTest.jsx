import { FiMoreHorizontal } from "react-icons/fi";
import { dataFormat } from "../utils/dataFormat";
import MyGallery from "./MyGallery";
import { GoHeart } from "react-icons/go";
import { VscComment } from "react-icons/vsc";
import { BsBookmark, BsSend } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { deletePost } from '../../api/api'
import { Bookmark, Ellipsis, Heart, MessageCircle, Send } from "lucide-react";

export default function InstagramCardTest({post}) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);
      navigate('/');
    } catch (err) {
      console.error("Erro ao deletar post:", err);
    }
  };


  return (
    <>
      <div className="flex flex-row justify-between items-center mt-2 mb-2 mx-4">
        <div className="flex flex-row items-center gap-4">
          <img src="../img/loading.png" className="h-8 w-8 rounded-full object-cover" />
          <div className='flex flex-col'>
            <div>
              <strong className='p-0 m-0'>Zabella_Gusttavo</strong> 
            </div>
            <strong className='text-slate-600 text-xs m-0 p-0'>{post.local}</strong>
          </div>
        </div>
        <div className="relative" ref={menuRef}>
          <Ellipsis
            className="w-6 h-6 cursor-pointer" 
            onClick={() => setShowMenu(!showMenu)} 
          />
      {showMenu && (
        <div className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-md z-10">
          <button 
            onClick={() => {
              setShowMenu(false);
              handleDeletePost(post.id) // Chama a função de deletar passada como prop
            }}
            className="w-full text-left px-4 py-2 text-sm hover:bg-red-100 text-red-600"
          >
            Apagar
          </button>
        </div>
      )}
    </div>
      </div>

      <div className="relative w-full aspect-[9/12]">    
        <MyGallery images={post.images.map((img) => ({ original: img.url }))} />
      </div>    

      <div className='my-1 mb-2 mx-3 flex flex-row justify-between pt-1'>
        <div className='flex flex-row gap-4 items-center'>
          <Heart className="w-6 h-6" />
          <MessageCircle className="w-6 h-6" />
          <Send className="w-6 h-6" />
        </div>
        <Bookmark className="w-6 h-6" />
      </div>

      <div className='mb-10 mx-3'>
        <div className='flex flex-row gap-2 items-center'>
          <img 
            className='w-5 h-5 rounded-full'
            src="../img/loading.png"
          />
          <p className='text-xs'>
            Liked by <strong>Username </strong>and <strong>other 1294</strong>
          </p>
        </div>

        <p className='text-xs'>
          <strong>Username </strong>{post.legend}
        </p>

        <span className='text-slate-500 text-xs'>Comentários</span>

        <p className='mt-1 text-slate-600 text-xs'>
          {dataFormat(post.data)}
        </p>
      </div>
    </>
  )
}