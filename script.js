const 文字欄 = document.querySelector(".文字欄");
const 清單 = document.querySelector(".清單");
const 按鈕 = document.querySelector(".按鈕");

function 新任務() {
  if(文字欄.value ==="") {
    return; 
    }

  const 任務 = document.createElement("li");
  任務.innerHTML =`
    <input type="checkbox" class="打勾方塊">
    <label>${文字欄.value}</label>
    <button class="垃圾桶">🗑️</button>;
    `
    const 垃圾桶 = 任務.querySelector(".垃圾桶");
    const 打勾方塊 = 任務.querySelector(".打勾方塊");

    垃圾桶.addEventListener("click", function() {
    任務.remove();
  });

  打勾方塊.addEventListener("click", function() {
    if(打勾方塊.checked) {
      任務.style.textDecoration = "line-through";
      任務.style.color = "#999";
    } else {
      任務.style.textDecoration = "none";
      任務.style.color = "";
    }
  });

  清單.append(任務);
  文字欄.value = "";
}

按鈕.addEventListener("click", 新任務);

文字欄.addEventListener("keyup", function(e) {
  if (e.key === "Enter") {
    新任務();
  }
});

//把字串存進 LocalStorage
//var str= "文字欄"; 
//localStorage.setItem( "文字欄",str);
//console.log(localStorage.getItem("文字欄"));

// 儲存代辦事項
function saveTodos() {
  const todos = document.querySelectorAll("ul");
  const todoList = [];
  todos.forEach(todo => {
      todoList.push(todo.textContent);
  });
  localStorage.setItem("todos", JSON.stringify(todoList)); // 將陣列轉成字串儲存
}

// 讀取代辦事項
function loadTodos() {
  const savedTodos = localStorage.getItem("todos");
  if (savedTodos) {
      const todoList = JSON.parse(savedTodos); // 將字串轉回陣列
      todoList.forEach(todo => {
          addTodoToPage(todo); // 顯示到頁面上的函式
      });
  }
}

// 初始化時載入事項
loadTodos();

// 範例：當新增代辦事項時自動儲存
document.querySelector('button').addEventListener('click', () => {
  addTodoToPage(inputValue); // 新增到頁面
  saveTodos(); // 更新儲存
});




