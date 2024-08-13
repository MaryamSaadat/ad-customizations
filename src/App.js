
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import {Box, createTheme, ThemeProvider} from '@mui/material';
import { Instructional, PersonalInfo, SurveyPage, VideoPage} from './components';
import {UploadVideo, ConsentPage, WoSummaryPage, TestingPage, FinalPage, AllVideos, Responses} from './pages/index'

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
            <Route path='/' exact element={<ConsentPage />} />
            <Route path='/Instructional' exact element={<Instructional/>} />
            <Route path='/VideoPage' element={<VideoPage/>} />
            <Route path='/Survey' element={<SurveyPage/>} />
            <Route path='/SurveywoSummary' element={<WoSummaryPage/>} />
            <Route path='/Info' element={<PersonalInfo/>} />
            <Route path='/Video' element={<UploadVideo/>} />
            <Route path='/Testing' element={<TestingPage/>} />
            <Route path='/End' element={<FinalPage/>} />
            <Route path='/AllVideos' element={<AllVideos/>} />
            <Route path='/Responses' element={<Responses/>} />
        </Routes>
    </Box>
    </BrowserRouter>
    </ThemeProvider>
)

export default App;