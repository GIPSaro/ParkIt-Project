export const REGISTER_USER = "REGISTER_USER";
export const registerAndPurchaseAction = (formData) => {
  return async (dispatch) => {
    const url = import.meta.env.VITE_URL;

    try {
      const resp = await fetch(url + "auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (resp.ok) {
        const result = await resp.json();
        dispatch({ type: "REGISTER_USER", payload: result });
        return true; 
      } else {
        const errorText = await resp.text();
        console.error("Errore nella registrazione:", errorText);
        return false; 
      }
    } catch (error) {
      console.error("Errore nella richiesta:", error);
      return false; 
    }
  };
};
