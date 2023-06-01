export const parseDateValue = (
  value: string | null | undefined
): Date | null => {
  return value && value !== "Invalid date" ? new Date(value) : null;
};
