import React, { useState, useEffect, useRef } from 'react';

interface ThreeDCanvasProps {
  positionKey: 'encima de' | 'debajo de' | 'detrás de' | 'delante de' | 'al lado' | 'a la derecha' | 'a la izquierda' | 'entre' | 'alrededor de' | 'dentro de' | 'enfrente de';
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

export default function ThreeDCanvas({ positionKey }: ThreeDCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [yaw, setYaw] = useState<number>(0.6); // Camera rot horizontal
  const [pitch, setPitch] = useState<number>(0.4); // Camera rot vertical
  const isDragging = useRef<boolean>(false);
  const prevMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // 3D Point Projection to 2D
  const project = (pt: Point3D, width: number, height: number): { x: number; y: number; depth: number } => {
    // Rotation around Z (yaw)
    const cosY = Math.cos(yaw);
    const sinY = Math.sin(yaw);
    const x1 = pt.x * cosY - pt.y * sinY;
    const y1 = pt.x * sinY + pt.y * cosY;

    // Rotation around X (pitch)
    const cosP = Math.cos(pitch);
    const sinP = Math.sin(pitch);
    const y2 = y1 * cosP - pt.z * sinP;
    const z2 = y1 * sinP + pt.z * cosP;

    // Standard perspective projection
    const distance = 8;
    const scale = (distance / (distance + y2)) * 180;
    
    return {
      x: width / 2 + x1 * scale,
      y: height / 2 - z2 * scale, // invert Y for screen coords
      depth: y2
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Draw subtle background grid/gridlines on floor
      ctx.strokeStyle = 'rgba(203, 213, 225, 0.2)';
      ctx.lineWidth = 1;
      for (let i = -3; i <= 3; i++) {
        // Grid lines X direction
        const p1 = project({ x: i, y: -3, z: -1.2 }, width, height);
        const p2 = project({ x: i, y: 3, z: -1.2 }, width, height);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();

        // Grid lines Y direction
        const p3 = project({ x: -3, y: i, z: -1.2 }, width, height);
        const p4 = project({ x: 3, y: i, z: -1.2 }, width, height);
        ctx.beginPath();
        ctx.moveTo(p3.x, p3.y);
        ctx.lineTo(p4.x, p4.y);
        ctx.stroke();
      }

      // Define 3D coordinates for a desk/table
      const tableTop: Point3D[] = [
        { x: -1.8, y: -1.2, z: -0.4 },
        { x: 1.8, y: -1.2, z: -0.4 },
        { x: 1.8, y: 1.2, z: -0.4 },
        { x: -1.8, y: 1.2, z: -0.4 },
      ];

      const tableLegs: Point3D[][] = [
        [{ x: -1.7, y: -1.1, z: -0.4 }, { x: -1.7, y: -1.1, z: -1.2 }],
        [{ x: 1.7, y: -1.1, z: -0.4 }, { x: 1.7, y: -1.1, z: -1.2 }],
        [{ x: 1.7, y: 1.1, z: -0.4 }, { x: 1.7, y: 1.1, z: -1.2 }],
        [{ x: -1.7, y: 1.1, z: -0.4 }, { x: -1.7, y: 1.1, z: -1.2 }],
      ];

      // Draw Table legs
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 3;
      tableLegs.forEach(leg => {
        const p1 = project(leg[0], width, height);
        const p2 = project(leg[1], width, height);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // Draw Table Top Surface
      const tableProj = tableTop.map(pt => project(pt, width, height));
      ctx.fillStyle = '#e2e8f0';
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(tableProj[0].x, tableProj[0].y);
      for (let i = 1; i < tableProj.length; i++) {
        ctx.lineTo(tableProj[i].x, tableProj[i].y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Draw 3D Main Box at Center
      // Cube vertices from -0.4 to 0.4 on tabletop (z = -0.4)
      const boxZMin = -0.4;
      const boxZMax = 0.4;
      const boxHalf = 0.4;
      const boxVertices: Point3D[] = [
        { x: -boxHalf, y: -boxHalf, z: boxZMin },
        { x: boxHalf, y: -boxHalf, z: boxZMin },
        { x: boxHalf, y: boxHalf, z: boxZMin },
        { x: -boxHalf, y: boxHalf, z: boxZMin },
        { x: -boxHalf, y: -boxHalf, z: boxZMax },
        { x: boxHalf, y: -boxHalf, z: boxZMax },
        { x: boxHalf, y: boxHalf, z: boxZMax },
        { x: -boxHalf, y: boxHalf, z: boxZMax },
      ];

      const boxProj = boxVertices.map(pt => project(pt, width, height));

      // Define 3D faces (indices)
      const boxFaces = [
        { idxs: [0, 1, 5, 4], fill: 'rgba(249, 115, 22, 0.85)', name: 'front' },  // Orange front
        { idxs: [1, 2, 6, 5], fill: 'rgba(234, 88, 12, 0.85)', name: 'right' },   // Dark orange right
        { idxs: [2, 3, 7, 6], fill: 'rgba(194, 65, 12, 0.85)', name: 'back' },    // Darker back
        { idxs: [3, 0, 4, 7], fill: 'rgba(251, 146, 60, 0.85)', name: 'left' },   // Light orange
        { idxs: [4, 5, 6, 7], fill: 'rgba(253, 186, 116, 0.9)', name: 'top' },    // Top face
        { idxs: [0, 1, 2, 3], fill: 'rgba(154, 52, 18, 0.8)', name: 'bottom' }    // Bottom
      ];

      // Sort faces by depth of their centers for back-to-front rendering (Painter's algorithm)
      const faceDepth = boxFaces.map(face => {
        let avgDepth = 0;
        face.idxs.forEach(idx => {
          avgDepth += boxProj[idx].depth;
        });
        return { face, depth: avgDepth / 4 };
      });
      faceDepth.sort((a, b) => b.depth - a.depth); // lower depth scale means closer to camera

      // Draw Cube faces
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#7c2d12';
      faceDepth.forEach(({ face }) => {
        ctx.fillStyle = face.fill;
        ctx.beginPath();
        const start = boxProj[face.idxs[0]];
        ctx.moveTo(start.x, start.y);
        for (let i = 1; i < face.idxs.length; i++) {
          const pt = boxProj[face.idxs[i]];
          ctx.lineTo(pt.x, pt.y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      });

      // Placement of Spheres based on positionKey
      // Box is center at (0, 0, (boxZMin+boxZMax)/2) = (0, 0, 0).
      let balls: { pos: Point3D; color: string; label: string }[] = [];

      switch (positionKey) {
        case 'encima de':
          balls.push({ pos: { x: 0, y: 0, z: boxZMax + 0.3 }, color: '#10b981', label: 'Գնդակ' });
          break;
        case 'debajo de':
          balls.push({ pos: { x: 0, y: 0, z: -0.9 }, color: '#10b981', label: 'Գնդակ' });
          break;
        case 'detrás de':
          // Behind means more positive in Y direction in camera coordinate projection, or deeper in scene
          balls.push({ pos: { x: 0, y: 0.9, z: 0 }, color: '#10b981', label: 'Գնդակ' });
          break;
        case 'delante de':
          // In front in Y
          balls.push({ pos: { x: 0, y: -0.9, z: 0 }, color: '#10b981', label: 'Գնդակ' });
          break;
        case 'al lado':
          balls.push({ pos: { x: 1.0, y: 0, z: 0 }, color: '#10b981', label: 'Գնդակ' });
          break;
        case 'a la derecha':
          balls.push({ pos: { x: 1.1, y: 0, z: 0 }, color: '#10b981', label: 'Գնդակ' });
          break;
        case 'a la izquierda':
          balls.push({ pos: { x: -1.1, y: 0, z: 0 }, color: '#10b981', label: 'Գնդակ' });
          break;
        case 'entre':
          // Let's place another cylinder or block and put a ball in between
          balls.push({ pos: { x: 0, y: 0, z: 0 }, color: '#10b981', label: 'Գնդակ' });
          // Second block for 'between'
          const secondaryBlock: Point3D[] = [
            { x: -1.3, y: -0.3, z: -0.4 },
            { x: -0.8, y: -0.3, z: -0.4 },
            { x: -0.8, y: 0.3, z: -0.4 },
            { x: -1.3, y: 0.3, z: -0.4 },
            { x: -1.3, y: -0.3, z: 0.2 },
            { x: -0.8, y: -0.3, z: 0.2 },
            { x: -0.8, y: 0.3, z: 0.2 },
            { x: -1.3, y: 0.3, z: 0.2 }
          ].map(pt => ({ ...pt }));
          const pBlockProj = secondaryBlock.map(pt => project(pt, width, height));
          ctx.fillStyle = 'rgba(67, 56, 202, 0.7)'; // Purple secondary block
          ctx.strokeStyle = '#312e81';
          // Front face
          ctx.beginPath();
          ctx.moveTo(pBlockProj[0].x, pBlockProj[0].y);
          ctx.lineTo(pBlockProj[1].x, pBlockProj[1].y);
          ctx.lineTo(pBlockProj[5].x, pBlockProj[5].y);
          ctx.lineTo(pBlockProj[4].x, pBlockProj[4].y);
          ctx.closePath();
          ctx.fill(); ctx.stroke();
          // Top face
          ctx.beginPath();
          ctx.moveTo(pBlockProj[4].x, pBlockProj[4].y);
          ctx.lineTo(pBlockProj[5].x, pBlockProj[5].y);
          ctx.lineTo(pBlockProj[6].x, pBlockProj[6].y);
          ctx.lineTo(pBlockProj[7].x, pBlockProj[7].y);
          ctx.closePath();
          ctx.fill(); ctx.stroke();

          // Third block
          const thirdBlock: Point3D[] = [
            { x: 0.8, y: -0.3, z: -0.4 },
            { x: 1.3, y: -0.3, z: -0.4 },
            { x: 1.3, y: 0.3, z: -0.4 },
            { x: 0.8, y: 0.3, z: -0.4 },
            { x: 0.8, y: -0.3, z: 0.2 },
            { x: 1.3, y: -0.3, z: 0.2 },
            { x: 1.3, y: 0.3, z: 0.2 },
            { x: 0.8, y: 0.3, z: 0.2 }
          ];
          const pBlockRProj = thirdBlock.map(pt => project(pt, width, height));
          ctx.fillStyle = 'rgba(67, 56, 202, 0.7)';
          ctx.beginPath();
          ctx.moveTo(pBlockRProj[0].x, pBlockRProj[0].y);
          ctx.lineTo(pBlockRProj[1].x, pBlockRProj[1].y);
          ctx.lineTo(pBlockRProj[5].x, pBlockRProj[5].y);
          ctx.lineTo(pBlockRProj[4].x, pBlockRProj[4].y);
          ctx.closePath();
          ctx.fill(); ctx.stroke();
          // Top
          ctx.beginPath();
          ctx.moveTo(pBlockRProj[4].x, pBlockRProj[4].y);
          ctx.lineTo(pBlockRProj[5].x, pBlockRProj[5].y);
          ctx.lineTo(pBlockRProj[6].x, pBlockRProj[6].y);
          ctx.lineTo(pBlockRProj[7].x, pBlockRProj[7].y);
          ctx.closePath();
          ctx.fill(); ctx.stroke();
          break;
        case 'alrededor de':
          // Orbit spheres
          const now = Date.now() * 0.0025;
          balls.push({ pos: { x: Math.cos(now) * 1.1, y: Math.sin(now) * 1.1, z: 0 }, color: '#10b981', label: 'Գնդակ' });
          balls.push({ pos: { x: Math.cos(now + Math.PI) * 1.1, y: Math.sin(now + Math.PI) * 1.1, z: 0 }, color: '#34d399', label: 'Գնդակ' });
          balls.push({ pos: { x: Math.cos(now + Math.PI/2) * 1.1, y: Math.sin(now + Math.PI/2) * 1.1, z: 0 }, color: '#059669', label: 'Գնդակ' });
          break;
        case 'dentro de':
          // Shaded small sphere inside the orange box
          balls.push({ pos: { x: 0, y: 0, z: -0.1 }, color: '#ffffff', label: 'Ներսում' });
          break;
        case 'enfrente de':
          // sphere further away on same axis
          balls.push({ pos: { x: 0, y: -1.3, z: -0.4 }, color: '#10b981', label: 'Գնդակ' });
          break;
      }

      // Draw the active balls with cute shading
      balls.forEach(ball => {
        const ballProj = project(ball.pos, width, height);
        
        // Draw sphere
        ctx.beginPath();
        const radius = (8 / (8 + ball.pos.y)) * 14; // depth reactive radius
        const grad = ctx.createRadialGradient(
          ballProj.x - radius * 0.3, ballProj.y - radius * 0.3, radius * 0.1,
          ballProj.x, ballProj.y, radius
        );
        grad.addColorStop(0, '#34d399');
        grad.addColorStop(0.7, ball.color);
        grad.addColorStop(1, '#064e3b');
        
        ctx.fillStyle = grad;
        ctx.arc(ballProj.x, ballProj.y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = '#022c22';
        ctx.stroke();

        // Label above sphere
        ctx.font = 'semibold 10px Inter, system-ui';
        ctx.fillStyle = '#065f46';
        ctx.textAlign = 'center';
        ctx.fillText(ball.label, ballProj.x, ballProj.y - radius - 6);
      });

      // Direction Arrows
      ctx.save();
      // Subtle instructions to dynamic drag
      ctx.font = '10px Inter, system-ui';
      ctx.fillStyle = '#64748b';
      ctx.textAlign = 'center';
      ctx.fillText("⇅ Կողմնորոշման համար պտտիր 3D տարածությունը (քաշիր մկնիկով)", width / 2, height - 12);
      ctx.restore();
    };

    // Run animation loop to allow real-time motion for "alrededor de" orbit
    const tick = () => {
      render();
      animId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [yaw, pitch, positionKey]);

  // Handle Drag on Canvas to Rotate
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDragging.current = true;
    prevMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging.current) return;
    const dx = e.clientX - prevMousePos.current.x;
    const dy = e.clientY - prevMousePos.current.y;
    
    setYaw(prev => prev + dx * 0.012);
    // Keep pitch bounded so camera doesn't flip completely upside down
    setPitch(prev => Math.max(-0.4, Math.min(1.2, prev + dy * 0.012)));
    
    prevMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const resetCamera = () => {
    setYaw(0.6);
    setPitch(0.4);
  };

  return (
    <div className="relative border border-slate-200 bg-slate-50/70 rounded-2xl overflow-hidden p-2 flex flex-col items-center">
      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full border border-slate-100 shadow-sm flex items-center gap-1.5 z-10">
        <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
        <span className="text-xs font-mono text-slate-600 font-medium">3D Կողմնորոշիչ</span>
      </div>
      
      <button 
        onClick={resetCamera}
        className="absolute top-3 right-3 bg-white/95 hover:bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-700 text-xs px-2.5 py-1.5 rounded-lg transition-all shadow-sm z-10"
      >
        🔄 Տեսախցիկ
      </button>

      <canvas
        ref={canvasRef}
        width={420}
        height={280}
        className="max-w-full aspect-[3/2] cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
    </div>
  );
}
