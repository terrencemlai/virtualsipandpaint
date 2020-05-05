import React from "react";
import { withRouter } from "react-router-dom";
import io from "socket.io-client";
import MediaHandler from '../../MediaHandler';

const HOST =
  process.env.NODE_ENV === "production"
    ? "https://tipsypainter.herokuapp.com/"
    : "http://localhost:5000";

class Webcam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawing: false,
      color: "black",
      lineWidth: 5,
      lineCap: "round",
      hasMedia: false,
      otherUserId: null,
      carouselImg: '01.jpg',
    };

    this.socket = io.connect(HOST);

    this.sendVideo = null;
    this.mediaHandler = new MediaHandler();
  }
  
  componentDidMount() {
    
    this.socket.emit("create", this.props.match.params.id)


    const that = this;

    if (this.myVideo !== undefined) {
      this.myVideo = document.createElement('video');
    }


      this.mediaHandler.getPermissions().then((stream) => {
        this.setState({ hasMedia: true});
        const myVidCanvas = document.createElement('canvas');
        const myVidContext = myVidCanvas.getContext('2d');

        try {
          this.myVideo.srcObject = stream;
        } catch(e) {
          this.myVideo.src = URL.createObjectURL(stream);
        }

        this.myVideo.play();

        function createMyVidCanvas() {
          myVidContext.drawImage(that.myVideo, 0,0, myVidCanvas.width, myVidCanvas.height);
          that.socket.emit("video-stream", (that.props.match.params.id), {
            dataUrl: myVidCanvas.toDataURL(),
          });      
        }

        this.sendVideo = setInterval(createMyVidCanvas, 300);
      })

      
      this.socket.on("video-stream", function(data) {
        that.renderPeerVideo(data.dataUrl);
      })
  }

  componentWillUnmount() {
    clearInterval(this.sendVideo);
    this.sendVideo = null;
  }

  renderPeerVideo(dataUrl){
    const img = new Image();
    img.onload = () => {
      const peerContext = this.peerVideo.getContext('2d');
      peerContext.drawImage(img, 0,0);
    }
    img.src = dataUrl;
  }

  render() {
      return (
          <div className="video-container" >
            <video className="my-video" ref={(ref)=> {this.myVideo = ref;}}></video>
            <canvas className="peer-video" ref={(ref)=> {this.peerVideo = ref;}}></canvas>
          </div>
      );
    }


}

export default withRouter(Webcam);
