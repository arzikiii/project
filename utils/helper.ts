export const capitalizeFirstLetter = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const getInitials = (name: string) => {
  const names = name.split(" ").map((e) => e.replace(/([^a-z])/gi, "")[0]);
  return (names[0] + (names[1] ?? "")).toUpperCase();
};

export const prettyDate = (time: Date) => {
  const d = new Date(time);
  const dd = d.getDate();
  const mm = d.getMonth();
  const yy = d.getFullYear();

  const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  return `${dd} ${months[mm]} ${yy}`;
};
