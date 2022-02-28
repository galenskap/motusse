<script>
export default {
  props: [
      'getLetterStatus', 
      'addToCombo',
      'erase',
      'check'
  ],
  data() {
    return {
      letters: [
        [
        "A",
        "Z",
        "E",
        "R",
        "T",
        "Y",
        "U",
        "I",
        "O",
        "P",
        ],
        [
        "Q",
        "S",
        "D",
        "F",
        "G",
        "H",
        "J",
        "K",
        "L",
        "M",
        ],
        [
        "W",
        "X",
        "C",
        "V",
        "B",
        "N",
        ],
      ],
    };
  },
  methods: {
    handleKeydowns(e) {
      const allowedCaracters = this.letters.flat();
      if (e.key == "Enter") { this.check(); }
      else if (e.key == "Backspace") { e.preventDefault(); this.erase(); }
      else if (allowedCaracters.includes(e.key.toUpperCase())) {
        this.addToCombo(e.key.toUpperCase());
      }
    }
  },
  created: function () {
    window.addEventListener('keydown', this.handleKeydowns);
  },
}

</script>

<template>
    <div class="keyboard">
        <div v-for="line of letters" :key="line" class="kbline">
            <div
                v-for="letter of line"
                :key="letter"
                :class="getLetterStatus(letter) ? getLetterStatus(letter) : ''"
                class="button"
                @click="addToCombo"
            >
                {{ letter }}
            </div>
        </div>

        <div class="actions kbline">
            <div @click="erase" class="button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title"
              aria-describedby="desc" role="img" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>Supprimer</title>
                <path data-name="layer2"
                fill="none" stroke="#202020" stroke-miterlimit="10" stroke-width="2" d="M14 31.998h36"
                stroke-linejoin="round" stroke-linecap="round"></path>
                <path data-name="layer1" fill="none" stroke="#202020" stroke-miterlimit="10"
                stroke-width="2" d="M28 18L14 32l14 14" stroke-linejoin="round" stroke-linecap="round"></path>
              </svg>
            </div>
            <div @click="check" class="button">OK</div>
        </div>
    </div>
</template>

<style scoped>
.button.green {
  background-color: var(--right);
}
.button.orange {
  background-color: var(--halfright);
}
.button.grey {
  background-color: var(--wrong);
}
.button svg {
  width: 1.2rem;
}

.kbline {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.keyboard .button {
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  line-height: 2.75rem;
}
.button {
  margin: 0.1rem;
  padding: 0.1rem;
  background: var(--enabled);
  text-align: center;
  cursor: pointer;
  border: 1px solid var(--color-border);
}
.actions {
  margin: 0.1rem;
  display: flex;
  justify-content: center;
}
.actions .button {
  min-width: 4.5rem;
}
.actions .button:first-child {
  line-height: 3.2rem;
}

@media screen and (max-width: 600px) {
  .keyboard {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding-bottom: 0.5rem;
  }
  .keyboard .button {
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    margin: .05rem;
  }
  .actions .button:first-child {
    line-height: 2.2rem;
  }
}
</style>