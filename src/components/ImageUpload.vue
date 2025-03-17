<template>
  <div>
    <h2 class="h2-center">{{ $t("imageUpload.uploadTitle") }}</h2>
    <div class="image-upload">
      <label for="file-input" class="upload-button">
      {{ $t("imageUpload.chooseFile") }}
    </label>
      <input
        type="file"
        accept="image/*"
        @change="onFileChange"
        ref="fileInput"
        id="file-input"
        style="display: none;"        
      />
      <div v-if="errorMsg" class="error">{{ errorMsg }}</div>

      <!-- Response image preview -->
      <div v-if="responseImageUrl" class="response-image">
        <img
          :src="responseImageUrl"
          alt="Response image"
          class="preview"
          @click="openModal(responseImageUrl)"
        />
      </div>

      <!-- Local image preview -->
      <div v-if="imagePreview" class="preview-container">
        <img
          :src="imagePreview"
          alt="Image preview"
          class="preview"
          @click="openModal(imagePreview)"
        />
      </div>

      <button class="submit-button" @click="uploadImage" :disabled="!selectedFile || isUploading">
        {{
          isUploading
            ? $t("imageUpload.uploading")
            : $t("imageUpload.submit")
        }}
      </button>
    </div>

    <!-- Modal Overlay for enlarged image -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeModal">&times;</button>
        <img :src="modalImage" alt="Enlarged image" class="enlarged-image" />
      </div>
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
      showModal: false,
      modalImage: ""
    };
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      if (file && file.type.startsWith("image/")) {
        this.selectedFile = file;
        const reader = new FileReader();
        reader.onload = event => {
          this.imagePreview = event.target.result;
        };
        reader.readAsDataURL(file);
        this.responseImageUrl = null;
      } else {
        alert(this.$t("imageUpload.invalidImage"));
        this.selectedFile = null;
        this.imagePreview = null;
      }
    },
    async uploadImage() {
      if (!this.selectedFile) return;
      this.isUploading = true;
      this.errorMsg = "";
      try {
        // Uncomment the line below if you connect to your API:
        const response = await apiUploadImage(this.selectedFile);
        // const response = {
        //   img:
        //     "http://54.177.247.235/data/final/5acd520e-6f24-466b-ad99-f21fa77034b0.jpg",
        //   results: {
        //     class: {
        //       kinoko: 1,
        //       takenoko: 2
        //     }
        //   }
        // };

        if (response && response.img) {
          this.responseImageUrl = response.img;
        }

        if (response && response.results && response.results.class) {
          const counts = {
            kinoko: response.results.class.kinoko || 0,
            takenoko: response.results.class.takenoko || 0
          };
          this.$emit("imageUploaded", counts);
        } else {
          throw new Error("Invalid response from server.");
        }
      } catch (error) {
        console.error("Upload failed:", error);
        this.errorMsg = this.$t("imageUpload.uploadFailed");
      } finally {
        this.selectedFile = null;
        this.$refs.fileInput.value = null;
        this.isUploading = false;
        this.imagePreview = null;
      }
    },
    openModal(imageSrc) {
      this.modalImage = imageSrc;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.modalImage = "";
    }
  }
};
</script>

<style scoped>
.h2-center {
  text-align: center;
}

.image-upload {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.upload-button {
  background-color: #cccccc; /* Green */
  border: none;
  color: rgb(34, 34, 34);
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px; /* Optional: Rounded corners */
}

.submit-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
  min-width: 70px;
}

.upload-button:hover {
  background-color: #9b9b9b;
}

.submit-button:hover {
  background-color: #3e8e41;
}

/* Center the contents of both preview containers */
.preview-container,
.response-image {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

/* For the image itself, ensure it doesn’t overflow its container */
.preview {
  max-width: 100%;
  height: auto;
  max-height: 150px;
  border: 1px solid #ddd;
  padding: 0.5em;
  margin-left: -4em;
  cursor: zoom-in;
}

/* Modal overlay styling */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Modal content styling */
.modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
  background: #fff;
  padding: 1em;
  border-radius: 6px;
}

/* Enlarged image styling */
.enlarged-image {
  width: 100%;
  height: auto;
}

/* Close button styling */
.modal-close {
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  background: transparent;
  border: none;
  font-size: 2em;
  line-height: 1;
  color: #333;
  cursor: pointer;
}

/* The rest of your styles */
#file-input {
  max-width: 150px;
  width: 150px;
}
input[type="file"] {
  color: transparent;
}
input[type="file" i]::-webkit-file-upload-button {
  height: 30px;
}

.error {
  margin-top: 0.5em;
  color: red;
}
</style>
