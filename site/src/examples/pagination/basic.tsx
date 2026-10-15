import { useState } from "react";
import { Pagination } from "seaglass-ui";

export default function Basic() {
  const [page, setPage] = useState(4);
  return <Pagination page={page} pageCount={12} onPageChange={setPage} />;
}
