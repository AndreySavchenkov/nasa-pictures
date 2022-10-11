import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import pictureDaySlice from './ducks/pictureDaySlice/slice';


export const store = configureStore({
  reducer: {
    pictureDay: pictureDaySlice,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch