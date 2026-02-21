import React, { useState, useEffect } from 'react';
import './AsciiDonut.css';

const AsciiDonut: React.FC = () => {
  const [frame, setFrame] = useState<string>('');

  useEffect(() => {
    // =============================
    // CONFIGURAÇÕES CONTROLÁVEIS
    // =============================

    const canvasWidth = 60;
    const canvasHeight = 30;

    const horizontalScale = 35; // 🔎 zoom horizontal (tamanho visual)
    const verticalScale = 20;   // 🔎 zoom vertical (tamanho visual)

    const donutRadius = 2;      // 🍩 tamanho estrutural do donut

    const rotationSpeedX = 0.025; // 🔄 velocidade rotação eixo X
    const rotationSpeedZ = 0.015; // 🔄 velocidade rotação eixo Z

    const frameDelay = 30; // 🎞 velocidade da animação (FPS)

    // =============================

    let rotationX = 0;
    let rotationZ = 0;

    let intervalId: ReturnType<typeof setInterval>;

    const renderFrame = () => {
      let screenBuffer: string[] = [];
      let depthBuffer: number[] = [];

      rotationX += rotationSpeedX;
      rotationZ += rotationSpeedZ;

      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);
      const cosZ = Math.cos(rotationZ);
      const sinZ = Math.sin(rotationZ);

      // Limpa tela
      for (let i = 0; i < canvasWidth * canvasHeight; i++) {
        screenBuffer[i] =
          i % canvasWidth === canvasWidth - 1 ? "\n" : " ";
        depthBuffer[i] = 0;
      }

      // Loop dos ângulos
      for (let theta = 0; theta < 6.28; theta += 0.07) {
        const cosTheta = Math.cos(theta);
        const sinTheta = Math.sin(theta);

        for (let phi = 0; phi < 6.28; phi += 0.02) {
          const cosPhi = Math.cos(phi);
          const sinPhi = Math.sin(phi);

          const circleX = cosTheta + donutRadius;
          const depth = 1 / (sinPhi * circleX * sinX + sinTheta * cosX + 5);
          const circleY = sinPhi * circleX * cosX - sinTheta * sinX;

          const projectedX = Math.floor(
            canvasWidth / 2 +
            horizontalScale * depth * (cosPhi * circleX * cosZ - circleY * sinZ)
          );

          const projectedY = Math.floor(
            canvasHeight / 2 +
            verticalScale * depth * (cosPhi * circleX * sinZ + circleY * cosZ)
          );

          const bufferIndex = projectedX + canvasWidth * projectedY;

          const luminance = Math.floor(
            8 *
              ((sinTheta * sinX -
                sinPhi * cosTheta * cosX) *
                cosZ -
                sinPhi * cosTheta * sinX -
                sinTheta * cosX -
                cosPhi * cosTheta * sinZ)
          );

          if (
            projectedY >= 0 &&
            projectedY < canvasHeight &&
            projectedX >= 0 &&
            projectedX < canvasWidth - 1 &&
            depth > depthBuffer[bufferIndex]
          ) {
            depthBuffer[bufferIndex] = depth;
            screenBuffer[bufferIndex] =
              ".,-~:;=!*#$@"[luminance > 0 ? luminance : 0];
          }
        }
      }

      setFrame(screenBuffer.join(""));
    };

    intervalId = setInterval(renderFrame, frameDelay);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="donut-container">
      <pre className="ascii-donut">{frame}</pre>
    </div>
  );
};

export default AsciiDonut;
