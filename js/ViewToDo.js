export class ViewToDo_rotine {
  constructor(root, { onRotineAdd, onRotinEadit, onRotineDelet } = {}) {
    this.root = root;

    this.onRotineAdd = onRotineAdd;
    this.onRotinEadit = onRotinEadit;
    this.onRotineDelet = onRotineDelet;
    this.btnAdd_rotine = root.querySelector("#add-rotine");

    this.btnAdd_rotine.addEventListener("click", () => {
      console.log(this.root);
      this.createRotineForm({ title: "", timeStart: {}, timeEnd: {} });
    });
  }

  createRotineForm(rotine, id) {
    this.root.insertAdjacentHTML(
      "beforeend",
      `
    <form class="rotine-form">
    <div class='form-box'>

            <div>
              <label for="rotineTXT"> rotine title</label>
              <input type="text" required   id="rotineTXT" 
              value="${rotine.title || ""}">
            </div>

      <div class="time">
            <div class="rotineTime">
              <label>time Start </label>
                <div>
                    <input type="number" required  id="rotineTime-start-H" placeholder="hours" min='0'max='12' 
                    value="${rotine.timeStart.H || ""}">
                    <input type="number"    id="rotineTime-start-M" placeholder="minuts" min='0'max='59'
                    value="${rotine.timeStart.M || ""}">
                  </div>
              </div>
              <div class="rotineTime">
                <label>  time End </label>
                  <div>
                    <input type="number"  required id="rotineTime-end-H" placeholder="hours" min='0'max='12' 
                    value="${rotine.timeEnd.H || ""}">
                    <input type="number" required  id="rotineTime-end-M" placeholder="minuts" min='0'max='59'
                    value="${rotine.timeEnd.M || ""}">
                  </div>
              </div>
       </div>
     </div>
              <button type="submit">submit</button>
      </form>
    `
    );

    const rotineTXT = this.root.querySelector("#rotineTXT"),
      rotineTime_s_H = this.root.querySelector("#rotineTime-start-H"),
      rotineTime_s_M = this.root.querySelector("#rotineTime-start-M"),
      rotineTime_e_H = this.root.querySelector("#rotineTime-end-H"),
      rotineTime_e_M = this.root.querySelector("#rotineTime-end-M");

    const rotineForm = document
      .querySelector(".rotine-form")
      .addEventListener("submit", (e) => {
        this.onRotineAdd(
          rotineTXT.value.trim(),
          rotineTime_s_H.value,
          rotineTime_s_M.value,
          rotineTime_e_H.value,
          rotineTime_e_M.value,
          id
        );
      });
  }

  _createRotineHTML(id, timeEnd, timeStart, title, ubdate) {
    return `
 <div class="rotine-box" data-id="${id}">
      <div class="rotine-time">
        <div class="start">${timeStart.H}:${timeStart.M}</div>
        <div class="end">${timeEnd.H}:${timeEnd.M}AM</div>
      </div>
      <div class="rotine-contnet">
        <p class="rotine-dsc">${title}</p>
          <div class=" rotine-contnet-time "><i>Date add:${ubdate.toLocaleDateString()}</i>
          </div>
       </div>
      <div class="control">
      <button class="btn-delete">delete</button>
      <button class="btn-edit">edit</button>
    </div> 
  </div>
    `;
  }

  ubdateRotine(rotines) {
    const rotine_box = this.root.querySelector(".rotine-root");

    if (rotines.length > 0) {
      rotine_box.innerHTML = "";
    }

    rotines.forEach((rotine) => {
      const html = this._createRotineHTML(
        rotine.id,
        rotine.timeEnd,
        rotine.timeStart,
        rotine.title,
        new Date()
      );

      rotine_box.insertAdjacentHTML("beforeend", html);
    });

    rotine_box.querySelectorAll(".rotine-box").forEach((rotineBox) => {
      rotineBox.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-edit")) {
          this.onRotinEadit(rotineBox.dataset.id);
        } else if (e.target.classList.contains("btn-delete")) {
          const doDelet = confirm("are yo sure");
          if (doDelet) {
            this.onRotineDelet(rotineBox.dataset.id);
          }
        }
      });
    });
  }
}

