import React from 'react';
import SignIn from './pages/signIn'
import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/signUp';
import UserAuth from './routes/userAuth';
import Portfolio from './pages/portfolio';
import AdminAuth from './routes/adminAuth';
import DashAdmin from './pages/dashAdmin';
import PageNotFound from './pages/notFound';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/' element={<UserAuth />}>
        <Route path='/portfolio' element={<Portfolio />} />
      </Route>
      <Route path='/' element={<AdminAuth />}>
        <Route path='/dashboard' element={<DashAdmin />} />
      </Route>
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  )
}