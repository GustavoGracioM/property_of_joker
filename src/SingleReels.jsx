import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { SlOptionsVertical } from "react-icons/sl";
import { BsHeart, BsChat, BsSend } from "react-icons/bs";
import { IoMdArrowBack } from "react-icons/io";
import axios from "axios";
import NavBar from "./component/NavBar";
import LoadingScreen from "./Loading/LoadingScreen";
import { ArrowLeft, EllipsisVertical, Heart, MessageCircle, Send } from "lucide-react";

export default function SingleReels() {
  const [reel, setReel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchReels = async () => {
    try {
      const response = await axios.get(`https://bc-afbq.onrender.com/reels/${id}`);
      setReel(response.data.reel);
    } catch (error) {
      console.error("Erro ao buscar vídeo:", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    const getReels = async () => {
      await fetchReels();
    };

    getReels();
    return () => clearTimeout(timer);
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://bc-afbq.onrender.com/reels/${id}`);
      setShowDeleteModal(false);
      navigate(-1);
    } catch (err) {
      console.error("Erro ao excluir:", err);
    }
  };

  const backPage = () => {
    // setIsLoading(true);
    setTimeout(() => {
      navigate(-1);
    }, 500);
  };

    if (isLoading || !reel) {
    return (
      <>
       <LoadingScreen />
        <NavBar />
      </>
    )
  }

  return (
    <>
      {/* Botão de voltar */}
      <div className="absolute top-4 left-4 text-white z-50">
        <ArrowLeft onClick={backPage} />
      </div>

      {/* Video */}
      <div className="snap-start h-screen w-full flex items-center justify-center relative">
        <video
          src={reel.url}
          className="h-full w-full object-cover"
          autoPlay
          loop
          playsInline
          onClick={() => setShowOptions(false)}
        />

        {/* Ações (curtir, comentar, enviar, opções) */}
        <div className="absolute bottom-10 left-4 text-white mb-10">
            <div className="flex items-center gap-2">
              <img
                src="/loading.png"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <strong className="font-bold">@Zabella_Gusttavo</strong>
                <h1 className="text-slate-200 text-base m-0 p-0">{reel.local}</h1>
              </div>
            </div>
            <p>{reel.description}</p>
          </div>
        <div className="absolute bottom-10 right-4 flex flex-col items-center gap-4 text-white mb-10">
          <Heart />
          <MessageCircle />
          <Send />
          <div className="relative">
            <button onClick={() => setShowOptions(!showOptions)}>
              <EllipsisVertical />
            </button>

            {showOptions && (
              <div className="absolute bottom-10 right-0 bg-white text-black rounded-xl shadow-xl p-2 z-50">
          <button 
            onClick={() => {
                    setShowDeleteModal(true);
                    setShowOptions(false);
            }}
            className="w-full text-left px-4 py-2 text-sm hover:bg-red-100 text-red-600"
          >
            Apagar
          </button>
        </div>
            )}
          </div>
        </div>

        {/* Modal de confirmação */}
        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.6)] z-50">
            <div className="bg-white p-6 rounded-xl w-11/12 max-w-md">
              <h2 className="text-xl font-bold mb-4">Confirmar Exclusão</h2>
              <p className="mb-6">Tem certeza que deseja excluir este vídeo?</p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 rounded-lg border hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <NavBar />
    </>
  );
}
