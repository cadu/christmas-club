import React, { useRef } from "react";
import { useEffect } from "react";

const ChristmasTree = () => {
  const ref = useRef(null);

  useEffect(() => {
    const thetaMin = 0;
    const thetaMax = 6 * Math.PI;
    const period = 5;
    const lineSpacing = 1 / 30;
    const lineLength = lineSpacing / 2;
    const yScreenOffset = 300;
    const xScreenOffset = 260;
    const xScreenScale = 360;
    const yScreenScale = 360;
    const yCamera = 2;
    const zCamera = -3;

    const rate = 1 / (2 * Math.PI); // every rotation y gets one bigger
    const factor = rate / 3;

    function run() {
      const c = ref.current;
      const ctx = c.getContext("2d"),
        spirals = [
          new Spiral({
            foreground: "#220000", // Second shadow for red spiral
            angleOffset: Math.PI * 0.92,
            factor: 0.9 * factor,
          }),
          new Spiral({
            foreground: "#002211", // Second shadow for cyan spiral
            angleOffset: -Math.PI * 0.08,
            factor: 0.9 * factor,
          }),
          new Spiral({
            foreground: "#660000", // red spiral shadow
            angleOffset: Math.PI * 0.95,
            factor: 0.93 * factor,
          }),
          new Spiral({
            foreground: "#003322", // cyan spiral shadow
            angleOffset: -Math.PI * 0.05,
            factor: 0.93 * factor,
          }),
          new Spiral({
            foreground: "#ff0000", // red Spiral
            angleOffset: Math.PI,
            factor: factor,
          }),
          new Spiral({
            foreground: "#00ffcc", // cyan spiral
            angleOffset: 0,
            factor: factor,
          }),
        ];

      renderFrame(); // animation loop starts here

      function renderFrame() {
        requestAnimationFrame(renderFrame);

        ctx.clearRect(0, 0, 500, 500);
        ctx.beginPath();
        spirals.forEach(renderSpiral);
      }

      function renderSpiral(spiral) {
        spiral.render(ctx);
      }

      function Spiral(config) {
        let offset = 0;
        const lineSegments = computeLineSegments();

        this.render = function (ctx) {
          offset -= 1;
          if (offset <= -period) {
            offset += period;
          }

          lineSegments[offset].forEach(drawLineSegment);
        };

        function drawLineSegment(segment) {
          stroke(config.foreground, segment.start.alpha);
          ctx.moveTo(segment.start.x, segment.start.y);
          ctx.lineTo(segment.end.x, segment.end.y);
        }

        function computeLineSegments() {
          const lineSegments = {};
          const factor = config.factor;
          let thetaNew, thetaOld;
          for (let offset = 0; offset > -period; offset--) {
            const lines = [];
            lineSegments[offset] = lines;
            for (
              let theta =
                thetaMin +
                getThetaChangeRate(
                  thetaMin,
                  (offset * lineSpacing) / period,
                  rate,
                  factor
                );
              theta < thetaMax;
              theta += getThetaChangeRate(theta, lineSpacing, rate, factor)
            ) {
              thetaOld = theta >= thetaMin ? theta : thetaMin;
              thetaNew =
                theta + getThetaChangeRate(theta, lineLength, rate, factor);

              if (thetaNew <= thetaMin) {
                continue;
              }

              lines.push({
                start: getPointByAngle(
                  thetaOld,
                  factor,
                  config.angleOffset,
                  rate
                ),
                end: getPointByAngle(
                  thetaNew,
                  factor,
                  config.angleOffset,
                  rate
                ),
              });
            }
          }

          return lineSegments;
        }
      }

      function stroke(color, alpha) {
        ctx.closePath();
        ctx.stroke();
        ctx.strokeStyle = color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
      }

      function getPointByAngle(theta, factor, angleOffset, rate) {
        const x = theta * factor * Math.cos(theta + angleOffset);
        const z = -theta * factor * Math.sin(theta + angleOffset);
        const y = rate * theta;
        // now that we have 3d coordinates, project them into 2d space:
        const point = projectTo2d(x, y, z);
        // calculate point's color alpha level:
        point.alpha =
          Math.atan((((y * factor) / rate) * 0.1 + 0.02 - z) * 40) * 0.35 +
          0.65;

        return point;
      }

      function getThetaChangeRate(theta, lineLength, rate, factor) {
        return (
          lineLength / Math.sqrt(rate * rate + factor * factor * theta * theta)
        );
      }

      function projectTo2d(x, y, z) {
        return {
          x: xScreenOffset + xScreenScale * (x / (z - zCamera)),
          y: yScreenOffset + yScreenScale * ((y - yCamera) / (z - zCamera)),
        };
      }

      // I actually want it to be slower then 60fps
      function requestAnimationFrame(callback) {
        window.setTimeout(callback, 1000 / 24);
      }
    }
    run();
  }, []);

  return (
    <canvas
      className="flex w-200 h-200 absolute top-0 left-0 bg-slate-900 block m-auto"
      id="scene"
      ref={ref}
    ></canvas>
  );
};

export default ChristmasTree;
