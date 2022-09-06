import { ViewToDo_rotine, ViewToDo_task } from "../js/ViewToDo.js";
import StorgeToDo from "../js/StorgeToDo.js";

export default class App {
  constructor(root) {
    this.root = root;
    // rotine
    this.rotines = [];
    this.View_rotine = new ViewToDo_rotine(root, this._handler_rotine());
    this._refreshRotines("rotine");
    // task
    this.tasks = [];
    this.View_task = new ViewToDo_task(root, this._handler_task());
    this._refreshTask("task");
  }
  // rotine
  _refreshRotines(type) {
    const datas = StorgeToDo.getData(type);
    this._setRotines(datas);
  }
  // rotine
  _setRotines(rotines) {
    this.rotines = rotines;
    this.View_rotine.ubdateRotine(rotines);
  }
  // rotine
  _handler_rotine() {
    return {
      onRotineAdd: (
        rotineTXT,
        rotineTime_s_H,
        rotineTime_s_M,
        rotineTime_e_H,
        rotineTime_e_M,
        id
      ) => {
        StorgeToDo.saveData("rotine", {
          title: rotineTXT,
          timeStart: {
            H: this.validetNum(rotineTime_s_H),
            M: this.validetNum(rotineTime_s_M),
          },
          timeEnd: {
            H: this.validetNum(rotineTime_e_H),
            M: this.validetNum(rotineTime_e_M),
          },
          id,
        });

        this._refreshRotines("rotine");
      },
      onRotinEadit: (id) => {
        StorgeToDo.getData("rotine").forEach((rotine) => {
          if (rotine.id == id) {
            this.View_rotine.createRotineForm(rotine, id);
          }
        });
      },
      onRotineDelet: (id) => {
        StorgeToDo.deletData("rotine", id);
        this._refreshRotines("rotine");
      },
    };
  }

  // task
  _refreshTask(type) {
    const data = StorgeToDo.getData(type);
    this._setTasks(data);
  }
  _setTasks(tasks) {
    this.tasks = tasks;
    this.View_task.ubdateTask(tasks);
  }
  _handler_task() {
    return {
      onTaskAdd: (taskTitle, taskDesc, taskRange, task_Date_End, id) => {
        StorgeToDo.saveData("task", {
          title: taskTitle,
          disc: taskDesc,
          range: taskRange,
          dateEnd: task_Date_End,
          id,
        });
        this._refreshTask("task");
      },
      onTaskEdit: (id) => {
        StorgeToDo.getData("task").forEach((task) => {
          if (task.id == id) {
            this.View_task.createTaskForm(task, id);
          }
        });
      },
      onTaskComplet: (id) => {
        let newTask = StorgeToDo.getData("task");
        newTask.forEach((task) => {
          if (task.id == id) {
            task.ubdate = task.ubdate;
            StorgeToDo.saveData("task", task);
            this._refreshTask("task");
          }
        });
      },
      onTaskDelet: (id) => {
        StorgeToDo.deletData("task", id);
        this._refreshTask("task");
      },
    };
  }

  validetNum = (num) => {
    return num.length === 1 ? "0" + num : num;
  };
}
