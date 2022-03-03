import {offerType} from '../types/offerType';

function getRandomNumber(min: number, max: number) {
  return min + Math.floor(Math.random() * (max + 1 - min));
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const offer: offerType = {
  id: 0,
  gallery: [
    'img/apartment-01.jpg',
    'img/room.jpg',
    'img/apartment-02.jpg',
    'img/apartment-03.jpg',
    'img/apartment-01.jpg',
  ],
  rank: false,
  title: ['Beautiful &amp; luxurious studio at great location', 'Wood and stone place', 'Canal View Prinsengracht', 'Nice, cozy, warm big bed apartment', 'Wood and stone place'],
  rating: 0,
  features: {
    category: '',
    countRoom: 0,
    countAdults: 0,
  },
  price: [120, 80, 132, 180, 80],
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
      name: 'Max',
      avatar: 'img/avatar-max.jpg',
      description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
      date: 'April 2019',
    },
  ],
  bookmark: false,
};

export const offers: offerType[] = new Array(5)
  .fill(offer).map((item, index): offerType => ({
    ...item,
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
  }));
