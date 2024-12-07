import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router';
import AppContextProvider from '../context/AppContext.jsx';
import Home from './pages/Home.jsx';
import AddVisa from './pages/AddVisa.jsx';
import AllVisa from './pages/AllVisa.jsx';
import PerVisa from './pages/PerVisa.jsx';
import axios from 'axios';
import Layout from './layout/Layout.jsx';
import ApplyNow from './pages/ApplyNow.jsx';
import MyVisaApp from './pages/MyVisaApp';
import Signin from './components/Signin.jsx';
import SignUp from './components/SignUp.jsx';
import MyAddedVisa from './pages/MyAddedVisa.jsx';
import 'react-tooltip/dist/react-tooltip.css';
import Errora from './components/Errorar.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/AddVisa',
        element: <PrivateRoute element={<AddVisa />} />,
      },
      {
        path: '/allVisa',
        element: <AllVisa />,
      },
      {
        path: '/visa/:id/apply',
        element: <PrivateRoute element={<ApplyNow />} />,
        loader: async ({ params }) => {
          try {
            const { data } = await axios.get(`http://localhost:5000/visa/${params.id}`);
            return data;
          } catch (error) {
            console.log(error);
          }
        },
      },
      {
        path: '/myVisaApplication',
        element: <PrivateRoute element={<MyVisaApp />} />,
      },
      {
        path: '/visa/:id',
        element: <PrivateRoute element={<PerVisa />} />,
        loader: async ({ params }) => {
          try {
            const { data } = await axios.get(`http://localhost:5000/visa/${params.id}`);
            return data;
          } catch (error) {
            console.log(error);
          }
        },
      },
      { path: '/signup', element: <SignUp /> },
      { path: '/signin', element: <Signin /> },
      { path: '/MyAddedVisa', element: <PrivateRoute element={<MyAddedVisa />} /> },
      { path: '*', element: <Errora /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <AppContextProvider>
    <RouterProvider router={router}></RouterProvider>
    <ToastContainer position='top-right' autoClose={3000} hideProgressBar />
  </AppContextProvider>
);
