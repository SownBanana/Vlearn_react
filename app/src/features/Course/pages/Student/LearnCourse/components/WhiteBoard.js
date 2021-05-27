import { Box, Paper, IconButton, Slider } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react'
import { ColorPalette, ColorPicker } from 'material-ui-color';
import { Delete } from '@material-ui/icons';

export default function WhiteBoard({ dataHandle = null, data = null }) {
    const palette = {
        red: '#ff0000',
        blue: '#0000ff',
        green: 'green',
        yellow: 'yellow',
        cyan: 'cyan',
        lime: 'lime',
        gray: 'gray',
        orange: 'orange',
        purple: 'purple',
        black: 'black',
        pink: 'pink',
        darkblue: 'darkblue',
        white: 'white',
    };

    var timeOut = null;
    const [draw, setDraw] = useState({
        lineWidth: 5,
        lineJoin: 'round',
        lineCap: 'round',
        strokeStyle: 'blue',
    });
    const [ctx, setCtx] = useState(null);
    const [ready, setReady] = useState(false);
    const clearBoard = () => {
        var canvas = document.querySelector('#board');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    const [isDrawing, setIsDrawing] = useState(false);
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

            var sketch = document.querySelector('#sketch');
            var sketch = document.querySelector('#sketch');
            var sketch_style = getComputedStyle(sketch);
            canvas.width = parseInt(sketch_style.getPropertyValue('width'));
            canvas.height = parseInt(sketch_style.getPropertyValue('height'));

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

            canvas.addEventListener('mousedown', function (e) {
                canvas.addEventListener('mousemove', onPaint, false);
            }, false);

            canvas.addEventListener('mouseup', function () {
                canvas.removeEventListener('mousemove', onPaint, false);
            }, false);
            var onPaint = function () {
                if (timeOut) clearTimeout(timeOut);

                ctx.beginPath();
                ctx.moveTo(last_mouse.x, last_mouse.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.closePath();
                ctx.stroke();

                timeOut = setTimeout(() => {
                    if (dataHandle) dataHandle(canvas.toDataURL('img/png'));
                }, 700)

            };
        }
    }, [ready]);

    useEffect(() => {
        if (data) {
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
                        style={{ width: "26%", marginLeft: "10px" }}
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
