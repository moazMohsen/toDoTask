export default class StorgeToDo {
  static getData(type) {
    const data = JSON.parse(localStorage.getItem(type) || "[]");
    // return data;
    return data.sort((a, b) => {
      return new Date(a.ubdate) > new Date(b.ubdate) ? -1 : 1;
    });
  }

  static saveData(type, data_obj) {
    const datas = this.getData(type);
    const existing = datas.find((data) => data.id == data_obj.id);
    if (existing) {
      existing.title = data_obj.title;
      existing.timeStart = data_obj.timeStart;
      existing.timeEnd = data_obj.timeEnd;
      existing.range = data_obj.range;
      existing.ubdate = data_obj.ubdate;
      existing.state = !data_obj.state;
      existing.dateEnd = data_obj.dateEnd;
      existing.id = data_obj.id;
    } else {
      data_obj.id = Math.floor(Math.random() * 1000000);
      data_obj.ubdate = new Date().toISOString();
      data_obj.state = true;
      datas.push(data_obj);
    }
    localStorage.setItem(type, JSON.stringify(datas));
  }

  static deletData(type, id) {
    const datas = this.getData(type);
    const newData = datas.filter((data) => data.id != id);
    localStorage.setItem(type, JSON.stringify(newData));
  }
}
