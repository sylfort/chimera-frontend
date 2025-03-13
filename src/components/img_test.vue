<template>
    <div class="image-upload">
      <h2>Upload an Image</h2>
      <input
        type="file"
        accept="image/*"
        @change="onFileChange"
        ref="fileInput"
      />
      <div v-if="imagePreview" class="preview-container">
        <p>Preview:</p>
        <img :src="imagePreview" alt="Image preview" class="preview" />
      </div>
      <button @click="uploadImage" :disabled="!selectedFile || isUploading">
        {{ isUploading ? "Uploading..." : "Submit" }}
      </button>
      <div v-if="errorMsg" class="error">{{ errorMsg }}</div>
    </div>
    <!-- Simple display of the response image -->
    <div v-if="responseImageUrl" class="response-image">
      <p>Response Image:</p>
      <img :src="responseImageUrl" alt="Response image" class="preview" />
    </div>
  </template>
    
    <script>
  // import { uploadImage as apiUploadImage } from "../api/api";
  
  export default {
    name: "ImageUpload",
    emits: ["imageUploaded"],
    data() {
      return {
        selectedFile: null,
        imagePreview: null,
        isUploading: false,
        errorMsg: "",
      };
    },
    methods: {
      /**
       * When the user selects a file, validates that it is an image and sets a preview.
       * @param {Event} e - The file input change event.
       */
      onFileChange(e) {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
          this.selectedFile = file;
          const reader = new FileReader();
          reader.onload = (event) => {
            this.imagePreview = event.target.result;
          };
          reader.readAsDataURL(file);
        } else {
          alert("Please select a valid image file.");
          this.selectedFile = null;
          this.imagePreview = null;
        }
      },
      /**
       * Uploads the selected file to the Flask backend.
       * The API call sends the file along with a flag (`save_txt`) so that
       * the backend returns a JSON response with classification details.
       */
       async uploadImage() {
    if (!this.selectedFile) return;
    this.isUploading = true;
    this.errorMsg = "";
    try {
      // const response = await apiUploadImage(this.selectedFile);
      const response = {
      "img": "http://18.144.20.162/data/final/34e663b3-e469-474a-b33b-3bf18ca5fa24.jpg",
      "results": {
          "class": {
              "kinoko": 6,
              "takenoko": 5
          }
      }
  }
      console.log(response);
      
      // Parse the backend response
      if (response && response.results && response.results.class) {
        const kinokoScore = response.results.class.kinoko || 0;
        const takenokoScore = response.results.class.takenoko || 0;
        
        // Determine which class has the higher score
        const classification = kinokoScore > takenokoScore ? "kinoko" : "takenoko";
        
        // Emit the classification to parent component (App.vue)
        this.$emit("imageUploaded", classification);
      } else {
        throw new Error("Invalid response from server.");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      this.errorMsg = "Upload failed. Please try again.";
    } finally {
      this.resetInput();
      this.isUploading = false;
    }
  },
      /**
       * Resets the file input and preview.
       */
      resetInput() {
        this.selectedFile = null;
        this.imagePreview = null;
        this.$refs.fileInput.value = null;
      },
    },
  };
  </script>
    
  
  <style scoped>
  .image-upload {
    text-align: center;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .preview-container, .response-image {
    margin: 1.5em 0;
  }
  
  .preview {
    max-width: 100%;
    height: auto;
    border: 3px solid #dad7f8;
    border-radius: 10px;
    padding: 0.5em;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }
  
  .preview:hover {
    transform: scale(1.02);
  }
  
  button {
    padding: 0.7em 1.5em;
    cursor: pointer;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 25px;
    font-size: 1.1em;
    font-weight: 600;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  button:disabled {
    background-color: #08311e;
    cursor: not-allowed;
  }
  
  .error {
    margin-top: 0.5em;
    color: #dc3545;
    font-weight: 600;
  }
  
  h2 {
    color: #009952;
    margin-bottom: 1em;
  }
  </style>
  
    
    