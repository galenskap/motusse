<script>
import DicFr from "../assets/dic_fr.json";
import { RouterLink } from "vue-router";

export default {
  data() {
    return {
      //secretUrl: this.encrypt(),
      word: "",
      errorLength: false,
      errorDic: false,
      sharingCode: false,
    };
  },
  methods: {
    send() {
      // cleans the input
      let cleanedWord = this.word; // todo

      // check length
      if (cleanedWord.length < 3) {
        this.errorLength = true;
        return;
      }

      // check if word exists in French dictionnary
      if (!DicFr.includes(cleanedWord.toLowerCase())) {
        this.errorDic = true;
        return;
      }

      // generate sharing URL
      this.sharingCode = this.encrypt(cleanedWord);
    },

    encrypt(cleanedWord) {
      //let cleanedWord = 'compote';
      let encodedWord = encodeURI(btoa(cleanedWord));
      return encodedWord;
    },

    // todo :
    // 1. send with enter key
    // 2. hide errors when (re-)typing
    // 3. copy/share button after "share link" display?
  }
}
</script>

<template>
  <label for="word">Mot à trouver :</label>
  <div class="form">
    <input v-model="word" name="word" type="text" />
    <div @click="send" class="button">OK</div>
  </div>
  <div class="errors">
    <div class="error length" :class="errorLength? 'shown' : 'hidden'">Le mot est trop court !</div>
    <div class="error dic" :class="errorDic? 'shown' : 'hidden'">Le mot n'est pas dans notre dictionnaire !</div>
  </div>
  <div class="success">
    <div class="" :class="sharingCode? 'shown' : 'hidden'">
      <span class="text">Sharing link is : </span>
      <RouterLink :to="{name: 'word', params: {secret: sharingCode}}">{{ sharingCode }}</RouterLink>
      </div>
  </div>
</template>

<style scoped>
label {
  margin: 1rem 0 .5rem 0;
  display: inline-block;
}
.form {
  display: flex;
  justify-content: space-between;
}
.form input {
  width: 100%;
  margin: 0 1rem 0 0;
}
.button {
  margin: 0.1rem;
  padding: 0.1rem;
  background: #f7f7f7;
  text-align: center;
  cursor: pointer;
  border: 1px solid #eee;
  min-width: 4.5rem;
}
</style>
