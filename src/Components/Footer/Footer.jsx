import icon from "../../assets/images/1156729_finance_payment_paypal_icon.png"
import icon1 from "../../assets/images/1156750_finance_mastercard_payment_icon.png"
import icon2 from "../../assets/images/1156753_finance_payment_visa_icon.png"
import icon3 from "../../assets/images/1933704_american express_amex_charge_credit card_payment_icon.png"
import icon4 from "../../assets/images/206684_visa_method_card_payment_icon.png"
import icon5 from "../../assets/images/google-play-badge.png"
import icon6 from "../../assets/images/app-store-badge.png"



export default function Footer() {


  return (
    <section className="bg-gray-100 w-full px-12 py-5 relativex  bottom-0 right-0 left-0">
      <div className=" m-auto">
        <h2 className="text-2xl mb-2 bold">Get the FreshCart app</h2>
        <p className="text-gray-600 mb-4 ">
          We will send you a link, open it on your phone to download the app.
        </p>
        <div className="flex  items-center mb-6 ">
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 p-2 rounded-l w-full "
          />
          <button className="bg-green-500 text-white m-5 px-4 py-2 rounded-lg ">
            Share App Link
          </button>
          
        </div>
        <hr/>
        <div className="flex justify-between items-center border-t pt-4 pb-4">
          <div className="flex items-center">
            <span className="text-gray-600 mr-4">Payment Partners</span>
            <img
              src={icon}
              alt="Paypal"
              className="h-6 mx-2"
            />
            <img
              src={icon1}
              alt="MasterCard"
              className="h-6 mx-2"
            />
            <img
              src={icon2}
              alt="Visa"
              className="h-6 mx-2"
            />
            <img
              src={icon3}
              alt="American Express"
              className="h-6 mx-2"
            /> <img
            src={icon4}
            alt="Amazon Pay"
            className="h-6 mx-2"
          />
          
          </div>
          <div className="flex items-center">
            <span className="text-gray-600 mr-4">
              Get deliveries with FreshCart
            </span>
            <img
              src={icon5}
              alt="App Store"
              className="mx-2 h-[30px] "
            />
            <img
              src={icon6}
              alt="Google Play"
              className=" h-[30px]"
            />
          </div>
        </div>
        <hr/>

      </div>
    </section>
  );
}
