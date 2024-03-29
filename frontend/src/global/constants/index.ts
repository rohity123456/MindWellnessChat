const constants = {
  //common
  apiTimeout: 5 * 60 * 1000,
};

type ConstantsType = typeof constants;

export const getConstant = (code: keyof ConstantsType) =>
  (constants[code] || "") as (typeof constants)[typeof code];

export enum ActiveStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export enum MessageStatus {
  SENT = "sent",
  DELIVERED = "delivered",
  READ = "read",
}
