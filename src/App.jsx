import React, { Component } from "react";

import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./App.css";
import About from "./components/about";
import Footer from "./components/footer";
import Home from "./components/home";
import Navbar from "./components/navbar";
import Signup from "./components/signup";

import "react-toastify/dist/ReactToastify.css";
import Signin from "./components/signin";
import usersService from "./services/usersService";
import LogOut from "./components/logout";
import BusinessSignup from "./components/signupBusiness";
import CreateCard from "./components/createCard";
import ProtectedRoute from "./components/common/protectedRoute";
import MyCards from "./components/myCards";
import DeleteCard from "./components/deleteCard";
import EditCard from "./components/editCard";

class App extends Component {
  state = {};

  componentDidMount() {
    this.setState({
      user: usersService.getUser(),
    });
  }

  render() {
    const { user } = this.state;

    return (
      <div className="app d-flex flex-column min-vh-100 bg-light">
        <ToastContainer />
        <header>
          <Navbar user={user} />
        </header>
        <main className="container flex-fill">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/my-cards"
              element={
                <ProtectedRoute bizOnly>
                  <MyCards />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-cards/delete/:id"
              element={
                <ProtectedRoute bizOnly>
                  <DeleteCard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-cards/edit/:id"
              element={
                <ProtectedRoute bizOnly>
                  <EditCard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-card"
              element={
                <ProtectedRoute bizOnly>
                  <CreateCard />
                </ProtectedRoute>
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup-biz" element={<BusinessSignup />} />
            <Route path="/logout" element={<LogOut />} />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

export default App;
