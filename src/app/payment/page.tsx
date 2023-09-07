"use client";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/Payment/CheckoutForm";
import { useSearchParams } from "next/navigation";

function Payment() {
  const searchParams = useSearchParams();
  const amount: any = searchParams.get("amount");
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as any
  );
  const options: any = {
    mode: "payment",
    amount: 50,
    currency: "usd",
  };
  
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm amount={parseFloat(amount!)} />
    </Elements>
  );
}

export default Payment;
