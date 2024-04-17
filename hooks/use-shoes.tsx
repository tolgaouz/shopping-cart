import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export interface Shoe {
  title: string;
  id: string;
  price: number;
  image: string;
  brand: string;
  outerMaterial: string;
  innerMaterial: string;
  stock?: number;
}

export interface FetchShoesParams {
  limit?: number;
  page?: number;
  brand?: string;
  outerMaterial?: string;
  innerMaterial?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export interface Pagination {
  page: number;
  limit: number;
  totalPages: number;
  isLastPage: boolean;
}

export interface FetchShoesResponse {
  shoes: Shoe[];
  pagination: Pagination;
}

import { fetcher } from "./fetcher";

const fetchShoes = async (params: FetchShoesParams) => {
  const queryParams = new URLSearchParams(
    Object.entries({ ...params }).reduce((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = value.toString();
      }
      return acc;
    }, {} as Record<string, string>)
  ).toString();

  const data: FetchShoesResponse = await fetcher(`/shoes?${queryParams}`);
  return data;
};

export const useShoes = (params?: FetchShoesParams) => {
  return useInfiniteQuery<FetchShoesResponse, Error>({
    queryKey: ["shoes", params],
    queryFn: ({ pageParam = 0 }) =>
      fetchShoes({ ...params, page: pageParam as number }),
    getNextPageParam: (lastPage) => {
      console.log(lastPage);
      return !lastPage.pagination.isLastPage
        ? lastPage.pagination.page + 1
        : undefined;
    },
    initialPageParam: 1,
  });
};

export interface ShoeFilterValues {
  brands: string[];
  outerMaterials: string[];
  innerMaterials: string[];
}

export const fetchShoeFilterValues = async () => {
  const data: ShoeFilterValues = await fetcher("/shoes/filters");
  return data;
};

export const useShoeFilterValuesOptions = {
  queryKey: ["shoe-filters"],
  queryFn: fetchShoeFilterValues,
};

export const useShoeFilterValues = () => {
  return useQuery({
    queryKey: ["shoe-filters"],
    queryFn: fetchShoeFilterValues,
  });
};
