import { observable, action, runInAction, toJS } from 'mobx';
import API from './api'
import axios from 'axios'
import qs from 'qs';
import BraftEditor from 'braft-editor'

class DetailStore {
    @observable detailContent = {
        title: "",
        content: null
    }
    
    @action async getFileDetail(id){
        let result = await axios.get(API.getFile, {
            params: {
                id: id
            }
        });
        runInAction(() => {
            this.detailContent = result.data[0];
            // // this.detailContent.content = BraftEditor.createEditorState(result.data[0].content)
            // this.title = result.data[0].title;
            // this.content = BraftEditor.createEditorState(result.data[0].content);
        })
    }

    reset() {
        this.detailContent = {
            title: "",
            content: null
        }
    }
}

export const detailStore = new DetailStore();
export default DetailStore;