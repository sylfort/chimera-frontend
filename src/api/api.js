import axios from "axios";

// Use a relative URL since the frontend is served by the Flask app
const BASE_URL = process.env.VUE_APP_API_BASE_URL || "http://localhost";

// export const uploadImage = async (file) => {
//   // Create form data and append file and parameters.
//   const formData = new FormData();
//   formData.append("myfile", file);
//   formData.append("save_txt", "T"); // Optional, matches your Vue.js behavior

//   try {
//     const response = await axios.post(`${BASE_URL}`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     return response.data;
//   } catch (error) {
//     if (error.response) {
//       // Server responded with a status other than 200 range
//       console.error("Error response:", error.response.data);
//     } else if (error.request) {
//       // Request was made but no response received
//       console.error("Error request:", error.request);
//     } else {
//       // Something else happened while setting up the request
//       console.error("Error message:", error.message);
//     }
//     throw error;
//   }
// };
export const uploadImage = async (file) => {
  // Create form data and append file and parameters.
  const formData = new FormData();
  formData.append("myfile", file);
  formData.append("save_txt", "T"); // Optional, matches your Vue.js behavior

  try {
    const response = await axios.post(`${BASE_URL}/predict`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 200 range
      console.error("Error response:", error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error("Error request:", error.request);
    } else {
      // Something else happened while setting up the request
      console.error("Error message:", error.message);
    }
    throw error;
  }
};
