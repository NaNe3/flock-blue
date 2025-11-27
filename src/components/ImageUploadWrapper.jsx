import React, { useState, useRef } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import ModalView from './ModalView';
import BasicButton from './BasicButton';

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export default function ImageUploadWrapper({ 
  children, 
  onImageSelect, 
  aspect = 1, // Default to square crop
  cropShape = 'rect' // 'rect' or 'round'
}) {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState(null);
  const [completedCrop, setCompletedCrop] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [intendedToClose, setIntendedToClose] = useState(false);
  const imgRef = useRef(null);
  const hiddenFileInput = useRef(null);

  const handleWrapperClick = () => {
    hiddenFileInput.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setImageSrc(reader.result);
      setShowCropper(true);
    });
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, aspect));
  };

  const getCroppedImg = (image, crop) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!crop || !ctx) {
      return null;
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;

    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/jpeg', 0.9);
    });
  };

  const handleCropConfirm = async () => {
    if (!completedCrop || !imgRef.current) return;

    try {
      const croppedImageBlob = await getCroppedImg(imgRef.current, completedCrop);
      if (croppedImageBlob && onImageSelect) {
        // Create a File object from the blob
        const croppedFile = new File([croppedImageBlob], 'cropped-image.jpg', {
          type: 'image/jpeg',
        });
        onImageSelect(croppedFile, croppedImageBlob);
      }
      handleModalReset();
    } catch (error) {
      console.error('Error cropping image:', error);
    }
  };

  const handleCropCancel = () => {
    setIntendedToClose(true);
  };

  const handleModalReset = () => {
    setShowCropper(false);
    setIntendedToClose(false);
    setImageSrc(null);
    setCrop(null);
    setCompletedCrop(null);
    // Reset the file input
    if (hiddenFileInput.current) {
      hiddenFileInput.current.value = '';
    }
  };

  return (
    <>
      <div 
        onClick={handleWrapperClick}
        style={{ cursor: 'pointer' }}
      >
        {children}
      </div>
      
      <input
        ref={hiddenFileInput}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {showCropper && (
        <ModalView
          intendedToClose={intendedToClose}
          handleModalReset={handleModalReset}
        >
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            padding: '20px',
            maxWidth: '500px',
            maxHeight: '70vh',
            overflow: 'auto',
            color: 'white'
          }}>
            <h3 style={{ margin: '0 0 20px 0', textAlign: 'center' }}>
              Crop Your Image
            </h3>
            {imageSrc && (
              <>
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={aspect}
                  circularCrop={cropShape === 'round'}
                >
                  <img
                    ref={imgRef}
                    alt="Crop me"
                    src={imageSrc}
                    onLoad={onImageLoad}
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '400px',
                      objectFit: 'contain'
                    }}
                  />
                </ReactCrop>
                
                <div style={{ 
                  width: '100%',
                  marginTop: '20px',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  gap: '20px'
                }}>
                  <p
                    onClick={handleCropCancel}
                    className='hover-underline'
                    style={{
                      color: 'white',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    cancel
                  </p>
                  <BasicButton
                    text="confirm"
                    onClick={handleCropConfirm}
                    disabled={!completedCrop}
                    style={{
                      fontSize: 16,
                      padding: '10px 20px',
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </ModalView>
      )}
    </>
  );
}