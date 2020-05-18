![](./frontend/public/tipsylogo.png)

# Welcome to Tipsy Painter

Tipsy Painter is a collaborative drawing website where you can draw with friends and get tipsy together.

## [Live Link](http://tipsypainter.herokuapp.com/#/)

## Technologies

Tipsy Painter was built using:

* Front End
     * React
     * CSS/HTML

* Back End
     * MongoDB (mongoose 5.9.9)
     * Express 4.17.1
     * Node.js 10.13.0
     * Web Socket API (socket.io 2.3.0)
     
## Background and Overview

Tipsy Painter takes the popular format of sip-and-paint parties to the digital canvas. Multiple users can paint together on the same canvas remotely.

![tipsypainter](frontend/public/p2.png)

## Features

* User authentication

Tipsy Painter has backend user auth and persistent user state. 

* Responsive canvas that updates for more than one user.

Implemented with socket.io and created functions for sending out and receiving the canvas data inside of canvas components so that multiple users can draw together on the same time.

For sending out the canvas data,

```javascipt
 this.socket.emit("draw", this.props.match.params.id, {
      x: x,
      y: y,
      color: this.state.color,
      lineWidth: this.state.lineWidth,
      lineCap: this.state.lineCap,
    });
```

For receiving the canvas data,
```javascript
receiveDraw(x, y, color, lineWidth, lineCap) {
    const ctx = this.getContext();
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = lineCap;
  }
```

* Real-time video chat rendering

Utilized socket.io and rendered video chat.

```javascript 
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
```
* Create and Join Art Rooms

Once user hits ```invite button``` in a room, it auto-generates URL and it's already copied to a clipboard. 

![tipsypainter](frontend/public/p3.png)

```javascript
  handleInvite() {
    const el = document.createElement('textarea');
    el.value = window.location.origin + `/#/join?roomtoken=${this.props.room[0].room_token}`;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    const modal = document.getElementById("myModal-invite");
    const span = document.getElementsByClassName("close")[2];
    modal.style.display = "block";
    span.onclick = function () {
      modal.style.display = "none";
    }
    window.onclick = function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    }
  }
```

When a user pastes URL and it auto-fills ```room token```

![tipsypainter](frontend/public/p4.png)

```javascript 
  componentDidMount() {
    let queryParams = new URLSearchParams(this.props.location.search)
    let roomtoken = queryParams.get("roomtoken")
    if (roomtoken) {
      return this.setState({ room_token: roomtoken })
    }
  }
 ```

* Save Artworks

Users can save their artworks on their own gallary page. 

![tipsypainter](frontend/public/p5.png)



