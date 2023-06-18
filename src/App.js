import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom"
import Navbar from "./components/Navbar";
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import SaleYourPractice from './pages/SaleYourPractice'
import MyPractices from "./pages/MyPractices"
import PracticeEdit from "./pages/PracticeEdit"
import { useEffect, useState } from "react";
import axios from "axios";
import Login from './components/Login'
import Signup from './components/Signup'
import { useAuthContext } from './hooks/useAuthContext'
import AccountDetails from "./pages/AccountDetails";
import Clients from "./pages/Clients"
import Blogs from "./pages/Blogs"
import Others from "./pages/Others"
import ClientsAuth from "./pages/ClientsAuth";
import { useCounterContext } from './hooks/useCounterContext'
import MyPosts from "./pages/MyPosts";
import ClientsEdit from "./pages/ClientsEdit";
import CreateBlogs from './pages/CreateBlogs'
import ViewBlogs from "./pages/ViewBlogs"
import MyBlogs from "./pages/MyBlogs"
import BlogsEdit from "./pages/BlogsEdit";



function App() {

  const { user } = useAuthContext()
  const { counter,dispatch } = useCounterContext()
  // const history = useNavigate()
  

  return (
    <div className="app">
      <Router>
        <Navbar  />
        <div className={counter==1 ? "clients-page" : "pages"}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/accountdetails' element={<AccountDetails />} />
            <Route path="/saleyourpractice" element={<SaleYourPractice />} />
            <Route path="/mypractice" element={<MyPractices />} />
            <Route path="/mypractice/edit/:id" element={<PracticeEdit />} />
            <Route path="/contact" element={<Contact />} />
            <Route path='/login' element={!user ? <Login /> : <Navigate to='/' /> } />
            <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />
            {counter==1? <Route path="/clients" element={<Clients />} /> : <Route path="/clients" element={<div style={{height:"100%",width:"100%",fontSize:"2vw",fontFamily:"poppins",display:"flex", justifyContent:"center", alignItems:"center"}}><h1>You are Unauthorized to do this</h1></div>}/>} 
            <Route path="/myposts" element={<MyPosts />} />
            <Route path="/myposts/edit/:id" element={<ClientsEdit />} />
            <Route path="/others" element={<Others />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/clientsauth" element={<ClientsAuth />} />
            <Route path="/createblogs" element={<CreateBlogs />} />
            <Route path="/myblogs" element={<MyBlogs />} />
            <Route path="/viewblogs" element={<ViewBlogs />} />
            <Route path="/myblogs/edit/:id" element={<BlogsEdit />} />
          </Routes>
        </div>
        
      </Router>
    </div>
  );
}

export default App;
