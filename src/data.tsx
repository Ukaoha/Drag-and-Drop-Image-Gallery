export interface ImageData {
    id: string;
    src: string;
    tags: string[];
    position?: number;
    translateX?: number;
    translateY?: number;
  
  }
  
  export const imageData: ImageData[] = [
    {
      id: '1',
      src: 'nature.jpg',
      tags: ['Nature', 'Landscape'],
    },
    {
      id: '2',
      src: 'animal.jpg',
      tags: ['Animals', 'Wildlife'],
    },
    {
      id: '3',
      src: 'city.jpg',
      tags: ['City', 'Urban'],
    },
    {
      id: '4',
      src: 'rice.jpg',
      tags: ['Food', 'Cuisine'],
    },
    {
      id: '5',
      src: 'building.jpg',
      tags: ['Architecture', 'Building'],
    },
    {
      id: '6',
      src: 'people.jpg',
      tags: ['People', 'Portraits'],
    },
    {
      id: '7',
      src: 'travel.jpg',
      tags: ['Travel', 'Adventure'],
    },
    {
      id: '8',
      src: 'gadgets.jpg',
      tags: ['Technology', 'Gadgets'],
    },
    {
      id: '9',
      src: 'art.jpg',
      tags: ['Art', 'Creativity'],
    },
    {
      id: '10',
      src: 'sports.jpg',
      tags: ['Sports', 'Athletics'],
    },
  ];
  