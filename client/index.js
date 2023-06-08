const todoButton = document.querySelector("#add-todo-btn");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");

document.addEventListener("DOMContentLoaded", () => {
  console.log("hey there");

  fetch("http://localhost:5000/getAll")
    .then((response) => response.json())
    .then((data) => {
      const dataArray = data.data;
      dataArray.forEach((element) => {
        todoList.innerHTML += `<li id=${element.id}>${element.task} <button class="delete">delete</button> </li>`;
      });
    });

  console.log("goodbye world");
});

document
  .querySelector("#todo-list")
  .addEventListener("click", function (event) {
    if (event.target.className === "delete") {
      const deletedID = event.target.parentNode.id;
      console.log(deletedID);
      deleteRowById(deletedID);
    }
  });
todoButton.addEventListener("click", () => {
  const value = todoInput.value;
  if (!value) return;

  todoInput.value = "";
  fetch("http://localhost:5000/insert", {
    headers: {
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ value }),
  })
    .then((response) => response.json())
    .then((data) => {
      todoList.innerHTML += `<li id =${data.data[0].id}>${data.data[0].task} <button class="delete">delete</button></li>`;
    });
});

function deleteRowById(id) {
  console.log("i am here");
  fetch("http://localhost:5000/delete/" + id, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        location.reload();
      }
    });
}
