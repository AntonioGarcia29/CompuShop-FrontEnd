"use client";

import * as Slider from "@radix-ui/react-slider";
import { formatPrice } from "@/lib/utils";

type Props = {
  min: number;
  max: number;
  value: [number, number];
  onValueChange: (value: [number, number]) => void;
  step?: number;
};

export function PriceRangeSlider({
  min,
  max,
  value,
  onValueChange,
  step = 1000,
}: Props) {
  return (
    <div>
      <Slider.Root
        className="relative flex h-5 w-full touch-none select-none items-center"
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={(v) => onValueChange(v as [number, number])}
        minStepsBetweenThumbs={1}
      >
        <Slider.Track className="relative h-1.5 w-full grow rounded-full bg-slate-700">
          <Slider.Range className="absolute h-full rounded-full bg-[#3B82F6]" />
        </Slider.Track>
        <Slider.Thumb
          className="block h-4 w-4 rounded-full border-2 border-[#3B82F6] bg-white shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Precio minimo"
        />
        <Slider.Thumb
          className="block h-4 w-4 rounded-full border-2 border-[#3B82F6] bg-white shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Precio maximo"
        />
      </Slider.Root>
      <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
        <span>{formatPrice(value[0])}</span>
        <span>
          {value[1] >= max ? `${formatPrice(value[1])}+` : formatPrice(value[1])}
        </span>
      </div>
    </div>
  );
}
