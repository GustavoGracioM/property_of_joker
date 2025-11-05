import { useEffect, useState } from 'react';
import Navbar from './component/NavBar'
import ProfileSection from './component/ProfileSection'
import LoadingScreen from './Loading/LoadingScreen';
import { GoLock } from "react-icons/go";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FiUserPlus } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { fetchPosts } from '../api/api';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { ChevronDown, Lock, Menu, UserPlus } from 'lucide-react';

export default function Profile() {
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [reels, setReels] = useState([]);
    const [activeTab, setActiveTab] = useState('posts')
    const navigate = useNavigate();


    const fetchReels = async () => {
        try {
        const response = await axios.get('http://localhost:3001/reels');
        return response.data
        } catch (error) {
        console.error('Erro ao buscar vídeos:', error);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        const getPosts = async () => {
            const dataPosts = await fetchPosts();
            setPosts(dataPosts);

            const imagePromises = dataPosts.map(post => {
                return new Promise(resolve => {
                    const img = new Image();
                    img.src = post.images[0]?.url || '';
                    img.onload = resolve;
                    img.onerror = resolve;
                });
            });

            await Promise.all(imagePromises);
        };

        const getReels = async () => {
            const dataReels = await fetchReels();
            setReels(dataReels);

            const reelsPromises = dataReels.map(reel => {
                return new Promise(resolve => {
                    const video = document.createElement('video');
                    video.src = reel.url;
                    video.onloadeddata = resolve;
                    video.onerror = resolve;
                });
            });
            await Promise.all(reelsPromises);
        };
        getReels();
        getPosts();
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {isLoading && <LoadingScreen />}
            {!isLoading && posts.length >= 1 && (
            <>
                <header className='flex justify-between items-center p-4'>
                    <div className='flex gap-2 items-center'>
                        <Lock />
                        <strong className='text-2xl'>zabella_gusttavo</strong>
                        <ChevronDown />
                    </div>
                    <Menu />
                </header>
                <div className='flex w-full pl-4 pt-2 items-center'>
                    <img 
                        src="/loading.png"
                        className="w-21 h-21 rounded-full object-cover"
                    />
                    <div className='w-[70%] ml-4 p-2'>
                        <strong>Isa Gu</strong>
                        <div className='flex justify-between'>
                            <div>
                                <h1><strong>{posts.length}</strong></h1>
                                <h1>post</h1>
                            </div>
                            <div>
                                <h1><strong>2</strong></h1>
                                <h1>seguidores</h1>
                            </div>
                            <div>
                                <h1><strong>2</strong></h1>
                                <h1>seguindo</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='pl-4 pb-3 pt-1'>
                    Um viado e uma sapatão
                </div>
                <div className='pb-16'>
                    <div className='p-2'>
                        <div className="flex w-full gap-2">
                            <button className="flex-1 border border-slate-300 text-black px-3 py-1.5 rounded-lg text-sm font-medium">
                               Editar perfil
                            </button>
                            <button className="flex-1 border border-slate-300 text-black px-3 py-1.5 rounded-lg text-sm font-medium">
                               Compartilhar perfil
                            </button>
                            <button className="w-10 border border-slate-300 text-black py-1.5 rounded-lg flex items-center justify-center">
                                <UserPlus /> 
                            </button>
                        </div>
                    </div>
                    <ProfileSection activeTab={activeTab} setActiveTab={setActiveTab} />
                    <div className="grid grid-cols-3 gap-[1px] bg-white">
                    {activeTab === 'posts' ? posts.map((post, index) => (
                        <div key={index} className="relative w-full pt-[165%] bg-black overflow-hidden">
                        <img
                            src={post.images[0].url}
                            alt={`post-${index}`}
                            onClick={() => navigate(`/post/${post.id}`)}
                            className="absolute top-0 left-0 w-full h-full object-cover"
                        />
                        </div>
                    )): activeTab === 'reels' ? reels.map((reel, index) => (
                        <div key={index} className="relative w-full pt-[165%] bg-black overflow-hidden">
                            <video 
                                src={reel.url} 
                                className='absolute top-0 left-0 w-full h-full object-cover'
                                onClick={() => navigate(`/reels/${reel.id}`)} />
                        </div>
                    )): <h1>nada</h1>}
                    </div>
                </div>
            </>
            )}
            <Navbar />
        </>
    )
}