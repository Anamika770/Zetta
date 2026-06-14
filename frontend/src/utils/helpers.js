export const extractFolderName = (pathname) => {
  return pathname.split("/").pop() || "Root";
};

export const confirmAction = (message) => {
  return window.confirm(message);
};

export const showAlert = (message) => {
  alert(message);
};

export const showError = (error) => {
  console.error(error);
  const message = error?.message || "An error occurred";
  showAlert(`Error: ${message}`);
};