export class ViewToDo_task {
  constructor(
    root,
    { onTaskAdd, onTaskDelet, onTaskComplet, onTaskEdit } = {}
  ) {
    this.root = root;
    this.onTaskAdd = onTaskAdd;
    this.onTaskComplet = onTaskComplet;

    this.onTaskDelet = onTaskDelet;
    this.onTaskEdit = onTaskEdit;

    this.btnAddTask = root.querySelector("#add-task");

    this.btnAddTask.addEventListener("click", () => {
      this.createTaskForm({
        title: "",
        desc: "",
        range: "",
        dateEnd: "",
      });
    });
  }

  createTaskForm(task, id) {
    this.root.insertAdjacentHTML(
      "beforeend",
      `
    <form class="task-form">
    <div class='form-box'>
          <div>
               <label for="taskTitle"> task title</label>
               <input type="text" required   id="taskTitle" 
               value="${task.title || ""}">
               <textarea  id="taskDesc" >${task.disc || ""}</textarea>
           </div>
           <div class="range">
           <label for="taskRange"> task Range</label>
           <input type="range"  id="taskRange" value="${task.range || "0"}">
           <div class="rangeNum">${task.range || "0"} %</div>
           </div>
            <div class="taskDate">
                    <label>  date End </label>
                    <input type="date"  required id="task-Date-end" placeholder="hours" min='0'max='12' 
                    value="">
             </div>
             
        </div>
              <button type="submit">submit</button>
      </form>
    `
    );

    const taskTitle = this.root.querySelector("#taskTitle"),
      taskDesc = this.root.querySelector("#taskDesc"),
      taskRange = this.root.querySelector("#taskRange"),
      task_Date_End = this.root.querySelector("#task-Date-end");
    // range dive
    taskRange.addEventListener("input", (e) => {
      e.target.nextElementSibling.innerHTML = `${e.target.value}%`;
      e.target.nextElementSibling.style.left = `${e.target.value}%`;
    });
    const TaskForm = this.root
      .querySelector(".task-form")
      .addEventListener("submit", (e) => {
        // e.preventDefault();
        this.onTaskAdd(
          taskTitle.value.trim(),
          taskDesc.value,
          taskRange.value,
          task_Date_End.value,
          id
        );
      });
  }
  _createTaskHTML(id, title, desc, range, dateEnd, state, ubdate) {
    return `
    <div class="task-box ${
      state ? "" : "completed"
    }"   data-id="${id}" data-title="${title}">
    <div class="task-contnet">
      <h3 class="task-title">${title}</h1>
      <p class="task-dsc">${desc}</p>
       <div class="task-progres">
      <span style="width: ${range}%"> ${range}%</span>
       </div>
      <div class="task-contnet-time">
        <div class="time-date"><i>Date start :${ubdate.toLocaleDateString()}</i></div>
        <div class="time-date"><i>Date end : ${dateEnd} </i></div>
      </div>
    </div>
    <div class="control">
      <button class="btn-completed">completed</button>
      <button class="btn-edit">edit</button>
      <button class="btn-delete">delete</button>
    </div> 
    </div>
    
    `;
  }

  ubdateTask(tasks) {
    const task_box = this.root.querySelector(".tasks-root");

    if (tasks.length > 0) {
      task_box.innerHTML = "";
    }

    tasks.forEach((task) => {
      const html = this._createTaskHTML(
        task.id,
        task.title,
        task.disc,
        task.range,
        task.dateEnd,
        task.state,
        new Date()
      );
      task_box.insertAdjacentHTML("beforeend", html);
    });

    task_box.querySelectorAll(".task-box").forEach((task_box) => {
      task_box.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-delete")) {
          this.onTaskDelet(task_box.dataset.id);
        } else if (e.target.classList.contains("btn-edit")) {
          this.onTaskEdit(task_box.dataset.id);
        } else if (e.target.classList.contains("btn-completed")) {
          this.onTaskComplet(task_box.dataset.id);
        }
      });
    });
  }
}
