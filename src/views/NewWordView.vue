<script>
import DicFr from "../assets/dic_fr.json";
import { RouterLink } from "vue-router";

export default {
  data() {
    return {
      word: "",
      errorLength: false,
      errorDic: false,
      sharingCode: false,
    };
  },
  methods: {
    send() {
      // remove special caracters from string
      this.word = this.cleanInput();

      // check length
      if (this.word.length < 3) {
        this.errorLength = true;
        return;
      }

      // check if word exists in French dictionnary
      if (!DicFr.includes(this.word.toLowerCase())) {
        this.errorDic = true;
        return;
      }

      // generate sharing URL
      this.sharingCode = this.encrypt();
    },

    encrypt() {
      const encodedWord = encodeURI(btoa(this.word));
      return encodedWord;
    },

    cleanInput() {
      // https://ricardometring.com/javascript-replace-special-characters
      const parsed = this.word.normalize('NFD').replace(/([\u0300-\u036f]|[^a-zA-Z])/g, '');
      return parsed;
    },

    handleInput(e) {
      if (e.key == "Enter") { this.send(); return; }
      // hide errors in any case
      this.errorLength = false;
      this.errorDic = false;
    },

    // todo :
    // 3. copy/share button after "share link" display?
  }
}
</script>

<template>
  <label for="word">Mot à faire deviner :</label>
  <div class="form">
    <input v-model="word" name="word" type="text" @keyup="handleInput" />
    <div @click="send" class="button">OK</div>
  </div>
  <div class="errors">
    <div class="error length" :class="errorLength? 'shown' : 'hidden'">Le mot est trop court !</div>
    <div class="error dic" :class="errorDic? 'shown' : 'hidden'">Le mot n'est pas dans notre dictionnaire !</div>
  </div>
  <div class="success">
    <div class="" :class="sharingCode? 'shown' : 'hidden'">
      <span class="text">Le lien à partager est : </span>
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
  font-size: 1.4rem;
}
.button {
  margin: 0.1rem;
  padding: 0.1rem;
  background: var(--enabled);
  text-align: center;
  cursor: pointer;
  border: 1px solid var(--color-border);
  min-width: 4.5rem;
}
@media screen and (max-width: 600px) {
  .form input {
    font-size: 1rem;
  }
}
</style>
