
import { observable, action } from 'mobx'

class TaskListStore {

  @observable list = []

  @action finishItem (index) {
    const copiedList = this.list.slice()
    const isFinished = copiedList[index].isFinished
    if (isFinished) return

    copiedList[index].isFinished = true
    this.list = copiedList // update store by re-assigning
  }

  @action deleteItem (index) {
    this.list = this.list.filter((item, i) => i != index)
  }

  @action setlist(newProperty) {
    this.list = newProperty;
  }
}

const listStore = new TaskListStore()
export default listStore;

