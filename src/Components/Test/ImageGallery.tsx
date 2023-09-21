// ImageGallery.tsx
import React, { useState, useEffect } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { imageData, ImageData } from '../../data';
import './img.css'; // Import your CSS

const Image: React.FC<{
  image: ImageData;
  index: number;
  moveImage: (fromIndex: number, toIndex: number) => void;
}> = ({ image, index, moveImage }) => {
  const [, ref] = useDrag({
    type: 'IMAGE',
    item: { index },
  });

  const [, drop] = useDrop({
    accept: 'IMAGE',
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveImage(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} className="image-card">
      <img src={image.src} alt={image.tags.join(', ')} />
      <div className="tags">
        {image.tags.map((tag, i) => (
          <span key={i} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const ImageGallery: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Simulate loading state
    setTimeout(() => {
      setImages(imageData);
      setLoading(false);
    }, 1500);
  }, []);

  const moveImage = (fromIndex: number, toIndex: number) => {
    const updatedImages = [...images];
    const [movedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedImage);
    setImages(updatedImages);
  };

  // Implement search functionality
  const filteredImages = images.filter((image) =>
    image.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="image-gallery">
      <input
        type="text"
        className='search'

        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <div className="image-grid">
          {filteredImages.map((image, index) => (
            <Image key={image.id}image={image} index={index} moveImage={moveImage} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
