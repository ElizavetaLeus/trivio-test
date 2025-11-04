import { toast } from 'vue3-toastify';

export const notification = {
  error(text: string) {
    toast(text, {
      type: 'error',
      toastId: text,
    });
  },

  warning(text: string) {
    toast(text, {
      type: 'warning',
      toastId: text,
    });
  },

  success(text: string) {
    toast(text, {
      type: 'success',
      toastId: text,
    });
  },
};
