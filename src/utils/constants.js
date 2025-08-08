export const backendUrl = import.meta.env.VITE_API_URL;

export const genderConst = [
    { text: "Male", value: "male" },
    { text: "Female", value: "female" },
    { text: "Other", value: "other" },
];

export const SKILLS = [
  "JavaScript", 
  "Node.js", 
  "React.js",
  "Java", 
  "Mongodb",
  "Express.js"
].map(item => ({ label: item, value: item }));
