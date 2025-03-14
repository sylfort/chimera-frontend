<template>
  <div>
    <h2 class="h2-center">Upload an Image</h2>
    <div class="image-upload">
      <input
        type="file"
        accept="image/*"
        @change="onFileChange"
        ref="fileInput"
        id="file-input"
      />
      <div v-if="errorMsg" class="error">{{ errorMsg }}</div>
      <!-- Display the API response image -->
      <div v-if="responseImageUrl" class="response-image">
        <p>Response Image:</p>
        <img :src="responseImageUrl" alt="Response image" class="preview" />
      </div>
      <div v-if="imagePreview" class="preview-container">
        <img :src="imagePreview" alt="Image preview" class="preview" />
      </div>
      <button @click="uploadImage" :disabled="!selectedFile || isUploading">
        {{ isUploading ? "Uploading..." : "Submit" }}
      </button>
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
      responseImageUrl: null,
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
        // Uncomment the line below to use the actual API
        const response = await apiUploadImage(this.selectedFile);
        // const response = {
        //   img:
        //     "http://54.177.247.235/data/final/5acd520e-6f24-466b-ad99-f21fa77034b0.jpg",
        //   results: {
        //     class: {
        //       kinoko: 8,
        //       takenoko: 9,
        //     },
        //   },
        // };

        if (response && response.img) {
          this.responseImageUrl = response.img;
        }

        if (response && response.results && response.results.class) {
          const counts = {
            kinoko: response.results.class.kinoko || 0,
            takenoko: response.results.class.takenoko || 0,
          };
          // Emit the counts to the parent component
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
  },
};
</script>

<style scoped>
.h2-center {
  text-align: center;
}
.image-upload {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.preview-container,
.response-image {
  /* Additional styling if needed */
}

.preview {
  max-width: auto;
  height: 150px;
  border: 1px solid #ddd;
  padding: 0.5em;
}

#file-input {
  max-width: 100px;
  width: 100px;
}

input[type="file"] {
  color: transparent;
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
