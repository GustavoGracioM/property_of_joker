import { FiMoreHorizontal  } from 'react-icons/fi'
import { BsSend } from "react-icons/bs";
import { GoHeart } from "react-icons/go";
import { VscComment } from "react-icons/vsc";
import { BsBookmark } from "react-icons/bs";
import MyGallery from './MyGallery';
import {dataFormat} from '../utils/dataFormat.js'

const InstagramCard = ({legend, local, data, urls}) => {
  return (
    <div className='flex flex-col gap-2 bg-white rounded-xl border border-slate-200 m-5'>
      {/* Heading */}
        <div className="flex flex-row justify-between items-center mt-2 mx-4">
            <div className="flex flex-row items-center gap-4">
              <img src="../img/loading.png" className="h-8 w-8 rounded-full object-cover" />
              <div className='flex flex-col'>
                <div>
                  <strong className='p-0 m-0'>Zabella_Gusttavo</strong> 
                </div>
              <strong className='text-slate-600 text-xs m-0 p-0'>{local}</strong>
              </div>
            </div>
            <FiMoreHorizontal className='w-6 h-6 pr-2' />
        </div>
        <div className="overflow-hidden relative">
          <div className="relative w-full aspect-[9/12]">
            <MyGallery images={urls} />
          </div>
        </div>

        {/* Interações */}
        <div className='my-1 mb-0 mx-3 flex flex-row justify-between'>
          <div className='flex flex-row gap-4 items-center'>
            <GoHeart value={{color:"red"}} className="w-6 h-6" />
            <VscComment className="w-6 h-6" />
            <BsSend className="w-6 h-6" />
          </div>
          <BsBookmark className="w-6 h-6" />
        </div>

        {/* Rodapé */}
        <div className='mb-10 mx-3'>
          <div className='flex flex-row gap-2 items-center'>
            <img 
              className='w-5 h-5 rounded-full'
              src="../img/loading.png"
            />
            <p className='text-xs'>Liked by <strong>Usernanme </strong>and <strong> other 1294</strong></p>
          </div>
          <p className='text-xs'>
            <strong>Username </strong>{legend}
          </p>
          <span className='text-slate-500 text-xs'>Cometarios</span>
          <p className='mt-1 text-slate-600 text-xs'>{dataFormat(data)}</p>
        </div>
    </div>
  )
}

export default InstagramCard