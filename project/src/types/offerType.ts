type ReviewsOffer = {
  name: string;
  avatar: string;
  description: string;
  date: string;
};

type Features = {
  category: string;
  countRoom: number;
  countAdults: number;
};

type Host = {
  name: string;
  avatar: string;
  status: string;
  description: string[];
};

export type offerType = {
  id: number;
  gallery: string[];
  rank: boolean;
  title: string[];
  rating: number;
  features: Features;
  price: number[];
  inside: string[];
  host: Host;
  reviews: ReviewsOffer[];
  bookmark: boolean;
};
