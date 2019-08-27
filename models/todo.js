const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date
});

const Todo = module.exports = mongoose.model('Todo', todoSchema);

module.exports.getAllTodos = (callback) => {
    Todo.find(callback);
}

module.exports.createTodo = (todo, callback) => {
    Todo.create(todo, callback);
}

module.exports.updateTodo = (id, callback) => {
    Todo.findById(id, callback);
}

module.exports.deleteTodo = (id, callback) => {
    Todo.remove({_id: id}, callback);
}