import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export interface Shirt {
  title: string;
  id: string;
  price: number;
  image: string;
  color: string;
  material: string;
  stock?: number;
}

export type SortBy = "price-asc" | "price-desc" | "title-asc" | "title-desc";

export interface FetchShirtsParams {
  limit?: number;
  page?: number;
  color?: string;
  material?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: "price" | "title";
  sortOrder?: "asc" | "desc";
}

export interface Pagination {
  page: number;
  limit: number;
  totalPages: number;
  isLastPage: boolean;
}

export interface FetchShirtsResponse {
  shirts: Shirt[];
  pagination: Pagination;
}

import { fetcher } from "./fetcher";

const fetchShirts = async (params: FetchShirtsParams) => {
  const queryParams = new URLSearchParams(
    Object.entries({ ...params }).reduce((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = value.toString();
      }
      return acc;
    }, {} as Record<string, string>)
  ).toString();

  return fetcher(`/shirts?${queryParams}`).catch((error) => {
    console.log(error);
    return {
      shirts: [],
      pagination: { page: 1, limit: 10, totalPages: 1, isLastPage: true },
    };
  });
};

export const useShirts = (params?: FetchShirtsParams) => {
  return useInfiniteQuery<FetchShirtsResponse, Error>({
    queryKey: ["shirts", params],
    queryFn: ({ pageParam = 0 }) =>
      fetchShirts({ ...params, page: pageParam as number }),
    getNextPageParam: (lastPage) => {
      return !lastPage.pagination.isLastPage
        ? lastPage.pagination.page + 1
        : undefined;
    },
    retry: false,
    initialPageParam: 1,
  });
};

export interface ShirtFilterValues {
  colors: string[];
  materials: string[];
}

export const fetchShirtFilterValues = async () => {
  const data: ShirtFilterValues = await fetcher("/shirts/filters");
  return data;
};

export const useShirtFilterValues = () => {
  return useQuery({
    queryKey: ["shirt-filters"],
    queryFn: fetchShirtFilterValues,
  });
};
