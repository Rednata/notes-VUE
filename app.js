const App = {
  data() {
    return {
      title: "Notes",
      input: {
        value: "",
        placeholder: "Type ur note",
      },
      notes: [
        {note: "task 1", isEdit: false, id: 1},
        {note: "task 2", isEdit: false, id: 2},
        {note: "task 3", isEdit: false, id: 3}
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
      this.notes.push(this.input.value);

      // reset
      this.input.value = "";
    },
    remove(index) {
      console.log(`note: ${index} has been removed`);
      this.notes.splice(index, 1);
    },
  },
};

Vue.createApp(App).mount("#app");