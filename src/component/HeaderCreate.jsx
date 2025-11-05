import { useNavigate } from "react-router";
import { cropImage } from "../Cut/cropUtils";
import { Check, X } from 'lucide-react';

export default function HeaderCreate({ create, dialogOpen, setDialogOpen, setCreate, handleSubmit, sendPost, croppedAreaPixels, image }) {
  const navigate = useNavigate();

  const sendAproved = (e) => {
    handleSubmit(e)
    setTimeout(() => navigate('/'), 500)
  }

  const functionAlter = create ? sendAproved : () => setCreate(true)
  const textButton = create ? 'Publicar' : 'Avançar'

  return (
    <>
      <header className="flex justify-between p-2 bg-white border border-slate-200">
        <div className="flex items-center gap-2 p-2 text-lg font-semibold text-gray-800">
          <X onClick={() => navigate(-1)}  />
          Novo Post
        </div>
        {dialogOpen ? (
          <div className="modal-actions flex items-center gap-3">
            <Check
              size={22} 
              className="finish-button"
              onClick={() => sendPost(cropImage(image, croppedAreaPixels))}
            />
           <X size={22}onClick={() => setDialogOpen(false) }  />
        </div>
        ) : image && (
        <button className="btn-avancar" onClick={functionAlter}>
          {textButton}
        </button>
        )}
      </header>
    </>
  )
}