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
    <!-- Simple display of the response image -->
    <div v-if="responseImageUrl" class="response-image">
      <p>Response Image:</p>
      <img :src="responseImageUrl" alt="Response image" class="preview" />
    </div>
  </div>
</template>
  
<script>
import { uploadImage as apiUploadImage } from "../api/api";

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
    onFileChange(e) {
      const file = e.target.files[0];
      if (file && file.type.startsWith("image/")) {
        this.selectedFile = file;
        const reader = new FileReader();
        reader.onload = (event) => {
          this.imagePreview = event.target.result;
        };
        reader.readAsDataURL(file);
        this.responseImageUrl = null;
      } else {
        alert("Please select a valid image file.");
        this.selectedFile = null;
        this.imagePreview = null;
      }
    },
    async uploadImage() {
      if (!this.selectedFile) return;
      this.isUploading = true;
      this.errorMsg = "";
      try {
        const response = await apiUploadImage(this.selectedFile);
        console.log(response);
      //   const response = {
      // "img": "http://18.144.20.162/data/final/34e663b3-e469-474a-b33b-3bf18ca5fa24.jpg",
      // "results": {
      //     "class": {
      //         "kinoko": 6,
      //         "takenoko": 5
      //     }
      //   }
      // }
        
        // Store the image URL from the response
        if (response && response.img) {
          this.responseImageUrl = response.img;
        }
        
        // Pass the actual counts to the parent component
        if (response && response.results && response.results.class) {
          const counts = {
            kinoko: response.results.class.kinoko || 0,
            takenoko: response.results.class.takenoko || 0
          };
          
          // Emit the counts to parent component (App.vue)
          this.$emit("imageUploaded", counts);
        } else {
          throw new Error("Invalid response from server.");
        }
      } catch (error) {
        console.error("Upload failed:", error);
        this.errorMsg = "Upload failed. Please try again.";
      } finally {
        this.selectedFile = null;
        this.$refs.fileInput.value = null;
        this.isUploading = false;
        this.imagePreview = null;
      }
    },
    // resetInput() {
    //   this.selectedFile = null;
    //   this.imagePreview = null;
    //   this.$refs.fileInput.value = null;
    // },
  },
};
</script>
  
<style scoped>
.image-upload {
  text-align: center;
}
.preview-container, .response-image {
  margin: 1em 0;
}
.preview {
  max-width: 100%;
  height: auto;
  border: 1px solid #ddd;
  padding: 0.5em;
}
button {
  padding: 0.5em 1em;
  cursor: pointer;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
}
.error {
  margin-top: 0.5em;
  color: red;
}
</style>
