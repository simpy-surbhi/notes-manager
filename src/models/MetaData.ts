import Contact from "./Contact";

interface MetaData {
  to: Contact[];
  cc: Contact[];
  bcc: Contact[];
  subject: string;
  sender: Contact;
}

export default MetaData;
