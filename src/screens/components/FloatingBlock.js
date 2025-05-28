import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { color, padding } from '../../data/variables';

const getRandomOffset = (range = 10) => ({
  x: Math.random() * range * 2 - range, // -range to +range
  y: Math.random() * range * 2 - range,
});

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const FloatingBlock = ({ metric = 100, floatRadius = 10,  left,bottom }) => {
  const blockRef = useRef(null);
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const offset = getRandomOffset(8); // small motion step

      // Clamp within floatRadius from origin
      const nextX = clamp(currentPos.x + offset.x, -floatRadius, floatRadius);
      const nextY = clamp(currentPos.y + offset.y, -floatRadius, floatRadius);
      const nextPos = { x: nextX, y: nextY };

      // Animate smoothly from current → next
      blockRef.current?.animate(
        {
          0: { translateX: currentPos.x, translateY: currentPos.y },
          1: { translateX: nextPos.x, translateY: nextPos.y },
        },
        2000
      );

      setCurrentPos(nextPos);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentPos, floatRadius]);

  return (
    <Animatable.View
      ref={blockRef}
      style={[
        {position: 'absolute',
          left: left,
          bottom: bottom},
        {
          height: metric,
          width: metric,
          borderRadius: padding / 2,
          backgroundColor: color.secondary,
        },
      ]}
    />
  );
};

export default FloatingBlock;

const styles = StyleSheet.create({

});
