const textInput = document.getElementById("todo-input-text");
const bouton = document.querySelector(`input[type="button"][value="Ajouter"]`);

const storeKey = "todoList";
const todoList = JSON.parse(localStorage.getItem(storeKey)) ?? [];

bouton.addEventListener("click", addListeItem);
textInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addListeItem();
  }
});

const ul = document.createElement("ul");
for (const todo of todoList) {
  creerLi(todo);
}
bouton.after(ul);

function creerLi(texte) {
  const li = document.createElement("li");
  li.textContent = texte;
  const boutonFait = document.createElement("input");
  boutonFait.setAttribute("type", "button");
  boutonFait.setAttribute("value", "Fait");
  li.appendChild(boutonFait);
  boutonFait.addEventListener("click", () => {
    li.remove();
    supprimerTexte(texte);
    sauvegarder();
  });
  ul.appendChild(li);
}
function supprimerTexte(texte) {
  const index = todoList.findIndex((element) => element === texte);
  todoList.splice(index, 1);
}
function sauvegarder() {
  localStorage.setItem(storeKey, JSON.stringify(todoList));
}
function addListeItem() {
  const texteSaisi = textInput.value;
  creerLi(texteSaisi);
  textInput.value = "";
  todoList.push(texteSaisi);
  sauvegarder();
}
