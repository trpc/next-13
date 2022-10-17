Just started hacking a bit.


## Overview

- `/@trpc/*` represent an imaginary trpc lib for Next 13
- See the [Issues](https://github.com/trpc/next-13/issues/2) for things I want us to hack on
- If you're invited here, feel free to add whatever you want to get a feel of Next 13 + tRPC combo
- Deployed at [rsc.trpc.io](https://rsc.trpc.io/)


## Open questions


- With RSC - is there a point of tRPC? Is there a "lighter" approach that might be nice(r)?
- With RSC - is there a point of react-query? Will there be a way to sync state and make sync the underlying state of the queries from RSC -> client & make *isomorphic* components?
- Will importing the full router on every RSC-request add any significant overhead?
- Will React Context providers be available on the server? If so, it be possible to do any "isomorphic" context providers? Will components be able to be isomorphic?
  - If query state could be synced from server to client and context providers + components could be isomorphic, we could do stuff like using optimistic updates of a component that was initially rendered on the server.
- [..]