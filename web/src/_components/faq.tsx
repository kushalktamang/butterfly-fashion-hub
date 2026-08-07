import { useState } from "react";

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number): void => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs: FAQ[] = [
    {
      id: 1,
      question: "What is your return policy?",
      answer:
        "We allow returns within 2-3 days of purchase for damaged or faulty products. For change of mind, products can be exchanged for equal or higher value items, and the difference must be paid by the customer.",
    },
    {
      id: 2,
      question: "Do you offer refunds?",
      answer:
        "Currently, we only offer exchanges and not direct refunds, except in cases where the product cannot be replaced.",
    },
    {
      id: 3,
      question: "How long does shipping take?",
      answer: "Shipping usually takes 2-5 business days depending on the location.",
    },
    {
      id: 4,
      question: "Who pays for the return shipping?",
      answer:
        "The customer is responsible for return shipping in the case of an exchange or change of mind. For damaged products, we cover the return shipping cost.",
    },
  ];

  return (
    <div className="max-w-2xl mt-30 mx-auto px-10">
      <h2 className="text-3xl font-semibold text-center mb-6">FAQ</h2>
      {faqs.map((faq) => (
        <div
          key={faq.id}
          className="border-b border-gray-300 py-4 cursor-pointer"
          onClick={() => {
            toggleFAQ(faq.id);
          }}
        >
          <div className="flex justify-between items-center">
            <p className="font-medium text-lg text-gray-800">{faq.question}</p>
            <span className="text-gray-500 text-xl">{openIndex === faq.id ? "-" : "+"}</span>
          </div>
          {openIndex === faq.id && <p className="mt-2 text-gray-600 text-sm">{faq.answer}</p>}
        </div>
      ))}
    </div>
  );
};

export default Faq;
