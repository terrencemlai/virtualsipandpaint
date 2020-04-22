import React from "react";
import { withRouter } from "react-router-dom";
import io from "socket.io-client";


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
  }

  componentDidMount() {
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

    this.socket.emit("startDrawing", {
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

    this.socket.emit("draw", {
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

  render() {
    return (
      <div className="room-container">

      </div>
    );
  }
}

export default withRouter(Room);
