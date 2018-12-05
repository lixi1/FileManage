import { observable, action } from 'mobx';
import API from './api'
import axios from 'axios'
import qs from 'qs';

class CreateStore {
    @observable agentList = [];

    @action saveFile = async(fileData, callback) => {
        await axios.post(API.addFile, qs.stringify(fileData),{
            headers: {
                'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
            }
          })
            .then((res) => {
                callback();
            })
    }

    @action updateFile =  async(fileData, callback) => {
        await axios.post(API.updateFile, qs.stringify(fileData),{
            headers: {
                'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
            }
          })
            .then((res) => {
                callback();
            })
    }
}

export const createStore = new CreateStore();

export default CreateStore;