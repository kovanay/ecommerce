export interface MessageAndError {
  message?: string;
  error?: string | [];
}

export interface AddressType {
  address_id: 8;
  user_id: number;
  recipient_name: string;
  street_address: string;
  address_line_2: string;
  city: string;
  state_province: string;
  postal_code: string;
  country: string;
  delivery_instructions: string;
  phone_number: string;
  address_label: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface AddressResponse extends MessageAndError {
  data: AddressType[];
}

export interface AddressDefaultResponse extends MessageAndError {
  data: AddressType | null;
}

export interface FormAddressType {
  recipientName: string;
  streetAddress: string;
  addressLine2: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
  deliveryInstructions: string;
  phoneNumber: string;
  addressLabel: string;
  isDefault: boolean;
}
