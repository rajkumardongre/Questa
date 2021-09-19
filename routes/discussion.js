const express = require("express");
const discussion = require("../models/discussion");
const Discussion = require("../models/discussion");

const router = express.Router();

// Render New Discussion form
router.get("/new", (req, res) => {
  res.render("discussion/new", {
    discussion: new Discussion(),
    errorMessage: "",
  });
});

router.get("/edit/:id", async (req, res) => {
  res.render("discussion/edit", {
    discussion: await Discussion.findById(req.params.id),
    errorMessage: "",
  });
});

router.get("/delete/:id", async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    res.render("discussion/delete", { discussion, errorMessage: "" });
  } catch (e) {
    res.redirect("/");
  }
});
router.post("/new", async (req, res) => {
  const discussion = req.body;
  if (discussion.re_password === discussion.password) {
    let discussionDocument = new Discussion({
      title: discussion.title,
      description: discussion.description,
      owner: discussion.owner,
      // suggestions: discussion.suggestions,
      password: discussion.password,
    });
    try {
      discussionDocument = await discussionDocument.save();
      res.redirect(`/discussion/${discussionDocument._id}`);
    } catch (e) {
      res.render("./discussion/new", {
        discussion: discussion,
        errorMessage: "* Something went wrong!!!",
      });
    }
  } else {
    res.render("./discussion/new", {
      discussion: discussion,
      errorMessage: "* Re-Enter your Password!!!",
    });
  }
});

// Discussion ID
// Getting Single Discussion
router.get("/:id", async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    // console.log(discussion.description);
    res.render("discussion/withID", { discussion });
  } catch (e) {
    res.send("Error");
  }
});
// Update the discussion
router.patch("/:id", async (req, res) => {
  const updatedDiscussion = await Discussion.findById(req.params.id);
  if (updatedDiscussion.password === req.body.password) {
    try {
      const discussion = await Discussion.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      res.render("discussion/withID", { discussion, errorMessage: "" });
    } catch (e) {
      res.render("discussion/withID", {
        disscusion: new Discussion(),
        errorMessage: "Something went wrong!!!",
      });
    }
  } else {
    res.render("discussion/edit", {
      discussion: updatedDiscussion,
      errorMessage: "Invalid Password",
    });
  }
});

// Delete the discussion
router.delete("/:id", async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    if (discussion.password === req.body.password) {
      await Discussion.findByIdAndDelete(req.params.id);
      res.redirect("/");
    } else {
      res.render("discussion/delete", {
        discussion,
        errorMessage: "Invalid Password",
      });
    }
  } catch (e) {
    res.send("Error");
    // res.redirect("/");
  }
});

module.exports = router;
