import React from "react";
import "../styles/Detail.css";

function Comments({comments}) {

    return (
        <>
            <div className="row mt-5">
                <div className="col offset-md-2 ">
                    <h2 className="mb-3">Comment</h2>
                    <div style={{ overflow: "auto", maxHeight: "500px" }}>
                        {
                            comments?.length > 0 ? (
                                comments?.map((comment) => (
                                    <div
                                        className="d-flex align-items-center mb-3"

                                        key={comment.id}
                                    >
                                        <div
                                            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
                                        >
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <img
                                                    src={comment.profile_picture}
                                                    width={40}
                                                    height={40}
                                                    alt="Profile Picture"
                                                    style={{ borderRadius: "50%", marginRight: "1rem" }}
                                                />
                                                <div>
                                                    <h6 style={{ margin: 0 }}>{comment.fullname}</h6>
                                                    <span style={{ fontSize: "14px" }}>{comment.comment}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                ))
                            ) : (
                                <p>No comments available.</p>
                            )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Comments;