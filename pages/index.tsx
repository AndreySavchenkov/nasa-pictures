import {
  Box,
  Button, CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography
} from "@mui/material";
import {Stack} from "@mui/system";
import Header from "components/Header/Header";
import type {NextPage} from 'next'
import Image from "next/image";
import {useEffect} from "react";
import {Controller, useForm} from "react-hook-form";
import {useSelector} from "react-redux";
import {useAppDispatch} from "store";
import {getPictureThunk} from "store/ducks/pictureDaySlice/actions";
import {charactersSelectors} from "store/ducks/pictureDaySlice/selectors";
import logo from 'public/nasa-logo.svg';

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const picture = useSelector(charactersSelectors.pictureDay);
  const isLoading = useSelector(charactersSelectors.loadingPicture);

  const {handleSubmit, control} = useForm();

  const onSubmit = (data: FormData) => {
    console.log(data)
    dispatch(getPictureThunk(String(data?.count || '')));
  }

  useEffect(() => {
    dispatch(getPictureThunk(''));
  }, [dispatch])
  console.log(picture);
  return (
    <>
      <Header title='Home Page' description=''/>
      <Paper elevation={3} style={{position: "fixed", top: '0', width: '100%', zIndex: 10,}}>
        <Stack direction="row" alignItems='center' justifyContent="space-between">
          <Stack direction="row" spacing={2} alignItems="center">
            <Image src={logo} alt='logo NASA'/>
          </Stack>
          <Box mr={2}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2} direction='row'>
                <Controller
                  control={control}
                  name="count"
                  render={({field}) => (
                    <Box sx={{minWidth: 100}}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Count</InputLabel>
                        <Select
                          {...field}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Count"
                        >
                          <MenuItem value={0}>Current</MenuItem>
                          <MenuItem value={1}>One</MenuItem>
                          <MenuItem value={2}>Two</MenuItem>
                          <MenuItem value={3}>Three</MenuItem>
                          <MenuItem value={4}>Four</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  )}
                />
                <Button type='submit' variant="contained">
                  Search
                </Button>
              </Stack>
            </form>
          </Box>

        </Stack>
      </Paper>
      <Box mt={14}>
        {isLoading ? (
            <Stack justifyContent='center' alignItems='center'>
              <CircularProgress/>
            </Stack>

        ) : (picture ?
          (picture.map((item: any, index) => (<><Stack spacing={2} alignItems={"center"} mt={4} key={index}>
                <Typography variant={"h4"} align={"center"}>{item?.title || ''}</Typography>
                <Typography variant={"h5"} align={"center"}>{item?.date || ''}</Typography>
                <Container>
                  <Typography variant={"body1"} align={"left"}>{item?.explanation || ''}</Typography>
                </Container>
                <Container>
                  <Image
                    alt="image of the day"
                    src={item?.url || ''}
                    layout="responsive"
                    width={100}
                    height={100}
                    objectFit="cover"
                  />
                </Container>
                <Container>
                  <Typography variant={"body2"}>@ {item?.copyright || ''}</Typography>
                </Container>
              </Stack></>
            ))
          )
          :
          (
            <Container>
              <Typography align={"center"} mt={8} variant={"h4"}>There was an error. Please try again later
                :(</Typography>
            </Container>
          ))
        }
      </Box>

    </>
  )
};

export default Home;

type FormData = {
  count?: number;
};