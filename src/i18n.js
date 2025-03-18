// src/i18n.js
import { createI18n } from "vue-i18n";

const messages = {
  en: {
    app: {
      title:
        "<span class='kinoko'>Kinoko</span> Vs <span class='takenoko'>Takenoko</span>",
      subtitle: "Leaderboard",
      description1:
        "Upload an image of either <b>Kinoko no Yama</b> or <b>Takenoko no Sato</b>",
      description2: "Let's see which sweet is the most beloved!",
      toggleLang: "日本語", // Button text: switch to Japanese
    },
    leaderboard: {
      title: "Leaderboard(total scanned n°)",
      kinoko: "Kinoko",
      takenoko: "Takenoko",
    },
    imageUpload: {
      uploadTitle: "Upload an Image",
      responseImage: "Response Image:",
      submit: "Submit",
      uploading: "Uploading...",
      invalidImage: "Please select a valid image file.",
      uploadFailed: "Upload failed. Please try again.",
      chooseFile: "Choose File",
    },
  },
  ja: {
    app: {
      title:
        "<span class='kinoko'>キノコ</span> Vs <span class='takenoko'>タケノコ</span>",
      subtitle: "リーダーボード",
      description1:
        "<b>きのこの山</b>または<b>たけのこの里</b>の画像をアップロードしてください",
      description2: "どちらのお菓子が一番人気か見てみましょう！",
      toggleLang: "English", // Button text: switch to English
    },
    leaderboard: {
      title: "スコア | スキャンされた合計数",
      kinoko: "きのこの山",
      takenoko: "たけのこの里",
    },
    imageUpload: {
      uploadTitle: "画像をアップロード",
      responseImage: "レスポンス画像:",
      submit: "送信",
      uploading: "アップロード中...",
      invalidImage: "有効な画像ファイルを選択してください。",
      uploadFailed: "アップロードに失敗しました。再度お試しください。",
      chooseFile: "画像を選択",
    },
  },
};

const i18n = createI18n({
  legacy: false, // use Composition API mode if you wish
  locale: "en",
  fallbackLocale: "en",
  messages,
});

export default i18n;
