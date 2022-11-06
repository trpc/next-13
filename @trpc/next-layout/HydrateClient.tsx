"use client";

import { DehydratedState, Hydrate } from "@tanstack/react-query";
import { DataTransformer } from "@trpc/server";
import { useMemo } from "react";

export function createHydrateClient(opts: { transformer?: DataTransformer }) {
  return function HydrateClient(props: {
    children: React.ReactNode;
    state: DehydratedState;
  }) {
    const { state, children } = props;

    const transformedState: DehydratedState = useMemo(() => {
      if (opts.transformer) {
        return opts.transformer.deserialize(state);
      }
      return state;
    }, [state]);
    return <Hydrate state={transformedState}>{children}</Hydrate>;
  };
}
