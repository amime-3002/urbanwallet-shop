import { corsHeaders } from "npm:@supabase/supabase-js@2.104.0/cors";

type OrderItem = {
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

type OrderPayload = {
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    wilaya: string;
    zipCode: string;
  };
  payment: {
    method: string;
    cardholderName?: string;
    baridimobPhone?: string;
    transferReference?: string;
  };
  items: OrderItem[];
  subtotal: number;
  shippingPrice: number;
  total: number;
};

const STORE_OWNER_EMAIL = "meddmerabti@gmail.com";

const formatDzd = (amount: number) => `${amount.toLocaleString("en-DZ")} DA`;

const formatPaymentMethod = (method: string) => {
  const labels: Record<string, string> = {
    "cash-on-delivery": "Cash on delivery",
    card: "Credit / debit card",
    baridimob: "BaridiMob transfer",
  };

  return labels[method] || method;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const serviceId = Deno.env.get("EMAILJS_SERVICE_ID");
    const templateId = Deno.env.get("EMAILJS_TEMPLATE_ID");
    const apiKey = Deno.env.get("ORDER_EMAIL_API_KEY");

    if (!serviceId || !templateId || !apiKey) {
      throw new Error("EmailJS configuration is missing.");
    }

    const order = (await req.json()) as OrderPayload;

    if (!order.customer?.email || !order.customer?.firstName || !order.items?.length) {
      return new Response(JSON.stringify({ error: "Invalid order details." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const itemLines = order.items
      .map((item) => `${item.name} × ${item.quantity} — ${formatDzd(item.lineTotal)}`)
      .join("\n");

    const paymentDetails = [
      `Method: ${formatPaymentMethod(order.payment.method)}`,
      order.payment.cardholderName ? `Cardholder: ${order.payment.cardholderName}` : "",
      order.payment.baridimobPhone ? `BaridiMob phone: ${order.payment.baridimobPhone}` : "",
      order.payment.transferReference ? `Transfer reference: ${order.payment.transferReference}` : "",
    ].filter(Boolean).join("\n");

    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: apiKey,
        template_params: {
          to_email: STORE_OWNER_EMAIL,
          customer_name: `${order.customer.firstName} ${order.customer.lastName}`,
          customer_email: order.customer.email,
          customer_address: order.customer.address,
          customer_wilaya: order.customer.wilaya,
          customer_zip_code: order.customer.zipCode,
          payment_details: paymentDetails,
          order_items: itemLines,
          subtotal: formatDzd(order.subtotal),
          shipping: formatDzd(order.shippingPrice),
          total: formatDzd(order.total),
          message: [
            `New order from ${order.customer.firstName} ${order.customer.lastName}`,
            `Email: ${order.customer.email}`,
            `Address: ${order.customer.address}, ${order.customer.wilaya}, ${order.customer.zipCode}`,
            "",
            "Items:",
            itemLines,
            "",
            paymentDetails,
            "",
            `Subtotal: ${formatDzd(order.subtotal)}`,
            `Shipping: ${formatDzd(order.shippingPrice)}`,
            `Total: ${formatDzd(order.total)}`,
          ].join("\n"),
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`EmailJS failed with ${response.status}: ${errorText}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to send order email.";
    console.error(message);

    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});