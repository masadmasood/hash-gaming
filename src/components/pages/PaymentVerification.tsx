"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Banknote,
  CheckCircle2,
  Clipboard,
  CreditCard,
  UploadCloud,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import {
  paymentAccount,
  paymentDepositAmount,
  useOrders,
  type PaymentProof,
} from "@/context/OrderContext";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PaymentVerificationProps {
  orderId: string;
}

type ProofSelection = Omit<PaymentProof, "uploadedAt">;

const MAX_FILE_SIZE = 5 * 1024 * 1024;

function formatFileSize(size: number) {
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

const PaymentVerification = ({ orderId }: PaymentVerificationProps) => {
  const router = useRouter();
  const { clearCart } = useCart();
  const { getOrder, isHydrated, submitPaymentProof } = useOrders();
  const order = getOrder(orderId);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [proof, setProof] = useState<ProofSelection | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isReadingFile, setIsReadingFile] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!isHydrated) {
    return (
      <PageTransition>
        <div className="container py-16 text-center text-muted-foreground">Loading payment details...</div>
      </PageTransition>
    );
  }

  if (!order) {
    return (
      <PageTransition>
        <div className="container py-16">
          <Card className="mx-auto max-w-lg rounded-card border-border bg-card text-center">
            <CardContent className="p-8">
              <AlertCircle className="mx-auto h-10 w-10 text-muted-foreground" />
              <h1 className="mt-4 text-2xl font-gaming text-foreground">Order not found</h1>
              <p className="mt-2 text-sm text-muted-foreground">Start checkout again so a fresh payment request can be created.</p>
              <Link href="/cart">
                <Button className="mt-5 rounded-button bg-foreground text-background hover:bg-foreground/85">Back to Cart</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </PageTransition>
    );
  }

  const isOnline = order.paymentMethod === "online";
  const depositAmount = isOnline ? Math.min(order.subtotal, paymentDepositAmount) : 0;
  const remainingAmount = isOnline ? Math.max(order.subtotal - depositAmount, 0) : order.subtotal;

  const handleCopyNumber = async () => {
    await navigator.clipboard.writeText(paymentAccount.number);
    toast.success("Account number copied");
  };

  const readFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Upload an image screenshot only");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      toast.error("Screenshot must be under 5 MB");
      return;
    }

    setIsReadingFile(true);
    const reader = new FileReader();
    reader.onload = () => {
      setProof({
        fileName: file.name,
        fileSize: file.size,
        imageDataUrl: String(reader.result),
      });
      setIsReadingFile(false);
    };
    reader.onerror = () => {
      toast.error("Could not read this screenshot");
      setIsReadingFile(false);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) readFile(file);
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) readFile(file);
  };

  const finishCodOrder = () => {
    clearCart();
    toast.success("COD order confirmed");
    router.push(`/order-status?orderId=${order.id}`);
  };

  const handleSubmitProof = () => {
    if (!proof) {
      toast.error("Upload payment screenshot first");
      return;
    }
    setSubmitting(true);
    submitPaymentProof(order.id, {
      ...proof,
      uploadedAt: new Date().toISOString(),
    });
    clearCart();
    toast.success("Screenshot submitted");
    router.push(`/order-status?orderId=${order.id}`);
  };

  return (
    <PageTransition>
      <div className="container py-10">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Step 2 of 2</p>
            <h1 className="text-3xl font-gaming text-foreground">
              {isOnline ? "Complete Online Payment" : "Confirm Cash on Delivery"}
            </h1>
          </div>
          <div className="inline-flex items-center gap-2 rounded-button border border-border bg-surface px-3 py-2 text-xs text-foreground">
            {isOnline ? <CreditCard className="h-4 w-4" /> : <Banknote className="h-4 w-4" />}
            Order {order.id}
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
          {isOnline ? (
            <>
              <Card className="rounded-card border-border bg-card">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border bg-surface">
                      <UserRound className="h-8 w-8 text-foreground" />
                    </div>

                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{paymentAccount.service} Account</p>
                      <h2 className="mt-1 text-2xl font-gaming text-foreground">{paymentAccount.name}</h2>
                    </div>

                    <div className="flex w-full max-w-sm items-center gap-3 rounded-button border border-border bg-background px-4 py-3">
                      <span className="flex-1 font-mono text-base tracking-wider text-foreground">{paymentAccount.number}</span>
                      <button
                        type="button"
                        onClick={handleCopyNumber}
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface text-muted-foreground transition-colors hover:text-foreground"
                        aria-label="Copy account number"
                      >
                        <Clipboard className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="grid w-full max-w-sm grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="rounded-card border border-border bg-background px-4 py-3 text-center">
                        <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Total to pay now</p>
                        <p className="mt-1 text-2xl font-gaming text-foreground">PKR {depositAmount.toLocaleString()}</p>
                      </div>
                      <div className="rounded-card border border-border bg-background px-4 py-3 text-center">
                        <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Due on delivery</p>
                        <p className="mt-1 text-2xl font-gaming text-foreground">PKR {remainingAmount.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-card border-border bg-card">
                <CardContent className="p-5 sm:p-6">
                  <h2 className="font-gaming text-base text-foreground text-center">Upload Payment Screenshot</h2>
                  <p className="mt-1 text-sm text-muted-foreground text-center">
                    Drop the payment confirmation screenshot or click to choose.
                  </p>

                  <input
                    ref={inputRef}
                    id="proof-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="proof-upload"
                    onDragEnter={(event) => {
                      event.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragOver={(event) => event.preventDefault()}
                    onDragLeave={(event) => {
                      event.preventDefault();
                      setIsDragging(false);
                    }}
                    onDrop={handleDrop}
                    className={cn(
                      "mt-4 flex min-h-65 w-full cursor-pointer flex-col items-center justify-center rounded-card border-2 border-dashed p-6 text-center transition-[background-color,border-color,transform] duration-300 ease-out",
                      isDragging
                        ? "border-foreground/50 bg-white/5"
                        : "border-border bg-background/35 hover:border-foreground/30 hover:bg-surface/60",
                    )}
                  >
                    <AnimatePresence mode="wait">
                      {proof ? (
                        <motion.div
                          key="preview"
                          initial={{ opacity: 0, scale: 0.97 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.97 }}
                          transition={{ duration: 0.2 }}
                          className="w-full flex flex-col items-center"
                        >
                          <Image
                            src={proof.imageDataUrl}
                            alt="Payment proof preview"
                            width={520}
                            height={320}
                            unoptimized
                            className="mx-auto max-h-56 w-auto rounded-button border border-border object-contain shadow-md"
                          />
                          <p className="mt-3 truncate text-sm font-medium text-foreground">{proof.fileName}</p>
                          <p className="text-xs text-muted-foreground">{formatFileSize(proof.fileSize)}</p>
                          <p className="mt-2 text-xs text-muted-foreground">Click to replace screenshot</p>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="empty"
                          initial={{ opacity: 0, scale: 0.97 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.97 }}
                          transition={{ duration: 0.2 }}
                          className="flex flex-col items-center"
                        >
                          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-foreground">
                            <UploadCloud className="h-7 w-7" />
                          </div>
                          <p className="mt-3 text-base font-semibold text-foreground">
                            {isReadingFile ? "Reading screenshot..." : "Drop screenshot here"}
                          </p>
                          <p className="mt-1 text-sm text-muted-foreground">or click to choose from your device</p>
                          <p className="mt-2 text-[11px] text-muted-foreground/60">PNG, JPG, or WEBP. Max 5 MB</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </label>

                  <Button
                    type="button"
                    onClick={handleSubmitProof}
                    disabled={!proof || isReadingFile || submitting}
                    className="mt-5 h-12 w-full rounded-button bg-foreground text-sm font-semibold text-background transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-foreground/85 disabled:opacity-50"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    {submitting ? "Submitting..." : "Submit Screenshot"}
                  </Button>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="rounded-card border-border bg-card">
              <CardContent className="p-6 sm:p-8">
                <div className="mx-auto max-w-xl text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-border bg-surface">
                    <Banknote className="h-8 w-8 text-foreground" />
                  </div>
                  <h2 className="mt-5 text-2xl font-gaming text-foreground">Cash on Delivery Selected</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Your order will be reserved. Our team will contact you before dispatch, and you will pay the full amount when the parcel arrives.
                  </p>
                  <div className="mt-5 rounded-card border border-border bg-background p-4">
                    <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Due on delivery</p>
                    <p className="mt-1 text-4xl font-gaming text-foreground">PKR {order.subtotal.toLocaleString()}</p>
                  </div>
                  <Button
                    type="button"
                    onClick={finishCodOrder}
                    className="mt-6 h-12 w-full rounded-button bg-foreground text-sm font-semibold text-background transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-foreground/85"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Confirm COD Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default PaymentVerification;
