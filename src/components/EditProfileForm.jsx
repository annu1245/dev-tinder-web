import React, {useEffect} from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
let count = 0;
const EditProfileForm = () => {

  const { register, handleSubmit, watch, formState: {errors} } = useForm({
    defaultValues: {
      firstName: "abc"
    }
  });
  let formData = {};

  const onSubmit = (data) => console.log(data)
  useEffect(() => {
    const subscription = watch((data) => {
      formData = data;
      console.log(data);
    })
    return () => {
      subscription.unsubscribe();
    }
  }, [watch])

    const colourOptions = [
        { value: "chocolate", label: "Chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" },
    ];
    count++;
    console.log(count);
    return (
        <div className="flex justify-center my-10">
            <div className="card card-dash bg-base-300 w-96">
                <div className="card-body">
                    <h2 className="card-title m-auto text-xl">Card Title</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">What is your name?</legend>
                            <input type="text" className="input" placeholder="Type here" {...register('firstName')}/>
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">What is your name?</legend>
                            <input type="text" className="input" placeholder="Type here" {...register('lastName')} />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Browsers</legend>
                            <select defaultValue="Pick a browser" className="select">
                                <option disabled={true}>Pick a browser</option>
                                <option>Chrome</option>
                                <option>FireFox</option>
                                <option>Safari</option>
                            </select>
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Your bio</legend>
                            <CreatableSelect classNamePrefix="custom-select"  isMulti options={colourOptions} />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Your bio</legend>
                            <textarea className="textarea h-24" placeholder="Bio"></textarea>
                        </fieldset>
                    </form>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfileForm;
