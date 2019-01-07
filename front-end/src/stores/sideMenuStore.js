import { observable, action, toJS} from 'mobx';
import API from './api'
import axios from 'axios';
import qs from 'qs';
import {message} from 'antd'

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
                }
                let sideList = [
                    {id: "本地监控", title: "本地监控", children: []},
                    {id: "远程监控", title: "远程监控", children: []},
                ]
                res.data.forEach((item, index) => {
                     item.isLeaf = item.childIdList && item.childIdList.length > 0 ? false: true;
                     if(item.title.indexOf("本地监控") > -1){
                        sideList[0].children.push(item)
                     }else if(item.title.indexOf("远程监控") > -1){
                        sideList[1].children.push(item)
                    }else {
                        sideList.push(item);
                    }
                })
                this.sideList = sideList;
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
                message.success("删除成功！");
                this.loadSideMenu()
            })
    }

    
}

export const sideMenuStore = new SideMenuStore();

export default SideMenuStore;