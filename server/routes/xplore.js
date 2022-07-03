const {Router} = require('express');
const {createXplore , getXplore, getSingleXplore, userXplores, deleteXplore, updateXplore, getXploreBySearch, getXploreByTag, getRelatedXplore, likeXplore} = require('../controllers/xplore');
const auth = require('../middleware/auth');

const xploreRouter = Router();

xploreRouter.get("/search",getXploreBySearch);
xploreRouter.get("/search/:tag",getXploreByTag);
xploreRouter.post("/relatedXplore",getRelatedXplore);


xploreRouter.get("/",getXplore);
xploreRouter.get("/:id",getSingleXplore);


xploreRouter.post("/",auth, createXplore);
xploreRouter.delete("/:id",auth,deleteXplore);
xploreRouter.patch("/:id",auth,updateXplore);
xploreRouter.get("/userXplores/:id", auth, userXplores);
xploreRouter.patch("/like/:id",auth, likeXplore)

module.exports = xploreRouter;