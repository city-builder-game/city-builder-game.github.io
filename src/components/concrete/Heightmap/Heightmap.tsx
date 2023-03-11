import React, { useEffect, useRef } from "react";
import getColor from "../../../utils/getHeightmapColor";
import MapGenerator from "../../../utils/MapGenerator";

type Props = {
    width: number;
    height: number;
    scale: number;
    generator?: MapGenerator;
};

const Heightmap: React.FC<Props> = ({
    width,
    height,
    scale,
    generator,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const mapGenerator = generator || new MapGenerator(scale, width, height)

        const canvas = canvasRef?.current;
        const ctx = canvas?.getContext("2d");
        if (ctx) {
            ctx.clearRect(0, 0, width, height);
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    ctx.fillStyle = getColor(
                        (mapGenerator.getHeight(x, y) * 1.5) / 2
                    );
                    ctx.fillRect(x, y, 1, 1);
                }
            }
        }
    }, [width, height, scale, generator]);

    return (
        <canvas ref={canvasRef} width={width} height={height} style={{ width, height }}></canvas>
    );
};

export default Heightmap;
