const express = require("express");
const { Todo } = require("../mongo");
const router = express.Router();
/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });
  res.send(todo);
});

const singleRouter = express.Router({ mergeParams: true });

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  try {
    req.todo = await Todo.findById(id);
  } catch {
    if (!req.todo) return res.sendStatus(404);
    console.log("error");
  }

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  try {
    res.json(req.todo);
  } catch {
    if (!todo) return res.sendStatus(404);
    console.log("error");
  }
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  console.log(req.todo.text, req.body.text);
  try {
    await Todo.findOneAndUpdate(
      req.todo.text,
      req.body,
      { new: true },
      function (err, task) {
        if (err) res.send(err);
        res.json(task);
      }
    );
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
