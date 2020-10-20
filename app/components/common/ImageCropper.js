import React, { Component } from "react";
// import { Button } from "primereact/button";
// import NetiContentLoader from './NetiContentLoader';
// import { NetiFileHandler } from '../../utils/NetiFileHandler';
// import { Editor } from 'primereact/editor';
// import CommonFuctionality from './CommonFuctionality';
import Croppie from "croppie";
import { Button } from "reactstrap";

let vanilla;
export class ImageCropper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            croppedImage: {
                extention: 'png',
                contentPic: '',
                contentName: 'photo.name',
                photoBlob: {
                    size: 0,
                    type: ''
                }
            },
            cropSectionVisible: true
        };

        // this.NetiContentLoader = new NetiContentLoader();
        // this.netiFileHandler = new NetiFileHandler();
        // this.CommonFuctionality = new CommonFuctionality();
    }

    componentDidMount() {
        let { main, bind } = this.props.cropperObject;

        if (!main) {
            return
        }
        else {
            var el = document.getElementById('vanilla-demo');
            vanilla = new Croppie(el, {
                ...main
            });

            vanilla.bind({
                ...bind
            });
        }
    }

    componentWillUnmount() {
        vanilla.destroy();
    }

    getCroppedResult = () => {
        let { croppedImage } = this.state

        vanilla.result('blob').then((blob) => {
            croppedImage.photoBlob.size = blob.size
            croppedImage.photoBlob.type = blob.type

            this.props.getCroppedResult(croppedImage);
            this.setState({ cropSectionVisible: false });
        });

        vanilla.result('base64').then((base64) => {
            var keyw = 'data:' + 'image/png' + ';base64,'; //link will be same from the word webapps in URL
            croppedImage.contentPic = base64.substring(base64.indexOf(keyw) + keyw.length);
        });
    }

    removeCropSection = () => {
        this.props.removeCropSection();
    }

    render() {
        let { cropSectionVisible } = this.state

        return (
            <div
                className="image-cropper-section"
                style={cropSectionVisible ? { display: 'block' } : { display: 'none' }}
            >
                <div id="vanilla-demo" className="image-cropper-main"></div>
                <div className="image-cropper-button">
                    <Button
                        className="p-button-danger nw-action-button p-button-icon-only"
                        // label="Result"
                        icon="fas fa-times"
                        onClick={this.removeCropSection}
                    >
                        <i className="fas fa-times"></i>
                    </Button>
                    <Button
                        className="p-button-success nw-action-button p-button-icon-only"
                        // label="Result"
                        icon="fas fa-check"
                        onClick={this.getCroppedResult}
                    >
                        <i className="fas fa-check"></i>
                    </Button>
                </div>
            </div>
        );
    }
}