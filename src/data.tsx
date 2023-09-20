export interface ImageData {
    id: string;
    src: string;
    tags: string[];
    position?: number;
  }
  
  export const imageData: ImageData[] = [
    {
      id: '1',
      src: 'tv.png',
      tags: ['Nature', 'Landscape'],
    },
    {
      id: '2',
      src: 'tomato.png',
      tags: ['Animals', 'Wildlife'],
    },
    {
      id: '3',
      src: 'Poster.jpg',
      tags: ['City', 'Urban'],
    },
    {
      id: '4',
      src: 'tv.png',
      tags: ['Food', 'Cuisine'],
    },
    {
      id: '5',
      src: 'Poster.jpg',
      tags: ['Architecture', 'Building'],
    },
    {
      id: '6',
      src: 'Poster.jpg',
      tags: ['People', 'Portraits'],
    },
    {
      id: '7',
      src: 'tomato.png',
      tags: ['Travel', 'Adventure'],
    },
    {
      id: '8',
      src: 'tv.png',
      tags: ['Technology', 'Gadgets'],
    },
    {
      id: '9',
      src: 'Poster.jpg',
      tags: ['Art', 'Creativity'],
    },
    {
      id: '10',
      src: 'tv.png',
      tags: ['Sports', 'Athletics'],
    },
  ];
  