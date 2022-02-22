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

        <div class="actions">
            <div @click="erase" class="button">&#129044;</div>
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
    bottom: .5em;
  }
  .keyboard .button {
    width: 1.8rem;
    height: 1.8rem;
    line-height: 2rem;
    margin: .05rem;
  }
  .actions .button:first-child {
    line-height: 2.2rem;
  }
}
</style>