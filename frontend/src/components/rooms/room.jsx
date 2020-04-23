import React from "react";
import { withRouter } from "react-router-dom";
import io from "socket.io-client";
import "./room.css";

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawing: false,
      color: "black",
      lineWidth: 5,
      lineCap: "round",
    };

    this.socket = io.connect("http://localhost:5000");

    this.changeColor = this.changeColor.bind(this);
    this.changeLineWidth = this.changeLineWidth.bind(this);
    this.handleSaveArtwork = this.handleSaveArtwork.bind(this);
  }

  componentDidMount() {
    const that = this;
    this.props.getRoom(this.props.roomId);

    this.socket.on("startDrawing", function (data) {
      that.receiveStartDrawing(data.x, data.y);
    });

    this.socket.emit("create", this.props.match.params.id)


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

    this.socket.emit("startDrawing", (this.props.match.params.id), {
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

    this.socket.emit("draw", (this.props.match.params.id), {
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
    const dataUrl = this.refs.canvas.toDataURL();
    this.props.saveArtwork({ 
      userId: this.props.currentUser.id,
      dataUrl: dataUrl,
    })
    //For Later:  Add .then to prompt modal message that Artwork was successfully saved
  }

      
  render() {
        if (Object.values(this.props.room).length === 0) {
          return (<div className="invalid-room">Not a Valid Room</div>);
        } else {
          return (
            <div className="room-container">
          <section className="tool-options">
            <div id="red" onClick={() => this.changeColor("red")}></div>
            <div id="orange" onClick={() => this.changeColor("orange")}></div>
            <div id="yellow" onClick={() => this.changeColor("yellow")}></div>
            <div id="green" onClick={() => this.changeColor("green")}></div>
            <div id="blue" onClick={() => this.changeColor("blue")}></div>
            <div id="purple" onClick={() => this.changeColor("purple")}></div>
            <div id="black" onClick={() => this.changeColor("black")}></div>
            <div id="linewidth-5" onClick={() => this.changeLineWidth(5)}>
              5
            </div>
            <div id="linewidth-10" onClick={() => this.changeLineWidth(10)}>
              10
            </div>
            <div id="white" onClick={() => this.changeColor("white")}>
              ERASE
            </div>
          </section>
          <canvas
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
          <div className="save-artwork-button" onClick={() => this.handleSaveArtwork()}>Save Artwork</div>
        </div>
      );
    }
}};
  
export default withRouter(Room);
  