// بسم الله الرحمن الرحيم
let input = document.querySelector("input");
let tasksHolder = document.querySelector(".tasksHolder");
let array;

input.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    if (input.value.length !== 0) {
      let tasks = document.createElement("div");
      let task = document.createElement("span");
      let closeTask = document.createElement("span");
      let done = document.createElement("i");
      tasks.classList.add("tasks");
      task.classList.add("task");
      closeTask.classList.add("close");
      done.className = "fa-solid fa-check done";
      task.innerHTML = input.value;
      closeTask.innerHTML = "X";
      tasksHolder.appendChild(tasks);
      tasks.appendChild(task);
      tasks.appendChild(closeTask);
      tasks.appendChild(done);
      closeTask.onclick = function () {
        tasks.remove();
        let taskValues = document.querySelectorAll(".tasks .task");
        taskValues = Array.from(taskValues);
        array = taskValues.map(function (e) {
          return e.innerHTML;
        });
        window.localStorage.clear();
        window.localStorage.setItem("tasks1", array);
      };
      let test = document.querySelectorAll(".doneCome");
      done.onclick = function () {
        done.classList.toggle("doneCome");
      };
      input.value = "";
      let taskValues = document.querySelectorAll(".tasks .task");
      taskValues = Array.from(taskValues);
      array = taskValues.map(function (e) {
        return e.innerHTML;
      });
      window.localStorage.clear();
      window.localStorage.setItem("tasks1", array);
    }
  }
});

if (window.localStorage.getItem("tasks1")) {
  for (
    i = 0;
    i < window.localStorage.getItem("tasks1").split(",").length;
    i++
  ) {
    let tasks = document.createElement("div");
    let task = document.createElement("span");
    let closeTask = document.createElement("span");
    let done = document.createElement("i");
    tasks.classList.add("tasks");
    task.classList.add("task");
    closeTask.classList.add("close");
    done.className = "fa-solid fa-check done";
    task.innerHTML = window.localStorage.getItem("tasks1").split(",")[i];
    closeTask.innerHTML = "X";
    tasksHolder.appendChild(tasks);
    tasks.appendChild(task);
    tasks.appendChild(closeTask);
    tasks.appendChild(done);
    done.onclick = function () {
      done.classList.toggle("doneCome");
    };
    closeTask.onclick = function () {
      tasks.remove();
      let taskValues = document.querySelectorAll(".tasks .task");
      taskValues = Array.from(taskValues);
      array = taskValues.map(function (e) {
        return e.innerHTML;
      });
      window.localStorage.clear();
      window.localStorage.setItem("tasks1", array);
    };
  }
}

let plus = document.querySelector(".fa-plus");
let imgsApi = document.querySelector(".imgsApi");
let search = document.querySelector("input[type='search']");
let imgs = document.querySelector(".imgs");
let backgroundImg = document.querySelector(".backgroundImg");
let title = document.querySelector(".title");

plus.onclick = async function () {
  imgsApi.classList.toggle("imgsApiCome");
  if (plus.className === "fa-solid fa-plus plus") {
    plus.className = "fa-solid fa-minus plus";
  } else {
    plus.className = "fa-solid fa-plus plus";
  }
};

plus.addEventListener("mouseover", function () {
  setTimeout(function () {
    title.classList.add("titleShow");
  }, 600);
});

document.addEventListener("mouseover", function (event) {
  if (!plus.contains(event.target) === true) {
    title.classList.remove("titleShow");
  }
});

document.addEventListener("click", function (event) {
  if (
    !plus.contains(event.target) === true &&
    !imgsApi.contains(event.target) === true
  ) {
    imgsApi.classList.remove("imgsApiCome");
  }
});

search.addEventListener("keyup", async function (event) {
  if (event.key === "Enter") {
    imgs.innerHTML = "";
    let value = search.value;
    let api = await fetch(
      `https://api.unsplash.com/search/photos?query=${value}&client_id=vC2jtf27i6TMl7t_LukYyeKDdoizIrhZuPLxiIxOIUE&per_page=100&content_filter=high`
    );
    api = await api.json();
    for (i = 0; i < api.results.length; i++) {
      let imgHolder = document.createElement("div");
      let img = document.createElement("img");
      imgHolder.className = "img-holder";
      imgs.appendChild(imgHolder);
      imgHolder.appendChild(img);
      img.src = api.results[i].urls.regular;
    }
    let allImgs = document.querySelectorAll(".img-holder img");
    allImgs.forEach(function (e) {
      e.onclick = function () {
        backgroundImg.src = e.src;
        window.localStorage.setItem("backgroundImg", e.src);
      };
    });
  }
});

if (window.localStorage.getItem("backgroundImg")) {
  backgroundImg.src = window.localStorage.getItem("backgroundImg");
}
