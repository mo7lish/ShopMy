import React from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

function Navbar() {
  return (
  <div class="main-navbar shadow-sm sticky-top">
  <div class="top-navbar">
      <div class="container-fluid">
          <div class="row">
              <div class="col-md-2 my-auto d-none d-sm-none d-md-block d-lg-block">
                    <Link to="/home" class='a'>
                        <h5 class="brand-name ms-4">ShopMY</h5>
                    </Link>
                  
                  {/* <div class="nav-brand">
                    <h5 class='brand-name'> <a href='/home'>ShopMY</a></h5>
                  </div> */}
              </div>

              <div class="col-md-5 my-auto">
                  <form role="search">
                      <div class="input-group">
                          <input type="search" placeholder="Search your product" class="form-control" />
                          <Link class="btn" style={{"background-color":"#ffa808"}} type="submit" to="/browse">
                              <i class="fa fa-search"></i>
                          </Link>
                      </div>
                  </form>
              </div>
              <div class="col-md-5 my-auto">
                  <ul class="nav justify-content-end">
                      
                      <li class="nav-item">
                          <a class="nav-link" href="/cart">
                              <i class="fa fa-shopping-cart"></i> Cart (0)
                          </a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link" href="/wishlist">
                              <i class="fa fa-heart"></i> Wishlist (0)
                          </a>
                      </li>
                      <li class="nav-item dropdown">
                          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                              <i class="fa fa-user"></i> Username 
                          </a>
                          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="/profile"><i class="fa fa-user"></i> Profile</a></li>
                            <li><a class="dropdown-item" href="/manageorders"><i class="fa fa-list"></i> My Orders</a></li>
                            <li><a class="dropdown-item" href="/wishlist"><i class="fa fa-heart"></i> My Wishlist</a></li>
                            <li><a class="dropdown-item" href="/cart"><i class="fa fa-shopping-cart"></i> My Cart</a></li>
                            <li><a class="dropdown-item" href="/login"><i class="fa fa-sign-in"></i> Login</a></li>
                            <li><a class="dropdown-item" href="/signup"><i class="fa fa-sign-out"></i> Signup</a></li>
                            <li><a class="dropdown-item" href="/support"><i class="fa fa-headphones"></i> Support</a></li>
                          </ul>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
  </div>
  <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
          <a class="navbar-brand d-block d-sm-block d-md-none d-lg-none" href="#">
              Funda Ecom
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                      <a class="nav-link" href="/home">Home</a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link" href="#">All Categories</a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link" href="#">New Arrivals</a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link" href="#">Featured Products</a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link" href="#">Electronics</a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link" href="#">Fashions</a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link" href="#">Accessories</a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link" href="#">Appliances</a>
                  </li>
              </ul>
          </div>
      </div>
  </nav>
</div>)
}

export default Navbar