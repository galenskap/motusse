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
    </div>

    <div class="actions">
        <div @click="erase" class="button">&#129044;</div>
        <div @click="check" class="button">OK</div>
    </div>
</template>

<style scoped>
.button.green {
  background-color: #5ab51c;
}
.button.orange {
  background-color: orange;
}
.button.grey {
  background-color: #cacaca;
}

.kbline {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
.keyboard .button {
  width: 2rem;
}
.button {
  margin: 0.1rem;
  padding: 0.1rem;
  background: #f7f7f7;
  text-align: center;
  cursor: pointer;
  border: 1px solid #eee;
}
.actions {
  margin: 0.1rem;
  display: flex;
  justify-content: space-evenly;
}
.actions .button {
  min-width: 4.5rem;
}
</style>