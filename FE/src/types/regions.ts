export interface Flat {
  id: string;
  name: string;
  price: number | null;
  postalCode: string;
  type: string;
  streetAddress: string;
  area: string;
  bedrooms: string;
  regionId: number;
  region: Region;
  deletedAt: Date | null;
  profilePictureId: string | null;
  profilePicture: File | null;
  createdAt: Date | null;
}
export interface File {
  id: string;
  name: string;
  path: string;
}
// Type for Region model
interface Region {
  id: string;
  name: string;
  code: string;
  deletedAt: Date | null;
  flats: Flat[];
  cities: Cities[];
}

interface Cities {
  id: string;
  name: string;
  regionId: number;
  deletedAt: Date | null;
}

export interface RegionsResponse {
  data: Region[];
}
