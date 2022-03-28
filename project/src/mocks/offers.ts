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

const titles: string[] = ['Beautiful &amp; luxurious studio at great location', 'Wood and stone place', 'Canal View Prinsengracht', 'Nice, cozy, warm big bed apartment', 'Wood and stone place'];

const offer: offerType = {
  id: 0,
  bedrooms: 0,
  previewImage: '',
  isPremium: false,
  title: '',
  rating: 0,
  maxAdults: 0,
  price: 0,
  images: gallery,
  goods: ['Wi-Fi',
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
    avatarUrl: 'img/avatar-angelina.jpg',
    id: 0,
    isPro: false,
  },
  description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century. An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.',
  type: '',
  isFavorite: false,
  location: {
    latitude: coordinates[0][0],
    longitude: coordinates[0][1],
    zoom: 10,
  },
  city: {
    location: {
      latitude: coordinates[0][0],
      longitude: coordinates[0][1],
      zoom: 10,
    },
    name: '',
  },
};

export const offers: offerType[] = new Array(15)
  .fill(offer).map((item, index):
  offerType => {
    const number = getRandomNumber(0, coordinates.length - 1);

    return {
      ...item,
      bedrooms: getRandomNumber(1, 5),
      previewImage: gallery[getRandomNumber(0, gallery.length - 1)],
      rating: getRandomNumber(50, 100),
      id: index,
      isPremium: Math.random() > 0.5,
      isFavorite: Math.random() > 0.5,
      price: getRandomNumber(80, 180),
      maxAdults: getRandomNumber(1, 6),
      title: titles[getRandomNumber(0, titles.length - 1)],
      location: {
        latitude: coordinates[number][0],
        longitude: coordinates[number][1],
        zoom: 10,
      },
      city: {
        location: {
          latitude: coordinates[number][0],
          longitude: coordinates[number][1],
          zoom: 10,
        },
        name: cityList[getRandomNumber(0, cityList.length - 1)],
      },
      type: Math.random() > 0.5 ? 'Apartment' : 'Private room',
    };
  });

