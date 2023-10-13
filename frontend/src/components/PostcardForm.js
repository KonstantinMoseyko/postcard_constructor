import React from 'react'

class ImageUploadForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'image_url': null,
            'title': '',
        }
    }

    handleFileChange(event) {
        this.setState({
            'image_url': event.target.files[0],
            'title': event.target.files[0].name,
        })
    }

    handleSubmit(event) {
        event.preventDefault()

        const formdata = new FormData()
        formdata.append('image_url', this.state.image_url, this.state.title)

        this.props.uploadImage(formdata)

        this.setState({
            'image_url': null,
            'title': '',
        })
    }

    render() {
        return (
            <div className="ImageUploadForm">
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <input type="file" accept="image/*" onChange={(event) => this.handleFileChange(event)} />
                    <input type="submit" value="Сохранить" />
                </form>
            </div>
        )
    }
}

export default ImageUploadForm;

