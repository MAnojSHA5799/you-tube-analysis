import axios from "axios";

export const analyzeKeyword = async (query) => {
  const res = await axios.get(
    `http://localhost:8000/analyze?query=${query}`
  );
  return res.data;
};
