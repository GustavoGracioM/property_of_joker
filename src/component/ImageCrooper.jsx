import { useState } from "react";
import Cropper from "react-easy-crop";

export default function ImageCropper({ open, image, containerStyle, setCroppedAreaPixels, ...props }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  if (!open) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div style={containerStyle} className="crop-container">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={9/12}
            minZoom={1}
            onCropChange={setCrop}
            onCropComplete={(_, croppedAreaPixels) => {
              setCroppedAreaPixels(croppedAreaPixels);
            }}
            onZoomChange={setZoom}
            {...props}
          />
        </div>
      </div>
    </div>
  );
};