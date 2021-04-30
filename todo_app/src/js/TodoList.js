import React from 'react';
import './../scss/TodoList.css';
import ListItem from './../components/ListItem/ListItem';

export default function TodoList({ list }) {

    return (
        <div className='list-container'>
            {list.map(listItem => <ListItem description={listItem.description} />)}
        </div>
    )
}
