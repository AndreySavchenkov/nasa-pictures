import { createAsyncThunk } from "@reduxjs/toolkit"
import { getPicture } from "api"

export const getPictureThunk = createAsyncThunk(
  'picture/getPicture',
  async (count: string = '', thunkApi) => {
    try {
      const { data } = await getPicture(count);
      return data;
    } catch (error) {
      return console.log(error);
    }
  }
)