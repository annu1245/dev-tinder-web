import React, {useState} from "react";
import CreatableSelect from 'react-select/creatable';

const Test = () => {
  const [selectedOption, setSelectedOption] = useState(null);

    const options = [
        { value: "chocolate", label: "Chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" },
    ];

    const handleChange = (val) => {
      console.log(val);
    }
    return <div><CreatableSelect isMulti options={options} onChange={handleChange} /></div>;
};

export default Test;

 const optionArr = [
      "JavaScript", "java"
    ]

optionArr.map(item => ({ value: item, label: item }))
