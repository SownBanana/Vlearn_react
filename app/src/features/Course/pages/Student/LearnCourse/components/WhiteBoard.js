import { Box, Paper, IconButton, Slider, Select, MenuItem, makeStyles } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react'
import { ColorPalette, ColorPicker } from 'material-ui-color';
import { Delete } from '@material-ui/icons';

export default function WhiteBoard({ dataHandle = null, data = null, clearTrigger = false, setClearTrigger = null }) {
    const PenStyle = {
        FREE: 0,
        LINE: 1,
        RECTANGLE: 2,
        CIRCLE: 3,

    }
    const palette = {
        red: '#ff0000',
        blue: '#0000ff',
        green: 'green',
        yellow: 'yellow',
        orange: 'orange',
        purple: 'purple',
        gray: 'gray',
        black: 'black',
        pink: 'pink',
        white: 'white',
    };
    const classes = useStyles();
    var timeOut = null;
    const [draw, setDraw] = useState({
        lineWidth: 5,
        lineJoin: 'round',
        lineCap: 'round',
        strokeStyle: 'blue',
        pen: PenStyle.FREE
    });
    const [ctx, setCtx] = useState(null);
    const [ready, setReady] = useState(false);
    const clearBoard = () => {
        if (timeOut) clearTimeout(timeOut);
        var canvas = document.querySelector('#board');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        timeOut = setTimeout(() => {
            if (dataHandle) dataHandle('');
        }, 700)
    }
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        if (clearTrigger) {
            var canvas = document.querySelector('#board');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            setClearTrigger(false);
        }
    }, [clearTrigger])

    useEffect(() => {
        var canvas = document.querySelector('#board');
        setCtx(canvas.getContext('2d'));
        setReady(true);
    }, [])

    useEffect(() => {
        if (ctx) {
            ctx.lineWidth = draw.lineWidth;
            ctx.lineJoin = draw.lineJoin;
            ctx.lineCap = draw.lineCap;
            ctx.strokeStyle = draw.strokeStyle;
        }
    }, [draw])

    useEffect(() => {
        if (ready) {
            var canvas = document.querySelector('#board');
            // setCtx(canvas.getContext('2d'));

            // var sketch = document.querySelector('#sketch');
            var sketch = document.querySelector('#sketch');
            var sketch_style = getComputedStyle(sketch);
            canvas.width = parseInt(sketch_style.getPropertyValue('width'));
            canvas.height = parseInt(sketch_style.getPropertyValue('height'));
        }
    }, [ready]);

    var index = 0;
    useEffect(() => {
        if (ready) {

            index += 1;
            console.log("New Event", index)
            var canvas = document.querySelector('#board');

            var mouse = { x: 0, y: 0 };
            var last_mouse = { x: 0, y: 0 };

            /* Mouse Capturing Work */
            canvas.addEventListener('mousemove', function (e) {
                last_mouse.x = mouse.x;
                last_mouse.y = mouse.y;

                mouse.x = e.pageX - this.offsetLeft;
                mouse.y = e.pageY - this.offsetTop;
            }, false);


            /* Drawing on Paint App */
            ctx.lineWidth = draw.lineWidth;
            ctx.lineJoin = draw.lineJoin;
            ctx.lineCap = draw.lineCap;
            ctx.strokeStyle = draw.strokeStyle;

            var start = {};
            var mouseDownFunction = () => {
                canvas.addEventListener('mousemove', onPaint, false);
                start.x = last_mouse.x;
                start.y = last_mouse.y;
                if (draw.pen !== PenStyle.FREE) {
                    ctx.beginPath();
                    ctx.moveTo(start.x, start.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
                // console.log("from: ", start.x, start.y);
            }
            canvas.addEventListener('mousedown', mouseDownFunction, false);

            var mouseUpFunction = () => {
                canvas.removeEventListener('mousemove', onPaint, false);
                // console.log("to  : ", mouse.x, mouse.y);
                if (draw.pen === PenStyle.CIRCLE) {
                    ctx.beginPath();
                    ctx.arc(Math.floor((mouse.x + start.x) / 2), Math.floor((mouse.y + start.y) / 2), Math.floor(Math.sqrt((start.x - mouse.x) * (start.x - mouse.x) + (start.y - mouse.y) * (start.y - mouse.y)) / 2), 0, 2 * Math.PI);
                    ctx.stroke();
                    timeOut = setTimeout(() => {
                        if (dataHandle) dataHandle(canvas.toDataURL('img/png'));
                    }, 500)
                } else if (draw.pen === PenStyle.LINE) {
                    ctx.beginPath();
                    ctx.moveTo(start.x, start.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                    timeOut = setTimeout(() => {
                        if (dataHandle) dataHandle(canvas.toDataURL('img/png'));
                    }, 500)
                } else if (draw.pen === PenStyle.RECTANGLE) {
                    ctx.beginPath();
                    ctx.rect(start.x, start.y, mouse.x - start.x, mouse.y - start.y);
                    ctx.stroke();
                    timeOut = setTimeout(() => {
                        if (dataHandle) dataHandle(canvas.toDataURL('img/png'));
                    }, 500)
                }
            }

            canvas.addEventListener('mouseup', mouseUpFunction, false);

            var onPaint = function () {
                if (timeOut) clearTimeout(timeOut);
                if (draw.pen === PenStyle.FREE) {
                    ctx.beginPath();
                    ctx.moveTo(last_mouse.x, last_mouse.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.closePath();
                    ctx.stroke();

                    timeOut = setTimeout(() => {
                        if (dataHandle) dataHandle(canvas.toDataURL('img/png'));
                    }, 700)
                }
            };
        }
        return () => {
            try {
                var canvas = document.querySelector('#board');
                canvas.removeEventListener('mousedown', mouseDownFunction, false);
                canvas.removeEventListener('mouseup', mouseUpFunction, false);
            } catch (e) {

            }
        }
    }, [draw.pen, ready]);

    useEffect(() => {
        console.log("cal this ========")
        if (data) {
            console.log(data.length)
            var interval = setInterval(() => {
                if (isDrawing) return;
                setIsDrawing(true);
                clearInterval(interval);
                console.log("========Drawing image");
                var image = new Image();
                var canvas = document.querySelector('#board');
                var ctx = canvas.getContext('2d');
                image.onload = function () {
                    ctx.drawImage(image, 0, 0);
                }
                image.src = data;
                setIsDrawing(false);
            }, 200);
        }
    }, [data])
    return (
        <Paper>
            <Box display="flex" justifyContent="space-between">
                <Box display="flex" alignItems="center" width="100%">
                    <ColorPalette
                        palette={palette}
                        onSelect={(color) => {
                            setDraw({ ...draw, strokeStyle: color })
                        }}
                    />
                    <div
                        style={{ marginLeft: 5 }}
                    >

                        <ColorPicker
                            value={draw.strokeStyle}
                            hideTextfield
                            onChange={(color) => {
                                setDraw({ ...draw, strokeStyle: `#${color.hex}` })
                            }}

                        />
                    </div>
                    <Select
                        style={{ marginLeft: "10px" }}
                        classes={{
                            root: classes.selectRoot
                        }}
                        value={draw.pen}
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                            setDraw({ ...draw, pen: e.target.value })
                        }}
                        displayEmpty
                    >
                        <MenuItem value={PenStyle.FREE}>Bút</MenuItem>
                        <MenuItem value={PenStyle.LINE}>Đường</MenuItem>
                        <MenuItem value={PenStyle.CIRCLE}>Tròn</MenuItem>
                        <MenuItem value={PenStyle.RECTANGLE}>Chữ nhật</MenuItem>
                    </Select>
                    <Slider
                        value={draw.lineWidth}
                        getAriaValueText={(value) => value}
                        valueLabelDisplay="auto"
                        onChange={(e, value) => {
                            setDraw({ ...draw, lineWidth: value })
                        }}
                        step={1}
                        min={1}
                        max={50}
                        style={{ width: "20%", marginLeft: "10px" }}
                    />

                </Box>
                <IconButton onClick={clearBoard} size="small">
                    <Delete />
                </IconButton>
            </Box>
            <Box id="sketch" style={{ height: "500px", backgroundColor: "white", border: "5px solid gray" }}>
                <canvas id="board" >
                </canvas>
            </Box>
        </Paper>
    )
}

const useStyles = makeStyles((theme) => ({
    selectRoot: {
        padding: "5px 30px 5px 5px"
    }
}))