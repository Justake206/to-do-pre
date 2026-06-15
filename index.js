const defaultTasks = [
  "Сделать проектную работу",
  "Полить цветы",
  "Пройти туториал по Реакту",
  "Сделать фронт для своего проекта",
  "Прогуляться по улице в солнечный день",
  "Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");
const itemTemplate = document.querySelector("#to-do__item-template").content;
const tasksStorageKey = "tasks";

function loadTasks() {
  const savedTasks = localStorage.getItem(tasksStorageKey);

  if (savedTasks) {
    return JSON.parse(savedTasks);
  }

  saveTasks(defaultTasks);
  return defaultTasks;
}

function createItem(task) {
  const itemElement = itemTemplate.querySelector(".to-do__item").cloneNode(true);
  const textElement = itemElement.querySelector(".to-do__item-text");
  const deleteButton = itemElement.querySelector(
    ".to-do__item-button_type_delete"
  );
  const duplicateButton = itemElement.querySelector(
    ".to-do__item-button_type_duplicate"
  );
  const editButton = itemElement.querySelector(".to-do__item-button_type_edit");

  textElement.textContent = task;
  textElement.contentEditable = "false";

  deleteButton.addEventListener("click", () => {
    itemElement.remove();
    saveTasks(getTasksFromDOM());
  });

  duplicateButton.addEventListener("click", () => {
    listElement.prepend(createItem(textElement.textContent));
    saveTasks(getTasksFromDOM());
  });

  editButton.addEventListener("click", () => {
    textElement.contentEditable = "true";
    textElement.focus();
  });

  textElement.addEventListener("blur", () => {
    textElement.contentEditable = "false";
    textElement.textContent = textElement.textContent.trim();
    saveTasks(getTasksFromDOM());
  });

  return itemElement;
}

function getTasksFromDOM() {
  const textElements = listElement.querySelectorAll(".to-do__item-text");

  return Array.from(textElements, (textElement) => textElement.textContent);
}

function saveTasks(tasks) {
  localStorage.setItem(tasksStorageKey, JSON.stringify(tasks));
}

function renderTasks(tasks) {
  tasks.forEach((task) => {
    listElement.append(createItem(task));
  });
}

function handleFormSubmit(event) {
  event.preventDefault();

  const task = inputElement.value.trim();

  if (!task) {
    return;
  }

  listElement.prepend(createItem(task));
  saveTasks(getTasksFromDOM());
  formElement.reset();
}

formElement.addEventListener("submit", handleFormSubmit);
renderTasks(loadTasks());
