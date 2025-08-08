import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import { genderConst } from "../utils/constants";
import { addUser } from "../store/authSlice";
import axios from "axios";
import { backendUrl } from "../utils/constants";
import { ToastContainer, toast } from "react-toastify";
import { useGetUserProfile } from "../hook/useGetUserProfile";
import CreatableSelect from "react-select/creatable";
import { SKILLS } from "../utils/constants";

function areFieldsEqual(obj1, obj2, keys) {
    return keys.every((key) => {
        const val1 = obj1[key];
        const val2 = obj2[key];

        if (Array.isArray(val1) && Array.isArray(val2)) {
            return val1.length === val2.length && val1.every((item, index) => item === val2[index]);
        }
        return val1 === val2;
    });
}

const EditProfile = () => {
    const user = useSelector((store) => store.auth);
    const [errorMessage, setErrorMessage] = useState("");
    const [profileFetch, setProfileFetch] = useState(false);

    useGetUserProfile(profileFetch);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // compare is there any new changes or not

        if (typeof formData.skills == "string" && formData.skills != "") {
            formData.skills = formData?.skills?.split(/[\s,]+/).filter(Boolean);
        }

        const dataToCompare = ["firstName", "lastName", "age", "gender", "photoUrl", "skills", "about"];
        if (areFieldsEqual(user, formData, dataToCompare)) {
            return toast.info("No changes made..");
        }
        try {
            const filterFormData = Object.fromEntries(
                Object.entries(formData).filter(([_, value]) => {
                    if (Array.isArray(value)) return value.length > 0; // keep non-empty arrays
                    if (typeof value === "string") return value.trim() !== ""; // keep non-empty, non-whitespace strings
                    return value !== null && value !== undefined; // keep valid values
                })
            );
            const res = await axios.patch(backendUrl + "/profile/edit", filterFormData, { withCredentials: true });
            setProfileFetch(true);
            toast.success("Great!! Your profile Data Updated..");
        } catch (error) {
            console.log(error);
            setErrorMessage(error?.response?.data);
        }
    };

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        age: "",
        gender: "",
        photoUrl: "",
        skills: [],
        about: "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                age: user.age || "",
                gender: user.gender || "",
                photoUrl: user.photoUrl || "",
                skills: (user.skills || []).map((item) => ({ label: item, value: item })),
                about: user.about || "",
            });
        }
    }, [user]);

    return (
        <div className="flex justify-evenly mt-10">
            <ToastContainer />
            <div className="card card-dash bg-base-300 w-96">
                <div className="card-body">
                    <h2 className="card-title m-auto text-2xl text-pink-700">Edit Profile</h2>
                    <form onSubmit={handleSubmit}>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-sm">First Name</legend>
                            <input type="text" className="input w-full" placeholder="First Name" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-sm">Last Name</legend>
                            <input type="text" className="input w-full" placeholder="Last Name" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-sm">Age</legend>
                            <input type="Number" className="input w-full" placeholder="Age" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-sm">Gender</legend>
                            <select
                                value={formData.gender}
                                className="select w-full"
                                onChange={(e) => {
                                    setFormData({ ...formData, gender: e.target.value });
                                }}
                            >
                                <option value=""> Select Gender </option>
                                {genderConst.map((gender) => (
                                    <option key={gender.value} value={gender.value}>
                                        {gender.text}
                                    </option>
                                ))}
                            </select>
                        </fieldset>
                     
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-sm">Skills</legend>
                            <CreatableSelect classNamePrefix="custom-select" isMulti options={SKILLS} value={formData.skills} onChange={(selectedOptions) => setFormData({ ...formData, skills: selectedOptions })} />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-sm">Profile Photo URL</legend>
                            <input type="text" className="input w-full" placeholder="Photo URL" value={formData.photoUrl} onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })} />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-sm">About</legend>
                            <textarea className="input w-full py-2 h-20" name="description" placeholder="Describe yourself here..." value={formData.about} onChange={(e) => setFormData({ ...formData, about: e.target.value })} />
                        </fieldset>

                        <div className="mt-2">{errorMessage && <span className="text-red-500 font-bold">{errorMessage}</span>}</div>
                        <div className="card-actions justify-center mt-5">
                            <button className="btn btn-secondary w-full hover:bg-base-300">Save Profile</button>
                        </div>
                    </form>
                </div>
            </div>
            <div>
                <UserCard user={{ ...formData, skills: formData.skills.map(skill => skill.value) }} isEdit={false} />
            </div>
        </div>
    );
};

export default EditProfile;
