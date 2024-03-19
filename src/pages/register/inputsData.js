const fieldTextRegisterInputArr = [
  { id: "first", label: "First Name", value: "first", required: true },
  { id: "middle", label: "Middle Name", value: "middle" },
  { id: "last", label: "Last Name", value: "last", required: true },
  {
    id: "email",
    label: "Email",
    value: "email",
    required: true,
    type: "email",
  },
  {
    id: "password",
    label: "Password",
    value: "password",
    required: true,
    type: "password",
  },
  { id: "phone", label: "Phone Number", value: "phone", required: true },
  { id: "url", label: "Image URL", value: "url" },
  { id: "alt", label: "Image Text", value: "alt" },
  { id: "state", label: "State", value: "state" },
  { id: "country", label: "Country", value: "country", required: true },
  { id: "city", label: "City", value: "city", required: true },
  { id: "street", label: "Street", value: "street", required: true },
  {
    id: "houseNumber",
    label: "House Number",
    value: "houseNumber",
    required: true,
  },
  { id: "zip", label: "ZIP", value: "zip" },
];

export default fieldTextRegisterInputArr;
