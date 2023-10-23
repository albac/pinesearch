import * as recurly from "recurly";

const recurlyApiKey = "04e09a263f39449c910f24815f4977a1"; // process.env.RECURLY_PRIVATE_KEY
const client = new recurly.Client(recurlyApiKey);

// Crear una suscripción
export async function POST(req: Request) {
  const { user_id, billing_info, token } = await req.json();

  // Token generado por Recurly en el front a partir de la tarjeta del cliente
  const token_id = token.id;

  console.log({ user_id, billing_info, token_id });

  try {
    console.log("creando cuenta");
    const account = await client.createAccount({
      code: user_id,
      firstName: billing_info.first_name,
      lastName: billing_info.last_name,
      address: {
        street1: billing_info.address1,
        city: billing_info.city,
        postalCode: billing_info.postal_code,
        country: billing_info.country
      }
    });

    console.log("creando billing");
    await client.createBillingInfo(account.code!, {
      ...account,
      tokenId: token_id
    });

    console.log("creando Suscripción");
    const subscriptionReq = {
      planCode: "test1",
      unit_amount: "1",
      currency: "PEN",
      account: {
        code: account.code
      }
    };

    const subscription = await client.createSubscription(subscriptionReq);

    /*
    Error Desconocido:  MissingFeatureError [RecurlyMissingFeatureError]: The wallet feature is not enabled on this site.
    at Client._errorFromResponse (webpack-internal:///(rsc)/./node_modules/recurly/lib/recurly/BaseClient.js:173:31)
    at eval (webpack-internal:///(rsc)/./node_modules/recurly/lib/recurly/BaseClient.js:98:34)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5) {
    type: 'missing_feature',
    params: []
    */

    // https://docs.recurly.com/docs/wallet

    return Response.json(
      { message: "Suscripción creada con éxito", subscription },
      { status: 201 }
    );
  } catch (err) {
    if (err instanceof recurly.errors.ValidationError) {
      // Si la solicitud no fue válida, puedes informar al usuario sobre los detalles del error
      console.log("Error de validación", err.params);
      return new Response("Error de validación", { status: 400 });
    } else {
      // Si ocurre un error desconocido, lo registramos
      console.log("Error Desconocido: ", err);
      return new Response("Error interno del servidor", { status: 500 });
    }
  }
}
