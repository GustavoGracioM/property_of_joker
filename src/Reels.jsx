import NavBar from './component/NavBar';
import { useEffect, useRef, useState } from 'react';
import { BsSend, BsHeart, BsChat, BsTrash } from 'react-icons/bs';
import axios from 'axios';
import { SlOptionsVertical } from "react-icons/sl";
import LoadingScreen from './Loading/LoadingScreen';
import { ChartBar, EllipsisVertical, Heart, MessageCircle, Send } from 'lucide-react';

export default function ReelsPage() {
  const [videos, setVideos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newDescription, setNewDescription] = useState('');
  const [showOptionsFor, setShowOptionsFor] = useState(false)
  const [newLocal, setNewLocal] = useState('');
  const [newData, setNewData] = useState('');
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [newFile, setNewFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const videoRefs = useRef([]);

  // ▶️ Fetch dos vídeos
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    fetchVideos();
    return () => clearTimeout(timer);
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get('https://bc-afbq.onrender.com/reels');
      console.log(response.data)
      setVideos(response.data);
    } catch (error) {
      console.error('Erro ao buscar vídeos:', error);
    }
  };

  // 🎥 Controle de play automático
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play();
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.8,
      }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [videos]);

  // ➕ Upload de vídeo
  const handleAdd = async () => {
    if (!newFile) {
      alert('Selecione um arquivo de vídeo.');
      return;
    }

    const formData = new FormData();
    formData.append('file', newFile);
    formData.append('description', newDescription);
    formData.append('data', newData);
    formData.append('local', newLocal);

    try {
      await axios.post('https://bc-afbq.onrender.com/reels', formData);
      setNewDescription('');
      setNewData('');
      setNewLocal('')
      setNewFile(null);
      setShowModal(false);
      fetchVideos();
    } catch (error) {
      console.error('Erro ao adicionar vídeo:', error);
    }
  };

  // ❌ Deletar vídeo
  const handleDelete = async () => {
    try {
      await axios.delete(`https://bc-afbq.onrender.com/${selectedVideoId}`);
      fetchVideos();
      setShowDeleteModal(false);
    } catch (err) {
      console.error('Erro ao excluir:', err);
    }
  }

  return (
    <>
      {isLoading && <LoadingScreen />}
      <div className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory bg-black">
        {videos.map((video, index) => (
          <div
            key={video.id}
            className="snap-start h-screen w-full flex items-center justify-center relative"
          >
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={video.url}
              className="h-full w-full object-cover"
              autoPlay
              playsInline
              loop
              onClick={() => setShowOptionsFor(false)}
            />
            {/* UI sobre o vídeo */}
            <div className="absolute bottom-10 left-4 text-white mb-10">
              <div className="flex items-center gap-2">
                <img
                  src="/loading.png"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <strong className="font-bold">@Zabella_Gusttavo</strong>
                  <h1 className="text-slate-200 text-base m-0 p-0">{video.local}</h1>
                </div>
              </div>
              <p>{video.description}</p>
            </div>
            <div className="absolute bottom-10 right-4 flex flex-col items-center gap-4 text-white mb-10">
              <Heart />
              <MessageCircle />
              <Send />
              <button onClick={() => setShowOptionsFor(video.id)}>
                <EllipsisVertical />
              </button>
              {showOptionsFor === video.id && (
                <div className="absolute bottom-10 right-0 bg-white text-black rounded-xl shadow-xl p-2 z-50">
            <button 
              onClick={() => {
                      setSelectedVideoId(video.id);
                      setShowDeleteModal(true);
                      setShowOptionsFor(null); // Fecha o menu após clicar
              }}
              className="w-full text-left px-4 py-2 text-sm hover:bg-red-100 text-red-600"
            >
              Apagar
            </button>
          </div>
          
              )}
            </div>
          </div>
        ))}

        <NavBar onLongPressReels={() => setShowModal(true)} />

        {/* Modal de adicionar vídeo */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.6)] z-50">
            <div className="bg-white p-6 rounded-xl w-11/12 max-w-md">
              <h2 className="text-2xl font-bold mb-4">Novo Reel</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-1">Descrição</label>
                  <input
                    type="text"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Digite uma descrição"
                  />
                </div><div>
                  <label className="block text-sm mb-1">Local</label>
                  <input
                    type="text"
                    value={newLocal}
                    onChange={(e) => setNewLocal(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Digite uma descrição"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Data</label>
                  <input
                    type="date"
                    value={newData}
                    onChange={(e) => setNewData(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Arquivo de vídeo</label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setNewFile(e.target.files[0])}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-lg border hover:bg-gray-100"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleAdd}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.6)] z-50">
            <div className="bg-white p-6 rounded-xl w-11/12 max-w-md">
              <h2 className="text-xl font-bold mb-4">🗑️ Confirmar Exclusão</h2>
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
    </>
  );
}
