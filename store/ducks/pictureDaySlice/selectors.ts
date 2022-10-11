import { RootState } from 'store';

export const charactersSelectors = {
  pictureDay: (state: RootState) => state.pictureDay.picture,
  loadingPicture: (state: RootState) => state.pictureDay.loadingPicture,
};
