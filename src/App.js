
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import {Box, createTheme, ThemeProvider} from '@mui/material';
import {  PersonalInfo, VideoPage} from './components';
import {UploadVideo, NoDescPage, ConsentPage, TestingPage, FinalPage, AllVideos, Responses, SurveyStart, SurveyPage, CustomizePage, TypeOfDescriptions, FinalSurvey, NoDescSurvey} from './pages/index'

const theme = createTheme({
  // The colurs are turned opposite
    palette: {
      primary: {
        light: '#19b394',
        main: '#000',
        dark: '#000',
      },
      secondary: {
        main: '#19b394',
        light: '#3C0753',
        contrastText: 'white',
      },
    },
  });


const App = () => (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
    <Box sx={{backgroundColor : '#F3F3F3'}}>
        <Routes>
        {/* Home here is the feed */}
            <Route path='/Consent' exact element={<ConsentPage />} />
            <Route path='/VideoPage' element={<VideoPage/>} />
            <Route path='/NoDesc' element={<NoDescPage/>} />
            <Route path='/Survey' element={<SurveyPage/>} />
            <Route path='/Info' element={<PersonalInfo/>} />
            <Route path='/Video' element={<UploadVideo/>} />
            <Route path='/Customize' element={<CustomizePage/>} />
            <Route path='/Testing' element={<TestingPage/>} />
            <Route path='/End' element={<FinalPage/>} />
            <Route path='/AllVideos' element={<AllVideos/>} />
            <Route path='/Responses' element={<Responses/>} />
            <Route path='/Type' element={<TypeOfDescriptions/>} />
            <Route path='/FinalSurvey' element={<FinalSurvey/>} />
            <Route path='/NoDescSurvey' element={<NoDescSurvey/>} />
            <Route path='/' element={<SurveyStart/>} />
        </Routes>
    </Box>
    </BrowserRouter>
    </ThemeProvider>
)

export default App;