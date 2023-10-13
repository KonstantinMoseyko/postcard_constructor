import React from 'react'


const PostcardItem = ({ postcard }) => {
    return (
        <tr>
            <td>
                {postcard.creator}
            </td>
            <td>
                {postcard.title}
            </td>
            <td>
                {postcard.description}
            </td>
            <td>
                <img src={postcard.image_url} alt={postcard.title} style={{ maxWidth: "250px" }} />
            </td>
        </tr >
    )
}

const PostcardList = ({ postcards }) => {
    return (
        <table width = "50%" border = "2">
            <thead>
                <tr>
                    <th>
                        Автор
                    </th>
                    <th>
                        Название
                    </th>
                    <th>
                        Описание
                    </th>
                    <th>
                        Изображение
                    </th>
                </tr>
            </thead>
            <tbody>
                {postcards.map((postcard) => <PostcardItem postcard={postcard} />)}
            </tbody>
        </table>
    )
}


export default PostcardList