import React from 'react'
import { Link } from 'react-router-dom'


export default function Navbar() {
    return (
        <>
            <div className="container mt-5" >
                <div className="row nav">
                    <div className="col">
                        <div>
                            <Link className="nav-item" to="/">
                                Home
                            </Link>
                            <Link className="nav-item" to="/add-recipe">
                                Add Recipe
                            </Link>
                            
                        </div>
                    </div>
                    <div className="col-md-auto" />
                    <div className="col-md-1">
                        <div>
                            {localStorage.getItem("auth") ? (
                                <>
                                    <Link
                                        className="text-decoration-none nav-item d-flex justify-content-end align-items-center gap-2 d-lg-flex d-none"
                                        onClick={() => {
                                            localStorage.clear();

                                            window.location.href = "/login";
                                        }}
                                    >
                                        Logout
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        className="text-decoration-none nav-item d-flex justify-content-end align-items-center gap-2 d-lg-flex d-none"
                                        to="/login"
                                    >
                                        Login
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-2 d-flex justify-content-end align-items-center hide-desktop">
                <button
                    className="btn"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseExample"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                >
                    <img src="/images/menu.png" alt='Nav Menu' width="35px" height="35px" />
                </button>
            </div>
            <div className="collapse" id="collapseExample">
                <div className="card card-body">
                    <Link className="nav-item fw-bold mb-3 mt-3 text-center" to="/">
                        Home
                    </Link>
                    <Link
                        className="nav-item fw-bold text-decoration-none mb-3 text-center"
                        to="/add-recipe"
                    >
                        Add Recipe
                    </Link>
                    <Link
                        className="nav-item fw-bold text-decoration-none mb-3 text-center"
                        to="/profile"
                    >
                        Profile
                    </Link>
                    <Link
                        className="nav-item fw-bold text-decoration-none mb-3 text-center"
                        to="/login"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </>
    )
}
