const today = new Date();
export const date_string = today.toLocaleDateString().replace(/[/]/g, "-");
export const hour_string = today.toLocaleTimeString().replace(/[:]/g, "-")
export const today_string = `${date_string} ${hour_string}`;

