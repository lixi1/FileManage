import { observable, action, toJS} from 'mobx';
import API from './api'
import axios from 'axios';
import qs from 'qs';

class SideMenuStore {
    @observable sideList = [];

    // 获取文件列表
    @action loadSideMenu = async (treeData) => {
        await axios.get(API.getFile, {
            params: {
                id: treeData ? treeData.props.eventKey : ""
            }
        })
            .then((res) => {
                if(treeData ){
                    if (treeData.props.children) {
                        return;
                      }
                      treeData.props.dataRef.children = [
                            res.data
                    ];
                    this.sideList = [...this.sideList]
                }else{
                    this.sideList = res.data.map((item, index) => {
                        return item
                    })
                }
                this.sideList = this.sideList.map((item, index) => {
                     item.isLeaf = item.childIdList && item.childIdList.length > 0 ? false: true;
                     return item;
                })
            })
    }

    // 删除文章
    @action deleteFile = async (data) => {
        axios.post(API.delFile, qs.stringify(data), {
            headers: {
                'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
            }
        })
            .then((res) => {
                this.loadSideMenu()
            })
    }

    
}

export const sideMenuStore = new SideMenuStore();

export default SideMenuStore;