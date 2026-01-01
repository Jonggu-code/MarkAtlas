export const KR_SCHEMA = [
  { key: "productName", label: "상표명(한글)" },
  { key: "productNameEng", label: "상표명(영문)" },
  { key: "applicationNumber", label: "출원 번호" },
  { key: "applicationDate", label: "출원일", type: "date" },
  {
    key: "registerStatus",
    label: "상표 등록 상태",
    style: "col-span-2",
  },
  { key: "publicationNumber", label: "공고 번호" },
  { key: "publicationDate", label: "공고일", type: "date" },
  {
    key: "registrationNumber",
    label: "등록 번호",
    type: "array",
  },
  {
    key: "registrationDate",
    label: "등록일",
    type: "dateArray",
  },
  { key: "registrationPubNumber", label: "등록 공고 번호" },
  {
    key: "registrationPubDate",
    label: "등록 공고일",
    type: "date",
  },
  {
    key: "internationalRegNumbers",
    label: "국제 출원 번호",
    type: "array",
  },
  {
    key: "internationalRegDate",
    label: "국제 출원일",
    type: "date",
  },
  {
    key: "priorityClaimNumList",
    label: "우선권 번호",
    type: "array",
  },
  {
    key: "priorityClaimDateList",
    label: "우선권 일자",
    type: "date",
  },
  {
    key: "asignProductMainCodeList",
    label: "상품 주 분류 코드",
    type: "array",
    style: "col-span-2",
  },
  {
    key: "asignProductSubCodeList",
    label: "상품 유사군 코드",
    type: "array",
    style: "col-span-2",
  },
  {
    key: "viennaCodeList",
    label: "비엔나 코드",
    type: "array",
    style: "col-span-2",
  },
];

export const US_SCHEMA = [
  {
    key: "productName",
    label: "상표명",
    style: "col-span-2",
  },
  { key: "applicationNumber", label: "출원 번호" },
  { key: "applicationDate", label: "출원일", type: "date" },
  {
    key: "registerStatus",
    label: "등록 상태",
    style: "col-span-2",
  },
  {
    key: "publicationDate",
    label: "공고일",
    type: "date",
    style: "col-span-2",
  },
  {
    key: "registrationNumber",
    label: "등록 번호",
    type: "array",
  },
  {
    key: "registrationDate",
    label: "등록일",
    type: "date",
  },
  {
    key: "internationalRegNumbers",
    label: "국제 출원 번호",
    type: "array",
  },
  {
    key: "internationalRegDate",
    label: "국제 출원일",
    type: "date",
  },
  {
    key: "priorityClaimNumList",
    label: "우선권 번호",
    type: "array",
  },
  {
    key: "priorityClaimDateList",
    label: "우선권 일자",
    type: "date",
  },
  {
    key: "asignProductMainCodeList",
    label: "Nice 분류 코드",
    type: "array",
    style: "col-span-2",
  },
  {
    key: "usClassCodeList",
    label: "US 코드",
    type: "array",
    style: "col-span-2",
  },
  {
    key: "viennaCodeList",
    label: "Vienna 코드",
    type: "array",
    style: "col-span-2",
  },
];
