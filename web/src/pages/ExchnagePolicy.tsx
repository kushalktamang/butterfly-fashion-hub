import Faq from "../_components/faq";
import Title from "../_components/title";

const ExchangePolicy = () => {
  return (
    <>
      <div className="px-6 md:px-10 pt-5 pb-20">
        {/* Exchange Policy Box */}
        <div className="bg-charcol text-cream rounded p-8 max-w-4xl mx-auto">
          <div className="text-5xl font-bold text-center mb-6">
            <Title textOne={"Exchange"} textTwo={"Policy"} />
          </div>

          {/* Change of Mind Section */}
          <h2 className="text-2xl font-semibold mb-2 underline text-center">Change of Mind</h2>
          <p className="mb-4">
            Butterfly ensures the quality of the products. We do not advertise false details or sell
            products with misleading statements.
          </p>
          <p className="mb-6">
            For that reason, products may be exchanged if the customer wishes for another color
            variant or another product of equal or higher price. If the customer chooses a product
            of higher MRP, the price difference must be paid by the customer, and shipping or
            delivery charges will also be borne by the customer.
          </p>

          {/* Damaged Products Section */}
          <h2 className="text-3xl font-semibold mb-2 underline text-center">
            Damaged or Faulty Products
          </h2>
          <p className="mb-4">
            Butterfly will replace any damaged or faulty products if customers contact us within 2-3
            days of purchase. However, any damage caused by the customer will not be accepted for
            return or replacement.
          </p>
          <p>
            We conduct a strict quality check before shipping any order. For replacements, we
            require genuine proof of purchase and evidence of the damage caused during our handling.
          </p>
        </div>

        {/* FAQ Section */}
        <Faq />
      </div>
    </>
  );
};

export default ExchangePolicy;
