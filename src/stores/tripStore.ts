import { defineStore } from 'pinia';
import { type Trip } from '@/types/Trip';
import { dateToFormat, getStartTrip } from '@/helper/date-helper';
import { tripsApi } from '@/api/trips';

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

    getTripRouterId:(state) => {
      return state?.trip?.id || '';
    },
  },
  actions: {
    setTrip(tripData: Trip) {
      this.trip = tripData;
    },

    async completeTrip() {
      const tripId = String(this.trip?.id);
      const updatedTrip = await tripsApi.completeTripById(tripId, { status: 'ended' });
      if (updatedTrip !== null) {
        this.setTrip(updatedTrip);
      }
    },
  },
});
