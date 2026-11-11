import { site } from "./utils";

/** WhatsApp chat link, optionally with a pre-filled message. */
export function whatsappLink(message?: string): string {
  const number = site.whatsapp.replace(/\D/g, "");
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${number}${text}`;
}

export type ReservationDetails = {
  name: string;
  phone: string;
  branch: string;
  date: string;
  time: string;
  guests: string;
  occasion?: string;
  notes?: string;
};

/** Turns the reservation form into a neat WhatsApp message. */
export function reservationMessage(d: ReservationDetails): string {
  return [
    `Hello ${site.name}, I would like to reserve a table.`,
    "",
    `Name: ${d.name}`,
    `Phone: ${d.phone}`,
    `Branch: ${d.branch}`,
    `Date: ${d.date}`,
    `Time: ${d.time}`,
    `Guests: ${d.guests}`,
    d.occasion ? `Occasion: ${d.occasion}` : "",
    d.notes ? `Notes: ${d.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}