import React, { useState, useEffect, useRef } from "react";
import { createNoise2D } from 'simplex-noise';
import getColor from "../../../utils/getColor";

type Props = {
    width: number;
    height: number;
    scale: number;
    maxHeight: number;
};

const Heightmap: React.FC<Props> = ({
    width,
    height,
    scale,
    maxHeight,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const noise = createNoise2D();

        const canvas = canvasRef?.current;
        const ctx = canvas?.getContext("2d");
        if (ctx) {
            ctx.clearRect(0, 0, width, height);

            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    ctx.fillStyle = getColor(
                        (maxHeight * noise(
                            scale * x / width - 0.5,
                            scale * y / height - 0.5
                        ) + maxHeight) / 2
                    );
                    ctx.fillRect(x, y, 1, 1);
                }
            }
        }
    }, [width, height, scale, maxHeight]);

    return (
        <canvas ref={canvasRef} width={width} height={height} style={{ width, height }}></canvas>
    );
};

export default Heightmap;
