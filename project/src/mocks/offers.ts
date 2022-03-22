import {offerType} from '../types/offerType';

function getRandomNumber(min: number, max: number) {
  return min + Math.floor(Math.random() * (max + 1 - min));
}

const gallery: string[] = [
  'img/apartment-01.jpg',
  'img/room.jpg',
  'img/apartment-02.jpg',
  'img/apartment-03.jpg',
  'img/apartment-01.jpg',
];

export const cityList: string[] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

const coordinates: number[][] = [
  [52.3909553943508, 4.85309666406198],
  [52.369553943508, 4.85309666406198],
  [52.3909553943508, 4.929309666406198],
  [52.3809553943508, 4.939309666406198],
];

const offer: offerType = {
  id: 0,
  offerPhoto: 'img/apartment-01.jpg',
  rank: false,
  title: ['Beautiful &amp; luxurious studio at great location', 'Wood and stone place', 'Canal View Prinsengracht', 'Nice, cozy, warm big bed apartment', 'Wood and stone place'],
  rating: 0,
  features: {
    category: '',
    countRoom: 0,
    countAdults: 0,
  },
  price: 120,
  inside: ['Wi-Fi',
    'Washing machine',
    'Towels',
    'Heating',
    'Coffee machine',
    'Baby seat',
    'Kitchen',
    'Dishwasher',
    'Cabel TV',
    'Fridge'],
  host: {
    name: 'Angelina',
    avatar: 'img/avatar-angelina.jpg',
    status: 'Pro',
    description: ['A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.', 'An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.'],
  },
  reviews: [
    {
      id: 22,
      name: 'Max',
      avatar: 'img/avatar-max.jpg',
      description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
      date: 'April 2019',
      grade: getRandomNumber(50, 100),
    },
    {
      id: 224,
      name: 'Andrei',
      avatar: 'img/avatar-max.jpg',
      description: 'An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.',
      date: 'May 2020',
      grade: getRandomNumber(50, 100),
    },
  ],
  bookmark: false,
  coordinate: coordinates[0],
  city: 'Paris',
};

export const offers: offerType[] = new Array(15)
  .fill(offer).map((item, index): offerType => ({
    ...item,
    offerPhoto: gallery[getRandomNumber(0, gallery.length - 1)],
    rating: getRandomNumber(50, 100),
    id: index,
    rank: Math.random() > 0.5,
    bookmark: Math.random() > 0.5,
    features: {
      ...item.features,
      category: Math.random() > 0.5 ? 'Apartment' : 'Private room',
      countRoom: getRandomNumber(1, 5),
      countAdults: getRandomNumber(1, 6),
    },
    coordinate: coordinates[getRandomNumber(0, coordinates.length - 1)],
    city: cityList[getRandomNumber(0, cityList.length - 1)],
    price: getRandomNumber(80, 180),
  }));
