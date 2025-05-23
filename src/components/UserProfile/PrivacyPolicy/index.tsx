import { useEffect, useState } from "react";

import { getPrivacyPolicy } from "../../../services/termsService";

export const PrivacyPolicy = () => {
  const [privacyPolicy, setPrivacyPolicy] = useState<any>([]);

  useEffect(() => {
    getPrivacyPolicy().then((res) => {
      setPrivacyPolicy(res.data.data);

    });
  }, []);

  return (
    <div className="p-4">
      <p className="text-2xl font-bold text-center">Privacy Policy</p>
      <div
        style={{ fontFamily: "inherit" }}
        className="custom_data"
        dangerouslySetInnerHTML={{ __html: privacyPolicy[0]?.description }}
      />
    </div>
  );
};
