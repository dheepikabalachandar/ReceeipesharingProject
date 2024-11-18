import React from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios";
import Swal from "sweetalert2";

import '../styles/AddRecipe.css'

// import components
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function AddRecipe() {
    const navigate = useNavigate();
    const [backgroudUploadPhoto, setbackgroudUploadPhoto] = React.useState('/images/add-photo-form.png');

    // get user id from local storage
    const userId = localStorage.getItem("userId");

    // state for form
    const [title, setTitle] = React.useState("");
    const [ingredients, setIngredients] = React.useState("");
    const [videoLink, setVideoLink] = React.useState("");
    const [recipePicture, setRecipePicture] = React.useState("");
    const [category, setCategory] = React.useState("");

    const categories = [
        "Main Dish",
        "Snack",
        "Dessert",
        "Salad",
        "Beverage",
        "Breakfast",
    ];

    React.useEffect(() => {
        if (!localStorage.getItem("auth")) {
            navigate("/login");
        }
    }, []);

    // Function to handle submit
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("recipePicture", recipePicture);
        formData.append("title", title);
        formData.append("category", category);
        formData.append("ingredients", ingredients);
        formData.append("videoLink", videoLink);
        formData.append("userId", userId);

        // show loading before axios finish
        Swal.fire({
            title: "Please wait...",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        axios
            .post(`${process.env.REACT_APP_BASE_URL}/recipe`, formData)
            .then((result) => {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Recipe added successfully",
                });
                navigate("/profile");
            })
            .catch((err) => {
                console.log(err);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: err?.response?.data?.message,
                });
            });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setbackgroudUploadPhoto(imageUrl);

        handleInputChange(e);
    };

    const handleInputChange = (e) => {
        setRecipePicture(e.target.files[0]);
    };

    return (
        <>
            <Navbar />
            {/* start of form */}
            <section id="content">
                <div className="container">
                    <div className="file-container input-group mb-3 mt-3"
                        style={{
                            backgroundImage: `url(${backgroudUploadPhoto})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center center",
                            backgroundSize: "auto 100%",
                            height: "200px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            padding: "10px",
                            cursor: "pointer"
                        }}
                    >
                        <input
                            className="form-control h-20"
                            type="file"
                            id="file-input"
                            placeholder="Comment"
                            style={{ height: "200px", opacity: 0 }}
                            onChange={handleFileChange}

                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder="Title"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">

                        <select
                            id="category"
                            className="form-control"
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="Main Dish">Select a category</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <textarea
                            className="form-control"
                            style={{ height: 200 }}
                            id="exampleFormControlTextarea1"
                            placeholder="Ingredients"
                            defaultValue={""}
                            onChange={(e) => setIngredients(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder="Video"
                            onChange={(e) => setVideoLink(e.target.value)}
                        />
                    </div>
                    <div className="mt-3 d-flex justify-content-center">
                        <button
                            className="btn btn-warning"
                            style={{ width: "30%" }}
                            onClick={handleSubmit}
                        >
                            Post
                        </button>
                    </div>
                </div>
            </section>
            {/* end of content */}
            <Footer />
        </>

    )
}
