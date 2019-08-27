const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

router.get('/', (req, res, next) => {
    Todo.getAllTodos((err, todos) => {
        if (err) {
            res.send(err);
        }
        res.status(200).json(todos);
    });
});

router.post('/', (req, res, next) => {
    Todo.createTodo({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date
    }, (err, todo) => {
        if (err) {
            res.send(err);
        }
        res.status(201).send({id: todo['_id']});
    })
});

router.patch('/:todo_id', (req, res, next) => {
    Todo.updateTodo(req.params.todo_id, (err, todo) => {
        modifyTodo(todo, req.body);
        Todo.createTodo(todo, (err, savedTodo) => {
            if (err) {
                res.send(err);
            }
            res.status(204).send({id: savedTodo['_id']});
        })
    });
});

router.delete('/:todo_id', (req, res, next) => {
    Todo.deleteTodo(req.params.todo_id, (err) => {
        if (err) {
            res.send(err);
        }
        res.status(200).json({message: `Deleted todo with id: ${req.params.todo_id}`});
    })
});

modifyTodo = (oldTodo, reqBody) => {
    for (let i in reqBody) {
        if (reqBody[i] !== oldTodo[i]) {
            oldTodo[i] = reqBody[i];
        }
    }
}

module.exports = router;