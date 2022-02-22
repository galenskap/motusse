<script>
import DicFr from "../assets/dic_fr.json";
import Keyboard from "@/components/Keyboard.vue";

export default {
  components: {
    Keyboard,
  },
  data() {
    return {
      disabledLetters: [],
      greenLetters: [],
      orangeLetters: [],
      comboToGuess: this.defineComboToGuess(), 
      guesses: [],
      currentCombo: [],
      errorLength: false,
      errorDic: false,
      tries: 0,
      found: false,
    };
  },
  methods: {
    defineComboToGuess() {
      let decodedURI = decodeURI(this.$route.params.secret);
      let decrypted = atob(decodedURI).toUpperCase();
      let splitted = decrypted.split("");
      /* console.log("splitted");
      console.log(splitted); */
      return splitted;
    },

    addToCombo(e) {
      // if the word has already been found, disable the functionnality
      if (this.found) return;
      if (this.currentCombo.length < this.comboToGuess.length) {
        this.currentCombo.push(e.originalTarget.textContent);
        this.errorLength = false;
      }
    },

    check() {
      // check length
      if (this.currentCombo.length != this.comboToGuess.length) {
        this.errorLength = true;
        return;
      }
      // check if word exists in French dictionnary
      if (DicFr.includes(this.currentCombo.join("").toLowerCase())) {
        this.match();
        this.currentCombo = [];
      } else {
        // display error
        this.errorDic = true;
      }
    },

    erase() {
      this.currentCombo.pop();
      this.errorDic = false;
    },

    match() {
      let retour = [];
      let manipulableComboToGuess = [...this.comboToGuess];
      this.tries++;

      this.currentCombo.forEach((value, index) => {
        // check greens
        if (value == manipulableComboToGuess[index]) {
          retour[index] = {
            letter: value,
            color: "green",
          };
          manipulableComboToGuess[index] = "0"; // remove from following matches
        }
        // others = grey
        else {
          retour[index] = {
            letter: value,
            color: "grey",
          };
        }
      });

      this.currentCombo.forEach((value, index) => {
        // check oranges
        if (manipulableComboToGuess.includes(value)) {
          retour[index] = {
            letter: value,
            color: "orange",
          };
          let needleIndex = manipulableComboToGuess.indexOf(value);
          manipulableComboToGuess[needleIndex] = "0"; // remove from following matches
        }
      });
      this.guesses.push(retour);
      this.disableLetters(retour);

      if (this.checkVictory()) {
        return;
      }
    },

    checkVictory() {
      if(JSON.stringify(this.currentCombo) === JSON.stringify(this.comboToGuess)) {
        this.found = true;
        alert("Bravo ! Vous avez trouvé en "+this.tries+" essais !");
        return true;
      } else {
        // debug only
        //console.log(JSON.stringify(this.currentCombo), " et ", JSON.stringify(this.comboToGuess), " sont différents");
        return false;
      }
    },

    disableLetters(hint) {
      hint.forEach((value, index) => {
        if (value.color == "green") {
          this.greenLetters.push(value.letter);
        } else if (value.color == "orange") {
          this.orangeLetters.push(value.letter);
        } else if (value.color == "grey") {
          this.disabledLetters.push(value.letter);
        }
      });
    },

    getLetterStatus(letter) {
      if (this.greenLetters.includes(letter))
        return "green";
      else if (this.orangeLetters.includes(letter))
        return "orange";
      else if (this.disabledLetters.includes(letter))
        return "grey";
      return false;
    }
  },
};
</script>

<template>
  <div class="guesses">
    <div v-for="hints of guesses" :key="hints" class="line">
      <p v-for="hint of hints" :key="hint" :class="hint.color" class="hint">
        <span>{{ hint.letter }}</span>
      </p>
    </div>
    <div class="line">
      <p v-for="num of comboToGuess.length" :key="num" class="hint lightgrey">
        {{ currentCombo[num - 1] }}
      </p>
    </div>
    <div class="error length" :class="errorLength? 'shown' : 'hidden'">Le mot est trop court !</div>
    <div class="error length" :class="errorDic? 'shown' : 'hidden'">Le mot n'est pas dans notre dictionnaire !</div>
  </div>

  <Keyboard
    :getLetterStatus="this.getLetterStatus"  
    :addToCombo="this.addToCombo" 
    :erase="this.erase" 
    :check="this.check" 
  ></Keyboard>
  
</template>

<style scoped>
.guesses {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-bottom: 1rem;
}
.guesses .line {
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: stretch;
  flex-wrap: nowrap;
}
.hint {
  width: 1.75rem;
  height: 1.75rem;
  margin: 0.1rem;
  border: 1px solid #444;
}
.hint span {
  vertical-align: middle;
}
.green {
  background-color: #5ab51c;
}
.orange {
  background-color: orange;
}
.grey {
  background-color: #cacaca;
}
.lightgrey {
  background: #f7f7f7;
}
</style>
