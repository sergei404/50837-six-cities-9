import { offerType } from './offerType';
import { reviewsType } from './reviewType';

export type offerActionType = {
  dataOffer: offerType;
  dataComments: reviewsType[];
  dataNearby: offerType[]
};

