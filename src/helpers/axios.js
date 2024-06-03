import axios from "axios";
export async function useApi({ ...args }) {
  try {
    const response = await axios({
      method: args.method,
      data: args.data,
      params: args.params,
      headers: {
        ...args.header,
        Authorization: `Bearer ${args.token}`,
      },
      baseURL: import.meta.env.VITE_APP_API_BASE + args.api,
    });
    return { ok: true, data: response.data };
  } catch (error) {
    return { ok: false, error: error.response };
  }
}
