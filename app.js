const App = {
  data() {
    return {
      title: "Notes",
      input: {
        value: "",
        placeholder: "Type ur note",
      },
      notes: [
        {text: "task 1", isEdit: false, id: 1},
        {text: "task 2", isEdit: false, id: 2},
        {text: "task 3", isEdit: false, id: 3}
      ]
    };
  },
  mounted() {
    this.getNotes();
  },
  watch: {
    notes: {
      handler(updatedList) {
        localStorage.setItem("notes", JSON.stringify(updatedList));
      },
      deep: true,
    },
  },
  methods: {
    getNotes() {
      const localNotes = localStorage.getItem("notes");
      if (localNotes) {
        this.notes = JSON.parse(localNotes);
      }
    },
    onSubmit() {
      const inputNote = {text: this.input.value, isEdit: false, id: this.setId()}
      this.notes.push(inputNote);
      this.input.value = "";
    },
    remove(index) {
      this.notes.splice(index, 1);
    },
    changeEditMode (index) {
      const currentNote = this.notes[index];
      const currentIsEdit = currentNote.isEdit;
      currentNote.isEdit = !currentIsEdit;
    },
    handleChangeInput (index, text) {
      const currentNote = this.notes[index];
      currentNote.text = text;
      this.changeEditMode (index);
    },
    setId () {
      return String(Math.random()).substring(2, 8);
    }
  }
};

Vue.createApp(App).mount("#app");