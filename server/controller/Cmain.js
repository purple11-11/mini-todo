const { Todo } = require("../models");

exports.getIndex = (req, res) => {
  res.send("response from api server [GET /api-server]");
};

exports.getUser = (req, res) => {
  res.send("response from api server [GET /api-server/user");
};

// GET /api-server/todos
exports.getTodos = async (req, res) => {
  try {
    const todoAll = await Todo.findAll(); //[{id, text, done}]
    console.log("sever todoAll ::", todoAll);
    res.json(todoAll);
  } catch (err) {
    console.log("server err!", err);
    res.status(500).send("SERVER ERROR!!, 관리자에게 문의하세요");
  }
};

// POST /api-server/todo
exports.postTodo = async (req, res) => {
  /* {
    id: 모델 정의시 auto_increment 속성 추가해두었음(x)
    text: 할일(o)
    done: 모델 정의시 false(0)를 defaultValue 처리해두었음(x)
  } */
  try {
    // req.body={text:'~~~~'}
    const { text } = req.body;
    await Todo.create({
      text,
    });
    res.send({ isSuccess: true });
  } catch (err) {
    console.log("server err!", err);
    res.status(500).send("SERVER ERROR!!, 관리자에게 문의하세요");
  }
};

// PATCH /api-server/todo/:todoId
exports.patchTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const todo = await Todo.findOne({ where: { id: todoId } });

    if (!todo) return res.status(400).json({ msg: "Todo not found" });

    await todo.update({ done: !todo.done });

    res.json({ msg: "todo updated", todo });
  } catch (error) {
    console.log("server err!", err);
    res.status(500).send("SERVER ERROR!!, 관리자에게 문의하세요");
  }
};

// DELETE /api-server/todo/:todoId
exports.deleteTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    await Todo.destroy({ where: { id: todoId } });
    res.send("deleted todo");
  } catch (error) {
    console.log("server err!", err);
    res.status(500).send("SERVER ERROR!!, 관리자에게 문의하세요");
  }
};
