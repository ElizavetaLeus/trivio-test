import { defineStore } from 'pinia';
import { type Trip } from '@/types/Trip';

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
    isShownButtonCloseTrip: (state) => (state.trip?.status ?? null) !== 'ended',
  },
  actions: {
    setTrip(tripData: Trip) {
      this.trip = tripData;
    },
  },
});
