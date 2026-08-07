import { TbBrandInstagram, TbBrandTiktok, TbBrandWhatsapp } from "react-icons/tb";
import Title from "../_components/title";
import Faq from "../_components/faq";

const Contact = () => {
  return (
    <>
      <div className="px-10 pb-[30vh]">
        <div className="text-center text-2xl pt-10">
          <Title textOne={"CONTACT"} textTwo={"US"} />
        </div>

        <div className="my-10 flex flex-col justify-center md:flex-row gap-10">
          {/* Replaced Image with Map */}
          <div className="w-full md:max-w-120 h-75 md:h-100 rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3515.4768621890785!2d83.98601197463285!3d28.223202502552613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995959fae6b71c9%3A0xbf2c846b91480025!2sBUTTERFLY%20FASHION%20HUB!5e0!3m2!1sen!2snp!4v1752898406446!5m2!1sen!2snp"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col justify-center items-start gap-6">
            <p className="font-semibold text-xl text-gray-600">OUR STORE</p>
            <p className="text-gray-500">
              Nivagalli, Pokhara <br /> Tel: 9817170333 <br /> Email: mhdjasim8@gmail.com
            </p>

            {/* ---------social links------- */}
            <div className=" ">
              <h1 className="py-1 text-center">FOLLOW US:</h1>
              <ul className="flex items-center gap-3 ">
                {/* tiktok */}
                <li>
                  <a
                    href="https://www.tiktok.com/@butterflynivagalli"
                    className="text-charcol hover:text-black"
                    target="_blank"
                  >
                    <TbBrandTiktok className="h-8 w-8" />
                  </a>
                </li>
                {/* whatsapp */}
                <li>
                  <a
                    href="https://wa.me/9779817170333"
                    target="_blank"
                    className="text-charcol hover:text-green-600"
                  >
                    <TbBrandWhatsapp className="h-8 w-8" />
                  </a>
                </li>

                {/* instagram */}
                <li>
                  <a
                    href="https://www.instagram.com/butterflyfashion.hub/"
                    target="_blank"
                    className="text-charcol hover:text-red-500"
                  >
                    <TbBrandInstagram className="h-8 w-8" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/*faq*/}
      <Faq />
    </>
  );
};

export default Contact;
