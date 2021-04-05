<template>
  <h1>{{ header }}</h1>
  <div class="container">
    <form @submit.prevent="addTodo">
      <div class="form-group">
        <label for="to-do">What do you want to do?</label>
        <div class="d-flex justify-content-around">
          <input
            v-model="task"
            type="text"
            id="to-do"
            class="form-control"
            placeholder="Enter task"
            autofocus
          />
          <button @click.prevent="addTodo" class="btn btn-primary mx-2">
            +
          </button>
        </div>
        <small id="emailHelp" class="form-text text-muted"
          >You actually need to do it!</small
        >
      </div>
    </form>
    <div class="red">
      <ul v-for="(todo, index) in todos" :key="index">
        <li class="d-flex align-items-center mt-4">
          <input v-model="todo.done" type="checkbox" class="mx-4" />
          <input
            v-if="todo.edit"
            v-model="todo.newTask"
            @keyup.esc="todo.edit = false"
            @keyup.enter="saveTodo(todo)"
            type="text"
            id="edit-to-do"
            class="form-control mx-2"
            ref="edit"
          />
          <span
            v-else
            @mousedown.prevent
            @dblclick="editTodo(todo)"
            :class="['flex-grow-1 text-left', todo.done ? 'done' : '']"
            >{{ todo.task }}</span
          >
          <button
            v-if="!todo.edit"
            @click="deleteTodo(todo.id)"
            class="btn btn-sm btn-danger mx-2"
          >
            Delete
          </button>
          <button
            @click="todo.edit = false"
            v-else
            class="btn btn-sm btn-danger mx-2"
          >
            Cancel
          </button>
          <button
            @click="editTodo(todo)"
            v-if="!todo.edit"
            class="btn btn-sm btn-primary mx-2"
          >
            Edit
          </button>
          <button
            @click="saveTodo(todo)"
            v-else
            class="btn btn-sm btn-primary mx-2"
          >
            Save
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Todo',
  props: {
    header: {
      type: String
    }
  },
  data() {
    return {
      task: '',
      todos: [
        {
          done: false,
          task: 'buy bread',
          id: Date.now(),
          edit: false,
          newTask: ''
        }
      ]
    };
  },
  methods: {
    addTodo() {
      const todo = {
        task: this.task,
        id: Date.now(),
        done: false,
        edit: false,
        newTask: ''
      };

      this.todos.push(todo);
      this.task = '';
    },
    deleteTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
    },
    editTodo(todo) {
      this.todos.forEach(td => td.id !== todo.id && (td.edit = false));
      todo.edit = true;
      todo.newTask = todo.task;
      this.$nextTick(() => this.$refs.edit.focus());
    },
    saveTodo(todo) {
      if (!todo.newTask)
        return (this.todos = this.todos.filter(td => td.id !== todo.id));
      todo.task = todo.newTask;
      todo.done = false;
      todo.edit = false;
    }
  },
  watch: {
    todos: {
      handler(todos) {
        const todosCopy = todos.map(todo => ({ ...todo, edit: false }));

        localStorage.setItem('todos', JSON.stringify(todosCopy));
      },
      deep: true
    }
  },
  mounted() {
    const storedTodos = localStorage.getItem('todos');

    if (storedTodos) this.todos = JSON.parse(storedTodos);
  }
};
</script>

<style scoped>
.done {
  text-decoration: line-through;
}
</style>
