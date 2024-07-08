import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/auth/Login';
import Profile from './pages/dashboard/profile/Profile';
import Dashboard from './pages/dashboard/dashboard/Dashboard';
import Users from './pages/dashboard/dashboard/Users';
import Reports from './pages/dashboard/dashboard/Reports';
import PageNotFound from './components/PageNotFound';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Polls from './pages/dashboard/dashboard/Polls';
import ProtectedWrapper from './utils/ProtectedWrapper';
import Actions from './pages/dashboard/dashboard/Actions';
import Moments from './pages/dashboard/dashboard/Moments';
import Music from './pages/dashboard/dashboard/Music';
import Advertisement from './pages/dashboard/dashboard/Advertisement';
import Stickers from './pages/dashboard/dashboard/Stickers';

function App() {


  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {/* <Testimonial/>
    <HomeFootCard/>
    <VendorsFootCard/> */}
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<ProtectedWrapper><Dashboard /></ProtectedWrapper> } />
          <Route path="/users" element={<ProtectedWrapper><Users /></ProtectedWrapper>} />
          <Route path="/polls" element={<ProtectedWrapper><Polls /></ProtectedWrapper>} />
          <Route path="/reports" element={<ProtectedWrapper><Reports /></ProtectedWrapper>} />
          <Route path="/profile" element={<ProtectedWrapper><Profile /></ProtectedWrapper>} />
          <Route path="/actions" element={<ProtectedWrapper><Actions /></ProtectedWrapper>} />
          <Route path="/musics" element={<ProtectedWrapper><Music /></ProtectedWrapper>} />
          <Route path="/moments" element={<ProtectedWrapper><Moments /></ProtectedWrapper>} />
          <Route path="/ads" element={<ProtectedWrapper><Advertisement /></ProtectedWrapper>} />
          <Route path="/stickers" element={<ProtectedWrapper><Stickers /></ProtectedWrapper>} />
          <Route path="/login" element={<Login />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>


      </BrowserRouter>
    </>
  )
}

export default App
