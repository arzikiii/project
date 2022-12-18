export const capitalizeFirstLetter = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const getInitials = (name: string) => {
  const names = name.split(" ").map((e) => e.replace(/([^a-z])/gi, "")[0]);
  return (names[0] + (names[1] ?? "")).toUpperCase();
};
