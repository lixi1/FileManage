import { observable, action, runInAction } from 'mobx';
import API from './api'
import axios from 'axios'
import qs from 'qs';

class DetailStore {
    @observable detailContent = {}
    
    @action
    getFileDetail(id){
        axios.get(API.getFile, {
            params: {
                id: id
            }
        })
        .then((res) => {
            runInAction(() => {
                this.detailContent = res.data[0];
            })
        })
    }
}

export const detailStore = new DetailStore();
export default DetailStore;