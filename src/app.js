const express = require("express");
const cors = require("cors");

const { v4: uuid, isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const {title, url, techs} = request.body;

  const likes = 0;

  const repository = {id: uuid(), title, url, techs, likes};

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs} = request.body;
  

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  console.log(repositoryIndex);
  if (repositoryIndex < 0 ){
    return response.status(400).json({error: "Repository not found"});

  }

  const {likes} = repositories[repositoryIndex].likes;


  console.log(repositories[repositoryIndex]);
  const repository = {
    id,
    title,
    url,
    techs,
    likes,
  };
  
  repository.likes = repositories[repositoryIndex].likes;

 
  //repository = {likes: repositories[repositoryIndex].likes};

  

  console.log(repository);

  repositories[repositoryIndex] = repository;

  return response.json(repository);


});

app.delete("/repositories/:id", (request, response) => {
  // TODO

  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  console.log(repositoryIndex);
  if (repositoryIndex < 0 ){
    return response.status(400).json({error: "Repository not found"});

  }

  repositories.splice(repositoryIndex,1);
  
  return response.status(204).send();

});

app.put("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;

  //const {likes}

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0 ){
    return response.status(400).json({error: "Repository not found"});

  }


  repositories[repositoryIndex].likes += 1;

  return response.status(200).json(repositories[repositoryIndex]);


});

module.exports = app;
