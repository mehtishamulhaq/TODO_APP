import dummyData from './../constants/dummyDataV2.json';
import { v4 as uuidv4 } from 'uuid';

const baseURL = '';
export default {

    getList: () => {
        // let url = ``;
        // axios.defaults.baseURL = window.location.origin;
        // let result = axios.get(url);

        // result
        //   .then(function (response) {
        //     // handle success

        //   })
        //   .catch(function (error) {
        //     // handle error

        //   });
        setTimeout(() => {
            return dummyData;
        }, 2000)

        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(dummyData);
            }, 1000);
        });

        return promise
    },

    // create new task
    createTask: (title) => {
        // let url = ``;
        // axios.defaults.baseURL = window.location.origin;
        // let result = axios.get(url);

        // result
        //   .then(function (response) {
        //     // handle success

        //   })
        //   .catch(function (error) {
        //     // handle error

        //   });
        if (title && title !== '') {
            const newItem = {
                id: uuidv4(),
                title: title,
                status: false,
                createdAt: new Date().toISOString(),
                Tasks: []
            }

            const promise = new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(newItem);
                }, 1000);
            });
            return promise;
        }
    },

    createSubTask: (title, todoId) => {
        if (title && title !== '') {
            const newStep = {
                id: uuidv4(),
                title: title,
                status: false,
                createdAt: new Date().toISOString(),
                TodoId: todoId
            }
            const promise = new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(newStep);
                }, 1000);
            });
            return promise;
        }
    },

    toggleTaskStatus: (id) => {

    }


}