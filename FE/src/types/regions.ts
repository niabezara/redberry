export interface Flat {
  id: number;
  name: string;
  price: number | null;
  postalCode: string;
  type: string;
  streetAddress: string;
  bedrooms: string;
  regionId: number;
  region: Region;
  deletedAt: Date | null;
  profilePictureId: string | null;
  profilePicture: File | null;
}
export interface File {
  id: string;
  name: string;
  path: string;
}
// Type for Region model
interface Region {
  id: number;
  name: string;
  code: string;
  deletedAt: Date | null;
  flats: Flat[];
}

export interface RegionsResponse {
  data: Region[];
}
