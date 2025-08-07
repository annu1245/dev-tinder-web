import React from "react";

const UserCard = ({ user, isEdit=true }) => {
    const { firstName, lastName, age, gender, skills, about, profileUrl } = user;
    return (
        <div className="card bg-base-300 w-80 shadow-sm mt-5 pb-5 rounded-lg shadow-pink-700">
            <figure>
                <img className="w-full h-64 object-cover" src="https://thumbs.dreamstime.com/b/beauty-profile-portrait-young-woman-wreath-flowers-her-hair-harmony-concept-beauty-profile-portrait-young-woman-144422034.jpg" alt="Shoes" />
            </figure>
            <div className="card-body ">
                <h2 className="card-title">{firstName}</h2>
                {age && <p>Age: {age}</p>}
                {gender && <p>Gender: {gender.charAt(0).toUpperCase() + gender.slice(1)}</p>}
                {skills && <p>Skills: {Array.isArray(skills) ? skills.join(", ") : skills}</p>}
                <p>{about}</p>
                {isEdit && (
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserCard;
