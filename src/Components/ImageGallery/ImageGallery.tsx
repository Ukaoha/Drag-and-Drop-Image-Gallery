import React, { useState } from 'react';

// Sample image data with tags
const imageData = [
  { id: 1, src: './Poster.jpg', tags: ['Nature'] },
  { id: 2, src: 'tv.png', tags: ['Travel'] },
  { id: 3, src: 'tomato.png', tags: ['Food'] },
  // Add more images here
];

function ImageGallary() {
  const [images, setImages] = useState(imageData);
  const [draggedImage, setDraggedImage] = useState(null);

  const handleDragStart = (e : any, id :any) => {
    e.dataTransfer.setData('imageId', id);
    setDraggedImage(id);
  };

  const handleDragOver = (e : any) => {
    e.preventDefault();
  };

  const handleDrop = (e :any, id : any) => {
    e.preventDefault();
    const imageId = e.dataTransfer.getData('imageId');
    if (imageId !== id) {
      const updatedImages = images.map((image) => {
        if (image.id === +imageId) {
          return { ...image, id: +id };
        }
        if (image.id === +id) {
          return { ...image, id: +imageId };
        }
        return image;
      });
      setImages(updatedImages);
    }
    setDraggedImage(null);
  };

  return (
    <div className="App">
      <h1>Drag-and-Drop Image Gallery</h1>
      <div className="image-gallery">
        {images.map((image) => (
          <div
            key={image.id}
            className="image"
            draggable
            onDragStart={(e) => handleDragStart(e, image.id)}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, image.id)}
          >
            <img src={image.src} alt={image.tags.join(', ')} />
            <p>{image.tags.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageGallary;
