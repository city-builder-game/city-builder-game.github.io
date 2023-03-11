import React, { useEffect, useRef } from "react";
import getColor from "../../../utils/getTerrainMapColor";
import MapGenerator from "../../../utils/MapGenerator";

type Props = {
    width: number;
    height: number;
    scale: number;
    generator?: MapGenerator;
};

const TerrainMap: React.FC<Props> = ({
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

            const horiz = 20
            const size = horiz * 2 / 3
            const vert = size * Math.sqrt(3)
            for (let y = 0; y < height; y = y + vert) {
                for (let x = 0; x < width; x = x + horiz) {
                    let modY = y + (vert / 2) * ((x / horiz) % 2)
                    ctx.fillStyle = getColor(
                        mapGenerator.getHeight(x, modY),
                        mapGenerator.getBiomeValue(x, modY)
                    );
                    ctx.beginPath();
                    ctx.moveTo(x + size * Math.cos(0), modY + size * Math.sin(0));
                    for (let i = 1; i <= 6; i++) {
                        const angle = i * ((2 * Math.PI) / 6);
                        const vertexX = x + size * Math.cos(angle);
                        const vertexY = modY + size * Math.sin(angle);
                        ctx.lineTo(vertexX, vertexY);
                    }
                    ctx.closePath();
                    ctx.fill();
                }
            }
        }
    }, [width, height, scale, generator]);

    return (
        <canvas ref={canvasRef} width={width} height={height} style={{ width, height }}></canvas>
    );
};

export default TerrainMap;
