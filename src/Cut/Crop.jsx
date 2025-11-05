import React, { useEffect, useState } from "react";
import MyGallery from '../component/MyGallery'
import { uploadImage, createPost } from '../../api/api'
import HeaderCreate from "../component/HeaderCreate";
import ImageRequest from "../component/ImageRequest";
import AddImageButton from '../component/AddImageButton';
import FormCreate from "../component/Form";
import ImageCropper from "../component/ImageCrooper";
import LoadingScreen from '../Loading/LoadingScreen'
import { useNavigate } from "react-router";

const BACKEND = 'http://localhost:3001';


export default function Crop() {
  const [image, setImage] = useState([]);
  const [croppedImage, setCroppedImage] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [legend, setLegend] = useState('');
  const [local, setLocal] = useState('');
  const [data, setData] = useState('');
  const [create, setCreate] = useState(false)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setCreate(false)
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [])

  const cropEdit = (newImg) => {
    setImage([newImg]);
    setDialogOpen(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost({ legend, local, data, urls: croppedImage });
      setTimeout(() => navigate('/'), 500)

    } catch (error) {
      console.error('Erro ao criar post:', error);
    }
  };

  const sendPost = async (imagePromise) => {
    const file = await imagePromise;
    const { path } = await uploadImage(file);
    setCroppedImage([...croppedImage, { original: `${BACKEND}${path}` }]);
    setDialogOpen(false);
    setCreate(false)
  }

  return (
    <>
    {isLoading && <LoadingScreen />}
    {!isLoading && (
    <div className="App">
      <HeaderCreate 
        create={create} 
        image={image.length > 0 && image[0].dataURL} 
        setCreate={setCreate} 
        handleSubmit={handleSubmit} 
        dialogOpen={dialogOpen} 
        setDialogOpen={setDialogOpen} 
        sendPost={sendPost} 
        croppedAreaPixels={croppedAreaPixels} />
      {!create ? (
        <>
        <ImageCropper
          open={dialogOpen}
          setCroppedAreaPixels={setCroppedAreaPixels}
          image={image.length > 0 && image[0].dataURL}
          containerStyle={{
            position: "relative",
            aspectRatio: '9 / 12',
            background: "#333"
          }}
        />
        {!dialogOpen && croppedImage.length === 0 && (
          <ImageRequest
            onChange={(file) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                setImage([{ dataURL: reader.result }]);
                setDialogOpen(true);
                setCreate(false)
              };
              reader.readAsDataURL(file);
            }}
          />
        )}
        {!dialogOpen && croppedImage.length >= 1 && (
          <MyGallery images={croppedImage} />
        )}
        {!dialogOpen && (
          <AddImageButton
            onSelect={cropEdit}
          />
        )}
        </>) : <FormCreate legend={legend} setLegend={setLegend} local={local} setLocal={setLocal} data={data} setData={setData} images={croppedImage} />}
    </div>    
    )}
    </>
  );
}
