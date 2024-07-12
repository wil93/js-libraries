import z from "zod";

import { api } from "./common";

const locationSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const regionsSchema = z.object({
  regions: locationSchema.array(),
});

const provincesSchema = z.object({
  provinces: locationSchema.array(),
});

const citiesSchema = z.object({
  cities: locationSchema.array(),
});

const institutesSchema = z.object({
  institutes: locationSchema.array(),
});

export type Location = z.infer<typeof locationSchema>;

export async function getRegions(): Promise<Location[]> {
  const { regions } = await api("location", { action: "listregions" }, regionsSchema);
  return regions;
}

export async function getProvinces(id: string): Promise<Location[]> {
  const { provinces } = await api("location", { action: "listprovinces", id }, provincesSchema);
  return provinces;
}

export async function getCities(id: string): Promise<Location[]> {
  const { cities } = await api("location", { action: "listcities", id }, citiesSchema);
  return cities;
}

export async function getInstitutes(id: string): Promise<Location[]> {
  const { institutes } = await api("location", { action: "listinstitutes", id }, institutesSchema);
  return institutes;
}
