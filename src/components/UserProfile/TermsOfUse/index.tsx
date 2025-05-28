import { useEffect, useState } from "react";

import { getTerms } from "../../../services/termsService";

export const TermsOfUse: React.FC = () => {
  const [terms, setTerms] = useState<any>([]);

  useEffect(() => {
    getTerms().then((res) => {
      setTerms(res.data.data);
    });
  }, []);

  return (
    <div className="pr-4 pt-0 sm:pt-4">
      <p className="text-2xl font-bold text-center">Terms Of Use</p>
      <div
        style={{ fontFamily: "inherit" }}
        className="custom_data"
        dangerouslySetInnerHTML={{ __html: terms[0]?.description }}
      />
    </div>
  );
};
