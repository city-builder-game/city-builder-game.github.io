import { createNoise2D, NoiseFunction2D } from 'simplex-noise';

export default class MapGenerator {
  noiseScale: number
  width: number
  height: number
  landmassNoise1: NoiseFunction2D
  landmassNoise2: NoiseFunction2D
  landmassNoise3: NoiseFunction2D
  biomeNoise: NoiseFunction2D

  constructor(noiseScale: number, width: number, height: number) {
    this.noiseScale = noiseScale
    this.width = width
    this.height = height
    this.landmassNoise1 = createNoise2D();
    this.landmassNoise2 = createNoise2D();
    this.landmassNoise3 = createNoise2D();
    this.biomeNoise = createNoise2D();
  }

  getHeight(x: number, y: number) {
    const { width, height, noiseScale } = this
    const borderModifier = Math.max(
      0,
      100 - x,
      100 - y,
      100 - width + x,
      100 - height + y,
    ) / 100
    return (
      this.landmassNoise1(
        noiseScale * x / width - 0.5,
        noiseScale * y / height - 0.5
      ) * 6 +
      this.landmassNoise2(
        noiseScale * x * 5 / width - 0.5,
        noiseScale * y * 5 / height - 0.5
      ) * 3 +
      this.landmassNoise3(
        noiseScale * x * 10 / width - 0.5,
        noiseScale * y * 10 / height - 0.5
      ) + 10
    ) / 20 - borderModifier
  }

  getBiomeValue(x: number, y: number) {
    return this.biomeNoise(
      this.noiseScale * x / this.width - 0.5,
      this.noiseScale * y / this.height - 0.5
    )
  }
}
