import { useAuth } from "@/hooks/useAuth";
import {
  CardElement,
  Elements,
  RecurlyProvider,
  useCheckoutPricing,
  useRecurly
} from "@recurly/react-recurly";
import axios from "axios";
import { FormEvent, useEffect, useRef, useState } from "react";

export const RecurlyCard = () => {
  const [isClient, setIsClient] = useState(false);

  /*
  https://isaul19.recurly.com/subscribe/test1?currency=PEN

  SUCCESS: 4111-1111-1111-1111
  ERROR:   4000-0000-0000-0002


  MES EXPIRATION: 10 
  YEAR EXPIRATION: 25
  CVV: 789
  */

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? (
    <RecurlyProvider publicKey="ewr1-4FuKPnfwi05vh7I85bUMqh">
      <Elements>
        <Pricing />
        <Form />
      </Elements>
    </RecurlyProvider>
  ) : (
    <></>
  );
};

export const Form = () => {
  const { getUser } = useAuth();
  const user = getUser();

  const formRef = useRef<HTMLFormElement>(null);
  const recurly = useRecurly();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!user) return;

    const formData = new FormData(formRef.current!);

    const billingInfo = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      address1: formData.get("address1") as string,
      city: formData.get("city") as string,
      country: formData.get("country") as string,
      postal_code: formData.get("postal_code") as string,
      email: "porrasemiliosaul@gmail.com" // Puedes obtener el correo electrónico del usuario de tu aplicación
    };

    console.log({ formData: formData.values() });

    recurly.token(formRef.current!, async (err, token) => {
      if (err) {
        console.log(err);
        return;
      }

      const bodyRequest = {
        billing_info: billingInfo,
        token,
        user_id: user.attributes?.sub! + Date.now() // temporalmente para simular ser varios usuarios
      };

      try {
        const data = await axios.post("/api/recurly/suscription", bodyRequest);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} ref={formRef} className="mt-[20px]">
      <div className="flex flex-col gap-4">
        <input
          className="p-2 border-b"
          type="text"
          name="first_name"
          data-recurly="first_name"
          placeholder="First name"
        />
        <input
          className="p-2 border-b"
          type="text"
          name="last_name"
          data-recurly="last_name"
          placeholder="Last name"
        />

        <input
          className="p-2 border-b"
          type="text"
          name="address1"
          data-recurly="address1"
          placeholder="Address1"
        />
        <input
          className="p-2 border-b"
          type="text"
          name="city"
          data-recurly="city"
          placeholder="City"
        />
        <input
          className="p-2 border-b"
          type="text"
          name="country"
          data-recurly="country"
          placeholder="Country"
        />
        <input
          className="p-2 border-b"
          type="text"
          name="postal_code"
          data-recurly="postal_code"
          placeholder="Postal Code"
        />
      </div>
      <div className="w-[400px]">
        <CardElement />
      </div>
      <button className="bg-blue-600 text-white px-4 py-2" type="submit">
        Submit
      </button>
    </form>
  );
};

export const Pricing = () => {
  const initialPricingInput = {
    subscriptions: [
      {
        plan: "test1",
        unit_amount: 1
      }
    ],
    currency: "PEN"
  };

  const [{ price, loading }] = useCheckoutPricing(initialPricingInput);

  if (!loading) {
    return <div className="font-bold text-2xl">{price.now.subtotal} PEN</div>;
  }
};
