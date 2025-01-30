import PageResponse from "./PageResponse";

export interface Address {
  addressId: number;
  fullName: string;
  contactNumber: string;
  streetAddress: string;
  city: string;
  postCode: string;
  addressType: string;
  status: string;
}

export default interface GetAllAddressResponse {
  models: Address[];
  pageResponse: PageResponse;
}
