"use client";

import { useState, ReactNode } from "react";
import logo from "../../../../../../public/logo.svg";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { createClient } from "../../../../../lib/supabase/client";

const Message = dynamic(() => import("./steps/message"), { ssr: false });
const StepOne = dynamic(() => import("./steps/step-one"), { ssr: false });
const StepTwo = dynamic(() => import("./steps/step-two"), { ssr: false });
const StepThree = dynamic(() => import("./steps/step-three"), { ssr: false });
const StepFour = dynamic(() => import("./steps/step-four"), { ssr: false });
const StepFive = dynamic(() => import("./steps/step-five"), { ssr: false });
const StepSix = dynamic(() => import("./steps/step-six"), { ssr: false });
const StepSeven = dynamic(() => import("./steps/step-seven"), { ssr: false });
const StepEight = dynamic(() => import("./steps/step-eight"), { ssr: false });
const StepNine = dynamic(() => import("./steps/step-nine"), { ssr: false });
const StepTen = dynamic(() => import("./steps/step-ten"), { ssr: false });
const Resume = dynamic(() => import("./steps/resume"), { ssr: false });

export default function CreateListing() {

  const router = useRouter();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0); // 1 = next, -1 = back
  const [loading, setLoading] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [houseType, setHouseType] = useState("");
  const [accommodationInfo, setAccommodationInfo] = useState({
    guests: 0,
    bedrooms: 0,
    beds: 0,
    bathrooms: 0,
  });
  const [price, setPrice] = useState(0);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });

  function onCloseModal() {
    return router.back();
  }

  function onFinishModal(newHouse: any) {
    return router.push(`/hosting/listings/${newHouse.listing_id}/edit`);
  }

  const resetForm = () => {
    setStep(0);
    setDirection(0);
    setTitle("");
    setDescription("");
    setHouseType("");
    setAccommodationInfo({ guests: 0, bedrooms: 0, beds: 0, bathrooms: 0 });
    setPrice(0);
    setAmenities([]);
    setAddress({ street: "", city: "", postalCode: "", country: "" });
  };

  const supabase = createClient();
  const isStepValid = () => {
    switch (step) {
      case 1:
        return title.trim().length > 0;
      case 2:
        return description.trim().length > 0;
      case 3:
        return houseType.trim().length > 0;
      case 4:
        const { guests, bedrooms, beds, bathrooms } = accommodationInfo;
        return guests > 0 && bedrooms > 0 && beds > 0 && bathrooms > 0;
      case 6:
        return price > 0;
      case 7:
        return amenities.length > 5;
      case 8:
        const { street, city, postalCode, country } = address;
        return street && city && postalCode && country;
      default:
        return true;
    }
  };

  const steps: ReactNode[] = [
    <Message key="message" />,
    <StepOne key="step1" value={title} onChange={setTitle} />,
    <StepTwo key="step2" value={description} onChange={setDescription} />,
    <StepThree key="step3" value={houseType} onChange={setHouseType} />,
    <StepFour
      key="step4"
      value={accommodationInfo}
      onChange={setAccommodationInfo}
    />,
    <StepFive key="step5" value={houseType} onChange={setHouseType} />,
    <StepSix key="step6" value={price} onChange={setPrice} />,
    <StepSeven key="step7" value={amenities} onChange={setAmenities} />,
    <StepEight key="step8" value={address} onChange={setAddress} />,
    <StepNine key="step9" value={""} onChange={() => {}} />,
    <StepTen key="step10" value={""} onChange={() => {}} />,
    <Resume
      key="resume"
      title={title}
      description={description}
      address={`${address.street}, ${address.city}`}
      lat={-8.839}
      lng={13.2894}
      images={[]}
      price={price}
      guests={accommodationInfo.guests}
      goToStep={(stepNumber: number) => setStep(stepNumber)}
      onSubmit={() => handleSubmit()}
    />,
  ];

  const totalSteps = steps.length;
  const progressPercent = Math.round((step / totalSteps) * 100);

  const customButton = (title: string, onClick: () => void) => (
    <button
      className="bg-black text-white px-4 py-2 rounded-lg font-medium text-md"
      onClick={onClick}
      disabled={loading}
    >
      {loading ? "Carregando..." : title}
    </button>
  );

  const handleSubmit = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("listings")
      .insert({
        title:title,
        description:description,
        status: "Activo",
        location: address.city || "Desconhecido",
        houseType:houseType,
        price:price,
        guests: accommodationInfo.guests,
        bedrooms: accommodationInfo.bedrooms,
        beds: accommodationInfo.beds,
        bathrooms: accommodationInfo.bathrooms,
        street: address.street,
        postal_code: address.postalCode,
        country: address.country,
      })
      .select()
      .single();

    setLoading(false);

    if (error) {
      console.error("Error saving listing:", error.message);
      return;
    }

    onFinishModal(data);
    resetForm();
    onCloseModal();
  };

  const getButton = () => {
    const isValid = isStepValid();

    if (step === 0)
      return customButton("Começar", () => {
        setDirection(1);
        setStep(1);
      });

    if (step === totalSteps - 1) return customButton("Finalizar", handleSubmit);

    return (
      <button
        className={clsx(
          "bg-black text-white px-4 py-2 rounded-lg font-medium text-md",
          { "opacity-50 cursor-not-allowed": !isValid || loading }
        )}
        onClick={() => {
          if (!isValid) return;
          setDirection(1);
          setStep(step + 1);
        }}
        disabled={!isValid || loading}
      >
        Avançar
      </button>
    );
  };

  const stepVariants = {
    enter: (direction: number) => ({ y: direction > 0 ? 50 : -50, opacity: 0 }),
    center: { y: 0, opacity: 1 },
    exit: (direction: number) => ({ y: direction > 0 ? -50 : 50, opacity: 0 }),
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-white z-50 flex flex-col rounded-2xl"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "tween", duration: 0.35 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between py-4 px-6">
          <div className="container">
            <Link href="/">
              <Image
                priority
                src={logo}
                alt="Logo"
                height={205}
                width={75}
                className="cursor-pointer w-auto h-[20px]"
              />
            </Link>
          </div>
          <button
            onClick={() => {
              resetForm();
              onCloseModal();
            }}
            className="text-gray-600 text-lg hover:text-black cursor-pointer hover:font-bold transition-colors"
            aria-label="Fechar"
          >
            <XMarkIcon className="w-8 h-8" />
          </button>
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto p-6 flex justify-center items-center">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={step}
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="w-full"
            >
              {steps[step]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white">
          {/* Progress bar */}
          <motion.div
            className="w-full bg-gray-200 h-1 overflow-hidden"
            custom={direction}
            initial={{ y: direction > 0 ? 10 : -10, opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: direction > 0 ? -10 : 10, opacity: 0.5 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <motion.div
              className="bg-black h-1"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between p-4">
            {step > 0 ? (
              <button
                onClick={() => {
                  setDirection(-1);
                  setStep(step - 1);
                }}
                className="text-black hover:underline"
              >
                Voltar
              </button>
            ) : (
              <div />
            )}
            {getButton()}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
