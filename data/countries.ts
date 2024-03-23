export interface Country {
  readonly value: string;
  readonly label: string;
}
export const countries: readonly Country[] = [
  { value: "Kazakhstan", label: "Kazakhstan" },
  { value: "Russia", label: "Russia" },
  { value: "Ukraine", label: "Ukraine" },
  { value: "Belarus", label: "Belarus" },
];
