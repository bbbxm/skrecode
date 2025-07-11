export const Coupon = async (pid: string) => {
  const response = await fetch("/api/coupon", {
    method: "POST",
    body: JSON.stringify({ pid: pid }),
  });
  return response.json();
};
