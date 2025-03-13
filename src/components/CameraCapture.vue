<!-- src/components/CameraCapture.vue -->
<template>
  <div>
    <!-- Camera Capture (optional, but kept for flexibility) -->
    <button @click="startCamera">Start Camera</button>
    <video ref="videoElement" autoplay></video>
    <canvas ref="canvasElement" style="display: none"></canvas>
    <button @click="captureImage" :disabled="!stream">
      Capture from Camera
    </button>

    <!-- File Upload -->
    <input
      type="file"
      id="fileInput"
      accept="image/*"
      @change="handleFileUpload"
    />
    <label for="fileInput">Upload Image</label>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      stream: null, // To store the camera stream
    };
  },
  methods: {
    async captureImage() {
      const video = this.$refs.videoElement;
      const canvas = this.$refs.canvasElement;
      const context = canvas.getContext("2d");

      // Set canvas dimensions to match video dimensions
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw the current video frame onto the canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Get the image data as a base64-encoded string
      const imageData = canvas.toDataURL("image/png");

      // Emit the captured image data to the parent component
      this.$emit("capture", imageData);
    },
    async startCamera() {
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        this.$refs.videoElement.srcObject = this.stream;
      } catch (error) {
        console.error("Error accessing the camera:", error);
        // Handle the error appropriately, e.g., display an error message to the user
        alert("Error accessing camera: " + error.message);
      }
    },
    stopCamera() {
      if (this.stream) {
        this.stream.getTracks().forEach((track) => track.stop());
        this.stream = null; // Clear the stream
      }
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) {
        return; // No file selected
      }

      // Check if the file is an image
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file.");
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        // e.target.result contains the base64-encoded image data
        this.$emit("capture", e.target.result);
      };

      reader.onerror = (error) => {
        console.error("Error reading file:", error);
        alert("Error reading file: " + error.message);
      };

      reader.readAsDataURL(file); // Read the file as a data URL (base64)
    },
  },
  mounted() {
    // Removed Camera Start from here. Let user decide to start it or not.
  },
  beforeUnmount() {
    // Stop the camera stream when the component is unmounted
    this.stopCamera();
  },
};
</script>
  
  <style scoped>
/* Add component-specific styles here, if needed */
/*  Example to style the label as a button */
label[for="fileInput"] {
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: inline-block; /* Important for consistent styling */
  margin-top: 10px; /* Add some spacing */
}

label[for="fileInput"]:hover {
  background-color: #3e8e41;
}

/* Hide the default file input */
input[type="file"] {
  display: none;
}
</style>