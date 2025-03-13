// // src/services/api.js
// const API_BASE_URL = "http://localhost:5000"; // Your Flask server's address

// export async function sendImageToBackend(imageData) {
//   try {
//     const response = await fetch(`${API_BASE_URL}/predict`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: `image=${encodeURIComponent(imageData)}`,
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.error || "Failed to process image");
//     }

//     return await response.json(); // Return the detection results
//   } catch (error) {
//     console.error("Error sending image to backend:", error);
//     throw error; // Re-throw the error so the calling component can handle it
//   }
// }

// export async function fetchStats() {
//   try {
//     const response = await fetch(`${API_BASE_URL}/stats`);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("Could not fetch stats:", error);
//     throw error; // Re-throw for consistent error handling
//   }
// }
