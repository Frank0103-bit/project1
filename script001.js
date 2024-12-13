const 文字欄 = document.querySelector(".文字欄");
const 清單 = document.querySelector(".清單");
const 按鈕 = document.querySelector(".按鈕");

// 新增任務函式
function 新任務() {
  if (文字欄.value === "") {
    return; // 如果輸入為空則結束
  }

  // 創建新任務
  const 任務 = document.createElement("li");
  任務.innerHTML = `
    <input type="checkbox" class="打勾方塊">
    <label>${文字欄.value}</label>
    <button class="垃圾桶">🗑️</button>
  `;

  const 垃圾桶 = 任務.querySelector(".垃圾桶");
  const 打勾方塊 = 任務.querySelector(".打勾方塊");

  // 刪除任務事件
  垃圾桶.addEventListener("click", function () {
    任務.remove();
    saveTodos(); // 刪除後更新儲存
  });

  // 完成任務事件
  打勾方塊.addEventListener("click", function () {
    if (打勾方塊.checked) {
      任務.style.textDecoration = "line-through";
      任務.style.color = "#999";
    } else {
      任務.style.textDecoration = "none";
      任務.style.color = "";
    }
    saveTodos(); // 更新後儲存
  });

  清單.appendChild(任務); // 將新任務加入清單
  文字欄.value = ""; // 清空輸入欄
  saveTodos(); // 新增任務後儲存
}

// 點擊新增任務按鈕
按鈕.addEventListener("click", 新任務);

// 按 Enter 鍵新增任務
文字欄.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    新任務();
  }
});

// 儲存代辦事項
function saveTodos() {
  const todos = document.querySelectorAll(".清單 li");
  const todoList = Array.from(todos).map(todo => ({
    text: todo.querySelector("label").textContent,
    completed: todo.querySelector(".打勾方塊").checked,
  }));
  localStorage.setItem("todos", JSON.stringify(todoList));
}

// 讀取代辦事項
function loadTodos() {
  const savedTodos = localStorage.getItem("todos");
  if (savedTodos) {
    const todoList = JSON.parse(savedTodos);
    todoList.forEach(todo => addTodoToPage(todo.text, todo.completed));
  }
}

// 把代辦事項加入到頁面上
function addTodoToPage(todoText, completed = false) {
  const 任務 = document.createElement("li");
  任務.innerHTML = `
    <input type="checkbox" class="打勾方塊" ${completed ? "checked" : ""}>
    <label>${todoText}</label>
    <button class="垃圾桶">🗑️</button>
  `;

  const 垃圾桶 = 任務.querySelector(".垃圾桶");
  const 打勾方塊 = 任務.querySelector(".打勾方塊");

  // 刪除任務事件
  垃圾桶.addEventListener("click", function () {
    任務.remove();
    saveTodos(); // 刪除後更新儲存
  });

  // 完成任務事件
  打勾方塊.addEventListener("click", function () {
    if (打勾方塊.checked) {
      任務.style.textDecoration = "line-through";
      任務.style.color = "#999";
    } else {
      任務.style.textDecoration = "none";
      任務.style.color = "";
    }
    saveTodos(); // 更新後儲存
  });

  if (completed) {
    任務.style.textDecoration = "line-through";
    任務.style.color = "#999";
  }

  清單.appendChild(任務);
}

// 初始化時載入
loadTodos();
