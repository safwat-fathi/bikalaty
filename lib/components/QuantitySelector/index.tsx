"use client";
import { useState } from "react";

export function QuantitySelector({ stock }: { stock: number }) {
  const [quantity, setQuantity] = useState(1);
  const increment = () => setQuantity((q) => Math.min(q + 1, stock)); // Prevent exceeding stock
  const decrement = () => setQuantity((q) => Math.max(1, q - 1)); // Prevent going below 1

  return (
    <div className="form-control">
      <label className="label pb-1">
        <span className="label-text">Quantity</span>
      </label>
      <div className="flex items-center gap-2">
        <button
          onClick={decrement}
          className="btn btn-outline btn-sm"
          disabled={quantity <= 1}
          aria-label="Decrease quantity"
        >
          -
        </button>
        <input
          type="number" // Use number input for semantics, but control logic tightly
          value={quantity}
          readOnly // Prevent direct typing for simplicity here, or add validation
          className="input input-bordered input-sm w-16 text-center"
          aria-label="Current quantity"
        />
        <button
          onClick={increment}
          className="btn btn-outline btn-sm"
          disabled={quantity >= stock}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    </div>
  );
}
