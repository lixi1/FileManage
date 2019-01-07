import { observable, action } from 'mobx';
import API from './api'
import axios from 'axios'
import qs from 'qs';
import {message} from 'antd';

class CreateStore {
    @observable isSave = false;

    @action saveFile = async(fileData, callback) => {
        await axios.post(API.addFile, qs.stringify(fileData),{
            headers: {
                'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
            }
          })
            .then((res) => {
                this.isSave = true;
                message.success("添加成功！")
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
                this.isSave = true;
                message.success("编辑成功！")
                callback();
            })
    }

    @action cancelFile = () => {
        this.isSave = true;
    }

    @action reset() {
        this.isSave = false;
    }

}

export const createStore = new CreateStore();

export default CreateStore;