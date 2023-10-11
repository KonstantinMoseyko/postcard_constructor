import React from 'react'
import { MDBTable, MDBTableHead, MDBTableBody, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';

const TodoItem = ({ todo, deleteNote }) => {
    return (
        <tr>
            <td>
                {todo.id}
            </td>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.note_text}
            </td>
            <td>
                {todo.create_note}
            </td>
            <td>
                {todo.update_note}
            </td>
            <td>
                {todo.user_note}
            </td>
            <td>
                {todo.status}
            </td>
            <td>
                <button onClick={() => deleteNote(todo.id)} type='button'>Delete</button>
            </td>
        </tr>
    )
}
const TodoList = ({ todos, deleteNote }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>
                        ID
                    </th>
                    <th>
                        PROJECT
                    </th>
                    <th>
                        TEXT
                    </th>
                    <th>
                        CREATE
                    </th>
                    <th>
                        UPDATE
                    </th>
                    <th>
                        AUHTOR
                    </th>
                    <th>
                        STATUS
                    </th>
                </tr>
            </thead>
            <tbody>
                {todos.map((todo) => <TodoItem todo={todo} deleteNote={deleteNote} />)}
            </tbody>
        </table>
    )
}

export default TodoList
