'use client';
import { useEffect, useEffectEvent, useState } from 'react';
import { motion, MotionProps } from 'motion/react';

/*
 * Text Scramble di Motion Primitives, adattato: i componenti motion sono
 * creati una volta sola fuori dal render e l'intervallo viene sempre ripulito.
 */

export type TextScrambleProps = {
  children: string;
  duration?: number;
  speed?: number;
  characterSet?: string;
  as?: keyof typeof MOTION_TAGS;
  className?: string;
  trigger?: boolean;
  onScrambleComplete?: () => void;
} & MotionProps;

const MOTION_TAGS = {
  p: motion.p,
  span: motion.span,
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
};

const defaultChars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function TextScramble({
  children,
  duration = 0.8,
  speed = 0.04,
  characterSet = defaultChars,
  className,
  as = 'p',
  trigger = true,
  onScrambleComplete,
  ...props
}: TextScrambleProps) {
  const MotionComponent = MOTION_TAGS[as];
  const [displayText, setDisplayText] = useState(children);
  const text = children;
  const onComplete = useEffectEvent(() => onScrambleComplete?.());

  useEffect(() => {
    if (!trigger) return;

    const steps = duration / speed;
    let step = 0;

    const interval = setInterval(() => {
      let scrambled = '';
      const progress = step / steps;

      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          scrambled += ' ';
          continue;
        }

        if (progress * text.length > i) {
          scrambled += text[i];
        } else {
          scrambled +=
            characterSet[Math.floor(Math.random() * characterSet.length)];
        }
      }

      setDisplayText(scrambled);
      step++;

      if (step > steps) {
        clearInterval(interval);
        setDisplayText(text);
        onComplete();
      }
    }, speed * 1000);

    return () => clearInterval(interval);
  }, [trigger, text, duration, speed, characterSet]);

  return (
    <MotionComponent className={className} {...props}>
      {displayText}
    </MotionComponent>
  );
}
