import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getPictureThunk } from "./actions"

type InitialStateType = {picture: any[], loadingPicture: boolean};

const pictureDaySlice = createSlice({
  name: 'picture',
  initialState: { picture: [], loadingPicture: true } as InitialStateType,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPictureThunk.pending, (state) => {
      state.loadingPicture = true
    })
    builder.addCase(getPictureThunk.fulfilled, (state, action: PayloadAction<any>) => {
      if(Array.isArray(action.payload)){
        state.picture = action.payload
      } else {
        state.picture = [];
        state.picture.push(action.payload)
      }
      state.loadingPicture = false
    })
    builder.addCase(getPictureThunk.rejected, (state) => {
      state.loadingPicture = false
    })
  },
});

export default pictureDaySlice.reducer
