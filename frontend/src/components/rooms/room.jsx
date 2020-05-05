import React from "react";
import { Link, withRouter } from "react-router-dom";
import io from "socket.io-client";
import "./room.css";
import MediaHandler from '../../MediaHandler';
import RoomLogInFormContainer from './room_login_container';
import Webcam from '../webcam/webcam';
import Footer from "../footer/footer";

const HOST =
  process.env.NODE_ENV === "production"
    ? "https://tipsypainter.herokuapp.com/"
    : "http://localhost:5000";

class Room extends React.Component {
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

    this.changeColor = this.changeColor.bind(this);
    this.changeLineWidth = this.changeLineWidth.bind(this);
    this.handleSaveArtwork = this.handleSaveArtwork.bind(this);
    this.handleCarouselClick = this.handleCarouselClick.bind(this);
    this.sendVideo = null;
    this.mediaHandler = new MediaHandler();
  }
  
  componentDidMount() {
    this.props.getRoom(this.props.roomId);
    
    this.socket.emit("create", this.props.match.params.id)


    const that = this;
    
    this.socket.on("startDrawing", function (data) {
      that.receiveStartDrawing(data.x, data.y);
    });

    this.socket.on("draw", function (data) {
      that.receiveDraw(
        data.x,
        data.y,
        data.color,
        data.lineWidth,
        data.lineCap
      );
    });
  }

  componentWillUnmount() {
    clearInterval(this.sendVideo);
    this.sendVideo = null;
  }


  // renderPeerVideo(dataUrl){
  //   const img = new Image();
  //   img.onload = () => {
  //     const peerContext = this.peerVideo.getContext('2d');
  //     peerContext.drawImage(img, 0,0);
  //   }
  //   img.src = dataUrl;
  // }

  getContext() {
    return this.refs.canvas.getContext("2d");
  }

  receiveStartDrawing(x, y) {
    const ctx = this.getContext();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  receiveDraw(x, y, color, lineWidth, lineCap) {
    const ctx = this.getContext();
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = lineCap;
  }

  startDrawing(x, y) {
    this.setState({ drawing: true });
    const ctx = this.getContext();
    ctx.beginPath();
    ctx.moveTo(x, y);

    this.socket.emit("startDrawing", this.props.match.params.id, {
      x: x,
      y: y,
    });
  }

  draw(x, y) {
    if (!this.state.drawing) {
      return;
    }

    const ctx = this.getContext();
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.strokeStyle = this.state.color;
    ctx.lineWidth = this.state.lineWidth;
    ctx.lineCap = this.state.lineCap;

    this.socket.emit("draw", this.props.match.params.id, {
      x: x,
      y: y,
      color: this.state.color,
      lineWidth: this.state.lineWidth,
      lineCap: this.state.lineCap,
    });
  }

  endDrawing() {
    this.setState({ drawing: false });
  }

  changeColor(newColor) {
    this.setState({ color: newColor });
  }

  changeLineWidth(newWidth) {
    this.setState({ lineWidth: newWidth });
  }

  handleSaveArtwork() {
    if (typeof this.props.currentUser.id !== "undefined") {
      const dataUrl = this.refs.canvas.toDataURL();
      this.props.saveArtwork({
        userId: this.props.currentUser.id,
        dataUrl: dataUrl,
      })
      const modal = document.getElementById("myModal-artwork-save");
      const span = document.getElementsByClassName("close")[1];
      modal.style.display = "block";
      span.onclick = function () {
        modal.style.display = "none";
      }
      window.onclick = function (event) {
        if (event.target === modal) {
          modal.style.display = "none";
        }
      }
    } else {
      const modal = document.getElementById("myModal-artwork-nosave");
      const span = document.getElementsByClassName("close")[0];
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
  }

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
  
  handleCarouselClick(slide){
    this.setState({ carouselImg: slide+'.jpg'})
  }

  render() {
    

    if (Object.values(this.props.room).length === 0) {
      return (
        <div className="invalid-room">
          Hmmm, that's not a valid room.
          <Link className="join-room" to={"/join"}> <i className="fas fa-door-open"></i> Please Try Again</Link>
        </div>
        );
    } else {
      return (
        <>
        <div className="room-container">
          <section></section> 
        <section className="left-room"> 
          <section className="tool-options">
            <section className="color-options">
              <div className="color">
                <div id="red"className="swatch" onClick={() => this.changeColor("#630606")}></div>
                <div id="red2" className="swatch"onClick={() => this.changeColor("#960000")}></div>
                <div id="red3"className="swatch"onClick={() => this.changeColor("#cb0000")}></div>
                <div id="red4"className="swatch"onClick={() => this.changeColor("#ff0000")}></div>
                <div id="red5" className="swatch" onClick={() => this.changeColor("#eb5555")}></div>
                <div id="red6"className="swatch" onClick={() => this.changeColor("#f09999")}></div>
                <div id="red7" className="swatch" onClick={() => this.changeColor("#ffbebe")}></div>
              </div>
              <div className="color">
                <div id="orange"className="swatch"onClick={() => this.changeColor("#9b4800")}></div>
                <div id="orange2" className="swatch" onClick={() => this.changeColor("#c65c00")}></div>
                <div id="orange3" className="swatch" onClick={() => this.changeColor("#e47600")}></div>
                <div id="orange4" className="swatch" onClick={() => this.changeColor("#ff7700")}></div>
                <div id="orange5" className="swatch" onClick={() => this.changeColor("#fe8820")}></div>
                <div id="orange6" className="swatch" onClick={() => this.changeColor("#ffa353")}></div>
                <div id="orange7" className="swatch" onClick={() => this.changeColor("#ffc796")}></div>
              </div>
              <div className="color">
                <div id="yellow" className="swatch"onClick={() => this.changeColor("#9e8900")}></div>
                <div id="yellow2" className="swatch"onClick={() => this.changeColor("#b8a40c")}></div>
                <div id="yellow3" className="swatch"onClick={() => this.changeColor("#e1c700")}></div>
                <div id="yellow4" className="swatch"onClick={() => this.changeColor("#ffe100")}></div>
                <div id="yellow5" className="swatch"onClick={() => this.changeColor("yellow")}></div>
                <div id="yellow6" className="swatch"onClick={() => this.changeColor("#fff954")}></div>
                <div id="yellow7" className="swatch"onClick={() => this.changeColor("#ffff88")}></div>
              </div>
              <div className="color">
                <div id="green" className="swatch"onClick={() => this.changeColor("#003e00")}></div>
                <div id="green2" className="swatch"onClick={() => this.changeColor("#005b00")}></div>
                <div id="green3" className="swatch"onClick={() => this.changeColor("#007c00")}></div>
                <div id="green4" className="swatch"onClick={() => this.changeColor("#00a000")}></div>
                <div id="green5" className="swatch"onClick={() => this.changeColor("#38c738")}></div>
                <div id="green6" className="swatch"onClick={() => this.changeColor("#4efe4e")}></div>
                <div id="green7" className="swatch"onClick={() => this.changeColor("#a4e4a4")}></div>
              </div>
              <div className="color">
                <div id="blue" className="swatch"onClick={() => this.changeColor("#00006a")}></div>
                <div id="blue2" className="swatch"onClick={() => this.changeColor("#00009b")}></div>
                <div id="blue3" className="swatch"onClick={() => this.changeColor("#0000d5")}></div>
                <div id="blue4" className="swatch"onClick={() => this.changeColor("#2a2aff")}></div>
                <div id="blue5" className="swatch"onClick={() => this.changeColor("#2c77f9")}></div>
                <div id="blue6" className="swatch"onClick={() => this.changeColor("#6fa8fe")}></div>
                <div id="blue7" className="swatch"onClick={() => this.changeColor("#b7e0ff")}></div>
              </div>
              <div className="color">
                <div id="purple"className="swatch"onClick={() => this.changeColor("#2b0041")}></div>
                <div id="purple2"className="swatch"onClick={() => this.changeColor("#430059")}></div>
                <div id="purple3"className="swatch"onClick={() => this.changeColor("#5a0087")}></div>
                <div id="purple4"className="swatch"onClick={() => this.changeColor("#7f03b5")}></div>
                <div id="purple5"className="swatch"onClick={() => this.changeColor("#b300ff")}></div>
                <div id="purple6"className="swatch"onClick={() => this.changeColor("#bc83e4")}></div>
                <div id="purple7"className="swatch"onClick={() => this.changeColor("#debaf0")}></div>
              </div>
              <div className="color">
                <div id="brown" className="swatch"onClick={() => this.changeColor("#291717")}></div>
                <div id="brown2" className="swatch"onClick={() => this.changeColor("#35221e")}></div>
                <div id="brown3" className="swatch"onClick={() => this.changeColor("#3a2822")}></div>
                <div id="brown4" className="swatch"onClick={() => this.changeColor("#433728")}></div>
                <div id="brown5" className="swatch"onClick={() => this.changeColor("#69523f")}></div>
                <div id="brown6" className="swatch"onClick={() => this.changeColor("#a4745a")}></div>
                <div id="brown7" className="swatch"onClick={() => this.changeColor("#dfc5a6")}></div>
              </div>
              <div className="color">
                <div id="shade" className="swatch"onClick={() => this.changeColor("black")}></div>
                <div id="shade2" className="swatch"onClick={() => this.changeColor("#292929")}></div>
                <div id="shade3" className="swatch"onClick={() => this.changeColor("#444444")}></div>
                <div id="shade4" className="swatch"onClick={() => this.changeColor("#717171")}></div>
                <div id="shade5" className="swatch"onClick={() => this.changeColor("#a5a5a5")}></div>
                <div id="shade6" className="swatch"onClick={() => this.changeColor("#dad9d9")}></div>
                <div id="shade7" className="swatch"onClick={() => this.changeColor("white")}>
                  <i className="fas fa-eraser"></i>
                </div>
              </div>
            </section>
            <section className="size-options">
              <div id="linewidth-1" onClick={() => this.changeLineWidth(1)}>
                <i className="fas fa-circle"></i>
              </div>
              <div id="linewidth-5" onClick={() => this.changeLineWidth(5)}>
                <i className="fas fa-circle"></i>
              </div>
              <div id="linewidth-10" onClick={() => this.changeLineWidth(10)}>
                <i className="fas fa-circle"></i>
              </div>
              <div id="linewidth-20" onClick={() => this.changeLineWidth(20)}>
                <i className="fas fa-circle"></i>
              </div>
              <div id="linewidth-30" onClick={() => this.changeLineWidth(30)}>
                <i className="fas fa-circle"></i>
              </div>
              <div id="linewidth-40" onClick={() => this.changeLineWidth(40)}>
                <i className="fas fa-circle"></i>
              </div>
              <div id="linewidth-50" onClick={() => this.changeLineWidth(50)}>
                <i className="fas fa-circle"></i>
              </div>
              <div id="linewidth-75" onClick={() => this.changeLineWidth(75)}>
                <i className="fas fa-circle"></i>
              </div>
              <div id="linewidth-big" onClick={() => this.changeLineWidth(100)}>
                BIG
              </div>
              <div id="linewidth-real-big" onClick={() => this.changeLineWidth(200)}>
                BIG
              </div>
            </section>
          </section>
          <canvas
          className="paint"
            ref="canvas"
            width="600px"
            height="600px"
            onMouseDown={(e) =>
              this.startDrawing(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
            }
            onMouseUp={() => this.endDrawing()}
            onMouseLeave={() => this.endDrawing()}
            onMouseMove={(e) =>
              this.draw(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
            }
          />
        </section>
        <section className="right-room">
          <div className="button-container">
            <div className="save-artwork-button" onClick={() => this.handleSaveArtwork()}>Save Artwork</div>
            <div id="myModal-artwork-nosave" className="modal">
              <div className="modal-content">
                <span className="close">&times;</span>
                <p>Please login to save the canvas</p>
                <div><RoomLogInFormContainer /></div>
              </div>
            </div>
            <div id="myModal-artwork-save" className="modal">
              <div className="modal-content">
                <span className="close">&times;</span>
                <p>Your artwork is saved in your page&nbsp;<i className="far fa-save"></i></p>
              </div>
            </div>
            <div className="save-artwork-button" onClick={() => this.handleInvite()}>Invite</div>
            <div id="myModal-invite" className="modal">
              <div className="modal-content">
                <span className="close">&times;</span>
                <p>Your link is copied to your clipboard&nbsp;<i className="fas fa-clipboard-check"></i></p>
              </div>
            </div>
          </div>

          <Webcam/>
          
          <div className="carousel-container">
              <div className="carousel-image-wrapper">
                <img className="carousel-image" src={this.state.carouselImg} alt="inspiration"/>
              </div>
              <div className="carousel-bar">
                <div className="carousel-button" onClick={()=> this.handleCarouselClick('01')}>1</div>
                <div className="carousel-button" onClick={()=> this.handleCarouselClick('02')}>2</div>
                <div className="carousel-button" onClick={()=> this.handleCarouselClick('03')}>3</div>
                <div className="carousel-button" onClick={()=> this.handleCarouselClick('04')}>4</div>
              </div>
          </div>
         </section>
        </div>
        <Footer />
         </>
      );
    }
  }
}

export default withRouter(Room);
