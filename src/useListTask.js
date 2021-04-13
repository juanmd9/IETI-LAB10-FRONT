import { useState } from 'react';

export default function useListTask() {
    const getListTask = () => {
        const list = JSON.parse(localStorage.getItem("listTask"));
        console.log( list, "####", !list);
        if(!list){
            return [];
        }else {
            return list;
        }
    };
    const [listTask, setListTask] = useState(getListTask());
    const saveListTask = listTask => {
        var listi = getListTask();
        var listToSave = listi.concat(listTask);
        console.log(listToSave, "57577575");
        localStorage.setItem("listTask", JSON.stringify(listToSave))
        setListTask(listToSave);
    };
    return {
        setListTask: saveListTask,
        listTask
    }
}