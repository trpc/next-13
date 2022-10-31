/**
 * Helper to properly serialize and deserialize data from RSC to client and keeping the types
 */
import { useMemo } from "react";
import superjson from "superjson";
import { SuperJSONResult } from "superjson/dist/types";

const symbol = Symbol("__RSC_DATA__");

export type SerializedResult<T> = SuperJSONResult & { [symbol]: T };

export function serialize<T>(obj: T): SerializedResult<T> {
  return superjson.serialize(obj) as unknown as SerializedResult<T>;
}

export function deserialize<T>(obj: SerializedResult<T>): T {
  return superjson.deserialize(obj) as T;
}

export function useDeserialized<T>(obj: SerializedResult<T>): T {
  return useMemo(() => deserialize(obj), [obj]);
}
