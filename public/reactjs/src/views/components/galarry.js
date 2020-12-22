import React, { Component } from 'react'
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import ReactBSAlert from "react-bootstrap-sweetalert";
import axios from '../../util/axios';

export default class galarry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alert: null,
            fileData: '',
            fileName: '',
            imagesList: []
        };
    };

    // Pop-Ups for response in Modals
    handleResponsePopUp = (message, title, success, error) => {
        this.setState({
            alert: (
                <ReactBSAlert
                    success={success}
                    error={error}
                    style={{ display: "block", marginTop: "250px" }}
                    title={title}
                    onConfirm={() => this.handleModalClose()}
                    confirmBtnBsStyle="success"
                    btnSize="md"
                >
                    {message}
                </ReactBSAlert>
            )
        });
    };

    handleModalClose = () => {
        this.setState({
            alert: null
        });
    };

    componentDidMount = () => {
        this.handleGetImagesList();
    }

    handleGetImagesList = () => {
        axios.get('/api/image').then(response => {
            this.setState({
                imagesList: response.data
            });
        }).catch(error => {
            return this.handleResponsePopUp(error.response.data.message ? error.response.data.message : error.message, 'Error', false, true);
        });
    }

    handleSaveFile = () => {
        const postData = {
            file_name: this.state.fileName,
            file_data: this.state.fileData,
        };
        axios.post('/api/image', postData).then(response => {
            return this.handleResponsePopUp(response.data.message, 'Success', true, false);
        }).catch(error => {
            return this.handleResponsePopUp(error.response.data.message, 'Error', false, true);
        });
    };

    handleFileChange = (event) => {
        let selectedFile = event.target.files;
        /*Chaeck file type*/
        const fileName = selectedFile[0].name;
        console.log(fileName)
        const idxDot = fileName.lastIndexOf(".") + 1;
        const extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
        if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
        } else {
            return this.handleResponsePopUp('Only image media is suported', 'Error', false, true);
        };
        //Check File is not Empty
        if (selectedFile.length > 0) {
            // Select the very first file from list
            let fileToLoad = selectedFile[0];
            // FileReader function for read the file.
            let fileReader = new FileReader();
            // Onload of file read the file content
            fileReader.onload = (fileLoadedEvent) => {
                this.setState({
                    fileData: fileLoadedEvent.target.result,
                    fileName: selectedFile[0].name
                });
            };
            // Convert data to base64
            fileReader.readAsDataURL(fileToLoad);
            this.handleSaveFile();
        };
    };

    render() {
        return (
            <>
                {this.state.alert}
                <div className='galarry'>
                    <div className='galarry_header'>
                        <Header />
                    </div>
                    <div className='galarry_body'>
                        <Body imgList={this.state.imagesList} handleUploadFile={(event) => this.handleFileChange(event)} />
                    </div>
                    <div className='galarry_fotter'>
                        <Footer />
                    </div>
                </div>
            </>
        )
    }
}

