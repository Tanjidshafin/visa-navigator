// import Navbar from './components/Navbar';

// import { Route, Routes } from 'react-router';
// import Home from './pages/Home';
// import AddVisa from './pages/AddVisa';
// import AllVisa from './pages/AllVisa';
// import PerVisa from './pages/PerVisa';
// import axios from 'axios';

// function App() {
//   return (
//     <>
//       <Navbar />

//       <Routes>
//         <Route path='/' element={<Home />} />
//         <Route path='/AddVisa' element={<AddVisa />} />
//         <Route path='/allVisa' element={<AllVisa />} />
//         <Route
//           path='/visa/:id'
//           loader= {async ({ params }) => {
//             const { data } = await axios.get(`{http://localhost:5000/visa/${params.id}}`);
//             return data
//           }}
//           element={<PerVisa />}
//         />
//       </Routes>
//     </>
//   );
// }

// export default App;
