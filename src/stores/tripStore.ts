import { defineStore } from 'pinia';
import { type Trip } from '@/types/Trip';
import { dateToFormat, getStartTrip } from '@/helper/date-helper';

interface TripState {
  trip: Trip | null;
}

export const useTripStore = defineStore( 'trip', {
  state: (): TripState => {
    return {
      trip: null,
    };
  },
  getters: {
    isShownButtonCloseTrip: (state) => (state?.trip?.status ?? null) !== 'ended',

    getTripID: (state) => {
      let date = '';
      if (state?.trip?.services.length) {
        const startDate = getStartTrip(state?.trip?.services)[0].dateTime;
        date = `от ${dateToFormat(startDate, 'DD.MM.YYYY')}`;
      }
      return `#${state?.trip?.id} ${date}`;
    },

  },
  actions: {
    setTrip(tripData: Trip) {
      this.trip = tripData;
    },
  },
});
